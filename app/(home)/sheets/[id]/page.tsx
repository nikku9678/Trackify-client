"use client";

import React from "react";
import { use } from "react";
import SheetSectionList from "@/components/sheets/sheet-section-list";

export default function SheetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const sheetId = Number(id);

  return (
    <div className="mx-auto md:py-8 bg-background text-foreground">
      <SheetSectionList sheetId={sheetId} />
    </div>
  );
}
