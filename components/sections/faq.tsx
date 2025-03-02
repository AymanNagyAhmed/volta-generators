"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@/components/shared/icons";
import { getAllSiteSections } from "@/lib/services/site-sections.service";
import { SiteSection, SiteSetting } from "@/lib/types/site-sections.types";

const MotionDiv = motion.div as any;

interface FAQItem {
  question: string;
  answer: string;
}

// Fallback FAQ data in case API data is not available
const fallbackFaqData: FAQItem[] = [
  {
    question: "What is the difference between kW and kVA?",
    answer: "kW (kilowatts) measures real power—the actual work performed, while kVA (kilovolt-amperes) measures apparent power—the total power supplied. The relationship between kW and kVA is determined by the power factor, where kW = kVA × power factor."
  },
  {
    question: "What is a power factor?",
    answer: "Power factor is the ratio between real power (kW) and apparent power (kVA). It indicates how efficiently electrical power is being used, with a perfect power factor being 1.0. Most generators operate at a power factor of 0.8."
  },
  {
    question: "What is the difference between standby, continuous, and prime power ratings?",
    answer: "Standby power is for emergency backup, continuous power is for constant load applications, and prime power is for variable load applications. Each rating determines how long and under what conditions a generator can operate safely."
  },
  // Add more FAQ items as needed
];

const FAQItem = ({ question, answer }: FAQItem) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-modern-200 dark:border-modern-700">
      <button
        className="flex w-full justify-between py-4 text-left hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-700 dark:text-gray-200">
          {question}
        </span>
        <ChevronDownIcon
          className={`h-5 w-5 transform transition-transform text-gray-700 dark:text-gray-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-gray-600 dark:text-gray-400">
              {answer}
            </p>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export function FAQ() {
  // State management
  const [faqData, setFaqData] = useState<FAQItem[]>(fallbackFaqData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sectionTitle, setSectionTitle] = useState("Frequently Asked Questions");

  // Fetch FAQ data from API
  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        setIsLoading(true);
        const response = await getAllSiteSections();
        
        if ('success' in response && response.success) {
          // Find the frequently_asked_questions section
          const faqSection = response.data.find(
            (section: SiteSection) => section.title === "frequently_asked_questions"
          );
          
          if (faqSection && faqSection.settings) {
            // Find the title setting
            const titleSetting = faqSection.settings.find(
              setting => setting.key === "title"
            );
            
            if (titleSetting) {
              setSectionTitle(titleSetting.value);
            }

            // Find the questions setting
            const questionsSetting = faqSection.settings.find(
              setting => setting.key === "questions"
            );
            
            if (questionsSetting) {
              try {
                // Parse the JSON string value
                const parsedQuestions = JSON.parse(questionsSetting.value);
                
                // Filter out empty questions
                const validQuestions = parsedQuestions.filter((faq: FAQItem) => 
                  faq.question && faq.question.trim() !== "" && 
                  faq.answer && faq.answer.trim() !== ""
                );
                
                if (validQuestions.length > 0) {
                  setFaqData(validQuestions);
                }
              } catch (parseErr) {
                console.error("Error parsing FAQ data:", parseErr);
              }
            }
          } else {
            setError("FAQ data not found");
          }
        } else {
          setError("Failed to fetch FAQ data");
        }
      } catch (err) {
        console.error("Error fetching FAQ data:", err);
        setError("Error loading FAQ data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaqData();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <section className="w-full py-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-center h-[300px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading FAQ content...</p>
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
    <section className="w-full py-16 bg-white dark:bg-gray-950 text-gray-700">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-700 dark:text-gray-200">
          {sectionTitle}
        </h2>
        <div className="space-y-2 rounded-lg bg-white dark:bg-gray-900 p-6 shadow-lg">
          {faqData.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
} 