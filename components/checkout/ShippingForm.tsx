'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { User, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const shippingSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address is required'),
  apartment: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'ZIP code is required'),
  country: z.string().min(2, 'Country is required'),
  saveAddress: z.boolean().optional(),
})

export type ShippingFormData = z.infer<typeof shippingSchema>

interface ShippingFormProps {
  onSubmit: (data: ShippingFormData) => void
  initialData?: ShippingFormData
  isLoggedIn?: boolean
  savedAddresses?: Array<{
    id: string
    label: string
    address: Partial<ShippingFormData>
  }>
}

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
]

export default function ShippingForm({
  onSubmit,
  initialData,
  isLoggedIn = false,
  savedAddresses = [],
}: ShippingFormProps) {
  const [selectedAddressId, setSelectedAddressId] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: initialData || {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US',
      saveAddress: false,
    },
  })

  const handleSavedAddressChange = (addressId: string) => {
    setSelectedAddressId(addressId)
    const selectedAddress = savedAddresses.find((addr) => addr.id === addressId)
    if (selectedAddress?.address) {
      Object.entries(selectedAddress.address).forEach(([key, value]) => {
        if (value !== undefined) {
          setValue(key as keyof ShippingFormData, value)
        }
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Shipping Information</h2>
        <p className="text-sm text-gray-600">
          {isLoggedIn ? 'Review your shipping details' : 'Enter your shipping details'}
        </p>
      </div>

      {/* Saved Addresses (for logged-in users) */}
      {isLoggedIn && savedAddresses.length > 0 && (
        <div>
          <Label htmlFor="savedAddress">Use Saved Address</Label>
          <Select value={selectedAddressId} onValueChange={handleSavedAddressChange}>
            <SelectTrigger id="savedAddress" className="mt-1.5">
              <SelectValue placeholder="Select a saved address" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">Enter new address</SelectItem>
              {savedAddresses.map((addr) => (
                <SelectItem key={addr.id} value={addr.id}>
                  {addr.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Email */}
      <div>
        <Label htmlFor="email" className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          className="mt-1.5"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            First Name
          </Label>
          <Input
            id="firstName"
            placeholder="John"
            {...register('firstName')}
            className="mt-1.5"
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            {...register('lastName')}
            className="mt-1.5"
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div>
        <Label htmlFor="phone" className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          Phone Number
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="(555) 123-4567"
          {...register('phone')}
          className="mt-1.5"
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {/* Address Fields */}
      <div>
        <Label htmlFor="address" className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Street Address
        </Label>
        <Input
          id="address"
          placeholder="123 Main St"
          {...register('address')}
          className="mt-1.5"
        />
        {errors.address && (
          <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
        <Input
          id="apartment"
          placeholder="Apt 4B"
          {...register('apartment')}
          className="mt-1.5"
        />
      </div>

      {/* City, State, ZIP */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="New York"
            {...register('city')}
            className="mt-1.5"
          />
          {errors.city && (
            <p className="mt-1 text-xs text-red-600">{errors.city.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Select
            value={watch('state')}
            onValueChange={(value) => setValue('state', value)}
          >
            <SelectTrigger id="state" className="mt-1.5">
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
          {errors.state && (
            <p className="mt-1 text-xs text-red-600">{errors.state.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input
            id="zipCode"
            placeholder="10001"
            {...register('zipCode')}
            className="mt-1.5"
          />
          {errors.zipCode && (
            <p className="mt-1 text-xs text-red-600">{errors.zipCode.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Select
            value={watch('country')}
            onValueChange={(value) => setValue('country', value)}
          >
            <SelectTrigger id="country" className="mt-1.5">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US">United States</SelectItem>
              <SelectItem value="CA">Canada</SelectItem>
              <SelectItem value="MX">Mexico</SelectItem>
            </SelectContent>
          </Select>
          {errors.country && (
            <p className="mt-1 text-xs text-red-600">{errors.country.message}</p>
          )}
        </div>
      </div>

      {/* Save Address (for logged-in users) */}
      {isLoggedIn && (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="saveAddress"
            {...register('saveAddress')}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <Label htmlFor="saveAddress" className="cursor-pointer font-normal">
            Save this address for future orders
          </Label>
        </div>
      )}

      {/* Submit Button */}
      <Button type="submit" size="lg" className="w-full">
        Continue to Payment
      </Button>
    </form>
  )
}
