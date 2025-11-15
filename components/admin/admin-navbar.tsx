"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Search,
  User,
  Settings,
  LogOut,
  PanelRightOpen,
  PanelLeftClose,
  Sun,
  Moon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme, setTheme } = useTheme();


  return (
    <header className="px-6 py-2 flex flex-row justify-between">
      {/* LEFT SECTION */}
      <div className="flex items-center gap-3 flex-1 max-w-2xl px-4">
        <h2 className="font-semibold text-xl text-bold text-yellow-500">
          Welcome Nikku
        </h2>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4 md:gap-6 pr-1 md:pr-8">
        {/* Search Bar */}
        <div className="relative w-full hidden sm:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 w-5 h-5" />
          <Input
            placeholder="Search jobs, title or status..."
            className="
              rounded-xl 
              pl-12 pr-4 py-3
              text-sm
              border border-gray-300 dark:border-gray-700
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100
              focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
              focus:border-transparent
            "
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="relative"
        >
          {/* Light Mode Icon */}
          <Sun className="h-5 w-5 transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />

          {/* Dark Mode Icon */}
          <Moon className="absolute h-5 w-5 text-gray-900 transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />

          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* USER MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer border w-9 h-9 hover:ring-2 hover:ring-primary/40 transition">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 p-2 rounded-xl shadow-lg bg-white dark:bg-gray-800 dark:text-gray-100"
          >
            {/* User Info */}
            <div className="px-4 py-4 border-b dark:border-gray-700">
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                john.doe@example.com
              </p>
            </div>

            {/* Menu Items */}
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex items-center gap-2 text-red-500 hover:text-red-600">
              <LogOut className="w-4 h-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
