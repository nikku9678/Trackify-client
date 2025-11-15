"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Menu,
  X,
  Sun,
  Moon,
  Code2,
  Database,
  Palette,
  Rocket,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/lib/feature/store";
import { logout } from "@/lib/feature/authSlice";
import { persistor } from "@/lib/feature/store";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    await persistor.purge();
    dispatch(logout());
  };

  return (
    <nav
      className="
        top-0 left-0 z-50 w-full 
        border-b border-border 
        bg-background/70 backdrop-blur-xl
        transition-colors
      "
    >
      <div className="max-w-[80%] mx-auto py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="
            text-2xl font-extrabold 
            bg-gradient-to-r from-[#00e0ff] via-[#a855f7] to-[#ff0080]
            bg-clip-text text-transparent 
            animate-gradient hover:opacity-90 transition-opacity
          "
        >
          Trackify
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center flex-1">
          <ul className="flex items-center gap-6">
            <li>
              <Link
                href="/"
                className="text-md font-medium text-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/sheets"
                className="text-md font-medium hover:text-primary transition-colors"
              >
                Sheets
              </Link>
            </li>

            {/* Services Dropdown */}
            <li className="relative group">
              <Button
                className="
                  flex items-center gap-1 bg-transparent 
                  text-md font-medium text-foreground 
                  hover:text-primary transition-colors
                "
              >
                Services
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 mt-[2px] transition-transform duration-300 group-hover:rotate-180"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Button>

              {/* Dropdown Card */}
              <div
                className="
                  absolute left-1/2 top-full mt-3 w-[500px] max-w-[90vw] 
                  -translate-x-1/2 rounded-xl border border-border 
                  bg-background shadow-none
                  opacity-0 invisible translate-y-2 scale-95
                  group-hover:opacity-100 group-hover:visible 
                  group-hover:translate-y-0 group-hover:scale-100
                  transition-all duration-300 ease-out z-50
                "
              >
                <div className="grid grid-cols-2 gap-4 p-5">

                  {/* Column 1 */}
                  <div className="border-b border-border/40 pb-3">
                    <h3 className="text-sm font-semibold text-primary mb-3">Development</h3>

                    <div className="space-y-3">
                      <Link
                        href="/services/web"
                        className="flex items-start gap-3 rounded-lg p-3 hover:bg-accent/20 transition"
                      >
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Code2 className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Web Development</p>
                          <p className="text-xs text-muted-foreground">
                            Build modern, scalable web applications.
                          </p>
                        </div>
                      </Link>

                      <Link
                        href="/services/backend"
                        className="flex items-start gap-3 rounded-lg p-3 hover:bg-accent/20 transition"
                      >
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Database className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Backend Services</p>
                          <p className="text-xs text-muted-foreground">
                            Robust APIs and databases for any platform.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="border-b border-border/40 pb-3">
                    <h3 className="text-sm font-semibold text-primary mb-3">
                      Design & Strategy
                    </h3>

                    <div className="space-y-3">
                      <Link
                        href="/services/ui"
                        className="flex items-start gap-3 rounded-lg p-3 hover:bg-accent/20 transition"
                      >
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Palette className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">UI/UX Design</p>
                          <p className="text-xs text-muted-foreground">
                            Craft beautiful, intuitive user experiences.
                          </p>
                        </div>
                      </Link>

                      <Link
                        href="/services/branding"
                        className="flex items-start gap-3 rounded-lg p-3 hover:bg-accent/20 transition"
                      >
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Rocket className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Brand Strategy</p>
                          <p className="text-xs text-muted-foreground">
                            Build a strong identity and digital presence.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </li>

            <li>
              <Link
                href="/contact"
                className="text-md font-medium hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Side: Theme + User */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

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

              <DropdownMenuContent align="end" className="w-48 bg-background border-border">
                <DropdownMenuItem asChild><Link href="/profile">Profile</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/bookmarks">Bookmarks</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/settings">Settings</Link></DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 hover:text-red-600">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild><Link href="/auth/login">Login</Link></Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md border border-border hover:bg-accent/20 transition"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/90 backdrop-blur-md px-6 pb-4">
          <div className="flex flex-col space-y-3 mt-3">
            <Link href="/" className="text-sm font-medium hover:text-primary">Home</Link>
            <Link href="/sheets" className="text-sm font-medium hover:text-primary">Sheets</Link>

            <details>
              <summary className="cursor-pointer text-sm font-medium hover:text-primary">
                Services
              </summary>
              <div className="ml-4 mt-1 flex flex-col space-y-1">
                <Link href="/services/web" className="hover:text-primary">Web Development</Link>
                <Link href="/services/backend" className="hover:text-primary">Backend Services</Link>
                <Link href="/services/ui" className="hover:text-primary">UI/UX Design</Link>
                <Link href="/services/branding" className="hover:text-primary">Brand Strategy</Link>
              </div>
            </details>

            <Link href="/contact" className="text-sm font-medium hover:text-primary">Contact</Link>

            <Button variant="outline" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              Toggle Theme
            </Button>

            {user || token ? (
              <>
                <Link href="/profile" className="text-sm font-medium hover:text-primary">Profile</Link>
                <Link href="/bookmarks" className="text-sm font-medium hover:text-primary">Bookmarks</Link>
                <Link href="/settings" className="text-sm font-medium hover:text-primary">Settings</Link>
                <Button variant="destructive" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Button asChild className="w-full"><Link href="/auth/login">Login</Link></Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
