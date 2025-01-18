"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@/components/shared/icons";

const MotionDiv = motion.div as any;

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
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
        className="flex w-full justify-between py-4 text-left hover:text-brand-primary dark:hover:text-brand-secondary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-brand-text-light-primary dark:text-brand-text-dark-primary">
          {question}
        </span>
        <ChevronDownIcon
          className={`h-5 w-5 transform transition-transform text-brand-primary dark:text-brand-secondary ${
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
            <p className="pb-4 text-brand-text-light-secondary dark:text-brand-text-dark-secondary">
              {answer}
            </p>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export function FAQ() {
  return (
    <section className="w-full py-16 bg-white dark:bg-gray-950">
      <h2 className="text-4xl font-bold text-center mb-12 text-brand-text-light-primary dark:text-brand-text-dark-primary">
        Frequently Asked Questions
      </h2>
      <div className="space-y-2 rounded-lg bg-white dark:bg-modern-800 p-6 shadow-lg">
        {faqData.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </div>
    </section>
  );
} 