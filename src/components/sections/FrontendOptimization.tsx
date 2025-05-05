
import React from 'react';
import ReactPerformance from './frontend/ReactPerformance';
import AssetOptimization from './frontend/AssetOptimization';
import CodeSplitting from './frontend/CodeSplitting';
import BundleSizeReduction from './frontend/BundleSizeReduction';
import KeyTakeaways from './frontend/KeyTakeaways';

const FrontendOptimization = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">4. Frontend Optimization</h2>
      
      <ReactPerformance />
      <AssetOptimization />
      <CodeSplitting />
      <BundleSizeReduction />
      <KeyTakeaways />
    </div>
  );
};

export default FrontendOptimization;
