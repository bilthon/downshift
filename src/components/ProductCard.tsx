import { useState } from 'react';
import type { Product } from '../types/product';
import { formatPrice } from '../lib/format';
import { StarRating } from './StarRating';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      className={`flex flex-col rounded-lg border border-stone-200 bg-white p-4 ${
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
        {product.image && !imageFailed ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-stone-100">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <svg className="h-8 w-8 animate-spin text-stone-300" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              </div>
            )}
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageFailed(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        ) : (
          <div className="flex aspect-[4/3] w-full items-center justify-center rounded-md bg-stone-100">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-10 w-10 text-stone-300" fill="currentColor">
              <path d="M4 5a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V7a2 2 0 00-2-2H4zm0 2h16v10H4V7zm3 2a2 2 0 100 4 2 2 0 000-4zm10 8l-4.5-6-3.5 4.5-2-2.5L5 17h12z" />
            </svg>
            <span className="sr-only">No image available</span>
          </div>
        )}
      </div>
    </div>
  );
}
