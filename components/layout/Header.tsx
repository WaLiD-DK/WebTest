"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Menu, User, LogOut, Package, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import MobileNav from "./MobileNav";

interface HeaderProps {
  cartItemCount?: number;
  isAuthenticated?: boolean;
  userRole?: "admin" | "customer";
  userName?: string;
}

export default function Header({
  cartItemCount = 0,
  isAuthenticated = false,
  userRole = "customer",
  userName = "Guest",
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </Button>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <span className="text-lg font-bold text-primary-foreground">JB</span>
              </div>
              <span className="hidden font-bold sm:inline-block text-xl">
                Jewel<span className="text-secondary">Box</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/"
                className="transition-colors hover:text-primary text-muted-foreground"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="transition-colors hover:text-primary text-muted-foreground"
              >
                Products
              </Link>
              <Link
                href="/about"
                className="transition-colors hover:text-primary text-muted-foreground"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="transition-colors hover:text-primary text-muted-foreground"
              >
                Contact
              </Link>
              {userRole === "admin" && (
                <Link
                  href="/admin"
                  className="transition-colors hover:text-secondary text-accent font-semibold"
                >
                  Admin Panel
                </Link>
              )}
            </nav>

            {/* Search Bar - Desktop */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-md mx-4"
            >
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search jewelry boxes..."
                  className="w-full pl-10 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search products"
                />
              </div>
            </form>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* User Menu */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="User menu">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5 text-sm font-medium">
                      {userName}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="cursor-pointer">
                        <Package className="mr-2 h-4 w-4" />
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Login</Link>
                </Button>
              )}

              {/* Shopping Cart */}
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link href="/cart" aria-label={`Shopping cart with ${cartItemCount} items`}>
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {cartItemCount > 99 ? "99+" : cartItemCount}
                    </Badge>
                  )}
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-3">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search jewelry boxes..."
                  className="w-full pl-10 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search products"
                />
              </div>
            </form>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        userName={userName}
      />
    </>
  );
}
