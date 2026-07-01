export interface PaginationResult<T> {
  pageItems: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export function paginate<T>(items: T[], page: number, pageSize: number): PaginationResult<T> {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageItems = items.slice(start, start + pageSize);
  return { pageItems, totalItems, totalPages, currentPage };
}
