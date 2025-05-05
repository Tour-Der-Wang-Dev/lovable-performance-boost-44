import React from 'react';
import CodeBlock from "../../CodeBlock";

const AssetOptimization = () => {
  return (
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
  );
};

export default AssetOptimization;
