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
    <div className="p-6 min-h-screen bg-gradient-to-br from-background to-muted/50 dark:from-neutral-900 dark:to-neutral-800">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <PieChartCard data={userStats} title="User Activity Overview" />
        <BarChartCard data={categoryStats} title="Problems Solved by Category" />
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">400</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Problems</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-500">950</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overall Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-500">74%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
