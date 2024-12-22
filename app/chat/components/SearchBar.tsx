import type { ChangeEventHandler } from 'react';
import { useState } from 'react';

export function SearchBar({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState(''); // State to track search query

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchQuery(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="border-b border-slate-600 p-2">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleChange}
        className="w-full rounded-md bg-slate-700 p-2 text-slate-200 outline-none focus:ring-2 focus:ring-teal-300"
      />
    </div>
  );
}
