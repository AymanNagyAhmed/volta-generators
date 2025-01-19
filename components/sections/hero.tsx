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
  const AUTOPLAY_INTERVAL = 50000;

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
    { id: 1, src: "/images/generators/generator-1.webp", alt: "Generator 1",desc:"description 1 lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." },
    { id: 2, src: "/images/generators/generator-2.webp", alt: "Generator 2",desc:"description 2 lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." },
    { id: 3, src: "/images/generators/generator-3.webp", alt: "Generator 3",desc:"description 3 lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." },
    { id: 4, src: "/images/generators/generator-4.webp", alt: "Generator 4",desc:"description 4 lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." },
    { id: 5, src: "/images/generators/generator-5.webp", alt: "Generator 5",desc:"description 5 lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." },
    { id: 6, src: "/images/generators/generator-6.webp", alt: "Generator 6",desc:"description 6 lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." },
  ];

  return (
    <div className="relative w-full h-[calc(100vh-96px)] lg:h-[calc(100vh-136px)]">
      <div className="absolute inset-0">
        <div className="container mx-auto h-full flex flex-col items-center justify-center">
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-[90%] md:w-[60%] min-w-[280px] h-[70vh] md:h-[80vh] relative">
              <div 
                className="overflow-hidden rounded-lg shadow-xl h-full bg-transparent"
                ref={emblaRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex h-full">
                  {heroImages.map((image) => (
                    <div
                      key={image.src}
                      className="flex-[0_0_100%] min-w-0 relative h-full"
                    >
                      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 z-10 w-[80%] md:w-[90%]">
                        <div className="bg-black/40 backdrop-blur-[2px] px-6 py-3 rounded-2xl">
                          <h2 className="text-white text-center text-base md:text-xl lg:text-2xl font-medium mx-auto">
                            {image.desc}
                          </h2>
                        </div>
                      </div>
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