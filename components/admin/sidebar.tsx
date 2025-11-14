"use client";

import { FileText, Settings, LogOut } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const sidebarUrl = [
    { icon: FileText, label: "Portfolio", href: "/portfolio" },
    { icon: FileText, label: "My Sheets", href: "/sheets" },
    { icon: Settings, label: "Assessments", href: "/me" }
  ];

  const navItemBase =
    "flex items-center rounded-md text-sm transition-all duration-300 ease-in-out";

  return (
    <aside
      className={clsx(
        "",
        "text-black",
        "h-full w-fit fixed md:relative z-40",
        "transition-all duration-300"
      )}
    >
      <nav className="mt-8 px-2 mx-auto flex flex-col justify-between h-[80%] relative">

        {/* TOP LINKS */}
        <div className="space-y-1">
          {sidebarUrl.map(({ icon: Icon, label, href }) => {
            const isActive = pathname === href;

            return (
              <Link key={label} href={href}>
                <div
                  className={clsx(
                    navItemBase,
                    "flex-col justify-center items-center py-3 px-4 mt-1",

                    // 🌟 Yellow active theme
                    isActive
                      ? "bg-yellow-300 dark:bg-yellow-400 text-gray-700 dark:text-gray-800 font-semibold"
                      : "text-gray-950 dark:text-neutral-300 hover:bg-yellow-300 hover:text-gray-800 dark:hover:bg-neutral-800"
                  )}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs mt-1 text-center leading-tight">
                    {label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* BOTTOM SECTION */}
        <div className="flex flex-col items-center space-y-4 pb-4">
          <div className="w-[90%] border-b border-neutral-300 dark:border-neutral-800" />

          {/* Logout */}
          <div className="w-full">
            <button
              className={clsx(
                navItemBase,
                "flex-col justify-center items-center py-3 w-full px-4",
                "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              )}
            >
              <LogOut className="w-6 h-6" />
              <span className="text-xs mt-1 leading-tight text-center">
                Logout
              </span>
            </button>
          </div>
        </div>

      </nav>


    </aside>
  );
}
