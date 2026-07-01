import type { SortKey } from '../lib/sort';
import { SearchBar } from './SearchBar';
import { TagFilterChips } from './TagFilterChips';
import { InStockToggle } from './InStockToggle';
import { SortSelect } from './SortSelect';

interface ToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedTags: Set<string>;
  onToggleTag: (tag: string) => void;
  hideOutOfStock: boolean;
  onHideOutOfStockChange: (checked: boolean) => void;
  sortKey: SortKey;
  onSortChange: (value: SortKey) => void;
}

export function Toolbar({
  searchTerm,
  onSearchChange,
  selectedTags,
  onToggleTag,
  hideOutOfStock,
  onHideOutOfStockChange,
  sortKey,
  onSortChange,
}: ToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={searchTerm} onChange={onSearchChange} />
        <div className="flex items-center gap-4">
          <InStockToggle checked={hideOutOfStock} onChange={onHideOutOfStockChange} />
          <SortSelect value={sortKey} onChange={onSortChange} />
        </div>
      </div>
      <TagFilterChips selectedTags={selectedTags} onToggleTag={onToggleTag} />
    </div>
  );
}
