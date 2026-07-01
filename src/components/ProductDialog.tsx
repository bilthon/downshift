import { useEffect, useId, useRef } from 'react';
import type { Product } from '../types/product';
import { formatDate, formatPrice } from '../lib/format';
import { StarRating } from './StarRating';
import { ProductImage } from './ProductImage';

interface ProductDialogProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDialog({ product, isOpen, onClose }: ProductDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  // Wire the native `close` event (fires for Esc, backdrop light-dismiss, and the
  // form below) once, so every dismissal path stays in sync with React state.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.addEventListener('close', onClose);

    // Safari doesn't yet support `closedby="any"` for backdrop-click dismissal;
    // fall back to a manual "was the click outside the content box" check.
    const supportsClosedBy = 'closedBy' in HTMLDialogElement.prototype;
    const handleLightDismiss = (event: MouseEvent) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const insideContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!insideContent) dialog.close();
    };
    if (!supportsClosedBy) dialog.addEventListener('click', handleLightDismiss);

    return () => {
      dialog.removeEventListener('close', onClose);
      if (!supportsClosedBy) dialog.removeEventListener('click', handleLightDismiss);
    };
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.setAttribute('closedby', 'any');
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="m-auto w-full max-w-lg rounded-lg border-0 bg-white p-6 shadow-xl backdrop:bg-stone-900/50 backdrop:backdrop-blur-sm"
    >
      <h2 id={titleId} className="font-display text-2xl font-semibold text-stone-900">
        {product.title}
      </h2>
      <p className="mt-1 text-sm text-stone-500">
        {product.brand} · {product.category}
      </p>
      {!product.inStock && (
        <span className="mt-3 inline-block rounded-full bg-stone-900 px-2 py-1 text-xs font-medium text-white">
          Out of stock
        </span>
      )}
      {product.description && <p className="mt-4 text-sm text-stone-700">{product.description}</p>}
      <div className="mt-4">
        <StarRating rating={product.rating} reviews={product.reviews} />
      </div>
      <p className="mt-2 text-lg font-medium text-stone-900">{formatPrice(product.price)}</p>
      {product.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-stone-300 px-3 py-1 text-xs capitalize text-stone-600">
              {tag}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-3 text-xs text-stone-500">Released {formatDate(product.releasedAtMs)}</p>
      <div className="mt-4">
        <ProductImage src={product.image} alt={product.title} />
      </div>
      <form method="dialog" className="mt-6 text-right">
        <button type="submit" className="rounded-md border border-stone-300 px-4 py-1.5 text-sm font-medium text-stone-700">
          Close
        </button>
      </form>
    </dialog>
  );
}
