"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getAllSiteSections } from "@/lib/services/site-sections.service";
import { SiteSection, SiteSetting } from "@/lib/types/site-sections.types";

const MotionDiv = motion.div as any;

// Define the reason item interface
interface ReasonItem {
  reason_id: number;
  title: string;
  description: string;
}

// Fallback features in case API data is not available
const fallbackFeatures = [
  {
    reason_id: 1,
    title: "12 years of experience",
    description: "Committed to continuous growth and proactive management of our projects to deliver top-tier services."
  },
  {
    reason_id: 2, 
    title: "Leading Industry Experts",
    description: "Driven by a strong sense of belonging, our team is dedicated to fostering talent and upholding company values."
  },
  {
    reason_id: 3,
    title: "Fast & Effective Solutions",
    description: "Addressing the urgent demand for reliable electricity with solutions that keep pace with today's critical needs."
  },
  {
    reason_id: 4,
    title: "Flexible pricing",
    description: "Offering dynamic pricing while ensuring value without compromising quality."
  },
  {
    reason_id: 5,
    title: "Exceptional Team",
    description: "Focused on enhancing team performance through skill development, training, and a positive, supportive environment."
  }
];

export function WhyWeAreBest() {
  // State management
  const [bestData, setBestData] = useState<SiteSetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sectionTitle, setSectionTitle] = useState("WHY WE ARE THE BEST");
  const [reasons, setReasons] = useState<ReasonItem[]>(fallbackFeatures);

  // Fetch why we are the best data from API
  useEffect(() => {
    const fetchBestData = async () => {
      try {
        setIsLoading(true);
        const response = await getAllSiteSections();
        
        if ('success' in response && response.success) {
          // Find the why_we_are_the_best section
          const bestSection = response.data.find(
            (section: SiteSection) => section.title === "why_we_are_the_best"
          );
          
          if (bestSection && bestSection.settings) {
            setBestData(bestSection.settings);
            
            // Find the title setting
            const titleSetting = bestSection.settings.find(
              setting => setting.key === "title"
            );
            
            if (titleSetting) {
              setSectionTitle(titleSetting.value);
            }

            // Find the reasons setting
            const reasonsSetting = bestSection.settings.find(
              setting => setting.key === "reasons"
            );
            
            if (reasonsSetting) {
              try {
                // Parse the JSON string value
                const parsedReasons = JSON.parse(reasonsSetting.value);
                
                // Filter out empty reasons
                const validReasons = parsedReasons.filter((reason: ReasonItem) => 
                  reason.title && reason.title.trim() !== "" && 
                  reason.description && reason.description.trim() !== ""
                );
                
                if (validReasons.length > 0) {
                  setReasons(validReasons);
                }
              } catch (parseErr) {
                console.error("Error parsing reasons data:", parseErr);
              }
            }
          } else {
            setError("Why we are the best data not found");
          }
        } else {
          setError("Failed to fetch why we are the best data");
        }
      } catch (err) {
        console.error("Error fetching why we are the best data:", err);
        setError("Error loading why we are the best data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBestData();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <section className="w-full py-16 modern-container text-modern-300">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center h-[300px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading why we are the best content...</p>
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
    <section className="w-full py-16 modern-container text-modern-300">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          {sectionTitle}
          <div className="h-1 w-24 bg-gray-400 mt-2 mx-auto"></div>
        </h2>
        
        <div className="flex flex-col gap-6">
          {reasons.map((feature, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-6"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center text-xl font-semibold">
                {feature.reason_id}
              </div>
              <div className="flex-1 rounded-full p-4 border ">
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-sm text-gray-200">{feature.description}</p>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
} 