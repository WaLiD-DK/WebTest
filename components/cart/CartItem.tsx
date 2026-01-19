'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface CartItemData {
  id: string
  productId: string
  productName: string
  productSlug: string
  image: string
  price: number
  quantity: number
  stock: number
  variant?: {
    size?: string
    color?: string
    [key: string]: string | undefined
  }
}

interface CartItemProps {
  item: CartItemData
  onUpdateQuantity?: (id: string, quantity: number) => void
  onRemove?: (id: string) => void
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= item.stock) {
      onUpdateQuantity?.(item.id, newQuantity)
    }
  }

  const handleRemove = () => {
    onRemove?.(item.id)
  }

  const itemTotal = item.price * item.quantity

  return (
    <div className="flex gap-4 py-6 border-b border-gray-200 last:border-0">
      {/* Product Image */}
      <Link href={`/products/${item.productSlug}`} className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 hover:opacity-75 transition-opacity">
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
          <div className="flex-1">
            <Link href={`/products/${item.productSlug}`} className="font-medium text-gray-900 hover:text-gray-700 transition-colors">
              {item.productName}
            </Link>
            
            {/* Variant Info */}
            {item.variant && Object.keys(item.variant).length > 0 && (
              <div className="mt-1 flex flex-wrap gap-2 text-sm text-gray-500">
                {Object.entries(item.variant).map(([key, value]) => 
                  value ? (
                    <span key={key} className="capitalize">
                      {key}: <span className="font-medium text-gray-700">{value}</span>
                    </span>
                  ) : null
                )}
              </div>
            )}

            {/* Price */}
            <div className="mt-2">
              <p className="text-sm text-gray-900">
                ${item.price.toFixed(2)} each
              </p>
            </div>
          </div>

          {/* Total Price */}
          <div className="ml-4 text-right">
            <p className="text-lg font-semibold text-gray-900">
              ${itemTotal.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Quantity Controls & Remove Button */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 rounded-r-none hover:bg-gray-100"
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <input
                type="text"
                value={item.quantity}
                readOnly
                className="h-8 w-12 border-x border-gray-300 text-center text-sm font-medium focus:outline-none"
              />
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 rounded-l-none hover:bg-gray-100"
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={item.quantity >= item.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Stock Info */}
            {item.quantity >= item.stock && (
              <span className="text-xs text-amber-600 font-medium">
                Max quantity
              </span>
            )}
            {item.stock <= 5 && item.quantity < item.stock && (
              <span className="text-xs text-amber-600 font-medium">
                Only {item.stock} left
              </span>
            )}
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleRemove}
          >
            <X className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  )
}
