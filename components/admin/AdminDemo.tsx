"use client";

import { useState } from "react";
import ProductForm from "@/components/admin/ProductForm";
import OrderTable from "@/components/admin/OrderTable";
import CustomerTable from "@/components/admin/CustomerTable";
import StatsCard from "@/components/admin/StatsCard";
import SalesChart from "@/components/admin/SalesChart";
import ImageUpload from "@/components/admin/ImageUpload";
import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminDemoPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel Demo</h1>
          <p className="mt-1 text-sm text-gray-500">
            Comprehensive admin components for e-commerce management
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Revenue"
                value="$45,231.89"
                icon={DollarSign}
                trend={{ value: 12.5, isPositive: true }}
                subtitle="Last 30 days"
                variant="green"
              />
              <StatsCard
                title="Orders"
                value="1,234"
                icon={ShoppingCart}
                trend={{ value: 8.2, isPositive: true }}
                subtitle="Last 30 days"
                variant="blue"
              />
              <StatsCard
                title="Customers"
                value="890"
                icon={Users}
                trend={{ value: 5.1, isPositive: true }}
                subtitle="Active customers"
                variant="purple"
              />
              <StatsCard
                title="Products"
                value="156"
                icon={Package}
                trend={{ value: 2.3, isPositive: false }}
                subtitle="In stock"
                variant="orange"
              />
            </div>

            {/* Sales Chart */}
            <SalesChart />

            {/* Recent Orders */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
              <OrderTable />
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-6">Add New Product</h2>
              <ProductForm
                onSubmit={async (data) => {
                  console.log("Product submitted:", data);
                  alert("Product saved successfully!");
                }}
                onCancel={() => {
                  console.log("Form cancelled");
                }}
              />
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">All Orders</h2>
              <OrderTable />
            </div>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-4">All Customers</h2>
              <CustomerTable />
            </div>
          </TabsContent>

          {/* Images Tab */}
          <TabsContent value="images" className="space-y-6">
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-xl font-semibold mb-6">Product Images</h2>
              <ImageUpload
                maxImages={10}
                maxFileSize={5}
                onImagesChange={(images) => {
                  console.log("Images updated:", images);
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
