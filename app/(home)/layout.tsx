// app/(user)/layout.tsx
"use client";
import ProtectedClient from "@/components/auth/protected-client";
import Navbar from "@/components/navbar/navbar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
   
      <div className="min-h-screen flex flex-col">
        <main className="p-6">{children}</main>
      </div>

  );
}
