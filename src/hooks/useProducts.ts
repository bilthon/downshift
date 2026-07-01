import { useCallback, useEffect, useState } from 'react';
import type { Product, RawProduct } from '../types/product';
import { normalizeProduct } from '../lib/normalize';

interface UseProductsResult {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetch('/api/items.json')
      .then((res) => {
        // fetch() does not reject on HTTP error status codes, so this must
        // be checked explicitly or a failure silently becomes an attempt to
        // parse an error page as JSON.
        if (!res.ok) throw new Error(`Failed to load products (${res.status})`);
        return res.json() as Promise<RawProduct[]>;
      })
      .then((raw) => {
        if (cancelled) return;
        setProducts(raw.map(normalizeProduct));
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Failed to load products');
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const retry = useCallback(() => setAttempt((a) => a + 1), []);

  return { products, isLoading, error, retry };
}
