"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export function OurBrands() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    slidesToScroll: 1,
    duration: 20,
    dragFree: true,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
    }
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  
  // Use useRef instead of useState for the interval
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Autoplay configuration
  const AUTOPLAY_INTERVAL = 5000;

  const clearAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    clearAutoplay();
    if (!isHovered && emblaApi) {
      autoplayIntervalRef.current = setInterval(() => {
        emblaApi.scrollNext();
      }, AUTOPLAY_INTERVAL);
    }
  }, [clearAutoplay, emblaApi, isHovered]);

  // Manual navigation
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

  // Initialize
  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Handle autoplay
  useEffect(() => {
    startAutoplay();
    return () => clearAutoplay();
  }, [startAutoplay, clearAutoplay, isHovered]);

  // Handle hover state changes
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    clearAutoplay();
  }, [clearAutoplay]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    startAutoplay();
  }, [startAutoplay]);

  const brands = [
    {
      id: 1,
      name: "Leroy Somer",
      logo: "/images/brands/leroysomer.png",
    },
    {
      id: 2,
      name: "DSE",
      logo: "/images/brands/dse.png",
    },
    {
      id: 3,
      name: "Cummins",
      logo: "/images/brands/cummins.png",
    },
    {
      id: 4,
      name: "Perkins",
      logo: "/images/brands/perkins.png",
    },
    {
      id: 5,
      name: "Stamford",
      logo: "/images/brands/stamford.png",
    },
    {
      id: 6,
      name: "Kubota",
      logo: "/images/brands/kubota.png",
    },
    {
      id: 7,
      name: "Linz",
      logo: "/images/brands/linz.png",
    },
    {
      id: 8,
      name: "Baudouin",
      logo: "/images/brands/baudouin.png",
    },
    {
      id: 9,
      name: "Stamford",
      logo: "/images/brands/stamford.png",
    },
  ];

  return (
    <section className="w-full py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
          OUR BRANDS
          <div className="h-1 w-24 bg-gray-400 mt-2 mx-auto"></div>
        </h2>

        <div className="max-w-6xl mx-auto relative">
          {/* Carousel Container */}
          <div 
            className="overflow-hidden" 
            ref={emblaRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className="flex-[0_0_100%] md:flex-[0_0_33.33%] lg:flex-[0_0_20%] min-w-0 pl-4 relative"
                >
                  <div className="aspect-square relative group p-4">
                    <div className="w-full h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center p-4">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={100}
                        height={100}
                        className="object-contain w-auto h-auto"
                      />
                    </div>
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
    </section>
  );
} 