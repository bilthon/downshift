import { useCallback, useRef, useState } from 'react';
import type { Product } from '../types/product';
import { formatPrice } from '../lib/format';
import { StarRating } from './StarRating';
import { ProductImage } from './ProductImage';
import { ProductDialog } from './ProductDialog';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
    triggerRef.current?.focus();
  }, []);

  return (
    <div
      className={`relative flex flex-col rounded-lg border border-stone-200 bg-white p-4 transition-shadow has-[:hover]:shadow-md has-[:focus-visible]:shadow-md ${
        product.inStock ? '' : 'grayscale opacity-60'
      }`}
    >
      <h3 className="font-display line-clamp-2 text-lg font-semibold text-stone-900">{product.title}</h3>
      {product.description && <p className="mt-2 line-clamp-2 text-sm text-stone-600">{product.description}</p>}
      <div className="mt-3">
        <StarRating rating={product.rating} reviews={product.reviews} />
      </div>
      <p className="mt-2 text-sm font-medium text-stone-900">{formatPrice(product.price)}</p>
      <div className="relative mt-auto pt-4">
        {!product.inStock && (
          <span className="absolute left-2 top-6 z-10 rounded-full bg-stone-900 px-2 py-1 text-xs font-medium text-white">
            Out of stock
          </span>
        )}
        <ProductImage src={product.image} alt={product.title} />
      </div>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsDialogOpen(true)}
        aria-label={`View details for ${product.title}`}
        className="absolute inset-0 z-20 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
      />
      <ProductDialog product={product} isOpen={isDialogOpen} onClose={closeDialog} />
    </div>
  );
}
