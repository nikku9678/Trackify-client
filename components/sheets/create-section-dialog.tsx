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

interface CreateSectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string) => void;
}

const CreateSectionDialog = ({
  isOpen,
  onClose,
  onCreate,
}: CreateSectionDialogProps) => {
  const [title, setTitle] = useState("");

  const handleCreate = () => {
    if (!title.trim()) return;
    onCreate(title);
    setTitle("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Section</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Enter section name..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <DialogFooter>
          <Button onClick={handleCreate}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSectionDialog;
