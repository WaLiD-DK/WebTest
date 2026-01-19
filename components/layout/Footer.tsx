"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <span className="text-lg font-bold text-primary-foreground">JB</span>
              </div>
              <span className="font-bold text-xl">
                Jewel<span className="text-secondary">Box</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Exquisite jewelry boxes crafted with precision and elegance. Protect your precious
              treasures in style.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                asChild
                aria-label="Facebook"
              >
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                asChild
                aria-label="Twitter"
              >
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                asChild
                aria-label="Instagram"
              >
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                asChild
                aria-label="YouTube"
              >
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Returns & Exchanges
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/account"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
            <div className="space-y-2 pt-2">
              <p className="text-sm font-medium">Contact Us</p>
              <p className="text-sm text-muted-foreground">
                Email: support@jewelbox.com
              </p>
              <p className="text-sm text-muted-foreground">
                Phone: +1 (555) 123-4567
              </p>
              <p className="text-sm text-muted-foreground">
                Mon-Fri: 9AM-6PM EST
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex flex-col space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email for newsletter"
                  className="w-full"
                />
                <Button type="submit" className="w-full" size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  Subscribe
                </Button>
              </div>
            </form>
            <p className="text-xs text-muted-foreground">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {currentYear} JewelBox. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="/privacy" className="transition-colors hover:text-primary">
                Privacy
              </Link>
              <Link href="/terms" className="transition-colors hover:text-primary">
                Terms
              </Link>
              <Link href="/sitemap" className="transition-colors hover:text-primary">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
