import Image from 'next/image'
import { Award, Heart, Users, Target, Mail, Phone, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: 'Quality Craftsmanship',
      description: 'Every piece is handcrafted with meticulous attention to detail and premium materials.',
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We go above and beyond to exceed expectations.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We believe in building lasting relationships with our customers and community.',
    },
    {
      icon: Target,
      title: 'Sustainability',
      description: 'Committed to eco-friendly practices and sustainable sourcing of materials.',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="font-playfair text-4xl font-bold text-gray-900 md:text-5xl mb-6">
          Our Story
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          For over 20 years, we've been crafting exquisite jewelry boxes that protect and showcase
          your most precious treasures.
        </p>
      </div>

      {/* Story Section */}
      <div className="mb-16 grid gap-12 lg:grid-cols-2 items-center">
        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=600&fit=crop"
            alt="Our workshop"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="font-playfair text-3xl font-bold text-gray-900">
            Crafting Excellence Since 2003
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our journey began in a small workshop with a simple mission: to create jewelry boxes
            that are as beautiful as the treasures they hold. What started as a passion project has
            grown into a thriving business serving thousands of customers worldwide.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Every jewelry box we create is a testament to our commitment to quality, craftsmanship,
            and timeless design. We work with skilled artisans who pour their expertise and passion
            into every piece, ensuring that each box is not just a storage solution, but a work of
            art in itself.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Today, we continue to innovate while staying true to our roots, combining traditional
            craftsmanship with modern design to create jewelry boxes that stand the test of time.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mb-16 bg-amber-50 rounded-2xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            To create exceptional jewelry boxes that combine beauty, functionality, and
            craftsmanship, while providing an unparalleled customer experience.
          </p>
          <p className="text-gray-600">
            We believe that every piece of jewelry deserves a home as special as the memories it
            holds. That's why we're dedicated to crafting jewelry boxes that not only protect your
            treasures but also become cherished possessions in their own right.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="font-playfair text-3xl font-bold text-gray-900 text-center mb-12">
          Our Values
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <Card key={value.title}>
              <CardContent className="pt-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                    <value.icon className="h-8 w-8 text-amber-700" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-16 bg-gradient-to-br from-amber-700 to-amber-900 rounded-2xl p-8 md:p-12 text-white">
        <div className="grid gap-8 md:grid-cols-4 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">20+</div>
            <div className="text-amber-100">Years Experience</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">10K+</div>
            <div className="text-amber-100">Happy Customers</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-amber-100">Unique Designs</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">4.9</div>
            <div className="text-amber-100">Average Rating</div>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="bg-white border rounded-2xl p-8 md:p-12">
        <h2 className="font-playfair text-3xl font-bold text-gray-900 text-center mb-12">
          Get in Touch
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 flex-shrink-0">
              <MapPin className="h-6 w-6 text-amber-700" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600">
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
              <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600">
                +1 (555) 123-4567
                <br />
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
              <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600">
                support@jewelbox.com
                <br />
                sales@jewelbox.com
                <br />
                info@jewelbox.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'About Us',
  description:
    'Learn about our story, mission, and values. Crafting exquisite jewelry boxes since 2003.',
  openGraph: {
    title: 'About JewelBox',
    description:
      'For over 20 years, we\'ve been crafting exquisite jewelry boxes that protect and showcase your most precious treasures.',
    type: 'website',
  },
}
