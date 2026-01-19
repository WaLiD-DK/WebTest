"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Download, ChevronLeft, ChevronRight, Search, MoreVertical } from "lucide-react";

type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  total: number;
}

interface OrderTableProps {
  orders?: Order[];
}

const statusColors: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PROCESSING: "bg-blue-100 text-blue-800",
  SHIPPED: "bg-purple-100 text-purple-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const paymentStatusColors: Record<PaymentStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PAID: "bg-green-100 text-green-800",
  FAILED: "bg-red-100 text-red-800",
  REFUNDED: "bg-gray-100 text-gray-800",
};

export default function OrderTable({ orders: initialOrders = [] }: OrderTableProps) {
  const [orders, setOrders] = useState<Order[]>(
    initialOrders.length > 0
      ? initialOrders
      : [
          {
            id: "1",
            orderNumber: "ORD-001",
            customerName: "John Doe",
            customerEmail: "john@example.com",
            date: "2024-01-15",
            status: "DELIVERED",
            paymentStatus: "PAID",
            total: 299.99,
          },
          {
            id: "2",
            orderNumber: "ORD-002",
            customerName: "Jane Smith",
            customerEmail: "jane@example.com",
            date: "2024-01-16",
            status: "PROCESSING",
            paymentStatus: "PAID",
            total: 149.99,
          },
          {
            id: "3",
            orderNumber: "ORD-003",
            customerName: "Bob Johnson",
            customerEmail: "bob@example.com",
            date: "2024-01-17",
            status: "PENDING",
            paymentStatus: "PENDING",
            total: 89.99,
          },
        ]
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof Order>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (field: keyof Order) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    // API call placeholder
    console.log(`Updating order ${orderId} to status ${newStatus}`);
  };

  const handleViewDetails = (orderId: string) => {
    console.log(`Viewing order ${orderId}`);
    // Navigate to order details
  };

  const handleExport = () => {
    console.log("Exporting orders...");
    // Export functionality
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const aValue = a[sortField as keyof Order];
    const bValue = b[sortField as keyof Order];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = sortedOrders.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      {/* Header and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex-1 flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="PROCESSING">Processing</SelectItem>
              <SelectItem value="SHIPPED">Shipped</SelectItem>
              <SelectItem value="DELIVERED">Delivered</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleExport} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead
                className="cursor-pointer hover:bg-slate-100"
                onClick={() => handleSort("orderNumber")}
              >
                Order # {sortField === "orderNumber" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-slate-100"
                onClick={() => handleSort("customerName")}
              >
                Customer {sortField === "customerName" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-slate-100"
                onClick={() => handleSort("date")}
              >
                Date {sortField === "date" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead
                className="cursor-pointer hover:bg-slate-100"
                onClick={() => handleSort("total")}
              >
                Total {sortField === "total" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              paginatedOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.customerEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button>
                          <Badge className={statusColors[order.status]}>
                            {order.status}
                          </Badge>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "PENDING")}>
                          Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "PROCESSING")}>
                          Processing
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "SHIPPED")}>
                          Shipped
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "DELIVERED")}>
                          Delivered
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "CANCELLED")}>
                          Cancelled
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    <Badge className={paymentStatusColors[order.paymentStatus]}>
                      {order.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">${order.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(order.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedOrders.length)} of{" "}
            {sortedOrders.length} orders
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
