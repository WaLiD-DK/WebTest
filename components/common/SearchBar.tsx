"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  title: string;
  category?: string;
  image?: string;
}

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onResultClick?: (result: SearchResult) => void;
  className?: string;
  showAutocomplete?: boolean;
}

export default function SearchBar({
  placeholder = "Search...",
  onSearch,
  onResultClick,
  className,
  showAutocomplete = true,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim() || !showAutocomplete) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      
      // Placeholder: Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      const mockResults: SearchResult[] = [
        { id: "1", title: "Luxury Wooden Jewelry Box", category: "Premium" },
        { id: "2", title: "Velvet Ring Box", category: "Rings" },
        { id: "3", title: "Leather Travel Jewelry Case", category: "Travel" },
      ].filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );

      setResults(mockResults);
      setIsOpen(mockResults.length > 0);
      setIsLoading(false);
    };

    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [query, showAutocomplete]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query);
      setIsOpen(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    onResultClick?.(result);
    setQuery("");
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className={cn("relative w-full", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          className="w-full pl-10 pr-10"
          aria-label="Search"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={isOpen}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && showAutocomplete && (
        <div
          id="search-results"
          className="absolute top-full z-50 mt-2 w-full rounded-md border bg-popover shadow-md"
          role="listbox"
        >
          {isLoading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto py-2">
              {results.map((result) => (
                <li key={result.id} role="option">
                  <button
                    type="button"
                    onClick={() => handleResultClick(result)}
                    className="flex w-full items-center space-x-3 px-4 py-2 text-sm hover:bg-muted"
                  >
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1 text-left">
                      <p className="font-medium">{result.title}</p>
                      {result.category && (
                        <p className="text-xs text-muted-foreground">{result.category}</p>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
