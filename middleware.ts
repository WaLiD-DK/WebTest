import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = await auth()

  // Protect /admin routes - only ADMIN and MANAGER roles
  if (pathname.startsWith('/admin')) {
    if (!session?.user) {
      return NextResponse.redirect(new URL('/login?redirect=/admin', request.url))
    }

    const allowedRoles = ['ADMIN', 'MANAGER']
    if (!allowedRoles.includes(session.user.role)) {
      return NextResponse.redirect(new URL('/?error=unauthorized', request.url))
    }
  }

  // Protect /account routes - any authenticated user
  if (pathname.startsWith('/account')) {
    if (!session?.user) {
      return NextResponse.redirect(new URL('/login?redirect=/account', request.url))
    }
  }

  // Redirect authenticated users away from auth pages
  if ((pathname === '/login' || pathname === '/register') && session?.user) {
    return NextResponse.redirect(new URL('/account', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/account/:path*',
    '/login',
    '/register',
  ],
}
