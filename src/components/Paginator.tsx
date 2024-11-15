import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/20/solid";
import React, { useState } from "react";

/*
 * Paginator component
 */
function Paginator({
  page,
  totalArticles,
  onPageChange,
}: {
  page: number;
  totalArticles: React.MutableRefObject<number>;
  onPageChange: (page: number) => void;
}) {
  // State to track the current page
  const [currentPage, setPage] = useState(page);
  // Number of articles per page
  const PAGE_SIZE = 12;
  // Calculate the last page number
  const lastPage = Math.ceil(totalArticles.current / PAGE_SIZE);

  // Function to handle click events for previous and next buttons
  function handleCickPrevOrNext(pageDiff: number) {
    const newPage = currentPage + pageDiff;
    if (newPage >= 1 && newPage <= lastPage) {
      setPage(newPage);
      onPageChange(newPage);
    }
  }

  return (
    <div className="flex justify-around text-white font-bold">
      {/* Previous page button */}
      <button
        onClick={() => handleCickPrevOrNext(-1)}
        // Disable button if on the first page
        disabled={currentPage == 1}
      >
        <ArrowLongLeftIcon className="size-9 text-white" />
      </button>

      {/* Display the current page number */}
      {currentPage}

      {/* Next page button */}
      <button
        onClick={() => handleCickPrevOrNext(1)}
        // Disable button if on the last page
        disabled={lastPage === currentPage}
      >
        <ArrowLongRightIcon className="size-9 text-white" />
      </button>
    </div>
  );
}

export default Paginator;
