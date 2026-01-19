# Cart and Checkout Components

This directory contains all cart and checkout related components for the e-commerce platform.

## Cart Components (`/components/cart/`)

### CartItem.tsx
Individual cart item component displaying product information with quantity controls.

**Features:**
- Product image and name (linked to product page)
- Unit price and total price display
- Quantity selector with +/- buttons
- Respects stock limits (max quantity based on available stock)
- Remove item button
- Product variant display (size, color, etc.)
- Low stock warnings

**Props:**
```typescript
interface CartItemProps {
  item: CartItemData
  onUpdateQuantity?: (id: string, quantity: number) => void
  onRemove?: (id: string) => void
}
```

**Usage:**
```tsx
import { CartItem } from '@/components/cart'

<CartItem
  item={cartItem}
  onUpdateQuantity={(id, qty) => updateCart(id, qty)}
  onRemove={(id) => removeFromCart(id)}
/>
```

---

### CartSummary.tsx
Cart summary sidebar showing price breakdown and checkout action.

**Features:**
- Subtotal, shipping, tax, and discount display
- Total price calculation
- Coupon code input with validation
- Applied coupon display with remove option
- Proceed to checkout button
- Free shipping indicator
- Responsive sticky positioning

**Props:**
```typescript
interface CartSummaryProps {
  subtotal: number
  shipping?: number
  tax?: number
  discount?: number
  couponCode?: string
  onApplyCoupon?: (code: string) => Promise<{ success: boolean; message?: string }>
  onRemoveCoupon?: () => void
}
```

**Usage:**
```tsx
import { CartSummary } from '@/components/cart'

<CartSummary
  subtotal={99.99}
  shipping={5.99}
  tax={8.50}
  discount={10.00}
  couponCode="SAVE10"
  onApplyCoupon={async (code) => {
    // Validate coupon
    return { success: true }
  }}
  onRemoveCoupon={() => removeCoupon()}
/>
```

---

### MiniCart.tsx
Dropdown/modal mini cart for quick cart overview.

**Features:**
- Dialog/modal presentation
- Item count badge
- Simplified cart item list
- Subtotal calculation
- View cart and checkout buttons
- Empty cart state with CTA
- Remove item functionality
- Responsive design

**Props:**
```typescript
interface MiniCartProps {
  items: MiniCartItem[]
  isOpen: boolean
  onClose: () => void
  onRemoveItem?: (id: string) => void
}
```

**Usage:**
```tsx
import { MiniCart } from '@/components/cart'

<MiniCart
  items={cartItems}
  isOpen={isMiniCartOpen}
  onClose={() => setIsMiniCartOpen(false)}
  onRemoveItem={(id) => removeFromCart(id)}
/>
```

---

## Checkout Components (`/components/checkout/`)

### CheckoutForm.tsx
Multi-step checkout form with step navigation and validation.

**Features:**
- 3-step process: Shipping → Payment → Review
- Visual step indicators with progress tracking
- Step navigation (can go back, forward locked until valid)
- Data persistence across steps
- Final order review before submission
- Edit functionality on review step

**Props:**
```typescript
interface CheckoutFormProps {
  cartItems: Array<{...}>
  subtotal: number
  shipping: number
  tax: number
  total: number
  onSubmit?: (data: CheckoutData) => Promise<void>
}
```

**Usage:**
```tsx
import { CheckoutForm } from '@/components/checkout'

<CheckoutForm
  cartItems={items}
  subtotal={99.99}
  shipping={5.99}
  tax={8.50}
  total={114.48}
  onSubmit={async (data) => {
    // Process order
    await createOrder(data)
  }}
/>
```

---

### ShippingForm.tsx
Shipping information form with validation.

**Features:**
- Email, name, phone, and address fields
- Guest and logged-in user support
- Saved address selector (for logged-in users)
- Save address checkbox (for logged-in users)
- US state selector dropdown
- Country selector
- Form validation with react-hook-form + zod
- Responsive layout

**Validation Schema:**
- Email: Valid email format
- Name: Required fields
- Phone: Minimum 10 digits
- Address: Required with minimum length
- City, State, ZIP, Country: Required

**Props:**
```typescript
interface ShippingFormProps {
  onSubmit: (data: ShippingFormData) => void
  initialData?: ShippingFormData
  isLoggedIn?: boolean
  savedAddresses?: Array<{...}>
}
```

**Usage:**
```tsx
import { ShippingForm } from '@/components/checkout'

<ShippingForm
  onSubmit={(data) => handleShippingSubmit(data)}
  initialData={previousData}
  isLoggedIn={!!user}
  savedAddresses={user?.addresses}
/>
```

---

### PaymentForm.tsx
Payment form with Stripe integration placeholder.

**Features:**
- Payment method selection (Card, PayPal, Apple Pay)
- Stripe Card Element placeholder (for production integration)
- Cardholder name input
- Billing address section
- "Same as shipping" checkbox
- Different billing address form
- Terms and conditions acceptance
- Security badge
- Form validation with react-hook-form + zod

**Props:**
```typescript
interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => void
  initialData?: PaymentFormData
  shippingAddress?: ShippingFormData
}
```

**Usage:**
```tsx
import { PaymentForm } from '@/components/checkout'

<PaymentForm
  onSubmit={(data) => handlePaymentSubmit(data)}
  shippingAddress={shippingData}
/>
```

---

### OrderSummary.tsx
Order summary component for checkout sidebar.

**Features:**
- Product list with images and quantities
- Variant information display
- Price breakdown (subtotal, shipping, tax, discount)
- Total calculation
- Shipping method display
- Item count
- Edit cart link
- Scrollable product list
- Sticky positioning
- Free shipping indicator

**Props:**
```typescript
interface OrderSummaryProps {
  items: OrderSummaryItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  discount?: number
  shippingMethod?: string
  editable?: boolean
}
```

**Usage:**
```tsx
import { OrderSummary } from '@/components/checkout'

<OrderSummary
  items={cartItems}
  subtotal={99.99}
  shipping={5.99}
  tax={8.50}
  total={114.48}
  discount={10.00}
  shippingMethod="Standard Shipping"
  editable={true}
/>
```

---

## Common Features

All components include:
- **TypeScript** with proper type definitions
- **Tailwind CSS** for styling (premium theme)
- **lucide-react** icons
- **Responsive design** (mobile-first approach)
- **Accessibility** features (ARIA labels, keyboard navigation)
- **Loading states** and error handling
- **Form validation** (react-hook-form + zod where applicable)

## Integration Example

### Cart Page
```tsx
import { CartItem, CartSummary } from '@/components/cart'

export default function CartPage() {
  const [cartItems, setCartItems] = useState([...])
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        {cartItems.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
          />
        ))}
      </div>
      <div className="lg:col-span-1">
        <CartSummary
          subtotal={calculateSubtotal()}
          onApplyCoupon={applyCoupon}
        />
      </div>
    </div>
  )
}
```

### Header with MiniCart
```tsx
import { MiniCart } from '@/components/cart'

export default function Header() {
  const [showMiniCart, setShowMiniCart] = useState(false)
  
  return (
    <header>
      <button onClick={() => setShowMiniCart(true)}>
        Cart ({itemCount})
      </button>
      <MiniCart
        items={cartItems}
        isOpen={showMiniCart}
        onClose={() => setShowMiniCart(false)}
      />
    </header>
  )
}
```

### Checkout Page
```tsx
import { CheckoutForm } from '@/components/checkout'

export default function CheckoutPage() {
  return (
    <CheckoutForm
      cartItems={items}
      subtotal={subtotal}
      shipping={shipping}
      tax={tax}
      total={total}
      onSubmit={processOrder}
    />
  )
}
```

## TODO for Production

1. **Stripe Integration**
   - Replace Stripe Element placeholder in PaymentForm
   - Implement actual card processing
   - Add payment intent creation

2. **State Management**
   - Connect to actual cart state (Redux, Zustand, etc.)
   - Implement API calls for cart operations
   - Add optimistic updates

3. **Backend Integration**
   - Connect coupon validation endpoint
   - Implement order creation API
   - Add address saving functionality

4. **Additional Features**
   - Add cart persistence (localStorage/session)
   - Implement real-time stock validation
   - Add shipping method selection
   - Include gift message options
   - Add estimated delivery dates

5. **Testing**
   - Unit tests for all components
   - Integration tests for checkout flow
   - E2E tests for complete purchase journey

## Design System

### Colors
- Primary: Blue-600 (#2563eb)
- Success: Green-600 (#16a34a)
- Error: Red-600 (#dc2626)
- Warning: Amber-600 (#d97706)
- Gray scale: gray-50 to gray-900

### Typography
- Headings: font-semibold to font-bold
- Body: text-sm to text-base
- Small text: text-xs

### Spacing
- Consistent padding: p-4, p-6
- Gap between elements: gap-2, gap-4, gap-6
- Margin: mt-2, mt-4, mb-6

### Border Radius
- Small: rounded-md (0.375rem)
- Medium: rounded-lg (0.5rem)
- Full: rounded-full
