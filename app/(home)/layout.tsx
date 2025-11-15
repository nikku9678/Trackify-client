// app/(admin)/layout.tsx
"use client";

import Sidebar from "@/components/admin/sidebar";
import ProtectedClient from "@/components/auth/protected-client";
import Navbar from "@/components/admin/admin-navbar";
import { useState } from "react";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // match your sidebar width
  const SIDEBAR_WIDTH = "w-35";

  return (
 
      <div className="flex min-h-screen fixed w-full bg-gray-100 py-2 pr-2 dark:bg-background text-foreground">

        {/* --- FIXED SIDEBAR --- */}
        <div className={`fixed inset-y-0 left-4 z-40 ${SIDEBAR_WIDTH} mx-auto`}>
          <Sidebar />
        </div>

        {/* --- MAIN CONTENT (scrollable) --- */}
        <div className="flex flex-col rounded-xl flex-1 scroll-w-1 bg-background text-foreground border-l border-yellow-300 dark:border-yellow-700 ml-35 max-h-screen">

          {/* Navbar */}
          <Navbar/>

          {/* Scrollable content */}
          <main className="px-4 flex-1 overflow-y-auto  thin-scroll">
            {children}
          </main>
        </div>

        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </div>
  
  );
}
