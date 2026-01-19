import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { ProductFilters } from '@/components/products/ProductFilters'
import { ProductGrid } from '@/components/products/ProductGrid'
import Pagination from '@/components/common/Pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Placeholder data
type PlaceholderProduct = {
  id: string
  name: string
  slug: string
  description: string
  regularPrice: number
  salePrice: number | null
  stockStatus: 'IN_STOCK' | 'OUT_OF_STOCK' | 'LOW_STOCK'
  sku: string
  isNew: boolean
  isFeatured: boolean
  ratingAverage: number
  reviewCount: number
  images: Array<{
    id: string
    imageUrl: string
    altText: string
    isFeatured: boolean
  }>
  categories: Array<{ category: { id: string; name: string; slug: string } }>
}

const products: PlaceholderProduct[] = Array.from({ length: 12 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Premium Jewelry Box ${i + 1}`,
  slug: `premium-jewelry-box-${i + 1}`,
  description: `High-quality jewelry storage solution ${i + 1}`,
  regularPrice: 89.99 + i * 10,
  salePrice: i % 3 === 0 ? 69.99 + i * 10 : null,
  stockStatus: 'IN_STOCK' as const,
  sku: `JB-${String(i + 1).padStart(3, '0')}`,
  isNew: i < 3,
  isFeatured: i % 4 === 0,
  ratingAverage: 4.5 + Math.random() * 0.5,
  reviewCount: Math.floor(Math.random() * 150) + 20,
  images: [
    {
      id: `${i + 1}`,
      imageUrl: `https://images.unsplash.com/photo-${1535632066927 + i * 1000}?w=500&h=500&fit=crop`,
      altText: `Premium Jewelry Box ${i + 1}`,
      isFeatured: true,
    },
  ],
  categories: [
    {
      category: {
        id: `${(i % 4) + 1}`,
        name: ['Luxury Boxes', 'Display Cases', 'Organizers', 'Travel Cases'][i % 4],
        slug: ['luxury', 'display', 'organizers', 'travel'][i % 4],
      },
    },
  ],
}))

interface ProductsPageProps {
  searchParams: {
    sort?: string
    category?: string
    minPrice?: string
    maxPrice?: string
    page?: string
  }
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const currentPage = Number(searchParams.page) || 1
  const itemsPerPage = 12
  const totalItems = products.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest' },
    { value: 'rating', label: 'Best Rating' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-amber-700 transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900 font-medium">Products</span>
      </nav>

      {/* Page Title and Sort */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-gray-900 md:text-4xl">
            Our Collection
          </h1>
          <p className="mt-2 text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} products
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select defaultValue={searchParams.sort || 'featured'}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* Sidebar Filters */}
        <aside className="space-y-6">
          <ProductFilters onFilterChange={(filters) => console.log('Filters changed:', filters)} />
        </aside>

        {/* Product Grid */}
        <div>
          <ProductGrid products={products as any} />
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page: number) => {
                  // This will be handled by URL params in real implementation
                  console.log('Page changed to:', page)
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function generateMetadata({ searchParams }: ProductsPageProps) {
  const category = searchParams.category || 'all'
  
  return {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Jewelry Boxes`,
    description: 'Browse our exquisite collection of handcrafted jewelry boxes. Premium quality, elegant designs, and secure storage for your precious treasures.',
    openGraph: {
      title: 'Premium Jewelry Boxes Collection',
      description: 'Discover handcrafted jewelry boxes with premium materials and elegant designs.',
      type: 'website',
    },
  }
}
