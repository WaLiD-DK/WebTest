import Link from 'next/link'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import EmptyState from '@/components/common/EmptyState'

// Placeholder cart data
const cartItems = [
  {
    id: '1',
    productId: '1',
    productName: 'Elegant Velvet Jewelry Box',
    productSlug: 'elegant-velvet-jewelry-box',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    price: 69.99,
    quantity: 2,
    stock: 10,
  },
  {
    id: '2',
    productId: '2',
    productName: 'Modern Wooden Display Case',
    productSlug: 'modern-wooden-display-case',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500&h=500&fit=crop',
    price: 129.99,
    quantity: 1,
    stock: 5,
  },
]

export default function CartPage() {
  const hasItems = cartItems.length > 0

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity
  }, 0)

  const tax = subtotal * 0.08
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + tax + shipping

  if (!hasItems) {
    return (
      <div className="container mx-auto px-4 py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Add some beautiful jewelry boxes to your cart"
          action={{
            label: 'Start Shopping',
            onClick: () => {},
          }}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="font-playfair text-3xl font-bold text-gray-900 md:text-4xl">
          Shopping Cart
        </h1>
        <p className="mt-2 text-gray-600">{cartItems.length} items in your cart</p>
      </div>

      {/* Cart Content */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={(id: string, quantity: number) => console.log('Update quantity:', id, quantity)}
              onRemove={(id: string) => console.log('Remove item:', id)}
            />
          ))}

          {/* Continue Shopping */}
          <div className="pt-4 border-t">
            <Button variant="outline" asChild>
              <Link href="/products">
                <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <CartSummary
            subtotal={subtotal}
            tax={tax}
            shipping={shipping}
          />
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-12 border-t pt-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 text-center">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-amber-700">Free Shipping</div>
            <p className="text-sm text-gray-600">On orders over $50</p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-amber-700">Secure Checkout</div>
            <p className="text-sm text-gray-600">SSL encrypted payment</p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-amber-700">Easy Returns</div>
            <p className="text-sm text-gray-600">30-day return policy</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Shopping Cart',
  description: 'Review your items and proceed to checkout',
}
