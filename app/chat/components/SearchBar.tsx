import { ChangeEventHandler, useState } from "react";

export const SearchBar = ({
  onChange,
}: {
  onChange: (value: string) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState(""); // State to track search query

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchQuery(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="p-2 border-b border-slate-600">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleChange}
        className="w-full p-2 bg-slate-700 text-slate-200 rounded-md outline-none focus:ring-2 focus:ring-teal-300"
      />
    </div>
  );
};
