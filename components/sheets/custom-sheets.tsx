"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  // ⬅ Static data
  const [sheets, setSheets] = useState<Sheet[]>([
    {
      sheet_id: 1,
      title: "DSA Beginner Sheet",
      description: "Best sheet for beginners",
      is_public: true,
      sheetProblems: [{ problem_id: 1 }, { problem_id: 2 }],
      created_at: "2025-01-01",
    },
    {
      sheet_id: 2,
      title: "Frontend Dev Sheet",
      description: "HTML, CSS, JS important topics",
      is_public: true,
      sheetProblems: [{ problem_id: 1 }],
      created_at: "2025-01-05",
    },
    {
      sheet_id: 3,
      title: "System Design Basics",
      description: "Newcomers system design introduction",
      is_public: false,
      sheetProblems: [{ problem_id: 1 }],
      created_at: "2025-01-10",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [newSheet, setNewSheet] = useState({
    title: "",
    description: "",
    is_public: false,
  });

  // Create Sheet (adds to static list)
  const handleCreateSheet = () => {
    if (!newSheet.title.trim()) return alert("Title is required");

    const newItem: Sheet = {
      sheet_id: sheets.length + 1,
      title: newSheet.title,
      description: newSheet.description,
      is_public: newSheet.is_public,
      sheetProblems: [],
      created_at: new Date().toISOString(),
    };

    setSheets([...sheets, newItem]);

    setOpen(false);
    setNewSheet({ title: "", description: "", is_public: false });
  };

  return (
    <Card className="mt-8 p-4 bg-muted">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-foreground">My Custom Sheets</h1>

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
        <DialogContent className="max-w-md bg-background border border-border">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Create New Sheet</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                placeholder="Enter sheet title"
                value={newSheet.title}
                onChange={(e) =>
                  setNewSheet({ ...newSheet, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
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
              <label htmlFor="isPublic" className="text-sm">
                Make this sheet public
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateSheet}
              className="bg-gradient-to-r from-[#00e0ff] via-[#a855f7] to-[#ff0080] text-white"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sheet Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sheets.length > 0 ? (
          sheets.map((sheet) => (
            <Card
              key={sheet.sheet_id}
              className="hover:shadow-md border border-border bg-background transition"
            >
              <CardHeader className="flex items-center justify-between">
                <Link href={`/sheets/${sheet.sheet_id}`}>
                  <CardTitle className="cursor-pointer hover:text-primary">
                    {sheet.title}
                  </CardTitle>
                </Link>

                <Button size="sm" variant="outline">Follow</Button>
              </CardHeader>

              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{sheet.sheetProblems?.length || 0} Problems</span>

                  <span className="flex items-center gap-1">
                    <BookOpen size={16} />
                    {sheet.is_public ? "Public" : "Private"}
                  </span>
                </div>

                <Progress value={Math.floor(Math.random() * 100)} className="w-full" />
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
    </Card>
  );
};

export default CustomSheets;
