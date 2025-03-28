import React from "react";
import './pagination.css';

const Pagination = ({ totalPages, currentPage, setPage }) => {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setPage(page);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || Math.abs(currentPage - i) <= 1) {
                pages.push(
                    <button
                        key={i}
                        className={`px-3 py-1 mx-1 rounded ${currentPage === i ? "bg-red-100 text-black current-page" : "text-black"
                            }`}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </button>
                );
            } else if (
                (i === currentPage - 2 || i === currentPage + 2) &&
                totalPages > 5
            ) {
                pages.push(<span key={i}>...</span>);
            }
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center space-x-2 p-4">
            <button
                className="px-3 py-1 mx-1 rounded"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <img src="/assets/images/left.svg" alt="Prev" />
            </button>
            {renderPageNumbers()}
            <button
                className="px-3 py-1 mx-1 rounded"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <img src="/assets/images/right.svg" alt="Next" />
            </button>
        </div>
    );
};

export default Pagination;
