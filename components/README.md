# Components Documentation

This directory contains reusable UI components for the JewelBox e-commerce application.

## Directory Structure

```
components/
├── layout/          # Layout components
├── common/          # Common/shared components
└── ui/             # Base UI components (shadcn/ui)
```

## Layout Components (`/components/layout/`)

### Header.tsx
Main site header with responsive navigation, search, user menu, and shopping cart.

**Props:**
- `cartItemCount?: number` - Number of items in cart
- `isAuthenticated?: boolean` - User authentication status
- `userRole?: "admin" | "customer"` - User role
- `userName?: string` - Display name

**Features:**
- Responsive design (mobile/desktop)
- Search bar with autocomplete support
- User account dropdown menu
- Shopping cart icon with badge
- Mobile menu integration

### Footer.tsx
Site footer with company info, links, newsletter signup, and social media.

**Features:**
- Four-column layout (responsive)
- Newsletter subscription form
- Social media links
- Quick links and customer service sections
- Copyright notice

### Navigation.tsx
Reusable navigation menu component.

**Props:**
- `className?: string` - Additional CSS classes
- `orientation?: "horizontal" | "vertical"` - Layout direction

**Features:**
- Active link highlighting
- Accessible navigation

### MobileNav.tsx
Mobile navigation drawer/sidebar.

**Props:**
- `isOpen: boolean` - Drawer visibility
- `onClose: () => void` - Close handler
- `isAuthenticated?: boolean` - User authentication status
- `userRole?: "admin" | "customer"` - User role
- `userName?: string` - Display name

**Features:**
- Slide-in drawer with backdrop
- Icon-based navigation
- User profile section
- Role-based links

### AdminSidebar.tsx
Admin panel sidebar navigation.

**Features:**
- Fixed sidebar layout
- Active page highlighting
- Admin-specific navigation links
- Logout functionality

## Common Components (`/components/common/`)

### SearchBar.tsx
Search input with autocomplete dropdown.

**Props:**
- `placeholder?: string` - Input placeholder
- `onSearch?: (query: string) => void` - Search handler
- `onResultClick?: (result: SearchResult) => void` - Result click handler
- `showAutocomplete?: boolean` - Enable/disable autocomplete

**Features:**
- Debounced search
- Autocomplete results
- Clear button
- Keyboard navigation

### Rating.tsx
Star rating display and input component.

**Exports:**
- `Rating` - Main component (read-only or interactive)
- `RatingDisplay` - Read-only variant
- `RatingInput` - Interactive variant

**Props:**
- `rating: number` - Current rating value
- `maxRating?: number` - Maximum rating (default: 5)
- `size?: "sm" | "md" | "lg"` - Star size
- `interactive?: boolean` - Enable user input
- `onChange?: (rating: number) => void` - Rating change handler
- `showCount?: boolean` - Show review count
- `count?: number` - Number of reviews

**Features:**
- Half-star support
- Hover effects (interactive mode)
- Accessible

### Pagination.tsx
Pagination controls with page numbers.

**Exports:**
- `Pagination` - Main pagination component
- `PaginationInfo` - Simple text info (e.g., "Showing 1-10 of 100")

**Props:**
- `currentPage: number` - Current page
- `totalPages: number` - Total number of pages
- `onPageChange: (page: number) => void` - Page change handler
- `showFirstLast?: boolean` - Show first/last buttons
- `maxVisible?: number` - Max visible page numbers

**Features:**
- Ellipsis for large page counts
- First/last page navigation
- Accessible

### LoadingSpinner.tsx
Loading indicators with multiple variants.

**Exports:**
- `LoadingSpinner` - Main spinner
- `ButtonSpinner` - Inline spinner for buttons
- `LoadingOverlay` - Full-screen overlay spinner
- `SpinnerWithSkeleton` - Spinner with skeleton loading

**Props:**
- `size?: "sm" | "md" | "lg" | "xl"` - Spinner size
- `text?: string` - Loading text
- `fullScreen?: boolean` - Full-screen mode

### EmptyState.tsx
Empty state displays with icons and actions.

**Exports:**
- `EmptyState` - Main component
- `EmptySearchResults` - Preset for search results
- `EmptyCart` - Preset for empty cart
- `EmptyProductList` - Preset for product lists
- `ErrorState` - Preset for error states

**Props:**
- `icon?: LucideIcon` - Custom icon
- `title: string` - Title text
- `description?: string` - Description text
- `action?: { label: string; onClick: () => void }` - Primary action
- `secondaryAction?: { label: string; onClick: () => void }` - Secondary action
- `variant?: "default" | "search" | "cart" | "error" | "products"` - Preset variant

### ErrorBoundary.tsx
React error boundary component (class component).

**Exports:**
- `ErrorBoundary` - Class component
- `ErrorBoundaryWrapper` - Functional wrapper

**Props:**
- `children: ReactNode` - Child components
- `fallback?: ReactNode` - Custom error UI
- `onError?: (error: Error, errorInfo: React.ErrorInfo) => void` - Error handler
- `onReset?: () => void` - Reset handler

**Features:**
- Catches React component errors
- Development/production modes
- Error details in development
- Reset functionality

## Usage Examples

### Header
```tsx
import { Header } from "@/components/layout";

<Header 
  cartItemCount={3}
  isAuthenticated={true}
  userRole="customer"
  userName="John Doe"
/>
```

### Rating
```tsx
import { RatingDisplay, RatingInput } from "@/components/common";

// Display only
<RatingDisplay rating={4.5} showCount count={128} />

// Interactive
<RatingInput 
  rating={rating} 
  onChange={(value) => setRating(value)} 
/>
```

### Pagination
```tsx
import { Pagination, PaginationInfo } from "@/components/common";

<PaginationInfo 
  currentPage={1}
  totalPages={10}
  totalItems={95}
  itemsPerPage={10}
/>
<Pagination 
  currentPage={currentPage}
  totalPages={10}
  onPageChange={setCurrentPage}
/>
```

### Loading States
```tsx
import { LoadingSpinner, LoadingOverlay } from "@/components/common";

// Simple spinner
<LoadingSpinner text="Loading products..." />

// Full-screen overlay
<LoadingOverlay text="Processing your order..." />
```

### Empty States
```tsx
import { EmptyCart, EmptySearchResults } from "@/components/common";

<EmptyCart onBrowse={() => router.push("/products")} />

<EmptySearchResults 
  query={searchQuery} 
  onClear={() => setSearchQuery("")}
/>
```

### Error Boundary
```tsx
import { ErrorBoundary } from "@/components/common";

<ErrorBoundary onError={(error, info) => console.error(error)}>
  <YourComponent />
</ErrorBoundary>
```

## Styling

All components use:
- **Tailwind CSS** for styling
- **CSS variables** from `globals.css` for theming
- **lucide-react** icons
- **shadcn/ui** base components

### Theme Colors
- Primary: Brown (#2b1810)
- Secondary: Copper (#b8712f)
- Accent: Purple (#8b5cf6)
- Destructive: Red (#ef4444)

## Accessibility

All components include:
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Focus management
- Semantic HTML

## Notes

- All components are **client components** (`"use client"`) for interactivity
- State management uses React hooks (no external state libraries required)
- All components are fully typed with TypeScript
- Placeholder functions are used for API calls and authentication
- Components are responsive and mobile-friendly
