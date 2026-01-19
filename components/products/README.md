# Product Components

A comprehensive set of product-related components for the jewelry e-commerce platform.

## Components

### 1. ProductCard
A product card component for grid display with image, price, rating, badges, and quick actions.

**Features:**
- Next.js Image optimization
- Product name, regular/sale price display
- Star rating display
- Quick add to cart button
- Wishlist toggle button
- "New", "Sale", "Featured" badges
- Discount percentage badge
- Responsive design

**Props:**
```typescript
interface ProductCardProps {
  product: ProductWithImages
  onAddToCart?: (productId: string) => void
  onToggleWishlist?: (productId: string) => void
  isInWishlist?: boolean
}
```

### 2. ProductGrid
A responsive grid layout for displaying multiple products.

**Features:**
- Responsive grid (1 col mobile, 2 cols tablet, 3-4 cols desktop)
- Loading skeleton states
- Empty state with helpful message
- Handles wishlist state

**Props:**
```typescript
interface ProductGridProps {
  products: ProductWithImages[]
  isLoading?: boolean
  onAddToCart?: (productId: string) => void
  onToggleWishlist?: (productId: string) => void
  wishlistProductIds?: string[]
}
```

### 3. ProductFilters
A sidebar filter component with multiple filter types.

**Features:**
- Category filter (checkboxes)
- Price range filter (min/max inputs)
- Material filter (checkboxes)
- Color filter (color swatches)
- Features filter (checkboxes)
- Clear all filters button
- Active filter indicators

**Props:**
```typescript
interface ProductFiltersProps {
  categories?: Category[]
  onFilterChange: (filters: ProductFilterState) => void
  className?: string
}

interface ProductFilterState {
  categories: string[]
  priceRange: { min: number; max: number }
  materials: string[]
  colors: string[]
  features: string[]
}
```

### 4. ProductImageGallery
An interactive image gallery for product detail pages.

**Features:**
- Main large image display
- Thumbnail strip with navigation
- Zoom on hover functionality
- Lightbox/modal for full view
- Image navigation arrows
- Image counter
- Keyboard navigation support

**Props:**
```typescript
interface ProductImageGalleryProps {
  images: ProductImage[]
  productName: string
}
```

### 5. ProductReviews
A comprehensive reviews section with rating summary and review form.

**Features:**
- Rating summary (average rating, total reviews)
- Star rating breakdown (5 stars: X%, 4 stars: X%, etc.)
- Review list with pagination
- Review form (when user is logged in)
- Review images display
- Helpful vote buttons
- Verified purchase badges
- Responsive design

**Props:**
```typescript
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
```

### 6. RelatedProducts
A horizontal scrollable carousel for related products.

**Features:**
- Horizontal scrollable layout
- Navigation arrows
- Customizable heading
- Reuses ProductCard component
- Auto-hide when no products
- Responsive design

**Props:**
```typescript
interface RelatedProductsProps {
  products: ProductWithImages[]
  title?: string
  onAddToCart?: (productId: string) => void
  onToggleWishlist?: (productId: string) => void
  wishlistProductIds?: string[]
  className?: string
}
```

## Usage Examples

### Basic Product Grid with Filters

```tsx
'use client'

import { useState } from 'react'
import { ProductGrid, ProductFilters, ProductFilterState } from '@/components/products'

export default function ProductsPage() {
  const [filters, setFilters] = useState<ProductFilterState>({
    categories: [],
    priceRange: { min: 0, max: 1000 },
    materials: [],
    colors: [],
    features: [],
  })

  const handleAddToCart = async (productId: string) => {
    // Add to cart logic
  }

  const handleToggleWishlist = (productId: string) => {
    // Toggle wishlist logic
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <ProductFilters
            categories={categories}
            onFilterChange={setFilters}
          />
        </aside>
        <main className="lg:col-span-3">
          <ProductGrid
            products={filteredProducts}
            isLoading={isLoading}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlistProductIds={wishlistIds}
          />
        </main>
      </div>
    </div>
  )
}
```

### Product Detail Page

```tsx
'use client'

import {
  ProductImageGallery,
  ProductReviews,
  RelatedProducts,
} from '@/components/products'

export default function ProductDetailPage({ product }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Gallery */}
        <ProductImageGallery
          images={product.images}
          productName={product.name}
        />

        {/* Product Details */}
        <div>{/* Product info, add to cart, etc. */}</div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <ProductReviews
          productId={product.id}
          reviews={product.reviews}
          averageRating={product.ratingAverage}
          totalReviews={product.reviewCount}
          isLoggedIn={isLoggedIn}
          onSubmitReview={handleSubmitReview}
          onHelpfulVote={handleHelpfulVote}
        />
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <RelatedProducts
          products={relatedProducts}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistProductIds={wishlistIds}
        />
      </div>
    </div>
  )
}
```

## Styling

All components use:
- **Tailwind CSS** for styling with a premium jewelry theme
- **Amber/Gold color palette** (amber-700, amber-800) for primary actions
- **lucide-react** icons throughout
- **Next.js Image** component for optimized images
- Shadcn UI components (Button, Badge, Dialog, etc.)

## TypeScript Types

All components use proper TypeScript types from `/types/index.ts`:
- `ProductWithImages`
- `ProductWithAll`
- `ReviewWithUser`
- `CartItem`

## Notes

- All interactive functions (onAddToCart, onToggleWishlist, etc.) are placeholder props that need to be implemented in the consuming application
- Components are designed to be responsive and work well on mobile, tablet, and desktop
- Loading states are included for better UX
- Empty states provide helpful feedback to users
- All components follow accessibility best practices with proper ARIA labels
