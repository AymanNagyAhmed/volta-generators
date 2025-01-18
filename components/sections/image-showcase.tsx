"use client";

import { motion } from "framer-motion";
import { ImageComparison } from "@/components/ui/image-comparison";

export function ImageShowcase() {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-950 dark:text-white">
          Our Projects
          <div className="h-1 w-24 bg-yellow-400 mt-2 mx-auto"></div>
        </h2>

        <div className="max-w-4xl mx-auto">
          <ImageComparison
            className="w-full h-[500px] rounded-xl overflow-hidden shadow-xl"
            before="/images/project-before.png"
            after="/images/project-after.png"
            beforeLabel="Before Installation"
            afterLabel="After Installation"
          />
        </div>
      </div>
    </section>
  );
}