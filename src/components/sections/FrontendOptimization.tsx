import CodeBlock from "../CodeBlock";
import PerformanceMetric from "../PerformanceMetric";

const FrontendOptimization = () => {
  // Define missing functions and variables to prevent the errors
  const calculateDiscount = (price: number) => {
    return price * 0.1; // Sample discount calculation
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">4. Frontend Optimization</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">React Performance Techniques</h3>
        <p className="mb-4 text-gray-700">
          React applications can suffer from unnecessary re-renders, memory leaks, and inefficient component structures. The following techniques can dramatically improve React application performance.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <PerformanceMetric
            title="First Contentful Paint"
            beforeValue={1.8}
            afterValue={0.9}
            unit="s"
            target={1.0}
            improvedIsBetter={true}
          />
          <PerformanceMetric
            title="Time to Interactive"
            beforeValue={4.2}
            afterValue={1.7}
            unit="s"
            target={2.0}
            improvedIsBetter={true}
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <h4 className="font-semibold mb-2">Memoization to Prevent Re-renders</h4>
            <CodeBlock
              language="jsx"
              title="Before: Inefficient component"
              code={`// Before: Component re-renders on every parent update
function ProductItem({ product, onAddToCart }) {
  console.log('ProductItem rendering');
  
  // Expensive calculation runs on every render
  const discount = calculateDiscount(product.price);
  
  // New function created on every render
  const handleAddToCart = () => {
    onAddToCart(product.id);
  };
  
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <p>Discount: ${discount}</p>
      <button onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}`}
            />
          </div>
          <div>
            <h4 className="font-semibold mb-2">With Memoization Applied</h4>
            <CodeBlock
              language="jsx"
              title="After: Optimized with memoization"
              code={`import React, { useMemo, useCallback } from 'react';

// After: Component only re-renders when props change
const ProductItem = React.memo(function ProductItem({ 
  product, 
  onAddToCart 
}) {
  console.log('ProductItem rendering');
  
  // Memoize expensive calculation
  const discount = useMemo(() => {
    console.log('Calculating discount');
    return calculateDiscount(product.price);
  }, [product.price]);
  
  // Memoize event handler
  const handleAddToCart = useCallback(() => {
    onAddToCart(product.id);
  }, [product.id, onAddToCart]);
  
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <p>Discount: ${discount}</p>
      <button onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
});`}
            />
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Virtual List for Large Data Sets</h4>
          <CodeBlock
            language="jsx"
            title="virtualized-list.jsx"
            code={`import React from 'react';
import { FixedSizeList } from 'react-window';

// Before: Rendering all items at once
// function ProductList({ products }) {
//   return (
//     <div className="product-list">
//       {products.map(product => (
//         <ProductItem key={product.id} product={product} />
//       ))}
//     </div>
//   );
// }

// After: Using virtualization for better performance
function ProductList({ products }) {
  // Only render items that are visible in the viewport
  const Row = ({ index, style }) => {
    const product = products[index];
    return (
      <div style={style}>
        <ProductItem product={product} />
      </div>
    );
  };

  return (
    <FixedSizeList
      height={500}
      width="100%"
      itemCount={products.length}
      itemSize={80}
    >
      {Row}
    </FixedSizeList>
  );
}`}
          />
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">Asset Optimization Strategies</h3>
        
        <p className="mb-4 text-gray-700">
          Proper asset management dramatically impacts initial load times and user experience. Here are proven strategies to optimize assets.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold mb-2">Image Optimization Pipeline</h4>
            <CodeBlock
              language="javascript"
              title="vite.config.js - Image optimization"
              code={`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  plugins: [
    react(),
    imagetools({
      defaultDirectives: new URLSearchParams(
        'format=webp;avif&quality=80&w=300;600;1200'
      )
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code from app code
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Other chunks as needed
          utils: ['date-fns', 'lodash-es']
        },
        // Optimize asset naming for better caching
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  }
});`}
            />
          </div>
          <div>
            <h4 className="font-semibold mb-2">Responsive Image Component</h4>
            <CodeBlock
              language="jsx"
              title="ResponsiveImage.jsx"
              code={`import React from 'react';

// Import different sized versions of the same image
// Generated through the Vite imagetools plugin
import smallImage from './image.jpg?w=300&format=webp';
import mediumImage from './image.jpg?w=600&format=webp';
import largeImage from './image.jpg?w=1200&format=webp';
import placeholder from './image.jpg?width=20&format=webp&blur=5'; // Tiny placeholder

const ResponsiveImage = ({ alt, className }) => {
  const [loaded, setLoaded] = React.useState(false);
  
  return (
    <div className="relative">
      {/* Low-quality placeholder that shows immediately */}
      <img
        src={placeholder}
        alt={alt}
        className={\`\${className} \${loaded ? 'opacity-0' : 'opacity-100'} absolute inset-0 w-full h-full object-cover transition-opacity duration-300\`}
        aria-hidden="true"
      />
      
      {/* Main responsive image with srcset */}
      <img
        srcSet={\`
          \${smallImage} 300w,
          \${mediumImage} 600w,
          \${largeImage} 1200w
        \`}
        sizes="(max-width: 640px) 300px, (max-width: 1024px) 600px, 1200px"
        src={mediumImage}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={\`\${className} \${loaded ? 'opacity-100' : 'opacity-0'} w-full h-full object-cover transition-opacity duration-500\`}
      />
    </div>
  );
};

export default ResponsiveImage;`}
            />
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">Code Splitting Implementation</h3>
        
        <p className="mb-4 text-gray-700">
          Code splitting is a crucial technique for large applications, allowing you to load only the code needed for the current view.
        </p>
        
        <CodeBlock
          language="jsx"
          title="React Router with Code Splitting"
          code={`import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Before: Importing all components directly
// import Dashboard from './pages/Dashboard';
// import ProductList from './pages/ProductList';
// import ProductDetail from './pages/ProductDetail';
// import Checkout from './pages/Checkout';

// After: Using lazy loading for route-based code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ProductList = lazy(() => import('./pages/ProductList'));
const ProductDetail = lazy(() => 
  import('./pages/ProductDetail')
    // Add prefetch for critical chunks
    .then(module => {
      // Prefetch product reviews component
      import('./components/ProductReviews');
      return module;
    })
);
const Checkout = lazy(() => import('./pages/Checkout'));

// Preload components on hover/focus of links
const preloadComponent = (importFn) => {
  return () => {
    importFn();
  };
};

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      
      {/* Usage example for link preloading */}
      <nav>
        <a 
          href="/products"
          onMouseEnter={preloadComponent(() => import('./pages/ProductList'))}
          onFocus={preloadComponent(() => import('./pages/ProductList'))}
        >
          Products
        </a>
      </nav>
    </BrowserRouter>
  );
}`}
          description="This implementation uses React's lazy and Suspense for route-based code splitting, with added optimizations like link preloading."
        />
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">Bundle Size Reduction Methods</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold mb-2">Tree Shaking Optimization</h4>
            <CodeBlock
              language="javascript"
              title="Optimized imports for tree shaking"
              code={`// Before: Import entire library (bad)
import moment from 'moment';

// After: Use date-fns with direct imports (good)
import { format, addDays } from 'date-fns';

// Before: Import entire lodash
import _ from 'lodash';
const arr = _.uniq([1, 2, 1, 3]);

// After: Import only needed functions
import uniq from 'lodash-es/uniq';
const arr = uniq([1, 2, 1, 3]);

// Before: Import all icons
import { Icon } from 'some-icon-library';

// After: Only import needed icons
import { HomeIcon, CartIcon } from 'some-icon-library/icons';`}
            />
          </div>
          <div>
            <h4 className="font-semibold mb-2">Bundle Analysis & Optimization</h4>
            <CodeBlock
              language="javascript"
              title="Bundle analyzer configuration"
              code={`// package.json script
// "analyze": "vite build --mode analyze"

// vite.config.js
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => ({
  plugins: [
    // Only include visualizer in analyze mode
    mode === 'analyze' && visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    })
  ].filter(Boolean),
  
  // Configure optimizeDeps for better build performance
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['big-module-only-used-occasionally']
  },
  
  // Advanced build options
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs
        pure_funcs: ['console.debug'], // Remove specific functions
      }
    }
  }
}));`}
            />
          </div>
        </div>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Common Pitfall: Large Third-Party Dependencies</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>Third-party libraries often account for 70%+ of bundle size. Always check bundle impact before adding new dependencies and consider lighter alternatives.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border mb-6">
        <h4 className="font-semibold text-lg mb-2">Key Takeaways:</h4>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Use React.memo, useMemo, and useCallback to prevent unnecessary re-renders</li>
          <li>Implement virtualization for long lists</li>
          <li>Optimize images with responsive sizing, WebP format, and lazy loading</li>
          <li>Use code splitting to reduce initial bundle size</li>
          <li>Import only what you need from large packages to enable tree shaking</li>
        </ul>
      </div>
    </div>
  );
};

export default FrontendOptimization;
