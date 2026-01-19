'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, ThumbsUp, ChevronLeft, ChevronRight } from 'lucide-react'
import { ReviewWithUser } from '@/types'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface ProductReviewsProps {
  productId: string
  reviews: ReviewWithUser[]
  averageRating: number
  totalReviews: number
  isLoggedIn?: boolean
  onSubmitReview?: (data: {
    rating: number
    title: string
    reviewText: string
  }) => Promise<void>
  onHelpfulVote?: (reviewId: string) => void
}

export function ProductReviews({
  productId,
  reviews,
  averageRating,
  totalReviews,
  isLoggedIn = false,
  onSubmitReview,
  onHelpfulVote,
}: ProductReviewsProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    reviewText: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const reviewsPerPage = 5
  const totalPages = Math.ceil(reviews.length / reviewsPerPage)
  const startIndex = (currentPage - 1) * reviewsPerPage
  const visibleReviews = reviews.slice(startIndex, startIndex + reviewsPerPage)

  // Calculate rating breakdown
  const ratingBreakdown = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((r) => r.rating === rating).length
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0
    return { rating, count, percentage }
  })

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSubmitReview?.(formData)
      setFormData({ rating: 5, title: '', reviewText: '' })
      setShowReviewForm(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Customer Reviews
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Overall Rating */}
          <div className="flex flex-col items-center justify-center border-r border-gray-200">
            <div className="mb-2 text-5xl font-bold text-gray-900">
              {averageRating.toFixed(1)}
            </div>
            <div className="mb-2 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-6 w-6',
                    i < Math.round(averageRating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-gray-200 text-gray-200'
                  )}
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">
              Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {ratingBreakdown.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-700">
                    {rating}
                  </span>
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                </div>
                <div className="flex-1">
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full bg-amber-400 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
                <span className="w-12 text-right text-sm text-gray-600">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Write Review Button */}
        {isLoggedIn && !showReviewForm && (
          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => setShowReviewForm(true)}
              className="bg-amber-700 hover:bg-amber-800"
            >
              Write a Review
            </Button>
          </div>
        )}
      </div>

      {/* Review Form */}
      {isLoggedIn && showReviewForm && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold text-gray-900">
            Write Your Review
          </h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            {/* Star Rating */}
            <div>
              <Label className="mb-2 block">Your Rating *</Label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating })}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={cn(
                        'h-8 w-8',
                        rating <= formData.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-gray-200 text-gray-200'
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Title */}
            <div>
              <Label htmlFor="title">Review Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Sum up your experience"
                maxLength={100}
              />
            </div>

            {/* Review Text */}
            <div>
              <Label htmlFor="reviewText">Your Review *</Label>
              <Textarea
                id="reviewText"
                value={formData.reviewText}
                onChange={(e) =>
                  setFormData({ ...formData, reviewText: e.target.value })
                }
                placeholder="Share your thoughts about this product"
                rows={5}
                required
                minLength={10}
              />
            </div>

            {/* Form Actions */}
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={isSubmitting || !formData.reviewText}
                className="bg-amber-700 hover:bg-amber-800"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowReviewForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {visibleReviews.map((review) => (
          <div
            key={review.id}
            className="rounded-lg bg-white p-6 shadow-sm"
          >
            <div className="mb-3 flex items-start justify-between">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-4 w-4',
                          i < review.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-gray-200 text-gray-200'
                        )}
                      />
                    ))}
                  </div>
                  {review.isVerifiedPurchase && (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                      Verified Purchase
                    </span>
                  )}
                </div>
                {review.title && (
                  <h4 className="mb-1 font-semibold text-gray-900">
                    {review.title}
                  </h4>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">
                    {review.user.firstName} {review.user.lastName[0]}.
                  </span>
                  <span>•</span>
                  <span>
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>

            <p className="mb-4 text-gray-700">{review.reviewText}</p>

            {/* Review Images */}
            {review.images.length > 0 && (
              <div className="mb-4 flex gap-2 overflow-x-auto">
                {review.images.map((image: { id: string; imageUrl: string }) => (
                  <div
                    key={image.id}
                    className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg"
                  >
                    <Image
                      src={image.imageUrl}
                      alt="Review image"
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Helpful Button */}
            <button
              onClick={() => onHelpfulVote?.(review.id)}
              className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-amber-700"
            >
              <ThumbsUp className="h-4 w-4" />
              <span>
                Helpful {review.helpfulCount > 0 && `(${review.helpfulCount})`}
              </span>
            </button>
          </div>
        ))}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {reviews.length === 0 && (
        <div className="rounded-lg bg-white p-12 text-center shadow-sm">
          <Star className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            No reviews yet
          </h3>
          <p className="text-gray-600">
            Be the first to share your thoughts about this product!
          </p>
        </div>
      )}
    </div>
  )
}
