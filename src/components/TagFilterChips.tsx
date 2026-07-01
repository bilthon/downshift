import { POPULAR_TAGS } from '../lib/tags';

interface TagFilterChipsProps {
  selectedTags: Set<string>;
  onToggleTag: (tag: string) => void;
}

export function TagFilterChips({ selectedTags, onToggleTag }: TagFilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {POPULAR_TAGS.map((tag) => {
        const isSelected = selectedTags.has(tag);
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onToggleTag(tag)}
            aria-pressed={isSelected}
            className={`rounded-full border px-3 py-1 text-sm capitalize transition-colors ${
              isSelected
                ? 'border-stone-800 bg-stone-800 text-white'
                : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
