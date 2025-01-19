"use client";

import { motion } from "framer-motion";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

const MotionDiv = motion.div as any; // Temporary type assertion to resolve the error

const stats = [
  { number: "12+", label: "Years Experience" },
  { number: "500+", label: "Projects Completed" },
  { number: "50+", label: "Global Partners" },
  { number: "24/7", label: "Support Available" },
];

export function WhoWeAre() {
  return (
    <section className="w-full py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-950 dark:text-white">
            WHO WE ARE
            <div className="h-1 w-24 bg-yellow-400 mt-2"></div>
          </h2>
          
          <p className="text-gray-700 dark:text-gray-300 mb-12 text-base sm:text-lg leading-relaxed">
            At AQT Generators, we take pride in being a dynamic force in the realm of diesel
            generator sets, offering an extensive range of international brands renowned for their
            reliability and performance. Our commitment to excellence is reflected in our
            partnerships with world-famous engine manufacturers such as Perkins and Cummins,
            coupled with top-notch alternators from Stamford and Leroy Somer.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="p-4 sm:px-8 sm:py-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center"
            >
              <h3 className="text-xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stat.number}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">
                {stat.label}
              </p>
            </MotionDiv>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {['Vision', 'Mission'].map((type, index) => (
            <MotionDiv
              key={type}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-950 dark:text-white">
                Our {type}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {type === 'Vision' ? (
                  'We envision a future where reliable power is within reach for every individual and business. By keeping our prices reasonable and our standards high, we aim to bridge gaps and light up spaces where power is essential.'
                ) : (
                  'AQT Generators strives to be your goto source for affordable excellence, delivering reliable power solutions backed by world-class partnerships and unmatched expertise in the field.'
                )}
              </p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
} 