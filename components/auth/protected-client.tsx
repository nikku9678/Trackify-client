"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/feature/store";

/**
 * ProtectedClient
 * - Redirects to `/` if user not logged in.
 * - Redirects to `/unauthorized` if role mismatch.
 */
export default function ProtectedClient({
  children,
  requiredRoles,
}: {
  children: React.ReactNode;
  requiredRoles?: string[];
}) {
  const router = useRouter();
  const { user, token, loading } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (loading) return;

    // ✅ Not logged in -> redirect to home page
    if (!token) {
      router.replace("/");
      return;
    }

    // ✅ Role-based protection
    const userRole = user?.role?.toLowerCase();
    if (requiredRoles && !requiredRoles.includes(userRole ?? "")) {
      router.replace("/unauthorized");
    }
  }, [user, token, loading, requiredRoles, router]);

  if (loading) return null;
  if (!token) return null;
  if (requiredRoles && !requiredRoles.includes(user?.role?.toLowerCase() ?? ""))
    return null;

  return <>{children}</>;
}
