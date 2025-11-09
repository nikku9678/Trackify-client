// app/(user)/layout.tsx
"use client";
import ProtectedClient from "@/components/auth/protected-client";
import Navbar from "@/components/navbar/navbar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
      
      <div className=" flex flex-col">
        <Navbar/>
        <main className="w-[85%] mx-auto">{children}</main>
      </div>
   
  );
}
