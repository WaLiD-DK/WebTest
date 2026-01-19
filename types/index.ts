import { Prisma } from '@prisma/client'

export type ProductWithImages = Prisma.ProductGetPayload<{
  include: { images: true; categories: { include: { category: true } } }
}>

export type ProductWithAll = Prisma.ProductGetPayload<{
  include: {
    images: true
    categories: { include: { category: true } }
    reviews: { include: { user: true; images: true } }
    variants: true
  }
}>

export type OrderWithItems = Prisma.OrderGetPayload<{
  include: { orderItems: { include: { product: true } }; user: true }
}>

export type CartItem = Prisma.CartGetPayload<{
  include: { product: { include: { images: true } } }
}>

export type UserWithAll = Prisma.UserGetPayload<{
  include: { addresses: true; orders: true; wishlist: true }
}>

export type ReviewWithUser = Prisma.ReviewGetPayload<{
  include: { user: true; images: true }
}>
