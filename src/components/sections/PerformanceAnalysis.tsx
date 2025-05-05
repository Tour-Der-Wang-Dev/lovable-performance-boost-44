
import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import CodeBlock from "../CodeBlock";

const PerformanceAnalysis = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Performance Analysis Report</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">Top 5 Performance Bottlenecks</h3>
        
        <Accordion type="single" collapsible className="mb-6">
          <AccordionItem value="bottleneck-1">
            <AccordionTrigger className="text-lg font-medium">
              1. Inefficient React Rendering Patterns
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 p-2">
                <p className="text-gray-700">
                  The application contains components that re-render unnecessarily due to lack of memoization and poor prop management.
                  This creates a cascading effect where parent component updates cause all children to re-render regardless of whether
                  their props changed.
                </p>
                <div className="bg-orange-50 border-l-4 border-orange-500 p-3">
                  <h4 className="font-semibold">Recommendation:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Implement React.memo() for pure functional components</li>
                    <li>Use useMemo() for expensive calculations</li>
                    <li>Employ useCallback() for function references passed as props</li>
                    <li>Restructure component tree to minimize re-renders</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="bottleneck-2">
            <AccordionTrigger className="text-lg font-medium">
              2. Unoptimized Database Queries
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 p-2">
                <p className="text-gray-700">
                  Analysis of the database interactions reveals several inefficient query patterns, including N+1 query issues,
                  missing indexes on frequently queried columns, and retrieving unnecessary data.
                </p>
                <div className="bg-orange-50 border-l-4 border-orange-500 p-3">
                  <h4 className="font-semibold">Recommendation:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Implement proper indexes on frequently queried columns</li>
                    <li>Replace repeated small queries with bulk operations</li>
                    <li>Use query optimization techniques like JOIN vs. subqueries appropriately</li>
                    <li>Select only needed columns instead of using SELECT *</li>
                    <li>Implement query caching for frequently accessed, rarely changing data</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="bottleneck-3">
            <AccordionTrigger className="text-lg font-medium">
              3. Large Bundle Size
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 p-2">
                <p className="text-gray-700">
                  The JavaScript bundle is unnecessarily large (4.2MB), leading to longer load times and time-to-interactive metrics.
                  Several large dependencies are being imported in their entirety when only specific functions are needed.
                </p>
                <div className="bg-orange-50 border-l-4 border-orange-500 p-3">
                  <h4 className="font-semibold">Recommendation:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Implement code splitting with React.lazy() and Suspense</li>
                    <li>Convert to tree-shakeable imports (import specific functions instead of entire libraries)</li>
                    <li>Set up bundle analysis with tools like Webpack Bundle Analyzer</li>
                    <li>Replace heavy dependencies with lighter alternatives where possible</li>
                    <li>Configure proper chunking strategies in the build system</li>
                  </ul>
                </div>
                
                <CodeBlock
                  language="javascript"
                  title="Tree-shakeable imports example"
                  code={`// Before - importing entire library
import lodash from 'lodash';
const result = lodash.debounce(myFunction, 300);

// After - importing only what's needed
import debounce from 'lodash/debounce';
const result = debounce(myFunction, 300);`}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="bottleneck-4">
            <AccordionTrigger className="text-lg font-medium">
              4. Unoptimized Asset Loading
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 p-2">
                <p className="text-gray-700">
                  Images and other assets are not properly sized, optimized, or lazy-loaded. Several large images are loaded on initial page
                  render even when they're not immediately visible to the user, impacting LCP (Largest Contentful Paint).
                </p>
                <div className="bg-orange-50 border-l-4 border-orange-500 p-3">
                  <h4 className="font-semibold">Recommendation:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Implement responsive images with srcset and size attributes</li>
                    <li>Convert images to modern formats (WebP/AVIF) with fallbacks</li>
                    <li>Apply proper image compression without quality loss</li>
                    <li>Implement lazy loading for below-the-fold images</li>
                    <li>Use proper CDN caching strategies</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="bottleneck-5">
            <AccordionTrigger className="text-lg font-medium">
              5. Inefficient State Management
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 p-2">
                <p className="text-gray-700">
                  The application uses global state for data that could be more efficiently managed locally. Some components fetch
                  the same data multiple times or store redundant information, leading to unnecessary network requests and memory usage.
                </p>
                <div className="bg-orange-50 border-l-4 border-orange-500 p-3">
                  <h4 className="font-semibold">Recommendation:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Implement proper data caching with TanStack Query</li>
                    <li>Normalize complex state structures</li>
                    <li>Use context selectors to prevent unnecessary re-renders</li>
                    <li>Implement optimistic updates for common operations</li>
                    <li>Separate UI state from server state in management approach</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">Implementation Plan</h3>
        
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h4 className="font-medium text-lg">Step-by-Step Optimization Roadmap</h4>
          </div>
          <div className="p-4">
            <ol className="space-y-6">
              <li className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <span className="bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded">Phase 1</span>
                  <h5 className="text-lg font-semibold">Performance Measurement &amp; Baseline</h5>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 mb-2">
                  <li>Set up Lighthouse CI for automated performance testing</li>
                  <li>Implement Web Vitals tracking in production</li>
                  <li>Create performance budget based on current metrics</li>
                  <li>Set up React Profiler for component rendering analysis</li>
                </ul>
                <p className="text-sm text-gray-500">Estimated time: 1-2 days</p>
              </li>
              
              <li className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <span className="bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded">Phase 2</span>
                  <h5 className="text-lg font-semibold">React Rendering Optimization</h5>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 mb-2">
                  <li>Audit and profile component re-renders</li>
                  <li>Apply memoization techniques to pure components</li>
                  <li>Optimize state management to prevent unnecessary updates</li>
                  <li>Refactor prop drilling with Context API where appropriate</li>
                  <li>Implement virtualization for long lists</li>
                </ul>
                <p className="text-sm text-gray-500">Estimated time: 3-5 days</p>
              </li>
              
              <li className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <span className="bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded">Phase 3</span>
                  <h5 className="text-lg font-semibold">Database &amp; API Optimization</h5>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 mb-2">
                  <li>Analyze slow queries using database monitoring tools</li>
                  <li>Implement necessary indexes based on query patterns</li>
                  <li>Optimize ORM usage and query construction</li>
                  <li>Implement proper data caching with TanStack Query</li>
                  <li>Consolidate API calls and implement request batching</li>
                </ul>
                <p className="text-sm text-gray-500">Estimated time: 3-4 days</p>
              </li>
              
              <li className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <span className="bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded">Phase 4</span>
                  <h5 className="text-lg font-semibold">Bundle Size Reduction</h5>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 mb-2">
                  <li>Set up bundle analyzer and identify large packages</li>
                  <li>Implement code splitting with React.lazy() and dynamic imports</li>
                  <li>Convert to tree-shakeable imports</li>
                  <li>Remove unused dependencies and code</li>
                  <li>Optimize build configuration for production</li>
                </ul>
                <p className="text-sm text-gray-500">Estimated time: 2-3 days</p>
              </li>
              
              <li>
                <div className="flex items-center mb-2">
                  <span className="bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded">Phase 5</span>
                  <h5 className="text-lg font-semibold">Asset Optimization &amp; Final Tuning</h5>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 mb-2">
                  <li>Optimize and compress images with modern formats</li>
                  <li>Implement responsive images and lazy loading</li>
                  <li>Set up proper caching strategies for static assets</li>
                  <li>Final performance testing and benchmarking</li>
                  <li>Document optimization strategies for future development</li>
                </ul>
                <p className="text-sm text-gray-500">Estimated time: 2-3 days</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border mb-6">
        <h4 className="font-semibold text-lg mb-2">Expected Outcomes:</h4>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>50-70% reduction in initial page load time</li>
          <li>90% decrease in unnecessary component re-renders</li>
          <li>30-50% reduction in database query time</li>
          <li>40-60% reduction in JavaScript bundle size</li>
          <li>Improved Core Web Vitals scores across all metrics</li>
        </ul>
      </div>
    </div>
  );
};

export default PerformanceAnalysis;
