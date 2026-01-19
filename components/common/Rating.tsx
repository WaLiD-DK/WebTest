"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
  showCount?: boolean;
  count?: number;
  className?: string;
}

export default function Rating({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onChange,
  showCount = false,
  count,
  className,
}: RatingProps) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const handleClick = (value: number) => {
    if (interactive && onChange) {
      onChange(value);
    }
  };

  const handleMouseEnter = (value: number) => {
    if (interactive) {
      setHoveredRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoveredRating(null);
    }
  };

  const displayRating = hoveredRating ?? rating;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div
        className="flex items-center gap-0.5"
        role={interactive ? "radiogroup" : "img"}
        aria-label={`Rating: ${rating} out of ${maxRating} stars`}
      >
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= displayRating;
          const isPartial = starValue - 0.5 === displayRating;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              disabled={!interactive}
              className={cn(
                "relative",
                interactive && "cursor-pointer transition-transform hover:scale-110",
                !interactive && "cursor-default"
              )}
              aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
              role={interactive ? "radio" : undefined}
              aria-checked={interactive ? starValue === rating : undefined}
            >
              {/* Background star (empty) */}
              <Star
                className={cn(
                  sizeClasses[size],
                  "text-muted-foreground/30"
                )}
              />
              
              {/* Filled star */}
              {isFilled && (
                <Star
                  className={cn(
                    sizeClasses[size],
                    "absolute inset-0",
                    interactive && hoveredRating
                      ? "fill-secondary text-secondary"
                      : "fill-secondary text-secondary"
                  )}
                />
              )}

              {/* Partial star (half-filled) */}
              {isPartial && (
                <div className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
                  <Star
                    className={cn(
                      sizeClasses[size],
                      "fill-secondary text-secondary"
                    )}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {showCount && count !== undefined && (
        <span className="text-sm text-muted-foreground">
          ({count.toLocaleString()})
        </span>
      )}

      {interactive && (
        <span className="sr-only">
          Select {displayRating} out of {maxRating} stars
        </span>
      )}
    </div>
  );
}

// Read-only variant for simple display
export function RatingDisplay({
  rating,
  maxRating = 5,
  size = "md",
  showCount = false,
  count,
  className,
}: Omit<RatingProps, "interactive" | "onChange">) {
  return (
    <Rating
      rating={rating}
      maxRating={maxRating}
      size={size}
      interactive={false}
      showCount={showCount}
      count={count}
      className={className}
    />
  );
}

// Interactive variant for user input
export function RatingInput({
  rating,
  maxRating = 5,
  size = "md",
  onChange,
  className,
}: Pick<RatingProps, "rating" | "maxRating" | "size" | "onChange" | "className">) {
  return (
    <Rating
      rating={rating}
      maxRating={maxRating}
      size={size}
      interactive={true}
      onChange={onChange}
      className={className}
    />
  );
}
