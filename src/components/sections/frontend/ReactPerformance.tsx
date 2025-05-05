
import React, { useMemo } from 'react';
import CodeBlock from "../../CodeBlock";
import PerformanceMetric from "../../PerformanceMetric";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";

// Sample product for the code examples - defined once outside component
const sampleProduct = {
  id: 1,
  name: "Example Product",
  price: 99.99
};

// Pure calculation function defined outside component for better reuse
const calculateDiscount = (price: number): number => {
  return price * 0.1;
};

const ReactPerformance = () => {
  // Memoize the example values to prevent recalculation on re-renders
  const exampleProduct = useMemo(() => sampleProduct, []);
  const exampleDiscount = useMemo(() => calculateDiscount(sampleProduct.price), []);

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
      
      <Collapsible>
        <CollapsibleTrigger className="flex items-center w-full text-left font-semibold px-4 py-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors mb-2">
          <Checkbox id="memoization" className="mr-2" />
          <label htmlFor="memoization" className="cursor-pointer flex-1">Memoization to Prevent Re-renders</label>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-semibold mb-2">Before: Inefficient component</h4>
              <CodeBlock
                language="jsx"
                title="Before: Inefficient component"
                code={`// Before: Component re-renders on every parent update
function ProductItem({ product, onAddToCart }) {
  console.log('ProductItem rendering');
  
  // Expensive calculation runs on every render
  const discount = calculateDiscount(${exampleProduct.price});
  
  // New function created on every render
  const handleAddToCart = () => {
    onAddToCart(${exampleProduct.id});
  };
  
  return (
    <div className="product-card">
      <h3>${exampleProduct.name}</h3>
      <p>$${exampleProduct.price}</p>
      <p>Discount: $${exampleDiscount}</p>
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
    return calculateDiscount(${exampleProduct.price});
  }, [${exampleProduct.price}]);
  
  // Memoize event handler
  const handleAddToCart = useCallback(() => {
    onAddToCart(${exampleProduct.id});
  }, [${exampleProduct.id}, onAddToCart]);
  
  return (
    <div className="product-card">
      <h3>${exampleProduct.name}</h3>
      <p>$${exampleProduct.price}</p>
      <p>Discount: $${exampleDiscount}</p>
      <button onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
});`}
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Collapsible>
        <CollapsibleTrigger className="flex items-center w-full text-left font-semibold px-4 py-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors mb-2">
          <Checkbox id="virtualization" className="mr-2" />
          <label htmlFor="virtualization" className="cursor-pointer flex-1">Virtual List for Large Data Sets</label>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mb-6">
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
        </CollapsibleContent>
      </Collapsible>
      
      <Collapsible>
        <CollapsibleTrigger className="flex items-center w-full text-left font-semibold px-4 py-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors mb-2">
          <Checkbox id="debouncing" className="mr-2" />
          <label htmlFor="debouncing" className="cursor-pointer flex-1">Debouncing Expensive Operations</label>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mb-6">
            <CodeBlock
              language="jsx"
              title="debounced-search.jsx"
              code={`import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash-es';

// Before: Search performs on every keystroke
// function SearchComponent() {
//   const [query, setQuery] = useState('');
//   
//   const handleChange = (e) => {
//     setQuery(e.target.value);
//     searchProducts(e.target.value); // Executes on every keystroke
//   };
// 
//   return (
//     <input
//       type="text"
//       value={query}
//       onChange={handleChange}
//       placeholder="Search products..."
//     />
//   );
// }

// After: Debounced search only executes after typing pause
function SearchComponent() {
  const [query, setQuery] = useState('');
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      console.log('Searching for:', searchTerm);
      // Actual search function call
    }, 300),
    [] // Empty dependency array creates this only once
  );
  
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleChange}
      placeholder="Search products..."
    />
  );
}`}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ReactPerformance;
