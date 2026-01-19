'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

interface OrderSummaryItem {
  id: string
  productName: string
  productSlug: string
  image: string
  price: number
  quantity: number
  variant?: Record<string, string>
}

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

export default function OrderSummary({
  items,
  subtotal,
  shipping,
  tax,
  total,
  discount = 0,
  shippingMethod = 'Standard Shipping',
  editable = true,
}: OrderSummaryProps) {
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden sticky top-4">
      {/* Header */}
      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
          {editable && (
            <Button variant="ghost" size="sm" asChild>
              <Link href="/cart" className="flex items-center gap-1">
                <Edit2 className="h-4 w-4" />
                Edit
              </Link>
            </Button>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </p>
      </div>

      {/* Items List */}
      <div className="p-6">
        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              {/* Product Image */}
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <Image
                  src={item.image}
                  alt={item.productName}
                  fill
                  className="object-cover"
                />
                {/* Quantity Badge */}
                <div className="absolute -top-2 -right-2 h-6 w-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                  {item.quantity}
                </div>
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                  {item.productName}
                </h3>
                
                {/* Variant Info */}
                {item.variant && Object.keys(item.variant).length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1 text-xs text-gray-500">
                    {Object.entries(item.variant).map(([key, value]) =>
                      value ? (
                        <span key={key} className="capitalize">
                          {value}
                        </span>
                      ) : null
                    )}
                  </div>
                )}

                {/* Price */}
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              Shipping
              {shippingMethod && (
                <span className="text-xs text-gray-500 ml-1">
                  ({shippingMethod})
                </span>
              )}
            </span>
            {shipping > 0 ? (
              <span className="font-medium text-gray-900">${shipping.toFixed(2)}</span>
            ) : (
              <span className="font-medium text-green-600">FREE</span>
            )}
          </div>

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
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
        </div>

        {/* Additional Info */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Free shipping</strong> on orders over $50
          </p>
        </div>
      </div>
    </div>
  )
}
