import type { Product } from '../types/product';

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc' | 'newest' | 'most-reviewed';

// Nulls must always sort to the end regardless of direction, so an unknown
// price/rating never gets ranked as if it were the cheapest/lowest value.
function compareNullable(a: number | null, b: number | null, dir: 'asc' | 'desc'): number {
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  return dir === 'asc' ? a - b : b - a;
}

export function sortProducts(products: Product[], sortKey: SortKey): Product[] {
  const sorted = [...products];
  switch (sortKey) {
    case 'featured':
      return sorted.sort((a, b) => a.id - b.id);
    case 'price-asc':
      return sorted.sort((a, b) => compareNullable(a.price, b.price, 'asc'));
    case 'price-desc':
      return sorted.sort((a, b) => compareNullable(a.price, b.price, 'desc'));
    case 'rating-desc':
      return sorted.sort((a, b) => compareNullable(a.rating, b.rating, 'desc'));
    case 'newest':
      return sorted.sort((a, b) => b.releasedAtMs - a.releasedAtMs);
    case 'most-reviewed':
      return sorted.sort((a, b) => b.reviews - a.reviews);
    default:
      return sorted;
  }
}
