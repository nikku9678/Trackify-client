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
import { api } from "@/lib/feature/authApi"; // ✅ axios instance (must include baseURL + token)
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

  // ✅ Fetch sheets from backend
  useEffect(() => {
    const fetchSheets = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get("/sheets/");
        console.log("Fetched Sheets:", res.data);

        // ✅ Handle data safely
        setSheets(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err: any) {
        console.error("Error fetching sheets:", err);
        setError(err?.response?.data?.message || "Failed to load sheets");
      } finally {
        setLoading(false);
      }
    };

    fetchSheets();
  }, []);

  const filteredSheets = sheets.filter((sheet) => {
    const matchesFilter = filter === "all" || sheet.type === filter;
    const matchesSearch =
      sheet.title?.toLowerCase().includes(searchTerm.toLowerCase());
      console.log("Filtering Sheets:", sheet.title, matchesSearch, matchesFilter);
    return matchesFilter && matchesSearch;
  });

  // ✅ Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-muted-foreground">
        Loading sheets...
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:py-8 bg-background text-foreground transition-colors">
      {/* Heading */}
      <div className="text-left space-y-4 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">All Sheets</h1>
        <p className="text-muted-foreground">
          Explore curated coding sheets to improve your problem-solving skills.
          Search, filter, and track your progress easily.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-row justify-between">

   
     

      {/* Filter Tabs */}
      <div className="flex justify-start mb-8">
        <Tabs defaultValue="all" onValueChange={(val) => setFilter(val)}>
          <TabsList className="flex space-x-2 bg-muted p-1 rounded-md">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="DSA">DSA</TabsTrigger>
            <TabsTrigger value="CP">CP</TabsTrigger>
            <TabsTrigger value="Popular">Popular</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

       <div className="w-1/3">
        <Search
          className="absolute left-3 top-3 text-muted-foreground"
          size={18}
        />
        <Input
          type="text"
          placeholder="Search sheets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
         </div>

      {/* Sheets Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSheets.length > 0 ? (
          filteredSheets.map((sheet) => (
            <Card key={sheet.sheet_id} className="hover:shadow-md transition">
              <CardHeader className="flex items-center justify-between">
                <Link href={`/sheets/${sheet.sheet_id}`}>
                  <CardTitle className="cursor-pointer hover:text-primary">
                    {sheet.title}
                  </CardTitle>
                </Link>
                <Button size="sm" variant="outline">
                  Follow
                </Button>
              </CardHeader>

              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{sheet.sheetProblems?.length || 0} Problems</span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={16} />{" "}
                    {sheet.is_public ? "Public" : "Private"}
                  </span>
                </div>
                <Progress
                  value={Math.floor(Math.random() * 100)}
                  className="w-full"
                />
              </CardContent>

              <CardFooter>
                <span className="text-xs text-muted-foreground">
                  {Math.floor(Math.random() * 100)}% completed
                </span>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center text-muted-foreground col-span-full">
            No sheets found.
          </p>
        )}
      </div>
      <CustomSheets/>
    </div>
  );
};

export default Sheets;
