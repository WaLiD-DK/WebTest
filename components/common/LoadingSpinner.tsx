"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  text?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  size = "md",
  className,
  text,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const spinner = (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        fullScreen && "min-h-[400px]",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={text || "Loading"}
    >
      <Loader2
        className={cn(
          "animate-spin text-primary",
          sizeClasses[size]
        )}
        aria-hidden="true"
      />
      {text && (
        <p className="text-sm text-muted-foreground">{text}</p>
      )}
      <span className="sr-only">{text || "Loading..."}</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
}

// Inline spinner for buttons
export function ButtonSpinner({ className }: { className?: string }) {
  return (
    <Loader2
      className={cn("h-4 w-4 animate-spin", className)}
      aria-hidden="true"
    />
  );
}

// Overlay spinner
export function LoadingOverlay({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={text || "Loading"}
    >
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg bg-card p-8 shadow-lg">
        <Loader2
          className="h-12 w-12 animate-spin text-primary"
          aria-hidden="true"
        />
        {text && (
          <p className="text-sm font-medium text-foreground">{text}</p>
        )}
        <span className="sr-only">{text || "Loading..."}</span>
      </div>
    </div>
  );
}

// Skeleton loader variant
export function SpinnerWithSkeleton({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-4 p-8", className)}>
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
      {text && (
        <p className="text-center text-sm text-muted-foreground">{text}</p>
      )}
      <div className="space-y-3">
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}
