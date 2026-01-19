'use client'

import React, { useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ShippingForm, { type ShippingFormData } from './ShippingForm'
import PaymentForm, { type PaymentFormData } from './PaymentForm'
import OrderSummary from './OrderSummary'

export interface CheckoutData {
  shipping: ShippingFormData
  payment: PaymentFormData
}

interface CheckoutFormProps {
  cartItems: Array<{
    id: string
    productName: string
    productSlug: string
    image: string
    price: number
    quantity: number
    variant?: Record<string, string>
  }>
  subtotal: number
  shipping: number
  tax: number
  total: number
  onSubmit?: (data: CheckoutData) => Promise<void>
}

type Step = 'shipping' | 'payment' | 'review'

const steps: { id: Step; label: string; number: number }[] = [
  { id: 'shipping', label: 'Shipping', number: 1 },
  { id: 'payment', label: 'Payment', number: 2 },
  { id: 'review', label: 'Review', number: 3 },
]

export default function CheckoutForm({
  cartItems,
  subtotal,
  shipping,
  tax,
  total,
  onSubmit,
}: CheckoutFormProps) {
  const [currentStep, setCurrentStep] = useState<Step>('shipping')
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null)
  const [paymentData, setPaymentData] = useState<PaymentFormData | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)

  const handleShippingSubmit = (data: ShippingFormData) => {
    setShippingData(data)
    setCurrentStep('payment')
  }

  const handlePaymentSubmit = (data: PaymentFormData) => {
    setPaymentData(data)
    setCurrentStep('review')
  }

  const handleFinalSubmit = async () => {
    if (!shippingData || !paymentData) return

    setIsSubmitting(true)
    try {
      await onSubmit?.({
        shipping: shippingData,
        payment: paymentData,
      })
    } catch (error) {
      console.error('Order submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const goToStep = (step: Step) => {
    const targetIndex = steps.findIndex((s) => s.id === step)
    if (targetIndex <= currentStepIndex) {
      setCurrentStep(step)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Indicators */}
        <div className="mb-8">
          <nav aria-label="Progress">
            <ol className="flex items-center justify-center">
              {steps.map((step, index) => (
                <li key={step.id} className="relative flex items-center">
                  {/* Step Circle */}
                  <button
                    onClick={() => goToStep(step.id)}
                    disabled={index > currentStepIndex}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold transition-all ${
                      index < currentStepIndex
                        ? 'bg-green-600 border-green-600 text-white cursor-pointer hover:bg-green-700'
                        : index === currentStepIndex
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-gray-300 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {index < currentStepIndex ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      step.number
                    )}
                  </button>

                  {/* Step Label */}
                  <span
                    className={`ml-2 text-sm font-medium ${
                      index <= currentStepIndex ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </span>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`ml-4 mr-2 h-0.5 w-16 lg:w-24 ${
                        index < currentStepIndex ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Forms */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {currentStep === 'shipping' && (
                <ShippingForm
                  onSubmit={handleShippingSubmit}
                  initialData={shippingData || undefined}
                />
              )}

              {currentStep === 'payment' && (
                <div>
                  <PaymentForm
                    onSubmit={handlePaymentSubmit}
                    initialData={paymentData || undefined}
                    shippingAddress={shippingData || undefined}
                  />
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep('shipping')}
                    className="mt-4"
                  >
                    Back to Shipping
                  </Button>
                </div>
              )}

              {currentStep === 'review' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Order</h2>

                  {/* Shipping Info */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">Shipping Address</h3>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => setCurrentStep('shipping')}
                        className="h-auto p-0"
                      >
                        Edit
                      </Button>
                    </div>
                    {shippingData && (
                      <div className="text-sm text-gray-600">
                        <p>{shippingData.firstName} {shippingData.lastName}</p>
                        <p>{shippingData.address}</p>
                        {shippingData.apartment && <p>{shippingData.apartment}</p>}
                        <p>
                          {shippingData.city}, {shippingData.state} {shippingData.zipCode}
                        </p>
                        <p>{shippingData.country}</p>
                        <p className="mt-2">{shippingData.email}</p>
                        <p>{shippingData.phone}</p>
                      </div>
                    )}
                  </div>

                  {/* Payment Info */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">Payment Method</h3>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => setCurrentStep('payment')}
                        className="h-auto p-0"
                      >
                        Edit
                      </Button>
                    </div>
                    {paymentData && (
                      <div className="text-sm text-gray-600">
                        <p>Card ending in •••• {paymentData.cardLastFour || '****'}</p>
                        <p className="mt-2">
                          {paymentData.sameAsShipping
                            ? 'Billing address same as shipping'
                            : 'Different billing address'}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep('payment')}
                      disabled={isSubmitting}
                    >
                      Back to Payment
                    </Button>
                    <Button
                      onClick={handleFinalSubmit}
                      disabled={isSubmitting}
                      className="flex-1"
                      size="lg"
                    >
                      {isSubmitting ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary
              items={cartItems}
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
