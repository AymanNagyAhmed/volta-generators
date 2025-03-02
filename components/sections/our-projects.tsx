"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAllSiteSections } from "@/lib/services/site-sections.service";
import { SiteSection, SiteSetting } from "@/lib/types/site-sections.types";

// Define the project item interface
interface ProjectItem {
  id: number;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export function OurProjects() {
  // Initialize Embla Carousel with configuration
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
    }
  });

  // State management
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [projectsData, setProjectsData] = useState<SiteSetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sectionTitle, setSectionTitle] = useState("OUR PROJECTS");

  // Fetch projects data from API
  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        setIsLoading(true);
        const response = await getAllSiteSections();
        
        if ('success' in response && response.success) {
          // Find the our_projects section (was incorrectly looking for our_products)
          const ourProjectsSection = response.data.find(
            (section: SiteSection) => section.title === "our_projects"
          );
          
          if (ourProjectsSection && ourProjectsSection.settings) {
            setProjectsData(ourProjectsSection.settings);
            
            // Find the title setting
            const titleSetting = ourProjectsSection.settings.find(
              setting => setting.key === "title"
            );
            
            if (titleSetting) {
              setSectionTitle(titleSetting.value);
            }
          } else {
            setError("Projects data not found");
          }
        } else {
          setError("Failed to fetch projects data");
        }
      } catch (err) {
        console.error("Error fetching projects data:", err);
        setError("Error loading projects data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectsData();
  }, []);

  // Process projects data into a format suitable for display
  const processedProjectsData = useMemo(() => {
    try {
      // Find the setting with key "slides"
      const slidesSetting = projectsData.find(setting => setting.key === "slides");
      
      if (!slidesSetting) {
        return [];
      }
      
      // Parse the JSON string value
      const slidesArray = JSON.parse(slidesSetting.value);
      
      // Get the API URL from environment variables
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      
      // Map the parsed data to the format expected by the carousel
      const processedSlides = slidesArray.map((slide: any, index: number) => {
        // Process the image path to ensure it points directly to the backend
        let imagePath = slide.image;
        
        // If it's a relative path, prepend the API URL
        if (imagePath && !imagePath.startsWith('http')) {
          imagePath = `${apiUrl}${imagePath}`;
        }
        
        return {
          id: index + 1,
          src: imagePath,
          alt: slide.title || slide.description || `Project ${index + 1}`,
          title: slide.title || `Project ${index + 1}`,
          description: slide.description
        };
      });
      
      return processedSlides;
    } catch (err) {
      console.error("Error processing projects data:", err);
      return [];
    }
  }, [projectsData]);

  // Navigation controls
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

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

  // Fallback data in case API data is not available
  const fallbackProjectImages: ProjectItem[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    src: "/images/projects/test-284x284.png",
    alt: `Project ${i + 1}`,
  }));

  // Determine which data to display
  const displayData = processedProjectsData.length > 0 ? processedProjectsData : fallbackProjectImages;

  // Loading state
  if (isLoading) {
    return (
      <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4 flex items-center justify-center h-[300px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error && processedProjectsData.length === 0) {
    console.warn("Using fallback data due to error:", error);
    // Continue with fallback data
  }

  return (
    <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-950 dark:text-white">
          {sectionTitle}
          <div className="h-1 w-24 bg-gray-400 mt-2 mx-auto"></div>
        </h2>

        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Carousel Container */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {displayData.map((image: ProjectItem) => (
                <div
                  key={image.id}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 pl-4 relative"
                >
                  <div className="aspect-square relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                    {image.title && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 rounded-b-lg">
                        <h3 className="text-sm font-medium">{image.title}</h3>
                        {image.description && (
                          <p className="text-xs opacity-80">{image.description}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Hide on small screens */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-gray-700 shadow-lg hover:bg-white text-white hover:text-gray-700 hidden md:flex"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-gray-700 shadow-lg hover:bg-white text-white hover:text-gray-700 hidden md:flex"
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
                    ? "bg-gray-700"
                    : "bg-gray-400"
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