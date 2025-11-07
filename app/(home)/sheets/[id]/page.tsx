"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/store/authApi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Bookmark, StickyNote } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";
import SheetProblemNotes from "@/components/sheets/problem-notes";

const SheetsViewPage = () => {
  const { id } = useParams();
  const [sheet, setSheet] = useState<any>(null);
  const [problems, setProblems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeNoteCategory, setActiveNoteCategory] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState<number | null>(null);


  useEffect(() => {
    const fetchSheet = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/sheets/sheet-problems/${id}`);
        console.log("Fetched Sheet Details:", res.data);

        setSheet(res.data.sheet);
        setProblems(res.data.problems);
      } catch (err) {
        console.error("Error fetching sheet:", err);
        setError("Failed to load sheet details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSheet();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-muted-foreground">
        Loading sheet details...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );

  if (!sheet)
    return (
      <div className="flex justify-center items-center h-screen text-muted-foreground">
        No sheet found.
      </div>
    );

  const total = problems.length;
  const solved = 0; // You can replace with your solved tracking logic later
  const solvedRatio = total > 0 ? Math.round((solved / total) * 100) : 0;

  return (
    <div className="flex min-h-screen flex-col p-6 md:p-16 bg-background text-foreground">
      {/* Top Section */}
      <div className="grid md:grid-cols-2 gap-8 items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">{sheet.title}</h1>
          <p className="text-muted-foreground">{sheet.description}</p>
        </div>

        {/* Circular Progress */}
        <div className="flex justify-center items-center">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="hsl(var(--muted))"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="hsl(var(--primary))"
                strokeWidth="12"
                strokeDasharray={`${solvedRatio * 4.4} 440`}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">
                {solved}/{total}
              </span>
              <span className="text-sm text-muted-foreground">Solved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion for Problems */}
      <Accordion type="single" collapsible className="w-full space-y-4">
        {problems.map((problem) => (
          <AccordionItem
            key={problem.problem_id}
            value={problem.problem_id.toString()}
            className="border rounded-lg"
          >
            {/* Accordion Header - Problem Title */}
            <AccordionTrigger className="text-lg font-semibold px-4">
              {problem.title}
            </AccordionTrigger>

            {/* Accordion Content - Problem Details */}
            <AccordionContent>
              <Card className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Checkbox defaultChecked={false} />
                    <Link
                      href={problem.link}
                      target="_blank"
                      className="hover:text-primary font-medium flex items-center gap-2"
                    >
                      View Problem <ExternalLink size={14} />
                    </Link>
                    <Image
                      src={
                        problem.platform === "LeetCode"
                          ? "/leetcode.svg"
                          : problem.platform === "Codeforces"
                          ? "/codeforces.svg"
                          : "/default.svg"
                      }
                      alt="logo"
                      width={20}
                      height={20}
                      className="ml-2 opacity-80"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon">
                      <Bookmark className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setActiveNoteCategory(problem.title);
                        setIsDialogOpen(true);
                        setSelectedProblemId(problem.problem_id); // 👈 add this
                      }}
                    >
                      <StickyNote className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>
                    <strong>Difficulty:</strong> {problem.difficulty || "N/A"}
                  </p>
                  <p>
                    <strong>Platform:</strong> {problem.platform || "N/A"}
                  </p>
                  <p>
                    <strong>Added on:</strong>{" "}
                    {new Date(problem.created_at).toLocaleDateString()}
                  </p>
                </div>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Notes Modal */}
      <SheetProblemNotes
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        activeCategory={activeNoteCategory}
        sheetId={Number(id)}
        problemId={selectedProblemId || undefined}
      />

    </div>
  );
};

export default SheetsViewPage;
