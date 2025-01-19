'use client';

import { useState, useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "center",
    slidesToScroll: 1,
    duration: 30,
    dragFree: false
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Autoplay configuration
  const AUTOPLAY_INTERVAL = 3000;

  const clearAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
  }, []);

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

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    startAutoplay();
    return () => clearAutoplay();
  }, [startAutoplay, clearAutoplay]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    clearAutoplay();
  }, [clearAutoplay]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    startAutoplay();
  }, [startAutoplay]);

  const heroImages = [
    { src: "/images/generators/generator-1.webp", alt: "Generator 1" },
    { src: "/images/generators/generator-2.webp", alt: "Generator 2" },
    { src: "/images/generators/generator-3.webp", alt: "Generator 3" },
    { src: "/images/generators/generator-4.webp", alt: "Generator 4" },
    { src: "/images/generators/generator-5.webp", alt: "Generator 5" },
    { src: "/images/generators/generator-6.webp", alt: "Generator 6" },
  ];

  return (
    <div className="relative w-full h-[400px] md:mt-8 lg:mt-12">
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-blue-900/50">
          <div className="container mx-auto h-full flex flex-col items-center justify-center text-white">
            <div className="w-full flex justify-center">
              <div className="w-[40%] min-w-[280px] relative">
                {/* Carousel Container */}
                <div 
                  className="overflow-hidden rounded-lg shadow-xl"
                  ref={emblaRef}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="flex">
                    {heroImages.map((image) => (
                      <div
                        key={image.src}
                        className="flex-[0_0_100%] min-w-0 relative"
                      >
                        <div className="relative aspect-[4/3]">
                          <Image 
                            src={image.src} 
                            alt={image.alt} 
                            fill
                            sizes="(max-width: 768px) 280px, (max-width: 1200px) 40vw, 40vw"
                            className="object-cover"
                            priority
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white dark:hover:bg-gray-800 hidden md:flex"
                  onClick={scrollPrev}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white dark:hover:bg-gray-800 hidden md:flex"
                  onClick={scrollNext}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Dots Navigation */}
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
                          ? "bg-blue-600 dark:bg-blue-400"
                          : "bg-gray-300 dark:bg-gray-600"
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
    </div>
  );
}; 