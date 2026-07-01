const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export function formatPrice(price: number | null): string {
  if (price === null) return 'Price unavailable';
  return currencyFormatter.format(price);
}
