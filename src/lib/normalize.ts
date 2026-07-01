import type { Product, RawProduct } from '../types/product';

function parsePrice(price: number | string | null): number | null {
  if (price === null) return null;
  if (typeof price === 'number') return Number.isNaN(price) ? null : price;
  const parsed = parseFloat(price.replace(/,/g, ''));
  return Number.isNaN(parsed) ? null : parsed;
}

export function normalizeProduct(raw: RawProduct): Product {
  return {
    ...raw,
    price: parsePrice(raw.price),
    releasedAtMs: Date.parse(raw.releasedAt),
    searchIndex: `${raw.title} ${raw.brand}`.toLowerCase(),
  };
}
