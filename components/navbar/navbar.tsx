"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/lib/store/store";
import { logout } from "@/lib/store/authSlice";
import { persistor } from "@/lib/store/store";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    // Clear persisted Redux state
    await persistor.purge();
    dispatch(logout());
  };

  return (
    <nav
      className="
        fixed top-3 left-1/2 z-50 w-[80%] -translate-x-1/2 
        rounded-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        bg-white/10 dark:bg-neutral-900/40 backdrop-blur-xl
        transition-colors
      "
    >
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Left: Logo */}
        <Link
          href="/"
          className="
            relative text-xl font-extrabold 
            bg-gradient-to-r from-[#00e0ff] via-[#a855f7] to-[#ff0080]
            bg-clip-text text-transparent 
            animate-gradient 
            hover:opacity-90 transition-opacity
          "
        >
          Trackify
        </Link>

        {/* Center: Navigation Links (Desktop) */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/sheets"
                    className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                  >
                    Sheets
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem className="group relative">
                <NavigationMenuTrigger
                  className="
                    bg-transparent px-3 py-2 text-sm font-medium 
                    text-foreground hover:text-primary 
                    transition-colors group-hover:bg-transparent
                  "
                >
                  Services
                </NavigationMenuTrigger>

                <div
                  className="absolute left-0 top-full mt-2 w-[200px] rounded-md border 
                            bg-background/90 backdrop-blur-md shadow-lg 
                            opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 
                            pointer-events-none group-hover:pointer-events-auto 
                            transition-all duration-200 ease-out
                            z-50"
                >
                  <div className="grid gap-2 p-3">
                    <Link
                      href="/services/web"
                      className="text-sm hover:text-primary transition-colors"
                    >
                      Web Development
                    </Link>
                    <Link
                      href="/services/ui"
                      className="text-sm hover:text-primary transition-colors"
                    >
                      UI/UX Design
                    </Link>
                  </div>
                </div>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/contact"
                    className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                  >
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Section: Theme toggle + User / Login */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Conditional: User Logged In or Not */}
          {user || token ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer border border-border hover:ring-2 hover:ring-primary/60 transition">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                    {user?.username?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bookmarks">Bookmarks</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-600"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="font-medium">
              <Link href="/auth/login">Login</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md border border-border/50 hover:bg-accent/20 transition"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/70 backdrop-blur-md px-4 pb-4">
          <div className="flex flex-col space-y-3 mt-3">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="/sheets" className="text-sm font-medium hover:text-primary">
              Sheets
            </Link>
            <details>
              <summary className="cursor-pointer text-sm font-medium hover:text-primary">
                Services
              </summary>
              <div className="ml-4 mt-1 flex flex-col space-y-1">
                <Link href="/services/web" className="hover:text-primary">
                  Web Development
                </Link>
                <Link href="/services/ui" className="hover:text-primary">
                  UI/UX Design
                </Link>
              </div>
            </details>

            <Link href="/contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>

            <Button
              variant="outline"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              Toggle Theme
            </Button>

            {user || token ? (
              <>
                <Link href="/profile" className="text-sm font-medium hover:text-primary">
                  Profile
                </Link>
                <Link href="/bookmarks" className="text-sm font-medium hover:text-primary">
                  Bookmarks
                </Link>
                <Link href="/settings" className="text-sm font-medium hover:text-primary">
                  Settings
                </Link>
                <Button variant="destructive" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button asChild className="w-full">
                <Link href="/auth/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
