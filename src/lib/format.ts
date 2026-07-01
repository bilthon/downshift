const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const dateFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export function formatPrice(price: number | null): string {
  if (price === null) return 'Price unavailable';
  return currencyFormatter.format(price);
}

export function formatDate(dateMs: number): string {
  return dateFormatter.format(new Date(dateMs));
}
