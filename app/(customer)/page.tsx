import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Truck, Shield, Award, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { ProductCard } from '@/components/products/ProductCard'
import { Badge } from '@/components/ui/badge'

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

const featuredProducts: PlaceholderProduct[] = [
  {
    id: '1',
    name: 'Elegant Velvet Jewelry Box',
    slug: 'elegant-velvet-jewelry-box',
    description: 'Premium velvet-lined jewelry box',
    regularPrice: 89.99,
    salePrice: 69.99,
    stockStatus: 'IN_STOCK' as const,
    sku: 'JB-001',
    isNew: true,
    isFeatured: true,
    ratingAverage: 4.8,
    reviewCount: 124,
    images: [
      {
        id: '1',
        imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
        altText: 'Elegant velvet jewelry box',
        isFeatured: true,
      },
    ],
    categories: [{ category: { id: '1', name: 'Luxury Boxes', slug: 'luxury' } }],
  },
  {
    id: '2',
    name: 'Modern Wooden Display Case',
    slug: 'modern-wooden-display-case',
    description: 'Handcrafted wooden jewelry display',
    regularPrice: 129.99,
    salePrice: null,
    stockStatus: 'IN_STOCK' as const,
    sku: 'JB-002',
    isNew: false,
    isFeatured: true,
    ratingAverage: 4.9,
    reviewCount: 89,
    images: [
      {
        id: '2',
        imageUrl: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&h=500&fit=crop',
        altText: 'Modern wooden display case',
        isFeatured: true,
      },
    ],
    categories: [{ category: { id: '2', name: 'Display Cases', slug: 'display' } }],
  },
  {
    id: '3',
    name: 'Crystal Glass Jewelry Organizer',
    slug: 'crystal-glass-jewelry-organizer',
    description: 'Elegant crystal glass organizer',
    regularPrice: 149.99,
    salePrice: 119.99,
    stockStatus: 'IN_STOCK' as const,
    sku: 'JB-003',
    isNew: true,
    isFeatured: true,
    ratingAverage: 4.7,
    reviewCount: 67,
    images: [
      {
        id: '3',
        imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
        altText: 'Crystal glass jewelry organizer',
        isFeatured: true,
      },
    ],
    categories: [{ category: { id: '3', name: 'Organizers', slug: 'organizers' } }],
  },
  {
    id: '4',
    name: 'Vintage Leather Jewelry Case',
    slug: 'vintage-leather-jewelry-case',
    description: 'Timeless leather jewelry case',
    regularPrice: 99.99,
    salePrice: null,
    stockStatus: 'IN_STOCK' as const,
    sku: 'JB-004',
    isNew: false,
    isFeatured: true,
    ratingAverage: 4.6,
    reviewCount: 142,
    images: [
      {
        id: '4',
        imageUrl: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=500&h=500&fit=crop',
        altText: 'Vintage leather jewelry case',
        isFeatured: true,
      },
    ],
    categories: [{ category: { id: '4', name: 'Travel Cases', slug: 'travel' } }],
  },
]

const categories = [
  {
    id: '1',
    name: 'Luxury Boxes',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
    count: 24,
  },
  {
    id: '2',
    name: 'Display Cases',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop',
    count: 18,
  },
  {
    id: '3',
    name: 'Organizers',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    count: 32,
  },
  {
    id: '4',
    name: 'Travel Cases',
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=400&fit=crop',
    count: 16,
  },
  {
    id: '5',
    name: 'Watch Boxes',
    image: 'https://images.unsplash.com/photo-1587836374616-0496898400a1?w=400&h=400&fit=crop',
    count: 21,
  },
  {
    id: '6',
    name: 'Gift Sets',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop',
    count: 14,
  },
]

const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    rating: 5,
    comment: 'Absolutely stunning! The quality exceeded my expectations. Perfect for storing my precious jewelry collection.',
    date: '2024-01-15',
  },
  {
    id: '2',
    name: 'Michael Chen',
    rating: 5,
    comment: 'Bought this as a gift for my wife and she absolutely loves it. The craftsmanship is impeccable.',
    date: '2024-01-10',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    rating: 4,
    comment: 'Beautiful design and great functionality. The velvet lining protects my jewelry perfectly.',
    date: '2024-01-08',
  },
  {
    id: '4',
    name: 'David Thompson',
    rating: 5,
    comment: 'Premium quality at a reasonable price. Shipping was fast and packaging was excellent.',
    date: '2024-01-05',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-white to-amber-50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                New Collection 2024
              </Badge>
              <h1 className="font-playfair text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Elegance Meets
                <span className="text-amber-700"> Craftsmanship</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-xl">
                Discover our exquisite collection of handcrafted jewelry boxes. Each piece is
                designed to protect and showcase your precious treasures in timeless style.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="bg-amber-700 hover:bg-amber-800" asChild>
                  <Link href="/products">
                    Shop Collection
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-amber-700">10K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-700">500+</div>
                  <div className="text-sm text-gray-600">Designs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-amber-700">4.9</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=600&fit=crop"
                alt="Luxury jewelry boxes collection"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <Truck className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Free Shipping</div>
                <div className="text-sm text-gray-600">On orders over $50</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <Shield className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Secure Checkout</div>
                <div className="text-sm text-gray-600">100% Protected</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <Award className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Premium Quality</div>
                <div className="text-sm text-gray-600">Handcrafted Excellence</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <Star className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Top Rated</div>
                <div className="text-sm text-gray-600">5-Star Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 sm:text-4xl">
              Featured Collection
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover our handpicked selection of premium jewelry boxes
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 sm:text-4xl">
              Shop by Category
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Find the perfect jewelry box for your needs
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.name.toLowerCase().replace(' ', '-')}`}
                className="group relative overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-105"
              >
                <div className="relative h-64">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-200">{category.count} Products</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 sm:text-4xl">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join thousands of satisfied customers
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardContent className="pt-6">
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mb-4 text-sm text-gray-700 italic">"{testimonial.comment}"</p>
                  <div className="text-sm font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(testimonial.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-br from-amber-700 to-amber-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <Mail className="mx-auto h-12 w-12 text-white mb-4" />
            <h2 className="font-playfair text-3xl font-bold text-white sm:text-4xl mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-lg text-amber-100 mb-8">
              Get exclusive deals, new arrivals, and design inspiration delivered to your inbox
            </p>
            <form className="flex flex-col gap-4 sm:flex-row justify-center">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-gray-900 sm:w-96"
                required
              />
              <Button type="submit" size="lg" className="bg-white text-amber-900 hover:bg-amber-50">
                Subscribe
              </Button>
            </form>
            <p className="mt-4 text-sm text-amber-200">
              Join 10,000+ subscribers. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
