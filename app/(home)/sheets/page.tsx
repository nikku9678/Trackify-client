"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Search, BookOpen } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/feature/authApi";
import CustomSheets from "@/components/sheets/custom-sheets";

interface Sheet {
  sheet_id: number;
  title: string;
  type?: string;
  is_public?: boolean;
  sheetProblems?: any[];
}

const Sheets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch sheets
  useEffect(() => {
    const fetchSheets = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get("/sheets/");
        setSheets(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load sheets");
      } finally {
        setLoading(false);
      }
    };

    fetchSheets();
  }, []);

  const filteredSheets = sheets.filter((sheet) => {
    const matchesFilter = filter === "all" || sheet.type === filter;
    const matchesSearch = sheet.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-muted-foreground">
        Loading sheets...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );

  return (
    <div className="w-[80%] mx-auto px-4 flex flex-col md:py-6 text-foreground bg-background min-h-screen transition-colors">
    
      <CustomSheets />
    </div>
  );
};

export default Sheets;
