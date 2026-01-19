'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ProductImage {
  id: string
  imageUrl: string
  altText: string | null
  displayOrder: number
}

interface ProductImageGalleryProps {
  images: ProductImage[]
  productName: string
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const sortedImages = [...images].sort((a, b) => a.displayOrder - b.displayOrder)
  const selectedImage = sortedImages[selectedIndex] || sortedImages[0]

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? sortedImages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === sortedImages.length - 1 ? 0 : prev + 1))
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  if (sortedImages.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-100">
        <p className="text-gray-400">No images available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <div
          className="relative h-full w-full cursor-zoom-in"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setIsLightboxOpen(true)}
        >
          <Image
            src={selectedImage.imageUrl}
            alt={selectedImage.altText || productName}
            fill
            className={cn(
              'object-cover transition-transform duration-200',
              isZoomed && 'scale-150'
            )}
            style={
              isZoomed
                ? {
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                  }
                : undefined
            }
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Zoom Indicator */}
        <div className="absolute right-4 top-4 rounded-lg bg-black/50 p-2 text-white backdrop-blur-sm">
          <ZoomIn className="h-5 w-5" />
        </div>

        {/* Navigation Arrows */}
        {sortedImages.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 text-gray-900" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 text-gray-900" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {sortedImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur-sm">
            {selectedIndex + 1} / {sortedImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {sortedImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {sortedImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                'relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all hover:scale-105',
                selectedIndex === index
                  ? 'border-amber-700 ring-2 ring-amber-700 ring-offset-2'
                  : 'border-gray-200 hover:border-gray-300'
              )}
            >
              <Image
                src={image.imageUrl}
                alt={image.altText || `${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-7xl p-0">
          <div className="relative">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 z-10 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Lightbox Image */}
            <div className="relative aspect-square max-h-[90vh] w-full">
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.altText || productName}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>

            {/* Lightbox Navigation */}
            {sortedImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-all hover:bg-black/70 hover:scale-110"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-all hover:bg-black/70 hover:scale-110"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}

            {/* Lightbox Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-white backdrop-blur-sm">
              {selectedIndex + 1} / {sortedImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
