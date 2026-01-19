"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  variant?: "default" | "blue" | "green" | "purple" | "orange";
}

const variantStyles = {
  default: {
    bg: "bg-slate-100",
    icon: "text-slate-600",
    trend: "text-slate-600",
  },
  blue: {
    bg: "bg-blue-100",
    icon: "text-blue-600",
    trend: "text-blue-600",
  },
  green: {
    bg: "bg-green-100",
    icon: "text-green-600",
    trend: "text-green-600",
  },
  purple: {
    bg: "bg-purple-100",
    icon: "text-purple-600",
    trend: "text-purple-600",
  },
  orange: {
    bg: "bg-orange-100",
    icon: "text-orange-600",
    trend: "text-orange-600",
  },
};

export default function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  subtitle,
  variant = "default",
}: StatsCardProps) {
  const styles = variantStyles[variant];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <h3 className="text-3xl font-bold mt-2">{value}</h3>
            
            {trend && (
              <div className="flex items-center mt-3 gap-1">
                {trend.isPositive ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span
                  className={cn(
                    "text-sm font-medium",
                    trend.isPositive ? "text-green-600" : "text-red-600"
                  )}
                >
                  {trend.isPositive ? "+" : ""}
                  {trend.value}%
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last period</span>
              </div>
            )}

            {subtitle && (
              <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
            )}
          </div>

          <div className={cn("p-3 rounded-lg", styles.bg)}>
            <Icon className={cn("h-6 w-6", styles.icon)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
