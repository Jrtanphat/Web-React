import React from "react";

const getPageNumbers = (currentPage, totalPages) => {
  const pages = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pages.push(1, 2, 3, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }
  }
  return pages;
};

const Pagination = ({ page, pageHandler, filteredData, dynamicPage }) => {
  return (
    <div className="mt-10 space-x-4 ">
      <button
        disabled={page === 1}
        className={`${
          page === 1 ? "bg-red-400" : "bg-red-500"
        } text-white px-3 py-1 rounded-md cursor-pointer`}
        onClick={() => pageHandler(page - 1)}
      >
        Prev
      </button>

      {getPageNumbers(page, dynamicPage)?.map((item, index) => {
        return (
          <span
            key={index}
            onClick={() => typeof item === "number" && pageHandler(item)}
            className={`cursor-pointer ${
              item === page ? "font-bold text-red-600" : "text-black"
            }`}
          >
            {item}
          </span>
        );
      })}

      <button
        disabled={page === dynamicPage}
        className={`${
          page === dynamicPage ? "bg-red-400" : "bg-red-500"
        } text-white px-3 py-1 rounded-md cursor-pointer`}
        onClick={() => pageHandler(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
