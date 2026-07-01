import { useEffect, useMemo, useState } from 'react';
import { useProducts } from './hooks/useProducts';
import { useDebouncedValue } from './hooks/useDebouncedValue';
import { filterProducts } from './lib/filter';
import { sortProducts, type SortKey } from './lib/sort';
import { paginate } from './lib/paginate';
import { PAGE_SIZE, DEBOUNCE_MS } from './lib/constants';
import { Toolbar } from './components/Toolbar';
import { ProductGrid } from './components/ProductGrid';
import { Pagination } from './components/Pagination';
import { LoadingSkeleton } from './components/LoadingSkeleton';

function App() {
  const { products, isLoading, error, retry } = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [hideOutOfStock, setHideOutOfStock] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('featured');
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebouncedValue(searchTerm, DEBOUNCE_MS);

  const filtered = useMemo(
    () => filterProducts(products, { searchTerm: debouncedSearch, selectedTags, hideOutOfStock }),
    [products, debouncedSearch, selectedTags, hideOutOfStock],
  );

  const sorted = useMemo(() => sortProducts(filtered, sortKey), [filtered, sortKey]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedTags, hideOutOfStock, sortKey]);

  const {
    pageItems,
    totalPages,
    currentPage: clampedPage,
  } = useMemo(() => paginate(sorted, currentPage, PAGE_SIZE), [sorted, currentPage]);

  function toggleTag(tag: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  }

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="font-display mb-6 text-3xl font-semibold text-stone-900">Downshift</h1>
        <LoadingSkeleton />
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="font-display mb-6 text-3xl font-semibold text-stone-900">Downshift</h1>
        <div className="rounded-md border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-700">{error}</p>
          <button
            type="button"
            onClick={retry}
            className="mt-4 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="font-display mb-6 text-3xl font-semibold text-stone-900">Downshift</h1>
      <Toolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedTags={selectedTags}
        onToggleTag={toggleTag}
        hideOutOfStock={hideOutOfStock}
        onHideOutOfStockChange={setHideOutOfStock}
        sortKey={sortKey}
        onSortChange={setSortKey}
      />
      {sorted.length === 0 ? (
        <p className="py-16 text-center text-stone-500">No products match your filters</p>
      ) : (
        <>
          <ProductGrid products={pageItems} />
          <Pagination currentPage={clampedPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}
    </main>
  );
}

export default App;
