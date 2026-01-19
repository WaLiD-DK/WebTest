"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { X, Plus, Save, XCircle } from "lucide-react";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  sku: z.string().min(1, "SKU is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  regularPrice: z.number().min(0, "Price must be positive"),
  salePrice: z.number().min(0).optional(),
  costPrice: z.number().min(0).optional(),
  material: z.string().optional(),
  dimensions: z.string().optional(),
  weight: z.number().min(0).optional(),
  compartments: z.number().int().min(0).optional(),
  quantity: z.number().int().min(0, "Quantity must be 0 or more"),
  lowStockThreshold: z.number().int().min(0).optional(),
  stockStatus: z.enum(["IN_STOCK", "OUT_OF_STOCK", "LOW_STOCK"]),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
  featured: z.boolean(),
  bestseller: z.boolean(),
  isNew: z.boolean(),
  active: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel: () => void;
}

export default function ProductForm({ initialData, onSubmit, onCancel }: ProductFormProps) {
  const [categories, setCategories] = useState<string[]>(initialData?.categories || []);
  const [colors, setColors] = useState<string[]>(initialData?.colors || []);
  const [features, setFeatures] = useState<string[]>(initialData?.features || []);
  const [newCategory, setNewCategory] = useState("");
  const [newColor, setNewColor] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      ...initialData,
      regularPrice: initialData?.regularPrice || 0,
      quantity: initialData?.quantity || 0,
      stockStatus: initialData?.stockStatus || "IN_STOCK",
      featured: initialData?.featured || false,
      bestseller: initialData?.bestseller || false,
      isNew: initialData?.isNew || false,
      active: initialData?.active || true,
    },
  });

  const stockStatus = watch("stockStatus");

  const handleFormSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit({ ...data, categories, colors, features } as any);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const removeCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category));
  };

  const addColor = () => {
    if (newColor.trim() && !colors.includes(newColor.trim())) {
      setColors([...colors, newColor.trim()]);
      setNewColor("");
    }
  };

  const removeColor = (color: string) => {
    setColors(colors.filter((c) => c !== color));
  };

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (feature: string) => {
    setFeatures(features.filter((f) => f !== feature));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Essential product details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input id="name" {...register("name")} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">SKU *</Label>
              <Input id="sku" {...register("sku")} />
              {errors.sku && <p className="text-sm text-red-500">{errors.sku.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input id="slug" {...register("slug")} />
            {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea id="description" {...register("description")} rows={4} />
            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
          <CardDescription>Set product prices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="regularPrice">Regular Price *</Label>
              <Input
                id="regularPrice"
                type="number"
                step="0.01"
                {...register("regularPrice", { valueAsNumber: true })}
              />
              {errors.regularPrice && <p className="text-sm text-red-500">{errors.regularPrice.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="salePrice">Sale Price</Label>
              <Input
                id="salePrice"
                type="number"
                step="0.01"
                {...register("salePrice", { valueAsNumber: true })}
              />
              {errors.salePrice && <p className="text-sm text-red-500">{errors.salePrice.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="costPrice">Cost Price</Label>
              <Input
                id="costPrice"
                type="number"
                step="0.01"
                {...register("costPrice", { valueAsNumber: true })}
              />
              {errors.costPrice && <p className="text-sm text-red-500">{errors.costPrice.message}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Details */}
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Physical specifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="material">Material</Label>
              <Input id="material" {...register("material")} placeholder="e.g., Leather, Wood" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dimensions">Dimensions</Label>
              <Input id="dimensions" {...register("dimensions")} placeholder="e.g., 10 x 8 x 3 inches" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.01"
                {...register("weight", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="compartments">Compartments</Label>
              <Input
                id="compartments"
                type="number"
                {...register("compartments", { valueAsNumber: true })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Product categories</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category"
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCategory())}
            />
            <Button type="button" onClick={addCategory} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <div
                key={category}
                className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full text-sm"
              >
                <span>{category}</span>
                <button type="button" onClick={() => removeCategory(category)} className="hover:text-red-500">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Color Options</CardTitle>
          <CardDescription>Available colors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              placeholder="Enter color"
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addColor())}
            />
            <Button type="button" onClick={addColor} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <div
                key={color}
                className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full text-sm"
              >
                <span>{color}</span>
                <button type="button" onClick={() => removeColor(color)} className="hover:text-red-500">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
          <CardDescription>Product features and highlights</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Enter feature"
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
            />
            <Button type="button" onClick={addFeature} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full text-sm"
              >
                <span>{feature}</span>
                <button type="button" onClick={() => removeFeature(feature)} className="hover:text-red-500">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stock Management */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Management</CardTitle>
          <CardDescription>Inventory tracking</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input id="quantity" type="number" {...register("quantity", { valueAsNumber: true })} />
              {errors.quantity && <p className="text-sm text-red-500">{errors.quantity.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
              <Input
                id="lowStockThreshold"
                type="number"
                {...register("lowStockThreshold", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stockStatus">Stock Status *</Label>
              <Select value={stockStatus} onValueChange={(value) => setValue("stockStatus", value as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IN_STOCK">In Stock</SelectItem>
                  <SelectItem value="LOW_STOCK">Low Stock</SelectItem>
                  <SelectItem value="OUT_OF_STOCK">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
          <CardDescription>Search engine optimization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="seoTitle">Meta Title</Label>
            <Input id="seoTitle" {...register("seoTitle")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seoDescription">Meta Description</Label>
            <Textarea id="seoDescription" {...register("seoDescription")} rows={3} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seoKeywords">Keywords (comma-separated)</Label>
            <Input id="seoKeywords" {...register("seoKeywords")} placeholder="keyword1, keyword2, keyword3" />
          </div>
        </CardContent>
      </Card>

      {/* Flags */}
      <Card>
        <CardHeader>
          <CardTitle>Product Flags</CardTitle>
          <CardDescription>Special product attributes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                {...register("featured")}
                className="w-4 h-4 rounded border-gray-300"
              />
              <Label htmlFor="featured" className="cursor-pointer">Featured</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="bestseller"
                {...register("bestseller")}
                className="w-4 h-4 rounded border-gray-300"
              />
              <Label htmlFor="bestseller" className="cursor-pointer">Bestseller</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isNew"
                {...register("isNew")}
                className="w-4 h-4 rounded border-gray-300"
              />
              <Label htmlFor="isNew" className="cursor-pointer">New</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="active"
                {...register("active")}
                className="w-4 h-4 rounded border-gray-300"
              />
              <Label htmlFor="active" className="cursor-pointer">Active</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          <XCircle className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          <Save className="h-4 w-4 mr-2" />
          {isSubmitting ? "Saving..." : "Save Product"}
        </Button>
      </div>
    </form>
  );
}
