"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/utils";

interface ImageComparisonProps {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

const MotionDiv = motion.div as any;

export function ImageComparison({
  before,
  after,
  beforeLabel,
  afterLabel,
  className,
}: ImageComparisonProps) {
  const [sliderWidth, setSliderWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const position = useTransform(x, [-150, 150], [0, 100]);

  useEffect(() => {
    if (containerRef.current) {
      setSliderWidth(containerRef.current.offsetWidth);
    }
  }, []);

  return (
    <div ref={containerRef} className={cn("relative select-none", className)}>
      <div className="absolute inset-0">
        <img src={after} alt="After" className="w-full h-full object-cover" />
      </div>
      <MotionDiv
        className="absolute inset-0 overflow-hidden"
        style={{ width: position.get() + "%" }}
      >
        <img src={before} alt="Before" className="w-full h-full object-cover" />
      </MotionDiv>

      <MotionDiv
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ x, left: `calc(${position.get()}% - 2px)` }}
        drag="x"
        dragConstraints={{ left: -150, right: 150 }}
        dragElastic={0}
      >
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 8L6 4M2 8L6 12M2 8H14M14 8L10 4M14 8L10 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </MotionDiv>

      {(beforeLabel || afterLabel) && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4">
          <span className="bg-black/50 text-white px-2 py-1 rounded">
            {beforeLabel}
          </span>
          <span className="bg-black/50 text-white px-2 py-1 rounded">
            {afterLabel}
          </span>
        </div>
      )}
    </div>
  );
} 