"use client";

import { useState, useEffect, useMemo } from "react";
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { getAllSiteSections } from "@/lib/services/site-sections.service";
import { SiteSection, SiteSetting } from "@/lib/types/site-sections.types";

// Define the flag item interface
interface FlagItem {
  country: string;
  src: string;
}

const testimonials = [
  {
    text: "Mashallah, excellent service from AQT Generators. I ordered a 660 KVA generator for my factory and it was delivered on time at a very competitive price. Thanks to Mahmoud for his continuous follow-up of the shipment.",
    author: "ASHRAF MANSOUR",
    rating: 5
  },
  {
    text: "Just wanted to leave a quick review for AQT generators. Their prices are really competitive, and the delivery was faster than expected. The sales guy, Ibrahim, was great at answering all my questions and making sure I got the right generator for my needs. Will be using them again!",
    author: "KYLE",
    rating: 5
  },
  {
    text: "After a long extensive search for companies, all details and specifications were available thanks for Meryam. I appreciate the completion of the deal with the most important thing.",
    author: "AWAD K",
    rating: 5
  }
];

export function GeographicalCoverage() {
  // State management
  const [coverageData, setCoverageData] = useState<SiteSetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sectionTitle, setSectionTitle] = useState("OUR GEOGRAPHICAL COVERAGE");

  // Fetch geographical coverage data from API
  useEffect(() => {
    const fetchCoverageData = async () => {
      try {
        setIsLoading(true);
        const response = await getAllSiteSections();
        
        if ('success' in response && response.success) {
          // Find the our_geographical_coverage section
          const coverageSection = response.data.find(
            (section: SiteSection) => section.title === "our_geographical_coverage"
          );
          
          if (coverageSection && coverageSection.settings) {
            setCoverageData(coverageSection.settings);
            
            // Find the title setting
            const titleSetting = coverageSection.settings.find(
              setting => setting.key === "title"
            );
            
            if (titleSetting) {
              setSectionTitle(titleSetting.value);
            }
          } else {
            setError("Geographical coverage data not found");
          }
        } else {
          setError("Failed to fetch geographical coverage data");
        }
      } catch (err) {
        console.error("Error fetching geographical coverage data:", err);
        setError("Error loading geographical coverage data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoverageData();
  }, []);

  // Process flags data into a format suitable for display
  const processedFlagsData = useMemo(() => {
    try {
      // Find the setting with key "flags"
      const flagsSetting = coverageData.find(setting => setting.key === "flags");
      
      if (!flagsSetting) {
        return [];
      }
      
      // Parse the JSON string value
      const flagsArray = JSON.parse(flagsSetting.value);
      
      // Get the API URL from environment variables
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      
      // Map the parsed data to the format expected by the component
      const processedFlags = flagsArray
        .filter((flag: any) => flag.image && flag.image.trim() !== "") // Filter out flags with empty image paths
        .map((flag: any, index: number) => {
          // Process the image path to ensure it points directly to the backend
          let imagePath = flag.image;
          
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
            country: flag.country || `Country ${index + 1}`,
            src: imagePath
          };
        });
      
      return processedFlags;
    } catch (err) {
      console.error("Error processing flags data:", err);
      return [];
    }
  }, [coverageData]);

  // Fallback data in case API data is not available
  const fallbackFlags: FlagItem[] = [
    { country: "Lebanon", src: "/images/flags/lb-flag.webp" },
    { country: "Qatar", src: "/images/flags/qa-flag.webp" },
    { country: "Saudi Arabia", src: "/images/flags/sa-flag.webp" },
    { country: "United Arab Emirates", src: "/images/flags/uae-flag.webp" },
    { country: "Kuwait", src: "/images/flags/kw-flag.webp" },
    { country: "Iraq", src: "/images/flags/iq-flag.webp" },
    { country: "Egypt", src: "/images/flags/eg-flag.webp" },
    { country: "Jordan", src: "/images/flags/jo-flag.webp" },
    { country: "Oman", src: "/images/flags/om-flag.webp" },
  ];

  // Determine which data to display
  const displayData = processedFlagsData.length > 0 ? processedFlagsData : fallbackFlags;

  // Loading state
  if (isLoading) {
    return (
      <section className="w-full py-8 sm:py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center h-[200px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading geographical coverage...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error && processedFlagsData.length === 0) {
    console.warn("Using fallback data due to error:", error);
    // Continue with fallback data
  }

  return (
    <section className="w-full py-8 sm:py-16 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-brand-text-light-primary dark:text-brand-text-dark-primary">
          {sectionTitle}
          <div className="h-1 w-24 bg-brand-secondary mt-2 mx-auto"></div>
        </h2>

        {/* Flags InfiniteSlider */}
        <div className="relative w-full flex justify-center mb-12 sm:mb-20">
          <InfiniteSlider durationOnHover={75} gap={16} reverse>
            {displayData.map((flag: FlagItem, index: number) => (
              <img
                key={index}
                src={flag.src}
                alt={`${flag.country} flag`}
                className="aspect-square w-[80px] sm:w-[120px] rounded-[4px] object-contain border border-zinc-200 dark:border-zinc-800"
              />
            ))}
          </InfiniteSlider>
        </div>

      </div>
    </section>
  );
}