"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/lib/store/store";
import { fetchUser } from "@/lib/store/authSlice";

/**
 * BootstrapAuth
 * - invoke this once inside a client provider to hydrate Redux auth from cookie token
 */
export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = Cookies.get("token") || (typeof window !== "undefined" ? localStorage.getItem("token") : null);
    console.log("DD",token)
    if (token) {
      // fetch user info and populate store
      dispatch(fetchUser() as any);
    }
  }, [dispatch]);

  return null;
}
