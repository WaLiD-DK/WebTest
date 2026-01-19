import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { registerSchema } from '@/lib/validations/auth'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await hash(validatedData.password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        passwordHash,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phone: validatedData.phone || null,
        role: 'CUSTOMER',
        emailVerified: false,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    })

    return NextResponse.json(
      {
        message: 'Account created successfully',
        user,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', issues: error.issues },
        { status: 400 }
      )
    }

    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    )
  }
}
