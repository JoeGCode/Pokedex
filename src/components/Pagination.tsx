import React, { FC } from "react";

type PaginationProps = {
  // startFrom: number,
  // setStart: (start: number) => void,
  // resultsPerPage: number,
  // resultsLength: number,
  nextPage: () => void;
  previousPage: () => void;
  showNextButton: boolean;
  showPreviousButton: boolean;
};

const Pagination: FC<PaginationProps> = ({
  nextPage,
  previousPage,
  showNextButton,
  showPreviousButton,
}) => {
  return (
    <div className="flex items-center justify-evenly w-full h-20 fixed bottom-0 left-0 right-0 backdrop-blur-md">
      {showPreviousButton && (
        <button
          className="py-2 px-4 bg-blue-200 rounded-lg"
          onClick={() => previousPage()}
        >
          Previous
        </button>
      )}
      {showNextButton && (
        <button
          className="py-2 px-4 bg-blue-200 rounded-lg"
          onClick={() => nextPage()}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
