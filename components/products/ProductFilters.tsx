'use client'

import { useState } from 'react'
import { X, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface Category {
  id: string
  name: string
  slug: string
}

export interface ProductFilterState {
  categories: string[]
  priceRange: { min: number; max: number }
  materials: string[]
  colors: string[]
  features: string[]
}

interface ProductFiltersProps {
  categories?: Category[]
  onFilterChange: (filters: ProductFilterState) => void
  className?: string
}

const MATERIAL_OPTIONS = [
  'Wood',
  'Leather',
  'Velvet',
  'Metal',
  'Glass',
  'Acrylic',
  'Fabric',
]

const COLOR_OPTIONS = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Brown', hex: '#8B4513' },
  { name: 'Gold', hex: '#FFD700' },
  { name: 'Silver', hex: '#C0C0C0' },
  { name: 'Red', hex: '#DC2626' },
  { name: 'Blue', hex: '#2563EB' },
  { name: 'Pink', hex: '#EC4899' },
  { name: 'Green', hex: '#16A34A' },
]

const FEATURE_OPTIONS = [
  'Lock & Key',
  'Mirror',
  'Travel-friendly',
  'Multiple Compartments',
  'Ring Rolls',
  'Necklace Hooks',
  'Drawer System',
  'Stackable',
]

export function ProductFilters({
  categories = [],
  onFilterChange,
  className,
}: ProductFiltersProps) {
  const [filters, setFilters] = useState<ProductFilterState>({
    categories: [],
    priceRange: { min: 0, max: 1000 },
    materials: [],
    colors: [],
    features: [],
  })

  const updateFilters = (newFilters: Partial<ProductFilterState>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFilterChange(updated)
  }

  const toggleArrayFilter = (
    key: keyof Pick<ProductFilterState, 'categories' | 'materials' | 'colors' | 'features'>,
    value: string
  ) => {
    const currentValues = filters[key]
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]
    updateFilters({ [key]: newValues })
  }

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseFloat(value) || 0
    updateFilters({
      priceRange: {
        ...filters.priceRange,
        [type]: numValue,
      },
    })
  }

  const clearAllFilters = () => {
    const resetFilters: ProductFilterState = {
      categories: [],
      priceRange: { min: 0, max: 1000 },
      materials: [],
      colors: [],
      features: [],
    }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.materials.length > 0 ||
    filters.colors.length > 0 ||
    filters.features.length > 0 ||
    filters.priceRange.min > 0 ||
    filters.priceRange.max < 1000

  return (
    <div className={cn('space-y-6 rounded-lg bg-white p-6 shadow-sm', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-amber-700" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-amber-700 hover:text-amber-800"
          >
            Clear all
          </Button>
        )}
      </div>

      <Separator />

      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <Label className="mb-3 block text-sm font-semibold text-gray-900">
            Category
          </Label>
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.id)}
                  onChange={() => toggleArrayFilter('categories', category.id)}
                  className="h-4 w-4 rounded border-gray-300 text-amber-700 focus:ring-amber-600"
                />
                <span className="text-sm text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Price Range */}
      <div>
        <Label className="mb-3 block text-sm font-semibold text-gray-900">
          Price Range
        </Label>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Input
              type="number"
              placeholder="Min"
              value={filters.priceRange.min || ''}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              className="text-sm"
              min="0"
            />
          </div>
          <span className="text-gray-500">-</span>
          <div className="flex-1">
            <Input
              type="number"
              placeholder="Max"
              value={filters.priceRange.max || ''}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              className="text-sm"
              min="0"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Materials */}
      <div>
        <Label className="mb-3 block text-sm font-semibold text-gray-900">
          Material
        </Label>
        <div className="space-y-2">
          {MATERIAL_OPTIONS.map((material) => (
            <label
              key={material}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="checkbox"
                checked={filters.materials.includes(material)}
                onChange={() => toggleArrayFilter('materials', material)}
                className="h-4 w-4 rounded border-gray-300 text-amber-700 focus:ring-amber-600"
              />
              <span className="text-sm text-gray-700">{material}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Colors */}
      <div>
        <Label className="mb-3 block text-sm font-semibold text-gray-900">
          Color
        </Label>
        <div className="grid grid-cols-5 gap-2">
          {COLOR_OPTIONS.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleArrayFilter('colors', color.name)}
              className={cn(
                'relative h-10 w-10 rounded-full border-2 transition-all hover:scale-110',
                filters.colors.includes(color.name)
                  ? 'border-amber-700 ring-2 ring-amber-700 ring-offset-2'
                  : 'border-gray-300'
              )}
              style={{ backgroundColor: color.hex }}
              title={color.name}
              aria-label={color.name}
            >
              {color.name === 'White' && (
                <div className="absolute inset-0 rounded-full border border-gray-200" />
              )}
              {filters.colors.includes(color.name) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-white shadow-lg" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Features */}
      <div>
        <Label className="mb-3 block text-sm font-semibold text-gray-900">
          Features
        </Label>
        <div className="space-y-2">
          {FEATURE_OPTIONS.map((feature) => (
            <label
              key={feature}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="checkbox"
                checked={filters.features.includes(feature)}
                onChange={() => toggleArrayFilter('features', feature)}
                className="h-4 w-4 rounded border-gray-300 text-amber-700 focus:ring-amber-600"
              />
              <span className="text-sm text-gray-700">{feature}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
