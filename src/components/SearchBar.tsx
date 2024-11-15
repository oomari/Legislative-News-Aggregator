import React from "react";

/*
 * SearchBar component
 */
function SearchBar({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="w-full flex flex-col ">
      <input
        type="text"
        placeholder="Search..."
        className="w-full rounded-sm p-2"
        onChange={onChange}
      />
    </div>
  );
}

export default SearchBar;
