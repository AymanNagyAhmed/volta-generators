"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MotionDiv = motion.div as any;

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
}

interface CarouselContextType {
  index: number;
  setIndex: (index: number) => void;
}

const CarouselContext = React.createContext<CarouselContextType>({
  index: 0,
  setIndex: () => {},
});

export function Carousel({ children, className }: CarouselProps) {
  const [index, setIndex] = React.useState(0);
  const itemsCount = React.Children.count(children);

  const scrollPrev = () => {
    console.log('Scrolling to previous item');
    setIndex((current) => (current <= 0 ? itemsCount - 1 : current - 1));
  };

  const scrollNext = () => {
    console.log('Scrolling to next item');
    setIndex((current) => (current >= itemsCount - 1 ? 0 : current + 1));
  };

  return (
    <CarouselContext.Provider value={{ index, setIndex }}>
      <div className={cn("relative", className)}>
        {children}
        <div className="absolute -left-12 -right-12 top-1/2 flex -translate-y-1/2 justify-between">
          <button
            onClick={scrollPrev}
            className="h-8 w-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={scrollNext}
            className="h-8 w-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const { index } = React.useContext(CarouselContext);

  return (
    <div className={cn("overflow-hidden", className)}>
      <MotionDiv
        className="flex"
        animate={{ x: `-${index * 100}%` }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      >
        {children}
      </MotionDiv>
    </div>
  );
}

export function CarouselItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("min-w-0 shrink-0 grow-0", className)}>
      {children}
    </div>
  );
}

export function CarouselNavigation() {
  return null; // Navigation is now handled in the Carousel component
} 