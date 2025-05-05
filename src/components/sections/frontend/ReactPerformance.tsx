
import React from 'react';
import CodeBlock from "../../CodeBlock";
import PerformanceMetric from "../../PerformanceMetric";

// Sample product for the code examples
const sampleProduct = {
  id: 1,
  name: "Example Product",
  price: 99.99
};

const ReactPerformance = () => {
  // Define discount calculation function used in examples
  const calculateDiscount = (price: number) => {
    return price * 0.1; // Sample discount calculation
  };

  // Define product and discount variables used in the virtualized list example
  const exampleProduct = sampleProduct;
  const exampleDiscount = calculateDiscount(sampleProduct.price);

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-orange-600">React Performance Techniques</h3>
      <p className="mb-4 text-gray-700">
        React applications can suffer from unnecessary re-renders, memory leaks, and inefficient component structures. The following techniques can dramatically improve React application performance.
      </p>
      
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <PerformanceMetric
          title="First Contentful Paint"
          beforeValue={1.8}
          afterValue={0.9}
          unit="s"
          target={1.0}
          improvedIsBetter={true}
        />
        <PerformanceMetric
          title="Time to Interactive"
          beforeValue={4.2}
          afterValue={1.7}
          unit="s"
          target={2.0}
          improvedIsBetter={true}
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="font-semibold mb-2">Memoization to Prevent Re-renders</h4>
          <CodeBlock
            language="jsx"
            title="Before: Inefficient component"
            code={`// Before: Component re-renders on every parent update
function ProductItem({ product, onAddToCart }) {
  console.log('ProductItem rendering');
  
  // Expensive calculation runs on every render
  const discount = calculateDiscount(product.price);
  
  // New function created on every render
  const handleAddToCart = () => {
    onAddToCart(product.id);
  };
  
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <p>Discount: ${discount}</p>
      <button onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}`}
          />
        </div>
        <div>
          <h4 className="font-semibold mb-2">With Memoization Applied</h4>
          <CodeBlock
            language="jsx"
            title="After: Optimized with memoization"
            code={`import React, { useMemo, useCallback } from 'react';

// After: Component only re-renders when props change
const ProductItem = React.memo(function ProductItem({ 
  product, 
  onAddToCart 
}) {
  console.log('ProductItem rendering');
  
  // Memoize expensive calculation
  const discount = useMemo(() => {
    console.log('Calculating discount');
    return calculateDiscount(product.price);
  }, [product.price]);
  
  // Memoize event handler
  const handleAddToCart = useCallback(() => {
    onAddToCart(product.id);
  }, [product.id, onAddToCart]);
  
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <p>Discount: ${discount}</p>
      <button onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
});`}
          />
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Virtual List for Large Data Sets</h4>
        <CodeBlock
          language="jsx"
          title="virtualized-list.jsx"
          code={`import React from 'react';
import { FixedSizeList } from 'react-window';

// Before: Rendering all items at once
// function ProductList({ products }) {
//   return (
//     <div className="product-list">
//       {products.map(product => (
//         <ProductItem key={product.id} product={product} />
//       ))}
//     </div>
//   );
// }

// After: Using virtualization for better performance
function ProductList({ products }) {
  // Only render items that are visible in the viewport
  const Row = ({ index, style }) => {
    const product = products[index];
    return (
      <div style={style}>
        <ProductItem product={exampleProduct} />
      </div>
    );
  };

  return (
    <FixedSizeList
      height={500}
      width="100%"
      itemCount={products.length}
      itemSize={80}
    >
      {Row}
    </FixedSizeList>
  );
}`}
        />
      </div>
    </div>
  );
};

export default ReactPerformance;
