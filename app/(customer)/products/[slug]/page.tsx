import Link from 'next/link'
import { ChevronRight, Heart, Minus, Plus, ShoppingCart, Star, Share2, Truck, Shield, RotateCcw } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProductImageGallery } from '@/components/products/ProductImageGallery'
import { ProductReviews } from '@/components/products/ProductReviews'
import { RelatedProducts } from '@/components/products/RelatedProducts'
import { Card, CardContent } from '@/components/ui/card'

// Placeholder product data
const getProduct = (slug: string) => {
  type PlaceholderImage = {
    id: string
    imageUrl: string
    altText: string
    displayOrder: number
  }

  type PlaceholderProduct = {
    id: string
    name: string
    slug: string
    description: string
    regularPrice: number
    salePrice: number | null
    stockStatus: string
    sku: string
    isNew: boolean
    isFeatured: boolean
    ratingAverage: number
    reviewCount: number
    material: string
    dimensions: string
    weight: string
    colors: string[]
    features: string[]
    images: PlaceholderImage[]
    categories: { category: { id: string; name: string; slug: string } }[]
  }

  const products: PlaceholderProduct[] = [
    {
      id: '1',
      name: 'Elegant Velvet Jewelry Box',
      slug: 'elegant-velvet-jewelry-box',
      description: 'Indulge in luxury with our Elegant Velvet Jewelry Box. This exquisite piece features premium velvet lining, multiple compartments, and a sophisticated design that complements any decor.',
      regularPrice: 89.99,
      salePrice: 69.99,
      stockStatus: 'IN_STOCK',
      sku: 'JB-001',
      isNew: true,
      isFeatured: true,
      ratingAverage: 4.8,
      reviewCount: 124,
      material: 'Premium Velvet & Wood',
      dimensions: '10" W x 7" D x 4" H',
      weight: '2.5 lbs',
      colors: ['Burgundy', 'Navy Blue', 'Forest Green', 'Black'],
      features: [
        'Soft velvet interior lining',
        'Multiple compartments for organization',
        'Secure metal clasp',
        'Anti-tarnish lining',
        'Removable ring cushion',
        'Mirror inside lid',
      ],
      images: [
        {
          id: '1',
          imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop',
          altText: 'Elegant velvet jewelry box - main view',
          displayOrder: 0,
        },
        {
          id: '2',
          imageUrl: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=800&fit=crop',
          altText: 'Elegant velvet jewelry box - interior view',
          displayOrder: 1,
        },
        {
          id: '3',
          imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop',
          altText: 'Elegant velvet jewelry box - compartments',
          displayOrder: 2,
        },
        {
          id: '4',
          imageUrl: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&h=800&fit=crop',
          altText: 'Elegant velvet jewelry box - side view',
          displayOrder: 3,
        },
      ],
      categories: [{ category: { id: '1', name: 'Luxury Boxes', slug: 'luxury' } }],
    },
  ]

  return products.find((p) => p.slug === slug)
}

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProduct(params.slug)

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  const price = product.salePrice || product.regularPrice

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: 'website',
      images: [
        {
          url: product.images[0].imageUrl,
          width: 800,
          height: 800,
          alt: product.images[0].altText,
        },
      ],
    },
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProduct(params.slug)

  if (!product) {
    notFound()
  }

  const hasDiscount = product.salePrice && product.salePrice < product.regularPrice
  const discountPercentage = hasDiscount && product.salePrice
    ? Math.round(((product.regularPrice - product.salePrice) / product.regularPrice) * 100)
    : 0

  const price = product.salePrice || product.regularPrice

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.map((img) => img.imageUrl),
    description: product.description,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: 'JewelBox',
    },
    offers: {
      '@type': 'Offer',
      url: `https://jewelbox.com/products/${product.slug}`,
      priceCurrency: 'USD',
      price: price,
      availability: `https://schema.org/${product.stockStatus === 'IN_STOCK' ? 'InStock' : 'OutOfStock'}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.ratingAverage,
      reviewCount: product.reviewCount,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-amber-700 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/products" className="hover:text-amber-700 transition-colors">
            Products
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href={`/products?category=${product.categories[0].category.slug}`}
            className="hover:text-amber-700 transition-colors"
          >
            {product.categories[0].category.name}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        {/* Product Main Section */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image Gallery */}
          <div>
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.isNew && (
                <Badge className="bg-blue-600 hover:bg-blue-700">New Arrival</Badge>
              )}
              {product.isFeatured && (
                <Badge className="bg-purple-600 hover:bg-purple-700">Featured</Badge>
              )}
              {hasDiscount && (
                <Badge variant="destructive">Save {discountPercentage}%</Badge>
              )}
            </div>

            {/* Title and SKU */}
            <div>
              <h1 className="font-playfair text-3xl font-bold text-gray-900 md:text-4xl">
                {product.name}
              </h1>
              <p className="mt-2 text-sm text-gray-600">SKU: {product.sku}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(product.ratingAverage)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.ratingAverage} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              {hasDiscount && product.salePrice ? (
                <>
                  <span className="text-4xl font-bold text-amber-700">
                    ${product.salePrice.toFixed(2)}
                  </span>
                  <span className="text-2xl text-gray-500 line-through">
                    ${product.regularPrice.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-4xl font-bold text-gray-900">
                  ${product.regularPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-900">
                  Color: <span className="font-normal text-gray-600">{product.colors[0]}</span>
                </label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className="h-10 w-10 rounded-full border-2 border-gray-300 hover:border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-offset-2"
                      style={{
                        backgroundColor: color.toLowerCase().replace(' ', ''),
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-900">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-lg border border-gray-300">
                  <button className="px-4 py-2 hover:bg-gray-100 transition-colors">
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    value="1"
                    min="1"
                    className="w-16 border-x border-gray-300 text-center py-2 focus:outline-none"
                    readOnly
                  />
                  <button className="px-4 py-2 hover:bg-gray-100 transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.stockStatus === 'IN_STOCK' ? (
                    <span className="text-green-600 font-medium">In Stock</span>
                  ) : (
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  )}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-amber-700 hover:bg-amber-800 text-lg"
                disabled={product.stockStatus !== 'IN_STOCK'}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button size="lg" variant="outline" className="w-full">
                  <Heart className="mr-2 h-5 w-5" />
                  Add to Wishlist
                </Button>
                <Button size="lg" variant="outline" className="w-full">
                  <Share2 className="mr-2 h-5 w-5" />
                  Share
                </Button>
              </div>
            </div>

            {/* Product Features */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-amber-700" />
                    <div className="text-sm">
                      <div className="font-semibold">Free Shipping</div>
                      <div className="text-gray-600">On orders over $50</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-amber-700" />
                    <div className="text-sm">
                      <div className="font-semibold">2 Year Warranty</div>
                      <div className="text-gray-600">Quality guaranteed</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="h-5 w-5 text-amber-700" />
                    <div className="text-sm">
                      <div className="font-semibold">30-Day Returns</div>
                      <div className="text-gray-600">Easy returns</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent"
              >
                Reviews ({product.reviewCount})
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-700 data-[state=active]:bg-transparent"
              >
                Shipping
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-8">
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">Product Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-amber-700 mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <p className="text-gray-700">{product.description}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-8">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold">Material:</span>
                    <span className="text-gray-700">{product.material}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold">Dimensions:</span>
                    <span className="text-gray-700">{product.dimensions}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold">Weight:</span>
                    <span className="text-gray-700">{product.weight}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold">SKU:</span>
                    <span className="text-gray-700">{product.sku}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold">Color Options:</span>
                    <span className="text-gray-700">{product.colors?.length || 0}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold">Category:</span>
                    <span className="text-gray-700">{product.categories[0].category.name}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold">Warranty:</span>
                    <span className="text-gray-700">2 Years</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold">Made In:</span>
                    <span className="text-gray-700">USA</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <ProductReviews
                productId={product.id}
                reviews={[]}
                averageRating={product.ratingAverage}
                totalReviews={product.reviewCount}
              />
            </TabsContent>

            <TabsContent value="shipping" className="mt-8">
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Free Shipping</h4>
                    <p className="text-gray-700">
                      We offer free standard shipping on all orders over $50 within the United States.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Delivery Times</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Standard Shipping: 5-7 business days</li>
                      <li>• Express Shipping: 2-3 business days</li>
                      <li>• Overnight Shipping: 1 business day</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">International Shipping</h4>
                    <p className="text-gray-700">
                      We ship to most countries worldwide. International shipping times vary by location.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProducts products={[]} />
        </div>
      </div>
    </>
  )
}
