"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BarChart3, LineChart as LineChartIcon } from "lucide-react";

type DateRange = "7days" | "30days" | "90days" | "1year";
type ChartType = "line" | "bar";

interface SalesData {
  date: string;
  revenue: number;
  orders: number;
}

interface SalesChartProps {
  data?: SalesData[];
}

const generateSampleData = (range: DateRange): SalesData[] => {
  const days = range === "7days" ? 7 : range === "30days" ? 30 : range === "90days" ? 90 : 365;
  const data: SalesData[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      revenue: Math.floor(Math.random() * 5000) + 1000,
      orders: Math.floor(Math.random() * 50) + 10,
    });
  }

  return data;
};

export default function SalesChart({ data: initialData }: SalesChartProps) {
  const [dateRange, setDateRange] = useState<DateRange>("30days");
  const [chartType, setChartType] = useState<ChartType>("line");
  const [data, setData] = useState<SalesData[]>(
    initialData || generateSampleData(dateRange)
  );

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    if (!initialData) {
      setData(generateSampleData(range));
    }
  };

  const toggleChartType = () => {
    setChartType(chartType === "line" ? "bar" : "line");
  };

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-medium text-sm mb-2">{label}</p>
          <p className="text-sm text-blue-600">
            Revenue: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm text-green-600">
            Orders: {payload[1].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <CardTitle>Sales Overview</CardTitle>
          <div className="flex gap-2 flex-wrap">
            <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
              <Button
                size="sm"
                variant={dateRange === "7days" ? "default" : "ghost"}
                onClick={() => handleDateRangeChange("7days")}
                className="text-xs"
              >
                7 Days
              </Button>
              <Button
                size="sm"
                variant={dateRange === "30days" ? "default" : "ghost"}
                onClick={() => handleDateRangeChange("30days")}
                className="text-xs"
              >
                30 Days
              </Button>
              <Button
                size="sm"
                variant={dateRange === "90days" ? "default" : "ghost"}
                onClick={() => handleDateRangeChange("90days")}
                className="text-xs"
              >
                90 Days
              </Button>
              <Button
                size="sm"
                variant={dateRange === "1year" ? "default" : "ghost"}
                onClick={() => handleDateRangeChange("1year")}
                className="text-xs"
              >
                1 Year
              </Button>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={toggleChartType}
              className="text-xs"
            >
              {chartType === "line" ? (
                <>
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Bar Chart
                </>
              ) : (
                <>
                  <LineChartIcon className="h-3 w-3 mr-1" />
                  Line Chart
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          {chartType === "line" ? (
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="left"
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatCurrency}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                iconType="circle"
                formatter={(value) => <span className="text-sm">{value}</span>}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", r: 4 }}
                activeDot={{ r: 6 }}
                name="Revenue"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", r: 4 }}
                activeDot={{ r: 6 }}
                name="Orders"
              />
            </LineChart>
          ) : (
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="left"
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatCurrency}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                iconType="circle"
                formatter={(value) => <span className="text-sm">{value}</span>}
              />
              <Bar
                yAxisId="left"
                dataKey="revenue"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
                name="Revenue"
              />
              <Bar
                yAxisId="right"
                dataKey="orders"
                fill="#10b981"
                radius={[8, 8, 0, 0]}
                name="Orders"
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
