import { useState } from 'react';

interface ProductImageProps {
  src: string | null;
  alt: string;
}

export function ProductImage({ src, alt }: ProductImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-md bg-stone-100">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-10 w-10 text-stone-300" fill="currentColor">
          <path d="M4 5a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V7a2 2 0 00-2-2H4zm0 2h16v10H4V7zm3 2a2 2 0 100 4 2 2 0 000-4zm10 8l-4.5-6-3.5 4.5-2-2.5L5 17h12z" />
        </svg>
        <span className="sr-only">No image available</span>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-stone-100">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <svg className="h-8 w-8 animate-spin text-stone-300" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
