import { useEffect, useState } from 'react';

export default function TestPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('http://localhost:3001/api/products?limit=50'),
          fetch('http://localhost:3001/api/categories')
        ]);
        
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        
        console.log('Products:', productsData);
        console.log('Categories:', categoriesData);
        
        setProducts(productsData.products || []);
        setCategories(categoriesData || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>API Test Page</h1>
      <p>Products loaded: {products.length}</p>
      <p>Categories loaded: {categories.length}</p>
      
      <h2>First 3 Products:</h2>
      {products.slice(0, 3).map(product => (
        <div key={product._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{product.name}</h3>
          <p>Category: {product.category}</p>
          <p>Image: {product.image}</p>
        </div>
      ))}
      
      <h2>Categories:</h2>
      {categories.map(category => (
        <div key={category._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{category.name}</h3>
          <p>ID: {category.id}</p>
        </div>
      ))}
    </div>
  );
}

