"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <section
      className="
        relative w-full flex flex-col items-center justify-center text-center 
        py-24 px-6 md:py-32 lg:py-40 overflow-hidden
        bg-gradient-to-b from-white to-transparent dark:from-neutral-900 dark:to-transparent
        transition-colors duration-500
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute inset-0 -z-10 overflow-hidden
          bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_70%)]
          dark:bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.15),transparent_70%)]
        "
      />

      {/* Heading */}
      <h1
        className="
          text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl
          text-gray-900 dark:text-gray-100 
        "
      >
        Boost Your <span className="text-primary">Productivity</span> with{" "}
        <span
          className="
            bg-gradient-to-r from-[#00e0ff] via-[#a855f7] to-[#ff0080]
            bg-clip-text text-transparent
          "
        >
          Trackify
        </span>
      </h1>

      {/* Subtext */}
      <p
        className="
          mt-6 text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl
        "
      >
        Trackify helps you organize your coding journey — plan your goals, monitor progress,
        and stay consistent with powerful tracking tools designed for developers.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          className="
            bg-gradient-to-r from-[#00e0ff] via-[#a855f7] to-[#ff0080]
            text-white font-semibold hover:opacity-90 transition
          "
        >
          Get Started <Rocket className="ml-2 h-5 w-5" />
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="
            border border-gray-400/40 dark:border-gray-600/50
            text-gray-800 dark:text-gray-200
            hover:bg-gray-100 dark:hover:bg-neutral-800 transition
          "
        >
          Learn More <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

   
    </section>
  );
}
