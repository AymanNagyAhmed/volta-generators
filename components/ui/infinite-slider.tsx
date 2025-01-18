"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface InfiniteSliderProps {
  children: React.ReactNode;
  duration?: number;
  durationOnHover?: number;
  className?: string;
}

export function InfiniteSlider({
  children,
  duration = 20,
  durationOnHover = 60,
  className,
}: InfiniteSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sliderRef.current || !scrollerRef.current) return;

    const slider = sliderRef.current;
    const scroller = scrollerRef.current;

    // Clone the content for seamless loop
    const content = scroller.innerHTML;
    scroller.innerHTML = content + content;

    let animationFrame: number;
    let isPaused = false;
    let startX = 0;
    let scrollLeft = 0;
    let isMouseDown = false;

    const scroll = () => {
      if (!isPaused && scrollerRef.current) {
        if (scrollerRef.current.scrollLeft >= scrollerRef.current.scrollWidth / 2) {
          scrollerRef.current.scrollLeft = 0;
        } else {
          scrollerRef.current.scrollLeft += 1;
        }
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    const handleMouseEnter = () => {
      isPaused = true;
    };

    const handleMouseLeave = () => {
      isPaused = false;
    };

    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      startX = e.pageX - scroller.offsetLeft;
      scrollLeft = scroller.scrollLeft;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const x = e.pageX - scroller.offsetLeft;
      const walk = (x - startX) * 2;
      scroller.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener('mouseenter', handleMouseEnter);
    slider.addEventListener('mouseleave', handleMouseLeave);
    scroller.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    scroller.addEventListener('mousemove', handleMouseMove);

    animationFrame = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrame);
      slider.removeEventListener('mouseenter', handleMouseEnter);
      slider.removeEventListener('mouseleave', handleMouseLeave);
      scroller.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      scroller.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={sliderRef} className={cn("relative overflow-hidden", className)}>
      <div
        ref={scrollerRef}
        className="flex whitespace-nowrap cursor-grab active:cursor-grabbing"
      >
        {children}
      </div>
    </div>
  );
} 