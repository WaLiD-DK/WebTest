"use client";

import { LucideIcon, Package, Search, ShoppingCart, FileQuestion, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  variant?: "default" | "search" | "cart" | "error" | "products";
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  variant = "default",
}: EmptyStateProps) {
  const getDefaultIcon = () => {
    switch (variant) {
      case "search":
        return Search;
      case "cart":
        return ShoppingCart;
      case "error":
        return AlertCircle;
      case "products":
        return Package;
      default:
        return FileQuestion;
    }
  };

  const Icon = icon || getDefaultIcon();

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-4 py-16 text-center",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div
        className={cn(
          "mb-4 rounded-full p-6",
          variant === "error"
            ? "bg-destructive/10 text-destructive"
            : "bg-muted text-muted-foreground"
        )}
      >
        <Icon className="h-12 w-12" aria-hidden="true" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-foreground">
        {title}
      </h3>

      {description && (
        <p className="mb-6 max-w-md text-sm text-muted-foreground">
          {description}
        </p>
      )}

      {(action || secondaryAction) && (
        <div className="flex flex-col gap-3 sm:flex-row">
          {action && (
            <Button onClick={action.onClick} size="lg">
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button onClick={secondaryAction.onClick} variant="outline" size="lg">
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// Preset variants for common use cases

export function EmptySearchResults({
  query,
  onClear,
  className,
}: {
  query: string;
  onClear: () => void;
  className?: string;
}) {
  return (
    <EmptyState
      variant="search"
      title="No results found"
      description={`We couldn't find any results for "${query}". Try adjusting your search terms.`}
      action={{
        label: "Clear Search",
        onClick: onClear,
      }}
      className={className}
    />
  );
}

export function EmptyCart({
  onBrowse,
  className,
}: {
  onBrowse: () => void;
  className?: string;
}) {
  return (
    <EmptyState
      variant="cart"
      title="Your cart is empty"
      description="Add some beautiful jewelry boxes to your cart to get started."
      action={{
        label: "Browse Products",
        onClick: onBrowse,
      }}
      className={className}
    />
  );
}

export function EmptyProductList({
  onReset,
  className,
}: {
  onReset?: () => void;
  className?: string;
}) {
  return (
    <EmptyState
      variant="products"
      title="No products found"
      description="There are no products matching your criteria. Try adjusting your filters."
      action={
        onReset
          ? {
              label: "Reset Filters",
              onClick: onReset,
            }
          : undefined
      }
      className={className}
    />
  );
}

export function ErrorState({
  title = "Something went wrong",
  description = "We encountered an error while loading this content. Please try again.",
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry: () => void;
  className?: string;
}) {
  return (
    <EmptyState
      variant="error"
      title={title}
      description={description}
      action={{
        label: "Try Again",
        onClick: onRetry,
      }}
      className={className}
    />
  );
}
