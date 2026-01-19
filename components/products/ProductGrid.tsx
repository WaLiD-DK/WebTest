'use client'

import { ProductWithImages } from '@/types'
import { ProductCard } from './ProductCard'
import { Skeleton } from '@/components/ui/skeleton'
import { PackageOpen } from 'lucide-react'

interface ProductGridProps {
  products: ProductWithImages[]
  isLoading?: boolean
  onAddToCart?: (productId: string) => void
  onToggleWishlist?: (productId: string) => void
  wishlistProductIds?: string[]
}

export function ProductGrid({
  products,
  isLoading = false,
  onAddToCart,
  onToggleWishlist,
  wishlistProductIds = [],
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12">
        <PackageOpen className="mb-4 h-16 w-16 text-gray-400" />
        <h3 className="mb-2 text-xl font-semibold text-gray-900">
          No products found
        </h3>
        <p className="text-center text-gray-600">
          We couldn't find any products matching your criteria.
          <br />
          Try adjusting your filters or search terms.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isInWishlist={wishlistProductIds.includes(product.id)}
        />
      ))}
    </div>
  )
}

function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
      <Skeleton className="aspect-square w-full" />
      <div className="p-4">
        <Skeleton className="mb-2 h-3 w-16" />
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="mb-2 h-4 w-3/4" />
        <Skeleton className="mb-3 h-4 w-24" />
        <Skeleton className="mb-3 h-5 w-20" />
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  )
}
