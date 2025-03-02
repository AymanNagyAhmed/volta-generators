"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { getAllSiteSections } from "@/lib/services/site-sections.service";
import { SiteSection, SiteSetting } from "@/lib/types/site-sections.types";

const MotionDiv = motion.div as any; // Temporary type assertion to resolve the error

const stats = [
  { number: "30+", label: "Years Experience" },
  { number: "490+", label: "Projects Completed" },
  { number: "24/7", label: "Support Available" },
];

export function WhoWeAre() {
  // State management
  const [whoWeAreData, setWhoWeAreData] = useState<SiteSetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sectionTitle, setSectionTitle] = useState("WHO WE ARE");
  const [description, setDescription] = useState("");
  const [visionTitle, setVisionTitle] = useState("Our Vision");
  const [visionDescription, setVisionDescription] = useState("");
  const [missionTitle, setMissionTitle] = useState("Our Mission");
  const [missionDescription, setMissionDescription] = useState("");

  // Fetch who we are data from API
  useEffect(() => {
    const fetchWhoWeAreData = async () => {
      try {
        setIsLoading(true);
        const response = await getAllSiteSections();
        
        if ('success' in response && response.success) {
          // Find the who_we_are section
          const whoWeAreSection = response.data.find(
            (section: SiteSection) => section.title === "who_we_are"
          );
          
          if (whoWeAreSection && whoWeAreSection.settings) {
            setWhoWeAreData(whoWeAreSection.settings);
            
            // Find the title setting
            const titleSetting = whoWeAreSection.settings.find(
              setting => setting.key === "title"
            );
            
            if (titleSetting) {
              setSectionTitle(titleSetting.value);
            }

            // Find the description setting
            const descriptionSetting = whoWeAreSection.settings.find(
              setting => setting.key === "description"
            );
            
            if (descriptionSetting) {
              setDescription(descriptionSetting.value);
            }

            // Find the vision title setting
            const visionTitleSetting = whoWeAreSection.settings.find(
              setting => setting.key === "our_vision"
            );
            
            if (visionTitleSetting) {
              setVisionTitle(visionTitleSetting.value);
            }

            // Find the vision description setting
            const visionDescriptionSetting = whoWeAreSection.settings.find(
              setting => setting.key === "our_vision_description"
            );
            
            if (visionDescriptionSetting) {
              setVisionDescription(visionDescriptionSetting.value);
            }

            // Find the mission title setting
            const missionTitleSetting = whoWeAreSection.settings.find(
              setting => setting.key === "our_mission"
            );
            
            if (missionTitleSetting) {
              setMissionTitle(missionTitleSetting.value);
            }

            // Find the mission description setting
            const missionDescriptionSetting = whoWeAreSection.settings.find(
              setting => setting.key === "our_mission_description"
            );
            
            if (missionDescriptionSetting) {
              setMissionDescription(missionDescriptionSetting.value);
            }
          } else {
            setError("Who we are data not found");
          }
        } else {
          setError("Failed to fetch who we are data");
        }
      } catch (err) {
        console.error("Error fetching who we are data:", err);
        setError("Error loading who we are data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWhoWeAreData();
  }, []);

  // Fallback data in case API data is not available
  const fallbackDescription = "We are offering Tower ligh and Diesel Generator Sets from 4.5 kVA to 4125 kVA in single unit and higher ratings generators in multiple unit configurations. These diesel gensets are powered by world-class engines like Baudouin ,PERKINS ,KUBOTA ,CUMMINS coupled with LEROYSOMER , STAMFORD alternators to provide optimum power solutions. These reliable diesel generators are installed and running in different parts of the world .Volta generators is steadily growing its reputation as a reliable source of world class products in power generation with the ability to provide custom built power solutions at short notice. Volta Generators have become a recognized force within the generator industry, and we attribute our increasing dominance within this sector to the company's ability to embrace change and to offer a dynamic platform for market demand.";
  
  const fallbackVisionDescription = "Volta Generators is a distinguished manufacturer specializing in the production of high-quality diesel generating sets and comprehensive power systems. Our esteemed \"VOLTA\" range encompasses a wide spectrum of power solutions, with capacities ranging from 4.5KVA to 4125 KVA. Renowned for our commitment to excellence, Volta Generators has established an international reputation for delivering superior power generation products that meet the diverse needs of our clients across various sectors.";
  
  const fallbackMissionDescription = "At Volta Generators, our mission is to provide reliable and efficient power solutions that empower businesses and communities worldwide. We are dedicated to innovation, quality, and customer satisfaction, ensuring that our products are at the forefront of technology and performance.";

  // Determine which data to display
  const displayDescription = description || fallbackDescription;
  const displayVisionTitle = visionTitle || "Our Vision";
  const displayVisionDescription = visionDescription || fallbackVisionDescription;
  const displayMissionTitle = missionTitle || "Our Mission";
  const displayMissionDescription = missionDescription || fallbackMissionDescription;

  // Loading state
  if (isLoading) {
    return (
      <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-white text-gray-700">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center h-[300px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading who we are content...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error && whoWeAreData.length === 0) {
    console.warn("Using fallback data due to error:", error);
    // Continue with fallback data
  }

  return (
    <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-white text-gray-700">
      <div className="max-w-7xl mx-auto px-6">
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            {sectionTitle}
            <div className="h-1 w-24 bg-gray-400 mt-2"></div>
          </h2>
          
          <p className="mb-12 text-base sm:text-lg leading-relaxed">
            {displayDescription}
          </p>
        </MotionDiv>

        <div className="flex flex-col sm:flex-row justify-between max-w-4xl mx-auto mb-16 w-full gap-8">
          {stats.map((stat, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex-1 p-4 sm:px-6 sm:py-6 bg-white rounded-xl shadow-lg text-center"
            >
              <h3 className="text-xl sm:text-3xl font-bold">
                {stat.number}
              </h3>
              <p className="text-sm sm:text-base mt-2">
                {stat.label}
              </p>
            </MotionDiv>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">
              {displayVisionTitle}
            </h3>
            <p className="">
              {displayVisionDescription}
            </p>
          </MotionDiv>
          
          <MotionDiv
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">
              {displayMissionTitle}
            </h3>
            <p className="">
              {displayMissionDescription}
            </p>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
} 