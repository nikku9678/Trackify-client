"use client";

import { useState } from "react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  Trash2,
  Plus,
  Bookmark,
  StickyNote,
  MoreVertical,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";
import CreateQuestionDialog from "./create-question-dialog";

interface SectionAccordionItemProps {
  section: any;
  onAddQuestion: (sectionId: number, question: any) => void;
  onDeleteSection: (sectionId: number) => void;
  onEditSection: (sectionId: number, newTitle: string) => void;
}

const SectionAccordionItem = ({
  section,
  onAddQuestion,
  onDeleteSection,
  onEditSection,
}: SectionAccordionItemProps) => {
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(section.title);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState<{ [key: number]: string }>({});

  const handleAddNote = (questionId: number) => {
    setNotes({ ...notes, [questionId]: noteText });
    setNoteText("");
    setActiveNote(null);
  };

  const handleDeleteNote = (questionId: number) => {
    const updated = { ...notes };
    delete updated[questionId];
    setNotes(updated);
  };

  const handleEditNote = (questionId: number) => {
    setNoteText(notes[questionId]);
    setActiveNote(questionId.toString());
  };

  return (
    <AccordionItem
      value={`section-${section.id}`}
      className="border rounded-xl bg-card/50 backdrop-blur-sm shadow-sm"
    >
      <AccordionTrigger className="flex items-center justify-between px-4 py-3 font-semibold">
        <div className="flex items-center w-full">
          {isEditing ? (
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={() => {
                onEditSection(section.id, newTitle);
                setIsEditing(false);
              }}
              className="w-64"
              autoFocus
            />
          ) : (
            <span>{section.title}</span>
          )}

          <div className="flex gap-2 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              title="Add question"
              onClick={(e) => {
                e.stopPropagation();
                setIsQuestionDialogOpen(true);
              }}
            >
              <Plus size={16} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              title="Edit section"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              <Pencil size={16} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              title="Delete section"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteSection(section.id);
              }}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent>
        <div className="space-y-3 p-4">
          {section.questions.length > 0 ? (
            section.questions.map((q: any) => (
             <Card
  key={q.id}
  className="flex flex-row items-center justify-between p-3 sm:p-4 rounded-lg border border-border/50 bg-card hover:shadow-sm transition-all duration-200"
>
  {/* LEFT: checkbox + title */}
  <div className="flex items-center gap-3 flex-[2] min-w-0">
    <Checkbox />
    <div className="truncate">
      <p className="font-medium truncate">{q.title}</p>
      <p className="text-xs text-muted-foreground">
        {notes[q.id] ? "📝 Note added" : "No note yet"}
      </p>
    </div>
  </div>

  {/* CENTER: site logo + difficulty */}
  <div className="flex items-center justify-center gap-2 flex-1">
    <Image
      src={
        q.platform === "LeetCode"
          ? "/leetcode.svg"
          : q.platform === "Codeforces"
          ? "/codeforces.svg"
          : "/default.svg"
      }
      alt={q.platform}
      width={22}
      height={22}
      className="rounded-sm object-contain"
    />
    <span
      className={`text-sm font-semibold ${
        q.difficulty === "Easy"
          ? "text-green-500"
          : q.difficulty === "Medium"
          ? "text-yellow-500"
          : "text-red-500"
      }`}
    >
      {q.difficulty}
    </span>
  </div>

  {/* RIGHT: icons */}
  <div className="flex items-center justify-end gap-2 flex-[1.2]">
    <Button
      variant="ghost"
      size="icon"
      title="Bookmark"
      className="hover:bg-muted/60"
    >
      <Bookmark className="w-4 h-4" />
    </Button>

    <Button
      variant="ghost"
      size="icon"
      title="Add note"
      onClick={() => setActiveNote(q.id.toString())}
      className="hover:bg-muted/60"
    >
      <StickyNote className="w-4 h-4" />
    </Button>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-muted/60">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => handleEditNote(q.id)}>
          ✏️ Edit Note
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDeleteNote(q.id)}>
          🗑️ Delete Note
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-500"
          onClick={() =>
            alert(`Removed "${q.title}" from ${section.title}`)
          }
        >
          ❌ Remove Question
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</Card>

            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No questions yet. Click “+” to add one.
            </p>
          )}
        </div>
      </AccordionContent>

      {/* Create Question Dialog */}
      <CreateQuestionDialog
        isOpen={isQuestionDialogOpen}
        onClose={() => setIsQuestionDialogOpen(false)}
        onCreate={(q) => onAddQuestion(section.id, q)}
      />

      {/* Note Dialog */}
      <Dialog open={!!activeNote} onOpenChange={() => setActiveNote(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Note for Question</DialogTitle>
          </DialogHeader>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Add your note here..."
            className="w-full h-32 rounded-md border bg-background p-2 text-sm"
          />
          <DialogFooter>
            <Button
              onClick={() =>
                activeNote && handleAddNote(Number(activeNote))
              }
            >
              Save Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AccordionItem>
  );
};

export default SectionAccordionItem;
