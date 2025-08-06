// src/hooks/useProducts.ts
'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';

interface UseProductsReturn {
  products: Product[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refreshProducts: () => Promise<void>;
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/products', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setProducts(data.products);
        setLastUpdated(data.lastUpdated);
      } else {
        throw new Error(data.error || 'Error desconocido');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar productos');
      
      // Fallback: cargar productos hardcodeados
      try {
        const { products: fallbackProducts } = await import('@/lib/data');
        setProducts(fallbackProducts);
      } catch {
        // Si falla el fallback, simplemente lo ignoramos
      }
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProducts = async () => {
    await fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Extraer categorías únicas
  const categories = [
    'Todos',
    ...Array.from(new Set(products.flatMap((p) => p.model)))
  ];

  return {
    products,
    categories,
    isLoading,
    error,
    lastUpdated,
    refreshProducts,
  };
}