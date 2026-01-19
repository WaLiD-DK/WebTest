# Admin Panel Components

Professional admin panel components for managing the e-commerce platform.

## Components

### 1. ProductForm.tsx
Comprehensive product form with full validation and features.

**Features:**
- Basic information (name, SKU, slug, description)
- Pricing (regular, sale, cost)
- Product details (material, dimensions, weight, compartments)
- Multi-select categories
- Color options management
- Features chips
- Stock management with status
- SEO fields
- Product flags (featured, bestseller, new, active)
- React Hook Form + Zod validation

**Usage:**
```tsx
import ProductForm from "@/components/admin/ProductForm";

<ProductForm
  initialData={product}
  onSubmit={async (data) => {
    // Handle save
    console.log(data);
  }}
  onCancel={() => {
    // Handle cancel
  }}
/>
```

### 2. OrderTable.tsx
Full-featured orders data table.

**Features:**
- Sortable columns
- Search functionality
- Status filter
- Quick status update via dropdown
- Payment status badges
- Pagination
- Export functionality
- View details action

**Usage:**
```tsx
import OrderTable from "@/components/admin/OrderTable";

<OrderTable orders={orders} />
```

### 3. CustomerTable.tsx
Customer management table.

**Features:**
- Sortable columns
- Search by name, email, phone
- Role badges
- Order count display
- Total spent tracking
- Pagination
- Export functionality
- View customer action

**Usage:**
```tsx
import CustomerTable from "@/components/admin/CustomerTable";

<CustomerTable customers={customers} />
```

### 4. StatsCard.tsx
Dashboard statistics card with trend indicators.

**Features:**
- Icon display
- Large value display
- Trend indicator (up/down with percentage)
- Subtitle support
- 5 color variants (default, blue, green, purple, orange)

**Usage:**
```tsx
import StatsCard from "@/components/admin/StatsCard";
import { DollarSign } from "lucide-react";

<StatsCard
  title="Total Revenue"
  value="$45,231.89"
  icon={DollarSign}
  trend={{
    value: 12.5,
    isPositive: true
  }}
  subtitle="Compared to last month"
  variant="green"
/>
```

### 5. SalesChart.tsx
Interactive sales chart with multiple views.

**Features:**
- Line and bar chart toggle
- Date range selector (7/30/90/365 days)
- Dual Y-axis (revenue and orders)
- Interactive tooltip
- Legend
- Responsive design
- Auto-generated sample data

**Usage:**
```tsx
import SalesChart from "@/components/admin/SalesChart";

<SalesChart data={salesData} />
```

### 6. ImageUpload.tsx
Advanced image upload with drag & drop.

**Features:**
- Drag and drop support
- Multiple image upload
- Image preview thumbnails
- Featured image toggle
- Drag to reorder
- Upload progress indicator
- File validation (size, type)
- Remove images
- Configurable max images and size

**Usage:**
```tsx
import ImageUpload from "@/components/admin/ImageUpload";

<ImageUpload
  maxImages={10}
  maxFileSize={5}
  onImagesChange={(images) => {
    console.log(images);
  }}
  initialImages={existingImages}
/>
```

## Dependencies

All components use:
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Base components
- **lucide-react** - Icons
- **react-hook-form** - Form handling (ProductForm)
- **zod** - Validation (ProductForm)
- **recharts** - Charts (SalesChart)

## Installation

Recharts is already installed. If you need to reinstall:

```bash
npm install recharts
```

## Styling

All components follow a professional admin theme:
- Clean, minimal design
- Consistent spacing
- Proper hover states
- Responsive layouts
- Accessible colors

## API Integration

All components include placeholder functions for API calls. Replace these with actual API endpoints:

```typescript
// Example: OrderTable.tsx
const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
  // Replace with actual API call
  const response = await fetch(`/api/orders/${orderId}`, {
    method: 'PATCH',
    body: JSON.stringify({ status: newStatus }),
  });
};
```

## TypeScript Types

All components are fully typed. Key interfaces:

```typescript
// ProductForm
type ProductFormData = z.infer<typeof productSchema>;

// OrderTable
type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

// CustomerTable
type CustomerRole = "CUSTOMER" | "ADMIN" | "VIP";

// ImageUpload
interface ImageFile {
  id: string;
  file: File;
  preview: string;
  isFeatured: boolean;
}
```

## Notes

- All tables include sample data for demonstration
- Components are client-side ("use client")
- Forms are fully validated
- All components are responsive
- Proper error handling included
- Accessibility considerations implemented
