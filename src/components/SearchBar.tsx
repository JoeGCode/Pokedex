import React, { FC, useState } from "react";

type SearchProps = {
  searchHandler: (value: string) => void;
};

const SearchBar: FC<SearchProps> = ({ searchHandler }) => {
  const [searchTerm, setSearchTerm] = useState("");

  function keyUpHandler(e: React.KeyboardEvent) {
    if (e.key == "Enter") {
      console.log("Entered");
      searchHandler(searchTerm.trim());
    }
  }

  return (
    <div className="flex flex-col w-full justify-between mb-4 sm:gap-[5%] sm:flex-row">
      <input
        className="flex-1 rounded-md p-4 mb-2 sm:mb-0"
        placeholder="Search Pokemon by name or number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.currentTarget.value)}
        onKeyUp={(e) => keyUpHandler(e)}
      />
      <button
        className="bg-green-400 rounded-md p-4 hover:bg-green-600"
        onClick={() => searchHandler(searchTerm.trim())}
      >
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;
