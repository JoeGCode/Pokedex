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

  function clearHandler() {
    if (searchTerm !== "") {
      setSearchTerm("");
    }
  }

  return (
    <div className="flex flex-col w-full justify-between mb-4 sm:gap-[5%] sm:flex-row">
      <div className="w-full relative flex-1">
        <input
          className="w-full rounded-md p-4 mb-2 sm:mb-0"
          placeholder="Search Pokemon by name or number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
          onKeyUp={(e) => keyUpHandler(e)}
        />
        <button
          className="absolute top-0 right-4 bottom-0 text-4xl"
          onClick={() => clearHandler()}
        >
          X
        </button>
      </div>
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
