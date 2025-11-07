"use client";

import { PieChartCard } from "@/components/charts/pie-charts";
import { BarChartCard } from "@/components/charts/bar-charts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function UserDashboard() {
  // Static demo data
  const solvedStatusData = [
    { name: "Solved", value: 45 },
    { name: "Attempted", value: 20 },
    { name: "Not Started", value: 35 },
  ];

  const categoryData = [
    { category: "Arrays", solved: 12 },
    { category: "Strings", solved: 8 },
    { category: "DP", solved: 5 },
    { category: "Graphs", solved: 6 },
    { category: "Math", solved: 4 },
  ];

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-background to-muted/50 dark:from-neutral-900 dark:to-neutral-800">
      <h1 className="text-2xl font-bold mb-6 text-center">User Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <PieChartCard data={solvedStatusData} title="Problem Solving Status" />
        <BarChartCard data={categoryData} title="Solved by Category" />
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Solved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-500">45</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-500">69%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-500">7 Days 🔥</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
