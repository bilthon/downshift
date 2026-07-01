interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by title or brand..."
      aria-label="Search products"
      className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm sm:w-64"
    />
  );
}
