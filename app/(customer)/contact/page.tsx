'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="font-playfair text-4xl font-bold text-gray-900 md:text-5xl mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have a question or need assistance? We're here to help. Send us a message and we'll
          respond within 24 hours.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 flex-shrink-0">
                  <MapPin className="h-6 w-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Visit Our Store</h3>
                  <p className="text-sm text-gray-600">
                    123 Artisan Lane
                    <br />
                    New York, NY 10001
                    <br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 flex-shrink-0">
                  <Phone className="h-6 w-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                  <p className="text-sm text-gray-600 mb-2">+1 (555) 123-4567</p>
                  <p className="text-xs text-gray-500">
                    Mon-Fri: 9AM-6PM EST
                    <br />
                    Sat: 10AM-4PM EST
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 flex-shrink-0">
                  <Mail className="h-6 w-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                  <p className="text-sm text-gray-600">
                    <a
                      href="mailto:support@jewelbox.com"
                      className="hover:text-amber-700 transition-colors"
                    >
                      support@jewelbox.com
                    </a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Hours */}
          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Monday - Friday:</span>
                <span className="font-semibold">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saturday:</span>
                <span className="font-semibold">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sunday:</span>
                <span className="font-semibold">Closed</span>
              </div>
              <p className="text-xs text-gray-500 pt-2">
                *All times in EST (Eastern Standard Time)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted && (
                <div className="mb-6 flex items-center gap-3 rounded-lg bg-green-50 border border-green-200 p-4">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-900">Message sent successfully!</p>
                    <p className="text-sm text-green-700">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">
                    Subject <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What is this regarding?"
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? 'border-red-500' : ''}
                  />
                  {errors.subject && (
                    <p className="text-sm text-red-600">{errors.subject}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">
                    Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'border-red-500' : ''}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-600">{errors.message}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    Minimum 10 characters ({formData.message.length}/10)
                  </p>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-amber-700 hover:bg-amber-800"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16 bg-amber-50 rounded-2xl p-8 md:p-12">
        <h2 className="font-playfair text-3xl font-bold text-gray-900 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What are your shipping times?</h3>
            <p className="text-sm text-gray-600">
              Standard shipping takes 5-7 business days. Express and overnight options are also
              available.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Do you offer international shipping?</h3>
            <p className="text-sm text-gray-600">
              Yes, we ship to most countries worldwide. Shipping times vary by location.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What is your return policy?</h3>
            <p className="text-sm text-gray-600">
              We offer a 30-day return policy for all unused items in original packaging.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Do you offer custom designs?</h3>
            <p className="text-sm text-gray-600">
              Yes! Contact us to discuss your custom jewelry box design requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
