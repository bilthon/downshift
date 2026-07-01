interface InStockToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function InStockToggle({ checked, onChange }: InStockToggleProps) {
  return (
    <label className="flex items-center gap-2 text-sm text-stone-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-stone-300"
      />
      Hide out-of-stock
    </label>
  );
}
