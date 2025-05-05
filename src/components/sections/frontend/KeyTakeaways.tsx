
import React from 'react';

const KeyTakeaways = () => {
  return (
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
  );
};

export default KeyTakeaways;
