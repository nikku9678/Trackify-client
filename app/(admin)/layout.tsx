// app/(admin)/layout.tsx
"use client";
import Sidebar from "@/components/admin/sidebar";
import ProtectedClient from "@/components/auth/protected-client";
import Navbar from "@/components/admin/admin-navbar";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
   const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <ProtectedClient requiredRoles={["admin"]}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        mobile={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Navbar
          collapsed={collapsed}
          onDesktopToggle={() => setCollapsed(!collapsed)}
          onMobileOpen={() => setMobileOpen(true)}
        />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100 dark:bg-gray-900">
          {children}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </div>
    </ProtectedClient>
  );
}
