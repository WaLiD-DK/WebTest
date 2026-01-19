"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavigationProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation({
  className,
  orientation = "horizontal",
}: NavigationProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={cn(
        "flex text-sm font-medium",
        orientation === "horizontal" ? "items-center space-x-6" : "flex-col space-y-1",
        className
      )}
      aria-label="Main navigation"
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "transition-colors hover:text-primary",
            orientation === "vertical" && "rounded-md px-3 py-2 hover:bg-muted",
            isActive(item.href)
              ? "text-primary font-semibold"
              : "text-muted-foreground"
          )}
          aria-current={isActive(item.href) ? "page" : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
