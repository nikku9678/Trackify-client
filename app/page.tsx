"use client";

import { PieChartCard } from "@/components/charts/pie-charts";
import { BarChartCard } from "@/components/charts/bar-charts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/navbar/navbar";
import Sheets from "./(home)/sheets/page";

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
   <div>
      <Navbar/>
      <Hero/>
      <Sheets/> 
   </div>
  );
}
