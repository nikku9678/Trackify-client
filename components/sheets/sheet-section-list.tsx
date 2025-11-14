"use client";

import { useState } from "react";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import CreateSectionDialog from "./create-section-dialog";
import SectionAccordionItem from "./sheet-accordion-item";

interface SheetSectionListProps {
  sheetId: number;
}

const initialSections = [
  {
    id: 1,
    title: "Array & Strings",
    questions: [
      { id: 101, title: "Two Sum", difficulty: "Easy", link: "https://leetcode.com/problems/two-sum/" },
      { id: 102, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", link: "#" },
    ],
  },
  {
    id: 2,
    title: "Dynamic Programming",
    questions: [
      { id: 201, title: "Climbing Stairs", difficulty: "Easy", link: "#" },
    ],
  },
];

const SheetSectionList = ({ sheetId }: SheetSectionListProps) => {
  const [sections, setSections] = useState(initialSections);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddSection = (title: string) => {
    const newSection = {
      id: Date.now(),
      title,
      questions: [],
    };
    setSections((prev) => [...prev, newSection]);
  };

  const handleAddQuestion = (sectionId: number, question: any) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, questions: [...section.questions, question] }
          : section
      )
    );
  };

  const handleDeleteSection = (sectionId: number) => {
    setSections((prev) => prev.filter((s) => s.id !== sectionId));
  };

  const handleEditSection = (sectionId: number, newTitle: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, title: newTitle } : s))
    );
  };

  return (
    <div className="w-full space-y-4 px-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Sections</h2>
        <Button onClick={() => setIsDialogOpen(true)} className="flex items-center gap-2">
          <PlusCircle size={18} /> Add Section
        </Button>
      </div>

      <Accordion type="multiple" className="space-y-3">
        {sections.length > 0 ? (
          sections.map((section) => (
            <SectionAccordionItem
              key={section.id}
              section={section}
              onAddQuestion={handleAddQuestion}
              onDeleteSection={handleDeleteSection}
              onEditSection={handleEditSection}
            />
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No sections yet.</p>
        )}
      </Accordion>

      <CreateSectionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreate={handleAddSection}
      />
    </div>
  );
};

export default SheetSectionList;
