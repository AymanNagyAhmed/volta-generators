"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/button";
import { SparklesIcon } from "lucide-react";
import { getAllSiteSections } from "@/lib/services/site-sections.service";
import { SiteSection, SiteSetting } from "@/lib/types/site-sections.types";

const MotionDiv = motion.div as any; // Temporary type assertion to resolve the error

export function TechnicalSupport() {
  // State management
  const [supportData, setSupportData] = useState<SiteSetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("Need Technical Support?");
  const [description, setDescription] = useState("Volta Generators Our Support");

  // Fetch technical support data from API
  useEffect(() => {
    const fetchSupportData = async () => {
      try {
        setIsLoading(true);
        const response = await getAllSiteSections();
        
        if ('success' in response && response.success) {
          // Find the need_technical_support section
          const supportSection = response.data.find(
            (section: SiteSection) => section.title === "need_technical_support"
          );
          
          if (supportSection && supportSection.settings) {
            setSupportData(supportSection.settings);
            
            // Find the title setting
            const titleSetting = supportSection.settings.find(
              setting => setting.key === "title"
            );
            
            if (titleSetting) {
              setTitle(titleSetting.value);
            }

            // Find the description setting
            const descriptionSetting = supportSection.settings.find(
              setting => setting.key === "description"
            );
            
            if (descriptionSetting) {
              setDescription(descriptionSetting.value);
            }
          } else {
            setError("Technical support data not found");
          }
        } else {
          setError("Failed to fetch technical support data");
        }
      } catch (err) {
        console.error("Error fetching technical support data:", err);
        setError("Error loading technical support data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSupportData();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <section className="w-full py-24 modern-container relative overflow-hidden text-modern-300">
        <div className="container mx-auto px-4 flex items-center justify-center h-[200px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading technical support content...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    console.warn("Using fallback data due to error:", error);
    // Continue with fallback data
  }

  return (
    <section className="w-full py-24 modern-container relative overflow-hidden text-modern-300">
      <div className="absolute inset-0" />
      
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 text-center relative z-10"
      >
        <span className="text-lg font-medium mb-4 block">
          {title}
        </span>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          {description}
        </h2>

        <MotionDiv
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="lg"
            className="font-semibold px-8 py-6 text-lg rounded-lg text-modern-300 bg-transparent border border-gray-400"
            endContent={<SparklesIcon className="ml-2" />}
          >
            CONTACT US
          </Button>
        </MotionDiv>
      </MotionDiv>

      {/* Decorative elements */}
      <div className="absolute left-0 top-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
    </section>
  );
} 