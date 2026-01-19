export const SITE_CONFIG = {
  name: 'Elegant Jewelry Boxes',
  description: 'Premium jewelry boxes for your precious treasures',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  email: 'support@elegantjewelryboxes.com',
  phone: '+1 (555) 123-4567',
}

export const CURRENCY = 'USD'
export const CURRENCY_SYMBOL = '$'

export const SHIPPING_METHODS = [
  { id: 'standard', name: 'Standard Shipping', price: 5.99, days: '5-7 business days' },
  { id: 'express', name: 'Express Shipping', price: 12.99, days: '2-3 business days' },
  { id: 'overnight', name: 'Overnight Shipping', price: 24.99, days: '1 business day' },
]

export const TAX_RATE = 0.08 // 8%

export const ITEMS_PER_PAGE = 12
