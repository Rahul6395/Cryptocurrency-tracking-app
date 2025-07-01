import React from 'react';

function Pagination({ page, setPage, showData }) {
  const getPageNumbers = () => {
    const delta = 2;
    const pages = [];
    const totalPages = showData;

    const start = Math.max(2, page - delta);
    const end = Math.min(totalPages - 1, page + delta);

    pages.push(1); 

    if (start > 2) pages.push('...');

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push('...');

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex justify-center md:mt-6 mt-4">
      <nav className="inline-flex items-center gap-1 text-sm">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="md:px-3 sm:px-2 px-1 sm:py-1 pt-1 py-[2px] border rounded hover:bg-gray-200 disabled:opacity-50 md:text-[14px] sm:text-[12px] text-[10px]"
        >
          Prev
        </button>

        {getPageNumbers().map((pg, idx) =>
          pg === '...' ? (
            <span key={idx} className="px-3 py-1">...</span>
          ) : (
            <button
              key={idx}
              onClick={() => setPage(pg)}
              className={`md:px-3 sm:px-2 px-1 sm:py-1 pt-1 py-[2px] border rounded ${
                page === pg ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
              } md:text-[14px] sm:text-[12px] text-[10px]`}
            >
              {pg}
            </button>
          )
        )}

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, showData))}
          disabled={page === showData}
          className="md:px-3 sm:px-2 px-1 sm:py-1 pt-1 py-[2px] border rounded hover:bg-gray-200 disabled:opacity-50 md:text-[14px] sm:text-[12px] text-[10px]"
        >
          Next
        </button>
      </nav>
    </div>
  );
}

export default Pagination;
