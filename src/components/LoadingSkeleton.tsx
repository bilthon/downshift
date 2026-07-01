import { PAGE_SIZE } from '../lib/constants';

export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: PAGE_SIZE }, (_, i) => (
        <div key={i} className="animate-pulse rounded-lg border border-stone-200 bg-white p-4">
          <div className="h-5 w-3/4 rounded bg-stone-200" />
          <div className="mt-3 h-3 w-full rounded bg-stone-200" />
          <div className="mt-2 h-3 w-2/3 rounded bg-stone-200" />
          <div className="mt-4 h-4 w-1/3 rounded bg-stone-200" />
          <div className="mt-4 aspect-[4/3] w-full rounded-md bg-stone-200" />
        </div>
      ))}
    </div>
  );
}
