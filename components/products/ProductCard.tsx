'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { ProductWithImages } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: ProductWithImages
  onAddToCart?: (productId: string) => void
  onToggleWishlist?: (productId: string) => void
  isInWishlist?: boolean
}

export function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist = false,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const featuredImage = product.images.find((img: { isFeatured: boolean }) => img.isFeatured) || product.images[0]
  const hasDiscount = product.salePrice && product.salePrice < product.regularPrice
  const discountPercentage = hasDiscount
    ? Math.round(
        ((Number(product.regularPrice) - Number(product.salePrice)) / Number(product.regularPrice)) * 100
      )
    : 0

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAddingToCart(true)
    try {
      await onAddToCart?.(product.id)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    onToggleWishlist?.(product.id)
  }

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-lg">
        {/* Badges */}
        <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
          {product.isNew && (
            <Badge className="bg-blue-600 hover:bg-blue-700">New</Badge>
          )}
          {product.isFeatured && (
            <Badge className="bg-purple-600 hover:bg-purple-700">Featured</Badge>
          )}
          {hasDiscount && (
            <Badge variant="destructive">-{discountPercentage}%</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute right-2 top-2 z-10 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={cn(
              'h-5 w-5 transition-colors',
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
            )}
          />
        </button>

        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {featuredImage ? (
            <Image
              src={featuredImage.imageUrl}
              alt={featuredImage.altText || product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Categories */}
          {product.categories.length > 0 && (
            <p className="mb-1 text-xs text-gray-500">
              {product.categories[0].category.name}
            </p>
          )}

          {/* Product Name */}
          <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-amber-700">
            {product.name}
          </h3>

          {/* Rating */}
          {product.ratingAverage && product.reviewCount > 0 && (
            <div className="mb-2 flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'h-3.5 w-3.5',
                      i < Math.round(Number(product.ratingAverage))
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-gray-200 text-gray-200'
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600">
                ({product.reviewCount})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="mb-3 flex items-baseline gap-2">
            {hasDiscount ? (
              <>
                <span className="text-lg font-bold text-amber-700">
                  ${Number(product.salePrice).toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${Number(product.regularPrice).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                ${Number(product.regularPrice).toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={isAddingToCart || product.stockStatus === 'OUT_OF_STOCK'}
            className="w-full bg-amber-700 hover:bg-amber-800"
            size="sm"
          >
            {isAddingToCart ? (
              'Adding...'
            ) : product.stockStatus === 'OUT_OF_STOCK' ? (
              'Out of Stock'
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </Link>
  )
}
