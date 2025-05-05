
import React from 'react';
import CodeBlock from "../../CodeBlock";

const BundleSizeReduction = () => {
  return (
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
  );
};

export default BundleSizeReduction;
