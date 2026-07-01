import type { CSSProperties } from 'react';
import type { Product } from '../types/product';
import { ProductCard } from './ProductCard';
import { CARD_REVEAL_STAGGER_MS } from '../lib/constants';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      style={{ '--stagger-time': `${CARD_REVEAL_STAGGER_MS}ms` } as CSSProperties}
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} style={{ '--sibling-index': index + 1 } as CSSProperties} />
      ))}
    </div>
  );
}
