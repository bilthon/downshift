interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const iconProps = {
  viewBox: '0 0 20 20',
  className: 'h-4 w-4',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function FirstPageIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M13 15L8 10L13 5" />
      <path d="M6 5V15" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M12.5 15L7.5 10L12.5 5" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M7.5 5L12.5 10L7.5 15" />
    </svg>
  );
}

function LastPageIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M7 5L12 10L7 15" />
      <path d="M14 5V15" />
    </svg>
  );
}

const buttonClass =
  'rounded-md border border-stone-300 p-1.5 text-stone-700 disabled:cursor-not-allowed disabled:opacity-40';

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        type="button"
        aria-label="First page"
        onClick={() => onPageChange(1)}
        disabled={isFirst}
        className={buttonClass}
      >
        <FirstPageIcon />
      </button>
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirst}
        className={buttonClass}
      >
        <ChevronLeftIcon />
      </button>
      <span className="px-2 text-sm text-stone-600">
        Page {currentPage} of {totalPages}
      </span>
      <button
        type="button"
        aria-label="Next page"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLast}
        className={buttonClass}
      >
        <ChevronRightIcon />
      </button>
      <button
        type="button"
        aria-label="Last page"
        onClick={() => onPageChange(totalPages)}
        disabled={isLast}
        className={buttonClass}
      >
        <LastPageIcon />
      </button>
    </div>
  );
}
