interface StarRatingProps {
  rating: number | null;
  reviews: number;
}

const STAR_PATH = 'M12 2.5l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7-5.4-4.7 7.1-.6z';

function StarRow({ className }: { className: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-full w-full flex-1 fill-current">
          <path d={STAR_PATH} />
        </svg>
      ))}
    </div>
  );
}

export function StarRating({ rating, reviews }: StarRatingProps) {
  if (rating === null) {
    return <span className="text-sm text-stone-500">No ratings yet</span>;
  }

  const fillPercent = Math.max(0, Math.min(100, (rating / 5) * 100));

  return (
    <div
      role="img"
      aria-label={`${rating} out of 5 stars, ${reviews} reviews`}
      className="flex items-center gap-2"
    >
      <div className="relative h-4 w-20 shrink-0 lg:h-5 lg:w-24">
        <StarRow className="absolute inset-0 h-full w-full text-stone-300" />
        <div className="absolute inset-0 h-full overflow-hidden" style={{ width: `${fillPercent}%` }}>
          <StarRow className="h-4 w-20 text-amber-400 lg:h-5 lg:w-24" />
        </div>
      </div>
      <span className="text-sm text-stone-600">
        <span className="lg:hidden">({reviews})</span>
        <span className="hidden lg:inline">({reviews} reviews)</span>
      </span>
    </div>
  );
}
