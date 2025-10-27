import { useState, useEffect, useCallback } from 'react';
import apiService from '../utils/api';

export const useProducts = (params = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (fetchParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      // Default to higher limit for better UX
      const defaultParams = { limit: 100, ...params, ...fetchParams };
      const data = await apiService.getProducts(defaultParams);
      // Normalize API response (supports both {products: [...]} and [...])
      const normalized = Array.isArray(data) ? data : (data?.products || []);
      setProducts(normalized);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError(err.message || 'Failed to fetch products');
      // Fallback to empty array to prevent crashes
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
};

export const useProduct = (slug) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getProduct(slug);
        setProduct(data);
        // console.log(data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError(err.message || 'Failed to fetch product');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  return {
    product,
    loading,
    error,
  };
};

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getCategories();
        setCategories(data.categories || data || []);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError(err.message || 'Failed to fetch categories');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
  };
};
