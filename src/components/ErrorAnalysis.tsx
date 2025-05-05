
import React from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import CodeBlock from "./CodeBlock";

interface ErrorLogEntry {
  id: number;
  timestamp: string;
  message: string;
  stackTrace: string;
  component: string;
  severity: 'error' | 'warning' | 'info';
}

interface ErrorAnalysisProps {
  errorId?: number;
  logLevel?: "error" | "info";
  startTime?: Date;
}

const ErrorAnalysis = ({ errorId, logLevel = "error", startTime }: ErrorAnalysisProps) => {
  // Sample error log entries for demonstration
  const sampleLogs: ErrorLogEntry[] = [
    {
      id: 1,
      timestamp: '2025-05-05T10:15:32Z',
      message: 'Cannot read property \'name\' of undefined',
      stackTrace: 'at ProductItem (ReactPerformance.tsx:70)\nat Row (ReactPerformance.tsx:108)',
      component: 'ReactPerformance',
      severity: 'error'
    },
    {
      id: 2,
      timestamp: '2025-05-05T10:15:31Z',
      message: 'Uncaught TypeError: discount is not defined',
      stackTrace: 'at ProductItem (ReactPerformance.tsx:71)\nat renderWithHooks (react-dom.development.js:16305)',
      component: 'ReactPerformance',
      severity: 'error'
    },
    {
      id: 3,
      timestamp: '2025-05-05T10:14:59Z',
      message: 'Warning: Failed prop type: The prop `data` is marked as required in `Chart`, but its value is `undefined`',
      stackTrace: 'at checkPropTypes (checkPropTypes.js:19)',
      component: 'PerformanceMetric',
      severity: 'warning'
    },
  ];
  
  // Filter logs based on props
  const filteredLogs = sampleLogs
    .filter(log => !errorId || log.id === errorId)
    .filter(log => log.severity === logLevel)
    .filter(log => !startTime || new Date(log.timestamp) >= startTime);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Error Analysis Report</h2>
      
      <Tabs defaultValue="errors" className="mb-6">
        <TabsList>
          <TabsTrigger value="errors">Error Logs</TabsTrigger>
          <TabsTrigger value="trace">Call Stack Analysis</TabsTrigger>
          <TabsTrigger value="dependencies">Dependency Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="errors">
          <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h3 className="font-medium text-lg">Log Entries</h3>
              <p className="text-sm text-gray-500">
                Showing {filteredLogs.length} of {sampleLogs.length} entries
                {errorId ? ` for error ID: ${errorId}` : ''}
                {logLevel ? ` with log level: ${logLevel}` : ''}
                {startTime ? ` since: ${startTime.toISOString()}` : ''}
              </p>
            </div>
            
            <div className="divide-y">
              {filteredLogs.map((log) => (
                <div key={log.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className={`inline-flex items-center px-2 py-1 me-2 text-xs font-medium rounded-full ${
                        log.severity === 'error' 
                          ? 'bg-red-100 text-red-800' 
                          : log.severity === 'warning'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                      }`}>
                        {log.severity}
                      </span>
                      <span className="font-medium">{log.component}</span>
                    </div>
                    <span className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="mb-2">{log.message}</p>
                  <div className="bg-gray-50 p-2 rounded text-xs font-mono whitespace-pre-wrap">
                    {log.stackTrace}
                  </div>
                </div>
              ))}
              
              {filteredLogs.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No error logs matching the current filters
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="trace">
          <div className="bg-white border rounded-lg shadow-sm overflow-hidden mb-4">
            <div className="p-4 bg-gray-50 border-b">
              <h3 className="font-medium text-lg">Call Stack Analysis</h3>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <h4 className="font-medium mb-2">Function Call Sequence</h4>
                <div className="bg-gray-50 p-3 rounded border">
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      <span className="font-mono">ReactDOM.render</span> calls 
                      <span className="font-mono bg-yellow-100 mx-1 px-1">App</span> component
                    </li>
                    <li>
                      <span className="font-mono">App</span> renders 
                      <span className="font-mono">Index</span> component
                    </li>
                    <li>
                      <span className="font-mono">Index</span> renders 
                      <span className="font-mono">FrontendOptimization</span> component
                    </li>
                    <li>
                      <span className="font-mono">FrontendOptimization</span> renders 
                      <span className="font-mono bg-yellow-100 mx-1 px-1">ReactPerformance</span> component
                    </li>
                    <li>
                      <span className="font-mono bg-yellow-100 mx-1 px-1">ReactPerformance</span> renders 
                      example code that references undefined variables
                      <span className="font-mono bg-red-100 mx-1 px-1">product</span> and 
                      <span className="font-mono bg-red-100 mx-1 px-1">discount</span>
                    </li>
                  </ol>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Variable Assignment Trace</h4>
                <div className="bg-gray-50 p-3 rounded border">
                  <CodeBlock
                    language="typescript"
                    title="Variable Flow Analysis"
                    code={`// ReactPerformance.tsx
// Defined outside component
const sampleProduct = {
  id: 1,
  name: "Example Product",
  price: 99.99
};

// Used inside component
const ReactPerformance = () => {
  // Not defined correctly:
  // Missing 'exampleProduct' and 'exampleDiscount' variables
  
  // Referenced in code blocks:
  // product - Undefined
  // discount - Undefined
}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="dependencies">
          <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h3 className="font-medium text-lg">Dependency Analysis</h3>
            </div>
            <div className="p-4">
              <div className="mb-6">
                <h4 className="font-medium mb-2">Outdated Dependencies</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latest</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">react-window</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">1.8.7</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">1.8.9</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Update Available
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">lodash-es</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">4.17.20</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">4.17.21</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Update Available
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">@tanstack/react-query</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">5.56.2</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">5.56.2</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Up to date
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Missing Dependencies</h4>
                <div className="bg-gray-50 p-3 rounded border">
                  <p className="text-sm mb-2">These imports are used but not installed:</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li><span className="font-mono">react-window</span> - Required for virtualization example</li>
                    <li><span className="font-mono">lodash-es</span> - Required for debouncing example</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Potential Conflicts</h4>
                <div className="bg-gray-50 p-3 rounded border">
                  <p className="text-sm">No package conflicts detected.</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">Root Cause Analysis</h3>
        
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="p-4">
            <h4 className="font-semibold mb-3">Primary Causes of Errors</h4>
            <ol className="list-decimal pl-5 space-y-4">
              <li>
                <p className="font-medium">Missing Variable Definitions</p>
                <div className="mt-1 text-sm text-gray-600">
                  Variables <code>product</code> and <code>discount</code> are referenced in code blocks but not properly defined 
                  in the component. The component needs to create and use <code>exampleProduct</code> and <code>exampleDiscount</code> 
                  variables.
                </div>
              </li>
              <li>
                <p className="font-medium">Dependencies Not Installed</p>
                <div className="mt-1 text-sm text-gray-600">
                  Code examples reference packages that are not installed in the project, including <code>react-window</code> 
                  and <code>lodash-es</code>. These are currently used in code examples but not installed.
                </div>
              </li>
              <li>
                <p className="font-medium">TypeScript Type Safety Violations</p>
                <div className="mt-1 text-sm text-gray-600">
                  The component uses variables without proper TypeScript declarations, leading to type checking failures during build.
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border mb-6">
        <h4 className="font-semibold text-lg mb-2">Recommended Fixes:</h4>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Properly define <code>exampleProduct</code> and <code>exampleDiscount</code> variables in the component</li>
          <li>Install missing dependencies: <code>react-window</code> and <code>lodash-es</code></li>
          <li>Update outdated dependencies to their latest versions</li>
          <li>Add proper TypeScript types for all variables and function parameters</li>
          <li>Implement proper error boundaries to prevent cascading failures</li>
        </ul>
      </div>
    </div>
  );
};

export default ErrorAnalysis;
