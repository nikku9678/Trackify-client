"use client";

import React from "react";
import { use } from "react";
import SheetSectionList from "@/components/sheets/sheet-section-list";

export default function SheetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const sheetId = Number(id);

  return (
    <div className="w-[80%] mx-auto p-6 mt-12 md:p-10 bg-background text-foreground min-h-screen">
      <SheetSectionList sheetId={sheetId} />
    </div>
  );
}
