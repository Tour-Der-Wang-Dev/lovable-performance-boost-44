
import React from 'react';
import CodeBlock from "../../CodeBlock";

const CodeSplitting = () => {
  return (
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
  );
};

export default CodeSplitting;
