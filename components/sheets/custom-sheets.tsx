"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/feature/authApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, PlusCircle } from "lucide-react";

interface Sheet {
  sheet_id: number;
  title: string;
  description?: string;
  is_public: boolean;
  sheetProblems?: { problem_id: number }[];
  created_at: string;
}

const CustomSheets = () => {
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newSheet, setNewSheet] = useState({
    title: "",
    description: "",
    is_public: false,
  });

  // ✅ Fetch Sheets
  const fetchSheets = async () => {
    try {
      const res = await api.get("/sheets");
      setSheets(res.data.data || []);
    } catch (error) {
      console.error("Error fetching sheets:", error);
    }
  };

  useEffect(() => {
    fetchSheets();
  }, []);

  // ✅ Create Sheet
  const handleCreateSheet = async () => {
    if (!newSheet.title.trim()) return alert("Title is required");
    try {
      setLoading(true);
      await api.post("/sheets/create", newSheet);
      setOpen(false);
      setNewSheet({ title: "", description: "", is_public: false });
      fetchSheets();
    } catch (error) {
      console.error("Error creating sheet:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          My Custom Sheets
        </h1>
        <Button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#00e0ff] via-[#a855f7] to-[#ff0080] text-white font-medium"
        >
          <PlusCircle className="w-5 h-5" />
          Create Sheet
        </Button>
      </div>

      {/* Create Sheet Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Create New Sheet
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <Input
                placeholder="Enter sheet title"
                value={newSheet.title}
                onChange={(e) =>
                  setNewSheet({ ...newSheet, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <Textarea
                placeholder="Enter description"
                value={newSheet.description}
                onChange={(e) =>
                  setNewSheet({ ...newSheet, description: e.target.value })
                }
              />
            </div>

            <div className="flex items-center gap-2 mt-3">
              <input
                type="checkbox"
                id="isPublic"
                checked={newSheet.is_public}
                onChange={(e) =>
                  setNewSheet({ ...newSheet, is_public: e.target.checked })
                }
                className="w-4 h-4 accent-primary"
              />
              <label
                htmlFor="isPublic"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Make this sheet public
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-400/50 dark:border-gray-600/50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateSheet}
              disabled={loading}
              className="bg-gradient-to-r from-[#00e0ff] via-[#a855f7] to-[#ff0080] text-white"
            >
              {loading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sheets Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sheets.length > 0 ? (
          sheets.map((sheet) => (
            <Card
              key={sheet.sheet_id}
              className="hover:shadow-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 transition"
            >
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
    </div>
  );
};

export default CustomSheets;
