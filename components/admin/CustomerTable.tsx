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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Download, ChevronLeft, ChevronRight, Search, MoreVertical } from "lucide-react";

type CustomerRole = "CUSTOMER" | "ADMIN" | "VIP";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orderCount: number;
  totalSpent: number;
  joinedDate: string;
  role: CustomerRole;
}

interface CustomerTableProps {
  customers?: Customer[];
}

const roleColors: Record<CustomerRole, string> = {
  CUSTOMER: "bg-gray-100 text-gray-800",
  ADMIN: "bg-purple-100 text-purple-800",
  VIP: "bg-amber-100 text-amber-800",
};

export default function CustomerTable({ customers: initialCustomers = [] }: CustomerTableProps) {
  const [customers, setCustomers] = useState<Customer[]>(
    initialCustomers.length > 0
      ? initialCustomers
      : [
          {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            phone: "+1 234-567-8900",
            orderCount: 15,
            totalSpent: 2499.85,
            joinedDate: "2023-06-15",
            role: "CUSTOMER",
          },
          {
            id: "2",
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "+1 234-567-8901",
            orderCount: 28,
            totalSpent: 5299.50,
            joinedDate: "2023-03-22",
            role: "VIP",
          },
          {
            id: "3",
            name: "Bob Johnson",
            email: "bob@example.com",
            phone: "+1 234-567-8902",
            orderCount: 8,
            totalSpent: 1149.99,
            joinedDate: "2023-11-08",
            role: "CUSTOMER",
          },
          {
            id: "4",
            name: "Alice Williams",
            email: "alice@example.com",
            phone: "+1 234-567-8903",
            orderCount: 42,
            totalSpent: 8899.25,
            joinedDate: "2023-01-10",
            role: "VIP",
          },
          {
            id: "5",
            name: "Charlie Brown",
            email: "charlie@example.com",
            phone: "+1 234-567-8904",
            orderCount: 3,
            totalSpent: 449.97,
            joinedDate: "2024-01-05",
            role: "CUSTOMER",
          },
        ]
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<keyof Customer>("joinedDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (field: keyof Customer) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleViewCustomer = (customerId: string) => {
    console.log(`Viewing customer ${customerId}`);
    // Navigate to customer details
  };

  const handleExport = () => {
    console.log("Exporting customers...");
    // Export functionality
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    const aValue = a[sortField as keyof Customer];
    const bValue = b[sortField as keyof Customer];

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

  const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = sortedCustomers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      {/* Header and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
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
                onClick={() => handleSort("name")}
              >
                Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-slate-100"
                onClick={() => handleSort("email")}
              >
                Email {sortField === "email" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Phone</TableHead>
              <TableHead
                className="cursor-pointer hover:bg-slate-100"
                onClick={() => handleSort("orderCount")}
              >
                Orders {sortField === "orderCount" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-slate-100"
                onClick={() => handleSort("totalSpent")}
              >
                Total Spent {sortField === "totalSpent" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-slate-100"
                onClick={() => handleSort("joinedDate")}
              >
                Joined {sortField === "joinedDate" && (sortDirection === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  No customers found
                </TableCell>
              </TableRow>
            ) : (
              paginatedCustomers.map((customer) => (
                <TableRow key={customer.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell className="text-gray-600">{customer.phone}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-medium">
                      {customer.orderCount}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    ${customer.totalSpent.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {new Date(customer.joinedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={roleColors[customer.role]}>
                      {customer.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewCustomer(customer.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Customer
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
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedCustomers.length)} of{" "}
            {sortedCustomers.length} customers
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
