'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { CreditCard, Lock, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import type { ShippingFormData } from './ShippingForm'

const paymentSchema = z.object({
  paymentMethod: z.enum(['card', 'paypal', 'applePay']),
  // Card details would be handled by Stripe Element in production
  cardholderName: z.string().min(2, 'Cardholder name is required'),
  cardLastFour: z.string().optional(),
  sameAsShipping: z.boolean(),
  billingAddress: z.string().optional(),
  billingApartment: z.string().optional(),
  billingCity: z.string().optional(),
  billingState: z.string().optional(),
  billingZipCode: z.string().optional(),
  billingCountry: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine(
  (data) => {
    if (!data.sameAsShipping) {
      return (
        data.billingAddress &&
        data.billingCity &&
        data.billingState &&
        data.billingZipCode &&
        data.billingCountry
      )
    }
    return true
  },
  {
    message: 'Billing address is required',
    path: ['billingAddress'],
  }
)

export type PaymentFormData = z.infer<typeof paymentSchema>

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => void
  initialData?: PaymentFormData
  shippingAddress?: ShippingFormData
}

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
]

export default function PaymentForm({
  onSubmit,
  initialData,
  shippingAddress,
}: PaymentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: initialData || {
      paymentMethod: 'card',
      cardholderName: '',
      sameAsShipping: true,
      acceptTerms: false,
      billingCountry: 'US',
    },
  })

  const paymentMethod = watch('paymentMethod')
  const sameAsShipping = watch('sameAsShipping')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Information</h2>
        <p className="text-sm text-gray-600">
          Choose your payment method and enter your payment details
        </p>
      </div>

      {/* Payment Method Selection */}
      <div>
        <Label htmlFor="paymentMethod">Payment Method</Label>
        <Select
          value={paymentMethod}
          onValueChange={(value) => setValue('paymentMethod', value as 'card' | 'paypal' | 'applePay')}
        >
          <SelectTrigger id="paymentMethod" className="mt-1.5">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="card">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Credit/Debit Card
              </div>
            </SelectItem>
            <SelectItem value="paypal">
              <div className="flex items-center gap-2">
                PayPal
              </div>
            </SelectItem>
            <SelectItem value="applePay">
              <div className="flex items-center gap-2">
                Apple Pay
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Card Payment Form */}
      {paymentMethod === 'card' && (
        <div className="space-y-4">
          {/* Stripe Card Element Placeholder */}
          <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="h-5 w-5 text-gray-500" />
              <p className="font-medium text-gray-700">Stripe Card Element</p>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              In production, this would be replaced with Stripe's CardElement component for secure card input.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-white border border-gray-300 rounded text-sm text-gray-500">
                Card Number: •••• •••• •••• ••••
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white border border-gray-300 rounded text-sm text-gray-500">
                  MM / YY
                </div>
                <div className="p-3 bg-white border border-gray-300 rounded text-sm text-gray-500">
                  CVC
                </div>
              </div>
            </div>
          </div>

          {/* Cardholder Name */}
          <div>
            <Label htmlFor="cardholderName">Cardholder Name</Label>
            <Input
              id="cardholderName"
              placeholder="John Doe"
              {...register('cardholderName')}
              className="mt-1.5"
            />
            {errors.cardholderName && (
              <p className="mt-1 text-xs text-red-600">{errors.cardholderName.message}</p>
            )}
          </div>

          {/* Security Badge */}
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <Lock className="h-4 w-4 text-green-600" />
            <p className="text-xs text-green-800">
              Your payment information is encrypted and secure
            </p>
          </div>
        </div>
      )}

      {/* PayPal Placeholder */}
      {paymentMethod === 'paypal' && (
        <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-center">
          <p className="font-medium text-gray-700 mb-2">PayPal Integration</p>
          <p className="text-sm text-gray-600">
            PayPal button would appear here in production
          </p>
        </div>
      )}

      {/* Apple Pay Placeholder */}
      {paymentMethod === 'applePay' && (
        <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-center">
          <p className="font-medium text-gray-700 mb-2">Apple Pay Integration</p>
          <p className="text-sm text-gray-600">
            Apple Pay button would appear here in production
          </p>
        </div>
      )}

      <Separator />

      {/* Billing Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Billing Address
        </h3>

        {/* Same as Shipping Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="sameAsShipping"
            {...register('sameAsShipping')}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <Label htmlFor="sameAsShipping" className="cursor-pointer font-normal">
            Same as shipping address
          </Label>
        </div>

        {/* Show Shipping Address Preview */}
        {sameAsShipping && shippingAddress && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Billing address:</p>
            <div className="text-sm text-gray-900">
              <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
              <p>{shippingAddress.address}</p>
              {shippingAddress.apartment && <p>{shippingAddress.apartment}</p>}
              <p>
                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
              </p>
              <p>{shippingAddress.country}</p>
            </div>
          </div>
        )}

        {/* Different Billing Address Form */}
        {!sameAsShipping && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="billingAddress">Street Address</Label>
              <Input
                id="billingAddress"
                placeholder="123 Main St"
                {...register('billingAddress')}
                className="mt-1.5"
              />
              {errors.billingAddress && (
                <p className="mt-1 text-xs text-red-600">{errors.billingAddress.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="billingApartment">Apartment, suite, etc. (optional)</Label>
              <Input
                id="billingApartment"
                placeholder="Apt 4B"
                {...register('billingApartment')}
                className="mt-1.5"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="billingCity">City</Label>
                <Input
                  id="billingCity"
                  placeholder="New York"
                  {...register('billingCity')}
                  className="mt-1.5"
                />
                {errors.billingCity && (
                  <p className="mt-1 text-xs text-red-600">{errors.billingCity.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="billingState">State</Label>
                <Select
                  value={watch('billingState')}
                  onValueChange={(value) => setValue('billingState', value)}
                >
                  <SelectTrigger id="billingState" className="mt-1.5">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.billingState && (
                  <p className="mt-1 text-xs text-red-600">{errors.billingState.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="billingZipCode">ZIP Code</Label>
                <Input
                  id="billingZipCode"
                  placeholder="10001"
                  {...register('billingZipCode')}
                  className="mt-1.5"
                />
                {errors.billingZipCode && (
                  <p className="mt-1 text-xs text-red-600">{errors.billingZipCode.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="billingCountry">Country</Label>
                <Select
                  value={watch('billingCountry')}
                  onValueChange={(value) => setValue('billingCountry', value)}
                >
                  <SelectTrigger id="billingCountry" className="mt-1.5">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="MX">Mexico</SelectItem>
                  </SelectContent>
                </Select>
                {errors.billingCountry && (
                  <p className="mt-1 text-xs text-red-600">{errors.billingCountry.message}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* Terms and Conditions */}
      <div className="space-y-4">
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="acceptTerms"
            {...register('acceptTerms')}
            className="h-4 w-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <Label htmlFor="acceptTerms" className="cursor-pointer font-normal text-sm">
            I agree to the{' '}
            <a href="/terms" className="text-blue-600 hover:underline">
              Terms and Conditions
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </Label>
        </div>
        {errors.acceptTerms && (
          <p className="text-xs text-red-600">{errors.acceptTerms.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" size="lg" className="w-full">
        Continue to Review
      </Button>
    </form>
  )
}
