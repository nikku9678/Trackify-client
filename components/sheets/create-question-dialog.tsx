"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CreateQuestionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (question: any) => void;
}

const CreateQuestionDialog = ({
  isOpen,
  onClose,
  onCreate,
}: CreateQuestionDialogProps) => {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");

  const handleCreate = () => {
    if (!title.trim()) return;
    const newQuestion = {
      id: Date.now(),
      title,
      difficulty,
      link: "#",
    };
    onCreate(newQuestion);
    setTitle("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Question</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            placeholder="Enter question title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full rounded-md border bg-background p-2"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
        <DialogFooter>
          <Button onClick={handleCreate}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuestionDialog;
