"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/store";
import { loginUser } from "@/lib/store/authSlice";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser(form));
    if (loginUser.fulfilled.match(result)) router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md shadow-lg border border-border">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <p className="text-sm text-muted-foreground">Login to your account</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="email"
              placeholder="Email"
              type="email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              name="password"
              placeholder="Password"
              type="password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-muted"></div>
            <span className="px-2 text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-muted"></div>
          </div>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() =>
              (window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`)
            }
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </Button>
        </CardContent>

        <CardFooter className="text-center text-sm">
          Don’t have an account?
          <Link href="/auth/register" className="text-primary hover:underline ml-1">
            Register
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
