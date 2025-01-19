/* eslint-disable */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TransitionPanelProps {
  children: React.ReactNode[];
  className?: string;
  transition?: any;
  activeIndex: number;
}

export function TransitionPanel({
  children,
  className,
  transition,
  activeIndex,
}: TransitionPanelProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={transition}
        >
          {children[activeIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 