"use client";

import * as React from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";

const MotionDiv = motion.div as any;

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
}

interface CarouselContextType {
  index: number;
  setIndex: (index: number) => void;
  itemsCount: number;
  setItemsCount: (count: number) => void;
}

const CarouselContext = React.createContext<CarouselContextType>({
  index: 0,
  setIndex: () => {},
  itemsCount: 0,
  setItemsCount: () => {},
});

export function Carousel({ children, className }: CarouselProps) {
  const [index, setIndex] = React.useState(0);
  const [itemsCount, setItemsCount] = React.useState(0);

  return (
    <CarouselContext.Provider value={{ index, setIndex, itemsCount, setItemsCount }}>
      <div className={cn("relative", className)}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

interface CarouselContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CarouselContent({ children, className }: CarouselContentProps) {
  const { index } = React.useContext(CarouselContext);

  return (
    <div className={cn("overflow-hidden", className)}>
      <MotionDiv
        className="flex"
        animate={{ x: `-${index * 100}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {children}
      </MotionDiv>
    </div>
  );
}

interface CarouselItemProps {
  children: React.ReactNode;
  className?: string;
}

export function CarouselItem({ children, className }: CarouselItemProps) {
  return (
    <div className={cn("flex-shrink-0 flex-grow-0", className)}>
      {children}
    </div>
  );
}

interface CarouselNavigationProps {
  className?: string;
}

export function CarouselNavigation({ className }: CarouselNavigationProps) {
  const { index, setIndex, itemsCount } = React.useContext(CarouselContext);

  return (
    <div className={cn("flex justify-center gap-2", className)}>
      {Array.from({ length: itemsCount }).map((_, i) => (
        <button
          key={i}
          className={cn(
            "w-2 h-2 rounded-full transition-colors",
            index === i ? "bg-amber-400" : "bg-gray-300"
          )}
          onClick={() => setIndex(i)}
        />
      ))}
    </div>
  );
} 