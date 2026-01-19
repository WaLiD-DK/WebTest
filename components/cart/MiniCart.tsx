'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export interface MiniCartItem {
  id: string
  productId: string
  productName: string
  productSlug: string
  image: string
  price: number
  quantity: number
  variant?: {
    size?: string
    color?: string
    [key: string]: string | undefined
  }
}

interface MiniCartProps {
  items: MiniCartItem[]
  isOpen: boolean
  onClose: () => void
  onRemoveItem?: (id: string) => void
}

export default function MiniCart({ items, isOpen, onClose, onRemoveItem }: MiniCartProps) {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  const handleRemoveItem = (id: string) => {
    onRemoveItem?.(id)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart
            {itemCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        {items.length === 0 ? (
          // Empty Cart State
          <div className="py-12 text-center">
            <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-sm text-gray-500 mb-6">
              Add items to your cart to get started
            </p>
            <Button asChild onClick={onClose}>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="max-h-[400px] overflow-y-auto -mx-6 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    {/* Product Image */}
                    <Link
                      href={`/products/${item.productSlug}`}
                      onClick={onClose}
                      className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 hover:opacity-75 transition-opacity"
                    >
                      <Image
                        src={item.image}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${item.productSlug}`}
                            onClick={onClose}
                            className="text-sm font-medium text-gray-900 hover:text-gray-700 line-clamp-2"
                          >
                            {item.productName}
                          </Link>
                          
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

                          {/* Quantity & Price */}
                          <div className="mt-1 flex items-center gap-2 text-sm">
                            <span className="text-gray-600">Qty: {item.quantity}</span>
                            <span className="text-gray-400">×</span>
                            <span className="font-medium text-gray-900">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Subtotal */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-base font-medium text-gray-900">Subtotal</span>
              <span className="text-lg font-semibold text-gray-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button asChild className="w-full" size="lg">
                <Link href="/checkout" onClick={onClose}>
                  Checkout
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full" size="lg">
                <Link href="/cart" onClick={onClose}>
                  View Cart
                </Link>
              </Button>
            </div>

            {/* Additional Info */}
            <p className="text-xs text-center text-gray-500 mt-4">
              Shipping and taxes calculated at checkout
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
