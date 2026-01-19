"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisible?: number;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisible = 5,
  className,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(maxVisible / 2);
    let startPage = Math.max(currentPage - halfVisible, 1);
    let endPage = Math.min(startPage + maxVisible - 1, totalPages);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(endPage - maxVisible + 1, 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const pages = getPageNumbers();

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn("flex items-center justify-center space-x-2", className)}
    >
      {/* First Page */}
      {showFirstLast && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          aria-label="Go to first page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
      )}

      {/* Previous Page */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page Numbers */}
      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-muted-foreground"
              aria-hidden="true"
            >
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isCurrentPage = pageNumber === currentPage;

        return (
          <Button
            key={pageNumber}
            variant={isCurrentPage ? "default" : "outline"}
            size="icon"
            onClick={() => handlePageChange(pageNumber)}
            aria-label={`Go to page ${pageNumber}`}
            aria-current={isCurrentPage ? "page" : undefined}
            className={cn(
              "min-w-[2.5rem]",
              isCurrentPage && "pointer-events-none"
            )}
          >
            {pageNumber}
          </Button>
        );
      })}

      {/* Next Page */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Last Page */}
      {showFirstLast && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Go to last page"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      )}
    </nav>
  );
}

// Simple pagination info component
export function PaginationInfo({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  className,
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  className?: string;
}) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      Showing <span className="font-medium">{startItem}</span> to{" "}
      <span className="font-medium">{endItem}</span> of{" "}
      <span className="font-medium">{totalItems}</span> results
    </p>
  );
}
