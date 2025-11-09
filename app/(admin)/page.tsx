"use client";

import { PieChartCard } from "@/components/charts/pie-charts";
import { BarChartCard } from "@/components/charts/bar-charts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminDashboard() {
  const userStats = [
    { name: "Active Users", value: 320 },
    { name: "Inactive Users", value: 80 },
  ];

  const categoryStats = [
    { category: "Arrays", solved: 120 },
    { category: "DP", solved: 85 },
    { category: "Graphs", solved: 60 },
    { category: "Strings", solved: 70 },
    { category: "Math", solved: 40 },
  ];

  return (
   <div>
    Hello
   </div>
  );
}
