"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { registerUser } from "@/lib/store/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading, error } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(registerUser(form));
    if (registerUser.fulfilled.match(result)) {
      router.push("/"); // redirect after successful registration
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md shadow-lg border border-border">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <p className="text-sm text-muted-foreground">Register to get started</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Username</label>
              <Input
                name="username"
                type="text"
                placeholder="Enter username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input
                name="phone"
                type="tel"
                placeholder="1234567890"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <Input
                name="password"
                type="password"
                placeholder="********"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Register"}
            </Button>

            {error && (
              <p className="text-red-500 text-sm text-center mt-2">{error}</p>
            )}
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-muted"></div>
            <span className="px-2 text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-muted"></div>
          </div>

          {/* Google Auth */}
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
          Already have an account?
          <Link href="/login" className="text-primary hover:underline ml-1">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
