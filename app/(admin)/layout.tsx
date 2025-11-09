// app/(admin)/layout.tsx
"use client";
import ProtectedClient from "@/components/auth/protected-client";
import Navbar from "@/components/navbar/navbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedClient requiredRole="admin">
      <div className="min-h-screen flex">
   
        <div className="flex-1 flex flex-col">
          {/* <Navbar /> */}
          <h2>I am Admin </h2>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </ProtectedClient>
  );
}
