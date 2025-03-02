"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { getAllSiteSections } from "@/lib/services/site-sections.service";
import { SiteSection, SiteSetting } from "@/lib/types/site-sections.types";

// Define the brand item interface
interface BrandItem {
  id: number;
  name: string;
  logo: string;
  description?: string;
}

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

  // State management
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [brandsData, setBrandsData] = useState<SiteSetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sectionTitle, setSectionTitle] = useState("OUR BRANDS");
  
  // Use useRef instead of useState for the interval
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Autoplay configuration
  const AUTOPLAY_INTERVAL = 5000;

  // Fetch brands data from API
  useEffect(() => {
    const fetchBrandsData = async () => {
      try {
        setIsLoading(true);
        const response = await getAllSiteSections();
        
        if ('success' in response && response.success) {
          // Find the our_brands section
          const ourBrandsSection = response.data.find(
            (section: SiteSection) => section.title === "our_brands"
          );
          
          if (ourBrandsSection && ourBrandsSection.settings) {
            setBrandsData(ourBrandsSection.settings);
            
            // Find the title setting
            const titleSetting = ourBrandsSection.settings.find(
              setting => setting.key === "title"
            );
            
            if (titleSetting) {
              setSectionTitle(titleSetting.value);
            }
          } else {
            setError("Brands data not found");
          }
        } else {
          setError("Failed to fetch brands data");
        }
      } catch (err) {
        console.error("Error fetching brands data:", err);
        setError("Error loading brands data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrandsData();
  }, []);

  // Process brands data into a format suitable for display
  const processedBrandsData = useMemo(() => {
    try {
      // Find the setting with key "brands"
      const brandsSetting = brandsData.find(setting => setting.key === "brands");
      
      if (!brandsSetting) {
        return [];
      }
      
      // Parse the JSON string value
      const brandsArray = JSON.parse(brandsSetting.value);
      
      // Get the API URL from environment variables
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      
      // Map the parsed data to the format expected by the component
      const processedBrands = brandsArray
        .filter((brand: any) => brand.image && brand.image.trim() !== "") // Filter out brands with empty image paths
        .map((brand: any, index: number) => {
          // Process the image path to ensure it points directly to the backend
          let imagePath = brand.image;
          
          // Handle different path formats
          if (!imagePath.startsWith('/')) {
            // If it doesn't start with /, add /
            imagePath = '/' + imagePath;
          }
          
          // If it doesn't start with /public/ and it's not an absolute URL, add /public
          if (!imagePath.startsWith('/public/') && !imagePath.startsWith('http')) {
            imagePath = '/public' + imagePath;
          }
          
          // If it's a relative path, prepend the API URL
          if (!imagePath.startsWith('http')) {
            imagePath = `${apiUrl}${imagePath}`;
          }
          
          return {
            id: index + 1,
            name: brand.name || `Brand ${index + 1}`,
            logo: imagePath,
            description: brand.description
          };
        });
      
      return processedBrands;
    } catch (err) {
      console.error("Error processing brands data:", err);
      return [];
    }
  }, [brandsData]);

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

  // Fallback data in case API data is not available
  const fallbackBrands: BrandItem[] = [
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

  // Determine which data to display
  const displayData = processedBrandsData.length > 0 ? processedBrandsData : fallbackBrands;

  // Loading state
  if (isLoading) {
    return (
      <section className="w-full py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 flex items-center justify-center h-[200px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading brands...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error && processedBrandsData.length === 0) {
    console.warn("Using fallback data due to error:", error);
    // Continue with fallback data
  }

  return (
    <section className="w-full py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
          {sectionTitle}
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
              {displayData.map((brand: BrandItem) => (
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
                        unoptimized={true}
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
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-gray-700 shadow-lg hover:bg-white text-white hover:text-gray-700 hidden md:flex"
            onClick={scrollPrev}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-gray-700 shadow-lg hover:bg-white text-white hover:text-gray-700 hidden md:flex"
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