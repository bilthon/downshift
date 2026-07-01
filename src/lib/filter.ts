import type { Product } from '../types/product';

export interface FilterCriteria {
  searchTerm: string;
  selectedTags: Set<string>;
  hideOutOfStock: boolean;
}

export function filterProducts(products: Product[], criteria: FilterCriteria): Product[] {
  const term = criteria.searchTerm.trim().toLowerCase();
  return products.filter((product) => {
    if (term && !product.searchIndex.includes(term)) return false;
    if (criteria.selectedTags.size > 0 && !product.tags.some((tag) => criteria.selectedTags.has(tag))) {
      return false;
    }
    if (criteria.hideOutOfStock && !product.inStock) return false;
    return true;
  });
}
