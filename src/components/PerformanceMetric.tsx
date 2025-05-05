
import { Progress } from "@/components/ui/progress";

interface PerformanceMetricProps {
  title: string;
  beforeValue: number;
  afterValue: number;
  unit: string;
  target?: number;
  improvedIsBetter?: boolean;
}

const PerformanceMetric = ({
  title,
  beforeValue,
  afterValue,
  unit,
  target,
  improvedIsBetter = true,
}: PerformanceMetricProps) => {
  // Calculate the improvement percentage
  const improvement = improvedIsBetter
    ? ((beforeValue - afterValue) / beforeValue) * 100
    : ((afterValue - beforeValue) / beforeValue) * 100;
  
  // Determine if target is met (if provided)
  const targetMet = target
    ? improvedIsBetter 
      ? afterValue <= target
      : afterValue >= target
    : null;
  
  // Format value display with unit
  const formatValue = (value: number) => `${value}${unit}`;
  
  return (
    <div className="bg-white border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-gray-700">{title}</h3>
        {targetMet !== null && (
          <span className={`text-xs px-2.5 py-0.5 rounded ${targetMet ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {targetMet ? 'Target Met' : 'Target Not Met'}
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 p-3 rounded border">
          <div className="text-sm text-gray-500 mb-1">Before</div>
          <div className="text-xl font-semibold">{formatValue(beforeValue)}</div>
        </div>
        <div className="bg-orange-50 p-3 rounded border border-orange-100">
          <div className="text-sm text-orange-600 mb-1">After</div>
          <div className="text-xl font-semibold text-orange-700">{formatValue(afterValue)}</div>
        </div>
      </div>
      
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-gray-600">Improvement</span>
        {target && <span className="text-gray-600">Target: {formatValue(target)}</span>}
      </div>
      
      <Progress
        value={Math.min(improvement, 100)}
        className="h-2 bg-gray-100"
      />
      
      <div className="mt-1 text-sm font-medium text-right">
        {improvement > 0 ? (
          <span className="text-green-600">+{improvement.toFixed(1)}%</span>
        ) : (
          <span className="text-red-600">{improvement.toFixed(1)}%</span>
        )}
      </div>
    </div>
  );
};

export default PerformanceMetric;
