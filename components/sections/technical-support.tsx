"use client";

import { motion } from "framer-motion";
import { Button } from "@nextui-org/button";
import { SparklesIcon } from "lucide-react";

const MotionDiv = motion.div as any; // Temporary type assertion to resolve the error

export function TechnicalSupport() {
  return (
    <section className="w-full py-24 bg-[#001524] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
      
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 text-center relative z-10"
      >
        <span className="text-yellow-400 text-lg font-medium mb-4 block">
          Need Technical Support?
        </span>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          Connect With Us for Expert Advice
        </h2>

        <MotionDiv
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="lg"
            className="bg-yellow-400 text-gray-900 font-semibold px-8 py-6 text-lg rounded-lg hover:bg-yellow-500 transition-colors"
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