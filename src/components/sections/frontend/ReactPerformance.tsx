
import React from 'react';
import CodeBlock from "../../CodeBlock";

const ReactPerformance = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-orange-600">React Component Optimization</h3>
      
      <p className="mb-4 text-gray-700">
        React applications often suffer from unnecessary re-renders and inefficient component design.
        Implementing the following optimization techniques can significantly improve performance.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-semibold mb-2">React.memo for Pure Components</h4>
          <CodeBlock
            language="jsx"
            title="Using React.memo"
            code={`// Before optimization
function ProductItem({ product, onAddToCart }) {
  console.log('ProductItem rendering');
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>\${product.price}</p>
      <button onClick={() => onAddToCart(product.id)}>
        Add to Cart
      </button>
    </div>
  );
}

// After optimization with React.memo
const ProductItem = React.memo(function ProductItem({ 
  product, 
  onAddToCart 
}) {
  console.log('ProductItem rendering');
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>\${product.price}</p>
      <button onClick={() => onAddToCart(product.id)}>
        Add to Cart
      </button>
    </div>
  );
});`}
          />
        </div>
        
        <div>
          <h4 className="font-semibold mb-2">useCallback for Event Handlers</h4>
          <CodeBlock
            language="jsx"
            title="Using useCallback"
            code={`// Before optimization
function ProductList() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  
  // This function is recreated on every render
  const handleAddToCart = (productId) => {
    setCart(prevCart => [...prevCart, productId]);
  };
  
  return (
    <div>
      {products.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart} // Causes re-renders
        />
      ))}
    </div>
  );
}

// After optimization with useCallback
function ProductList() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  
  // Function reference is stable between renders
  const handleAddToCart = useCallback((productId) => {
    setCart(prevCart => [...prevCart, productId]);
  }, []);
  
  return (
    <div>
      {products.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart} // Same reference
        />
      ))}
    </div>
  );
}`}
          />
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="font-semibold mb-2">useMemo for Expensive Calculations</h4>
        <CodeBlock
          language="jsx"
          title="Using useMemo"
          code={`// Before optimization
function ProductFilterSort({ products, filters, sortKey }) {
  // Expensive operations run on every render
  const filteredProducts = products.filter(product => 
    Object.entries(filters).every(([key, value]) => 
      product[key] === value
    )
  );
  
  const sortedProducts = [...filteredProducts].sort((a, b) => 
    a[sortKey] > b[sortKey] ? 1 : -1
  );
  
  return (
    <div>
      {sortedProducts.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

// After optimization with useMemo
function ProductFilterSort({ products, filters, sortKey }) {
  // Results are memoized and only recalculated when dependencies change
  const filteredProducts = useMemo(() => 
    products.filter(product => 
      Object.entries(filters).every(([key, value]) => 
        product[key] === value
      )
    ),
    [products, filters]
  );
  
  const sortedProducts = useMemo(() => 
    [...filteredProducts].sort((a, b) => 
      a[sortKey] > b[sortKey] ? 1 : -1
    ),
    [filteredProducts, sortKey]
  );
  
  return (
    <div>
      {sortedProducts.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}`}
        />
      </div>
    </div>
  );
};

export default ReactPerformance;
