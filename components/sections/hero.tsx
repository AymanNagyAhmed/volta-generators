'use client';

import { useState, useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Hero section component - Main landing page carousel
export const Hero = () => {
  // Initialize Embla Carousel with configuration
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,          // Enable infinite loop
    align: "center",     // Center align slides
    slidesToScroll: 1,   // Scroll one slide at a time
    duration: 30,        // Animation duration
    dragFree: false      // Disable free-form dragging
  });

  // State management
  const [selectedIndex, setSelectedIndex] = useState(0);        // Current slide index
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]); // Snap points for pagination
  const [isHovered, setIsHovered] = useState(false);           // Track mouse hover state
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null); // Reference for autoplay timer

  // Autoplay configuration
  const AUTOPLAY_INTERVAL = 50000; // Time between slides in milliseconds

  // Clear autoplay interval
  const clearAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
  }, []);

  // Start autoplay functionality
  const startAutoplay = useCallback(() => {
    clearAutoplay();
    if (emblaApi) {
      autoplayIntervalRef.current = setInterval(() => {
        if (!isHovered) {
          emblaApi.scrollNext();
        }
      }, AUTOPLAY_INTERVAL);
    }
  }, [clearAutoplay, emblaApi, isHovered]);

  // Navigation controls
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  // Update selected index when slide changes
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Initialize carousel and set up event listeners
  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Set up autoplay
  useEffect(() => {
    startAutoplay();
    return () => clearAutoplay();
  }, [startAutoplay, clearAutoplay]);

  // Mouse interaction handlers
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    clearAutoplay();
  }, [clearAutoplay]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    startAutoplay();
  }, [startAutoplay]);

  // Image data for carousel slides
  const heroImages = [
    // { id: 1, src: "/images/generators/generator-1.jpeg", alt: "Generator 1",desc:"description 1 lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." },
    { id: 2, src: "/images/generators/generator-2.webp", alt: "Generator 2",desc:"description 2 lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." },
    { id: 3, src: "/images/generators/generator-3.webp", alt: "Generator 3",desc:"description 3 lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." },
    { id: 4, src: "/images/generators/generator-4.webp", alt: "Generator 4",desc:"description 4 lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." },
    { id: 5, src: "/images/generators/generator-5.webp", alt: "Generator 5",desc:"description 5 lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." },
    { id: 6, src: "/images/generators/generator-6.webp", alt: "Generator 6",desc:"description 6 lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." },
  ];

  return (
    // Main container with responsive height
    <div className="relative w-full h-[calc(100vh-96px)] lg:h-[calc(100vh-136px)]">
      <div className="absolute inset-0">
        <div className="container mx-auto h-full flex flex-col items-center justify-center">
          {/* Carousel container */}
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-[90%] md:w-[60%] min-w-[280px] h-[70vh] md:h-[80vh] relative">
              {/* Carousel viewport */}
              <div 
                className="overflow-hidden rounded-lg shadow-xl h-full bg-transparent"
                ref={emblaRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Slides container */}
                <div className="flex h-full">
                  {heroImages.map((image) => (
                    <div
                      key={image.src}
                      className="flex-[0_0_100%] min-w-0 relative h-full"
                    >
                      {/* Slide content - Text overlay */}
                      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 z-10 w-[80%] md:w-[90%]">
                        <div className="bg-black/40 backdrop-blur-[2px] px-6 py-3 rounded-2xl">
                          <h2 className="text-white text-center text-base md:text-xl lg:text-2xl font-medium mx-auto">
                            {image.desc}
                          </h2>
                        </div>
                      </div>
                      {/* Slide content - Image */}
                      <div className="relative w-full h-full">
                        <Image 
                          src={image.src} 
                          alt={image.alt} 
                          fill
                          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 60vw, 60vw"
                          className="object-contain"
                          priority
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/50 dark:bg-gray-800/50 shadow-lg hover:bg-white/70 dark:hover:bg-gray-800/70 hidden md:flex"
                onClick={scrollPrev}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/50 dark:bg-gray-800/50 shadow-lg hover:bg-white/70 dark:hover:bg-gray-800/70 hidden md:flex"
                onClick={scrollNext}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Pagination dots */}
              <div 
                className="flex justify-center gap-3 mt-6"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {scrollSnaps.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 md:w-2 md:h-2 rounded-full transition-colors ${
                      index === selectedIndex
                        ? "bg-blue-600/70 dark:bg-blue-400/70"
                        : "bg-gray-300/50 dark:bg-gray-600/50"
                    }`}
                    onClick={() => scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 