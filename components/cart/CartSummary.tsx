'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Tag, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

interface CartSummaryProps {
  subtotal: number
  shipping?: number
  tax?: number
  discount?: number
  couponCode?: string
  onApplyCoupon?: (code: string) => Promise<{ success: boolean; message?: string }>
  onRemoveCoupon?: () => void
}

export default function CartSummary({
  subtotal,
  shipping = 0,
  tax = 0,
  discount = 0,
  couponCode,
  onApplyCoupon,
  onRemoveCoupon,
}: CartSummaryProps) {
  const router = useRouter()
  const [coupon, setCoupon] = useState('')
  const [isApplying, setIsApplying] = useState(false)
  const [couponError, setCouponError] = useState('')
  const [couponSuccess, setCouponSuccess] = useState('')

  const total = subtotal + shipping + tax - discount

  const handleApplyCoupon = async () => {
    if (!coupon.trim()) return

    setIsApplying(true)
    setCouponError('')
    setCouponSuccess('')

    try {
      const result = await onApplyCoupon?.(coupon.trim())
      if (result?.success) {
        setCouponSuccess('Coupon applied successfully!')
        setCoupon('')
      } else {
        setCouponError(result?.message || 'Invalid coupon code')
      }
    } catch (error) {
      setCouponError('Failed to apply coupon')
    } finally {
      setIsApplying(false)
    }
  }

  const handleRemoveCoupon = () => {
    onRemoveCoupon?.()
    setCouponSuccess('')
    setCouponError('')
  }

  const handleCheckout = () => {
    router.push('/checkout')
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 sticky top-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

      {/* Price Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
        </div>

        {shipping > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium text-gray-900">${shipping.toFixed(2)}</span>
          </div>
        )}

        {shipping === 0 && subtotal > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium text-green-600">FREE</span>
          </div>
        )}

        {tax > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
          </div>
        )}

        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Discount</span>
            <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
          </div>
        )}
      </div>

      <Separator className="my-4" />

      {/* Total */}
      <div className="flex justify-between text-base font-semibold text-gray-900 mb-6">
        <span>Total</span>
        <span className="text-xl">${total.toFixed(2)}</span>
      </div>

      {/* Coupon Section */}
      {!couponCode ? (
        <div className="mb-4">
          <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
            Have a coupon code?
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="coupon"
                type="text"
                placeholder="Enter code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                className="pl-9"
                disabled={isApplying}
              />
            </div>
            <Button
              variant="outline"
              onClick={handleApplyCoupon}
              disabled={!coupon.trim() || isApplying}
            >
              {isApplying ? 'Applying...' : 'Apply'}
            </Button>
          </div>
          {couponError && (
            <p className="mt-2 text-xs text-red-600">{couponError}</p>
          )}
          {couponSuccess && (
            <p className="mt-2 text-xs text-green-600">{couponSuccess}</p>
          )}
        </div>
      ) : (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-900">{couponCode}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50 h-6"
              onClick={handleRemoveCoupon}
            >
              Remove
            </Button>
          </div>
        </div>
      )}

      {/* Checkout Button */}
      <Button
        className="w-full"
        size="lg"
        onClick={handleCheckout}
        disabled={subtotal === 0}
      >
        Proceed to Checkout
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>

      {/* Additional Info */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Taxes calculated at checkout
        </p>
      </div>
    </div>
  )
}
