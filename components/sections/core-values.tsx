"use client";

import { TransitionPanel } from "@/components/ui/transition-panel";
import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { getAllSiteSections } from "@/lib/services/site-sections.service";
import { SiteSection, SiteSetting } from "@/lib/types/site-sections.types";

// Define the value item interface
interface ValueItem {
  title: string;
  description: string;
}

// Fallback values in case API data is not available
const fallbackValues: ValueItem[] = [
  {
    title: "Honesty",
    description: "At Volta Generators, integrity is the cornerstone of everything we do. We are committed to fostering trust through transparent and ethical practices in every interaction. Our approach is simple: clear communication, no hidden agendas, and fair dealings. You can rely on us to deliver genuine, high-quality solutions that prioritize your needs without compromise. Honesty isn't just a value—it's the foundation of our relationship with you."
  },
  {
    title: "Quality",
    description: "We take pride in our products, which are engineered for durability and efficiency, ensuring optimal performance in challenging environments. Quality is at the heart of everything we do. Our products undergo rigorous testing and quality control processes to ensure they meet the highest industry standards. We employ advanced manufacturing techniques, utilizing the finest materials to guarantee the longevity and reliability of our power systems."
  },
  {
    title: "Accessibility",
    description: "Power should be accessible to all. We focus on making our products and services accessible to a wide range of clients, ensuring that everyone can benefit from reliable and affordable power solutions."
  },
  {
    title: "Customer Focus",
    description: "We prioritize our customers' needs, providing tailored solutions and exceptional service to meet their unique requirements."
  }
];

export function CoreValues() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [valuesData, setValuesData] = useState<SiteSetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sectionTitle, setSectionTitle] = useState("Our Core Values");
  const [processedValues, setProcessedValues] = useState<ValueItem[]>(fallbackValues);

  // Fetch core values data from API
  useEffect(() => {
    const fetchCoreValuesData = async () => {
      try {
        setIsLoading(true);
        const response = await getAllSiteSections();
        
        if ('success' in response && response.success) {
          // Find the our_core_values section
          const coreValuesSection = response.data.find(
            (section: SiteSection) => section.title === "our_core_values"
          );
          
          if (coreValuesSection && coreValuesSection.settings) {
            setValuesData(coreValuesSection.settings);
            
            // Find the title setting
            const titleSetting = coreValuesSection.settings.find(
              setting => setting.key === "title"
            );
            
            if (titleSetting) {
              setSectionTitle(titleSetting.value);
            }

            // Process the values data
            const values: ValueItem[] = [];

            // Find honesty description
            const honestyDescription = coreValuesSection.settings.find(
              setting => setting.key === "honesty_description"
            );
            if (honestyDescription) {
              values.push({
                title: "Honesty",
                description: honestyDescription.value
              });
            }

            // Find quality description
            const qualityDescription = coreValuesSection.settings.find(
              setting => setting.key === "quality_description"
            );
            if (qualityDescription) {
              values.push({
                title: "Quality",
                description: qualityDescription.value
              });
            }

            // Find accessibility description
            const accessibilityDescription = coreValuesSection.settings.find(
              setting => setting.key === "accessibility_description"
            );
            if (accessibilityDescription) {
              values.push({
                title: "Accessibility",
                description: accessibilityDescription.value
              });
            }

            // Find customer focus description
            const customerFocusDescription = coreValuesSection.settings.find(
              setting => setting.key === "customer_focus_description"
            );
            if (customerFocusDescription) {
              values.push({
                title: "Customer Focus",
                description: customerFocusDescription.value
              });
            }

            // Only update if we have values
            if (values.length > 0) {
              setProcessedValues(values);
            }
          } else {
            setError("Core values data not found");
          }
        } else {
          setError("Failed to fetch core values data");
        }
      } catch (err) {
        console.error("Error fetching core values data:", err);
        setError("Error loading core values data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoreValuesData();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <section className="w-full py-16 modern-container text-modern-300">
        <div className="container mx-auto px-4 flex items-center justify-center h-[300px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading core values...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error && valuesData.length === 0) {
    console.warn("Using fallback data due to error:", error);
    // Continue with fallback data
  }

  // Determine which data to display
  const displayValues = processedValues.length > 0 ? processedValues : fallbackValues;

  return (
    <section className="w-full py-16 modern-container text-modern-300">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {sectionTitle}
          <div className="h-1 w-24 bg-gray-400 mt-2 mx-auto"></div>
        </h2>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {displayValues.map((value, index) => (
            <button
              key={value.title}
              onClick={() => setActiveIndex(index)}
              className={`flex flex-col items-center p-6 rounded-xl transition-all ${
                activeIndex === index
                ? 'bg-gradient-to-b from-gray-50 to-white text-gray-700'
                : 'modern-container hover:bg-gradient-to-b hover:from-gray-50 hover:to-white hover:text-gray-700'
              }`}
            >
              {/* Check Icon */}
              <div className={`w-12 h-12 rounded-full modern-container flex items-center justify-center mb-4 ${
                activeIndex === index ? 'bg-gray-700' : ''
              }`}>
                <Check className={`w-6 h-6 ${
                  activeIndex === index ? 'text-white' : 'text-gray-400'
                }`} 
                 />
              </div>
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
            </button>
          ))}
        </div>

        <TransitionPanel
          activeIndex={activeIndex}
          className="max-w-2xl mx-auto bg-white text-gray-700 p-8 rounded-xl shadow-lg"
          transition={{ duration: 0.5 }}
        >
          {displayValues.map((value) => (
            <div key={value.title} className="text-center">
              <h3 className="text-xl font-semibold mb-4">
                {value.title}
              </h3>
              <p className="text-gray-700">
                {value.description}
              </p>
            </div>
          ))}
        </TransitionPanel>
      </div>
    </section>
  );
} 