
import CodeBlock from "../CodeBlock";
import PerformanceMetric from "../PerformanceMetric";

const PerformanceFundamentals = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">1. Performance Fundamentals</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">Core Web Vitals Targets</h3>
        <p className="mb-4 text-gray-700">
          Core Web Vitals are a set of specific factors that Google considers important in a webpage's overall user experience. Meeting these targets is crucial for SEO ranking and user satisfaction.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <PerformanceMetric
            title="Largest Contentful Paint (LCP)"
            beforeValue={3.8}
            afterValue={1.9}
            unit="s"
            target={2.5}
            improvedIsBetter={true}
          />
          <PerformanceMetric
            title="First Input Delay (FID)"
            beforeValue={180}
            afterValue={75}
            unit="ms"
            target={100}
            improvedIsBetter={true}
          />
          <PerformanceMetric
            title="Cumulative Layout Shift (CLS)"
            beforeValue={0.25}
            afterValue={0.08}
            unit=""
            target={0.1}
            improvedIsBetter={true}
          />
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">Business Impact Metrics</h3>
        <p className="mb-4 text-gray-700">
          Performance optimization directly impacts business outcomes. Studies show significant correlation between page load time and conversion rates.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <PerformanceMetric
            title="Conversion Rate"
            beforeValue={2.4}
            afterValue={3.7}
            unit="%"
            improvedIsBetter={false}
          />
          <PerformanceMetric
            title="Bounce Rate"
            beforeValue={58}
            afterValue={31}
            unit="%"
            improvedIsBetter={true}
          />
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">Monitoring Setup Instructions</h3>
        
        <p className="mb-4 text-gray-700">
          Implement performance monitoring with Lighthouse CI to track metrics over time and get alerts when performance degrades.
        </p>
        
        <CodeBlock
          language="javascript"
          title="lighthouse-ci-config.js"
          code={`module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      url: ['http://localhost:3000/', 'http://localhost:3000/dashboard'],
      numberOfRuns: 3,
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      assertions: {
        'categories:performance': ['error', {minScore: 0.9}],
        'largest-contentful-paint': ['error', {maxNumericValue: 2500}],
        'cumulative-layout-shift': ['error', {maxNumericValue: 0.1}],
        'first-contentful-paint': ['error', {maxNumericValue: 1800}],
      },
    },
  },
};`}
          description="Add this configuration file to your project to set up Lighthouse CI with threshold assertions."
        />
        
        <div className="mt-6 mb-4">
          <h4 className="font-semibold text-lg mb-2">Integration Steps:</h4>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>Install Lighthouse CI: <code className="bg-gray-100 px-1 py-0.5 rounded">npm install -g @lhci/cli</code></li>
            <li>Add the config file to your project root</li>
            <li>Add to your CI pipeline with: <code className="bg-gray-100 px-1 py-0.5 rounded">lhci autorun</code></li>
            <li>Configure notifications via webhook to your team chat</li>
          </ol>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">Troubleshooting Common Issues</h3>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Common Pitfall: Unoptimized Images</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>Large uncompressed images are the most common cause of poor LCP scores. Ensure all images are properly sized, compressed, and use modern formats like WebP.</p>
              </div>
            </div>
          </div>
        </div>
        
        <CodeBlock
          language="javascript"
          title="image-optimization.js"
          code={`// Using a modern image component that handles optimization
import { Image } from 'your-image-component-library';

// Before: Regular img tag with unoptimized image
// <img src="/large-hero-image.jpg" alt="Hero" className="hero-image" />

// After: Optimized implementation
export const OptimizedHeroImage = () => {
  return (
    <Image
      src="/large-hero-image.jpg" 
      alt="Hero"
      width={1200}
      height={600}
      loading="eager" // Important for LCP images
      priority={true}  // This is the LCP element
      quality={85}     // Balance between quality and size
      formats={["webp", "jpeg"]} // Use modern formats with fallbacks
    />
  );
}`}
          description="Replace standard <img> tags with optimized image components for automatic resizing, format selection, and lazy loading."
        />
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border mb-6">
        <h4 className="font-semibold text-lg mb-2">Key Takeaways:</h4>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Core Web Vitals are critical for both UX and SEO</li>
          <li>Establish continuous monitoring from day one</li>
          <li>Performance has a direct impact on business metrics</li>
          <li>Prioritize optimizations based on largest potential gains</li>
        </ul>
      </div>
    </div>
  );
};

export default PerformanceFundamentals;
