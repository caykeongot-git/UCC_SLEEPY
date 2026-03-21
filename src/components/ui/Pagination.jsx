import React from 'react';
import { cn } from '../../utils/cn';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  className 
}) => {
  return (
    <div className={cn("flex items-center justify-center space-x-2 mt-6", className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded hover:bg-dark-700 text-light-500 disabled:opacity-30 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      
      <div className="flex items-center space-x-1">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => onPageChange(idx + 1)}
            className={cn(
              "w-9 h-9 rounded flex items-center justify-center border text-xs font-bold transition-all",
              currentPage === idx + 1 
                ? "bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/20" 
                : "bg-dark-800 text-light-500 border-dark-700 hover:border-light-500/50"
            )}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded hover:bg-dark-700 text-light-500 disabled:opacity-30 transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
