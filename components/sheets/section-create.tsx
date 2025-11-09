import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SectionCreator({ onCreate }: { onCreate: (title: string) => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const create = () => {
    if (!title.trim()) return;
    onCreate(title.trim());
    setTitle("");
    setOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      {!open ? (
        <Button onClick={() => setOpen(true)}>+ Create Section</Button>
      ) : (
        <div className="flex items-center gap-2">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Section title"
            className="min-w-[160px]"
          />
          <Button onClick={create}>Create</Button>
          <Button variant="ghost" onClick={() => { setOpen(false); setTitle(""); }}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
