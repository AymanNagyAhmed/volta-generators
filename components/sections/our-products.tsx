"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function OurProducts() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
    }
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

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

  const products = [
    {
      id: 2,
      title: "Maintenance",
      description: "Professional after sales support",
      image: "/images/products/test-284x284.png",
      link: "/learn-more"
    },
    {
      id: 3,
      title: "Genuine Spare Parts & Accessories",
      description: "Meeting the requirements of business across the globe",
      image: "/images/products/test-284x284.png",
      link: "/learn-more"
    },
    {
      id: 4,
      title: "ATS & Synchro Solutions",
      description: "High Performance digital controllers",
      image: "/images/products/test-284x284.png",
      link: "/learn-more"
    },
    {
      id: 5,
      title: "Diesel Generators",
      description: "The leading generator brand in the MENA area",
      image: "/images/products/test-284x284.png",
      link: "/learn-more"
    },
    {
      id: 6,
      title: "Diesel Generators",
      description: "The leading generator brand in the MENA area",
      image: "/images/products/test-284x284.png",
      link: "/learn-more"
    },
    {
      id: 7,
      title: "Diesel Generators",
      description: "The leading generator brand in the MENA area",
      image: "/images/products/test-284x284.png",
      link: "/learn-more"
    },
    {
      id: 8,
      title: "Diesel Generators",
      description: "The leading generator brand in the MENA area",
      image: "/images/products/test-284x284.png",
      link: "/learn-more"
    },
    {
      id: 9,
      title: "Diesel Generators",
      description: "The leading generator brand in the MENA area",
      image: "/images/products/test-284x284.png",
      link: "/learn-more"
    },
    {
      id: 10,
      title: "Diesel Generators",
      description: "The leading generator brand in the MENA area",
      image: "/images/products/test-284x284.png",
      link: "/learn-more"
    }
  ];

  return (
    <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-950 dark:text-white">
          OUR PRODUCTS
          <div className="h-1 w-24 bg-gray-400 mt-2 mx-auto"></div>
        </h2>

        <div className="max-w-6xl mx-auto relative">
          {/* Carousel Container */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 pl-4 relative"
                >
                  <div className="aspect-square relative group">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 rounded-b-lg">
                      <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
                      <p className="text-sm text-gray-200 mb-2">{product.description}</p>
                      <a 
                        href={product.link}
                        className="inline-block text-gray-400 hover:text-gray-300 text-sm font-semibold transition-colors"
                      >
                        LEARN MORE
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Hide on small screens */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white dark:hover:bg-gray-800 hidden md:flex"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white dark:hover:bg-gray-800 hidden md:flex"
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots Navigation - Make more prominent on mobile */}
          <div className="flex justify-center gap-3 mt-6">
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