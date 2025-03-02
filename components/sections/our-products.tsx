"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAllSiteSections } from "@/lib/services/site-sections.service";
import { SiteSection, SiteSetting } from "@/lib/types/site-sections.types";

// Define the product item interface
interface ProductItem {
  id: number;
  title?: string;
  description?: string;
  image: string;
  link?: string;
}

export function OurProducts() {
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
  const [productsData, setProductsData] = useState<SiteSetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sectionTitle, setSectionTitle] = useState("OUR PRODUCTS");

  // Fetch products data from API
  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        setIsLoading(true);
        const response = await getAllSiteSections();
        
        if ('success' in response && response.success) {
          // Find the our_products section
          const ourProductsSection = response.data.find(
            (section: SiteSection) => section.title === "our_products"
          );
          
          if (ourProductsSection && ourProductsSection.settings) {
            setProductsData(ourProductsSection.settings);
            
            // Find the title setting
            const titleSetting = ourProductsSection.settings.find(
              setting => setting.key === "title"
            );
            
            if (titleSetting) {
              setSectionTitle(titleSetting.value);
            }
          } else {
            setError("Products data not found");
          }
        } else {
          setError("Failed to fetch products data");
        }
      } catch (err) {
        console.error("Error fetching products data:", err);
        setError("Error loading products data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductsData();
  }, []);

  // Process products data into a format suitable for display
  const processedProductsData = useMemo(() => {
    try {
      // Find the setting with key "slides"
      const slidesSetting = productsData.find(setting => setting.key === "slides");
      
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
          title: slide.title || `Product ${index + 1}`,
          description: slide.description || "",
          image: imagePath,
          link: slide.link || "/learn-more"
        };
      });
      
      return processedSlides;
    } catch (err) {
      console.error("Error processing products data:", err);
      return [];
    }
  }, [productsData]);

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
  const fallbackProducts: ProductItem[] = [
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

  // Determine which data to display
  const displayData = processedProductsData.length > 0 ? processedProductsData : fallbackProducts;

  // Loading state
  if (isLoading) {
    return (
      <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-white text-gray-700">
        <div className="container mx-auto px-4 flex items-center justify-center h-[300px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error && processedProductsData.length === 0) {
    console.warn("Using fallback data due to error:", error);
    // Continue with fallback data
  }

  return (
    <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-white text-gray-700">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {sectionTitle}
          <div className="h-1 w-24 bg-gray-400 mt-2 mx-auto"></div>
        </h2>

        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Carousel Container */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {displayData.map((product: ProductItem) => (
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

          {/* Navigation Buttons - */}
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