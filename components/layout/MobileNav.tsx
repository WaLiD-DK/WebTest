"use client";

import Link from "next/link";
import { X, Home, Package, Info, Mail, ShieldCheck, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated?: boolean;
  userRole?: "admin" | "customer";
  userName?: string;
}

export default function MobileNav({
  isOpen,
  onClose,
  isAuthenticated = false,
  userRole = "customer",
  userName = "Guest",
}: MobileNavProps) {
  const handleLogout = () => {
    console.log("Logout clicked");
    onClose();
  };

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Products", icon: Package },
    { href: "/about", label: "About", icon: Info },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/80 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-background shadow-lg lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <span className="text-lg font-bold text-primary-foreground">JB</span>
              </div>
              <span className="font-bold text-xl">
                Jewel<span className="text-secondary">Box</span>
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* User Info */}
          {isAuthenticated && (
            <div className="border-b px-4 py-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-4 py-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}

              {userRole === "admin" && (
                <>
                  <Separator className="my-4" />
                  <li>
                    <Link
                      href="/admin"
                      onClick={onClose}
                      className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-accent transition-colors hover:bg-muted hover:text-secondary"
                    >
                      <ShieldCheck className="h-5 w-5" />
                      <span>Admin Panel</span>
                    </Link>
                  </li>
                </>
              )}

              {isAuthenticated && (
                <>
                  <Separator className="my-4" />
                  <li>
                    <Link
                      href="/orders"
                      onClick={onClose}
                      className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                    >
                      <Package className="h-5 w-5" />
                      <span>My Orders</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t px-4 py-4">
            {isAuthenticated ? (
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Button asChild className="w-full">
                <Link href="/login" onClick={onClose}>
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
