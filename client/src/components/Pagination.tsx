import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
  totalPages: number;
  setPage: (page: string) => void;
}

function Pagination({ totalPages, setPage }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setPage(page.toString());
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageNumbers.push(
          <button
            key={i}
            className={`px-2 py-[7px] mx-1 border rounded ${
              currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      } else if (
        (i === currentPage - 3 || i === currentPage + 3) &&
        totalPages > 6 // Only add ellipsis when there are enough pages
      ) {
        // Insert an ellipsis for pages further than 2 steps away
        pageNumbers.push(
          <span key={i} className="px-2">
            ...
          </span>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        className="px-2 py-[7px] mx-1 text-white bg-blue-500 rounded disabled:bg-gray-400"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <IoIosArrowBack />
      </button>

      {renderPageNumbers()}

      <button
        className="px-2 py-[7px] mx-2 text-white bg-blue-500 rounded disabled:bg-gray-400"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
}

export default Pagination;
