"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/lib/feature/store";
import { fetchUser, logout } from "@/lib/feature/authSlice";
import { useRouter } from "next/navigation";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const token =
      Cookies.get("token") ||
      (typeof window !== "undefined" ? localStorage.getItem("token") : null);

    if (token) {
      dispatch(fetchUser())
        .unwrap()
        .catch(() => {
          dispatch(logout());
          router.replace("/");
        });
    }
  }, [dispatch, router]);

  return null;
}
