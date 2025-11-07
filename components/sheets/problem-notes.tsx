"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { api } from "@/lib/store/authApi";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Sheet {
  sheet_id: number;
  title: string;
  description: string;
}

interface Problem {
  problem_id: number;
  platform: string;
  title: string;
  link: string;
  difficulty: string;
}

interface Note {
  note_id: number;
  title?: string;
  description: string;
  created_at: string;
  sheet?: Sheet;
  problem?: Problem;
}

interface SheetProblemNotesProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory?: string;
  sheetId?: number;
  problemId?: number;
}

const SheetProblemNotes = ({
  isOpen,
  onClose,
  activeCategory,
  sheetId,
  problemId,
}: SheetProblemNotesProps) => {
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch notes when modal opens or sheet/problem changes
  useEffect(() => {
    if (isOpen && sheetId && problemId) {
      fetchNotes();
    } else {
      setNotes([]);
    }
  }, [isOpen, sheetId, problemId]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/notes/${sheetId}/problem/${problemId}`);
      const data = res.data;

      // Backend sometimes returns array or wrapper { notes: [...] }
      if (Array.isArray(data)) {
        setNotes(data);
      } else if (Array.isArray(data?.notes)) {
        setNotes(data.notes);
      } else if (Array.isArray(data?.data)) {
        setNotes(data.data);
      } else {
        setNotes([]);
      }
    } catch (err) {
      console.error("Error fetching notes:", err);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const trimmed = noteText.trim();
    if (!trimmed || !sheetId || !problemId) return;

    try {
      setSaving(true);
      const res = await api.post(`/notes/${sheetId}/create/${problemId}`, {
        title: activeCategory ?? null,
        description: trimmed,
      });

      // Try to be defensive about response shape — but refetching is most reliable
      // If backend returns the created note as res.data.note or res.data, we still refetch.
      await fetchNotes();

      setNoteText("");
    } catch (err) {
      console.error("Error saving note:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Notes for: {activeCategory}</DialogTitle>
        </DialogHeader>

        {/* New Note Input */}
        <div className="space-y-2">
          <Textarea
            placeholder="Write your notes here..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            disabled={saving}
          />
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={!noteText.trim() || saving}>
              {saving ? "Saving..." : "Add Note"}
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t my-3" />

        {/* Notes List */}
        <ScrollArea className="h-60">
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading notes...</p>
          ) : notes.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No notes added yet for this problem.
            </p>
          ) : (
            <div className="space-y-3">
              {notes.map((n) => (
                <div
                  key={n.note_id}
                  className="border p-3 rounded-md bg-muted/30 space-y-1"
                >
                  {n.title && <p className="text-sm font-semibold">{n.title}</p>}
                  <p className="text-sm">{n.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(n.created_at).toLocaleString()}
                  </p>

                  {/* Optional small meta */}
                  <div className="text-xs text-gray-500 mt-1">
                    {n.sheet?.title && (
                      <p>
                        Sheet: <b>{n.sheet.title}</b>
                      </p>
                    )}
                    {n.problem?.title && (
                      <p>
                        Problem:{" "}
                        <a
                          href={n.problem.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {n.problem.title}
                        </a>{" "}
                        ({n.problem.difficulty})
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SheetProblemNotes;
