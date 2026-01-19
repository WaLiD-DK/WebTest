'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductWithImages } from '@/types'
import { ProductCard } from './ProductCard'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface RelatedProductsProps {
  products: ProductWithImages[]
  title?: string
  onAddToCart?: (productId: string) => void
  onToggleWishlist?: (productId: string) => void
  wishlistProductIds?: string[]
  className?: string
}

export function RelatedProducts({
  products,
  title = 'You May Also Like',
  onAddToCart,
  onToggleWishlist,
  wishlistProductIds = [],
  className,
}: RelatedProductsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const scrollAmount = container.clientWidth * 0.8
    const newScrollLeft =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    })
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            className="h-10 w-10"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            className="h-10 w-10"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Products Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[280px] flex-shrink-0 sm:w-[300px]"
          >
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={wishlistProductIds.includes(product.id)}
            />
          </div>
        ))}
      </div>

      {/* CSS to hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
