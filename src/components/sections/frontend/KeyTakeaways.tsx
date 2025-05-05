
import React from 'react';

const KeyTakeaways = () => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border mb-6">
      <h4 className="font-semibold text-lg mb-2">Frontend Optimization Key Takeaways:</h4>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        <li>Use React.memo, useCallback, and useMemo to prevent unnecessary renders</li>
        <li>Implement proper image optimization with responsive images and modern formats</li>
        <li>Apply code splitting at both route and component levels</li>
        <li>Optimize bundle size through tree shaking and dependency management</li>
        <li>Use performance profiling tools to identify specific bottlenecks</li>
      </ul>
    </div>
  );
};

export default KeyTakeaways;
