"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store/store"; // you expose hooks in store file
import type { RootState } from "@/lib/store/store";

/**
 * ProtectedClient
 * - requiredRole: "admin" | "user" | undefined
 * - If not authenticated -> redirect to /login
 * - If authenticated but role mismatch -> redirect to /unauthorized
 */
export default function ProtectedClient({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: "admin" | "user";
}) {
  const router = useRouter();
  const auth = useAppSelector((s: RootState) => s.auth);
  console.log("AUTH", auth)
  useEffect(() => {
    // If still loading, wait
    if (auth.loading) return;

    // Not logged in -> go to login
    if (!auth.token) {
      router.replace("/login");
      return;
    }

    // Role mismatch
    if (requiredRole && auth.user?.role !== requiredRole) {
      router.replace("/unauthorized");
    }
  }, [auth.token, auth.user, auth.loading, requiredRole, router]);

  // Don't render children until checks pass
  if (auth.loading) return null;
  if (!auth.token) return null;
  if (requiredRole && auth.user?.role !== requiredRole) return null;

  return <>{children}</>;
}
