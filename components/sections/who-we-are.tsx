"use client";

import { motion } from "framer-motion";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

const MotionDiv = motion.div as any; // Temporary type assertion to resolve the error

const stats = [
  { number: "30+", label: "Years Experience" },
  { number: "490+", label: "Projects Completed" },
  { number: "24/7", label: "Support Available" },
];

export function WhoWeAre() {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-white text-gray-700">
      <div className="container mx-auto px-4">
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            WHO WE ARE
            <div className="h-1 w-24 bg-gray-400 mt-2"></div>
          </h2>
          
          <p className="mb-12 text-base sm:text-lg leading-relaxed">
          We are offering Tower ligh and Diesel Generator  Sets from 4.5 kVA to 4125 kVA in single unit and higher 
          ratings generators in multiple unit configurations.
          These diesel gensets are powered by world-class engines like Baudouin ,PERKINS ,KUBOTA ,CUMMINS coupled with LEROYSOMER , STAMFORD  alternators to provide optimum power solutions. These reliable diesel generators are installed and running in 
          different parts of the world .Volta generators is steadily growing its reputation as a reliable source of world class products in power generation with the ability to provide custom built power solutions at short notice.
          Volta Generators have become a recognized force within the generator industry, and we attribute our increasing dominance within this sector to the company's ability to embrace change and to offer a dynamic 
          platform for market demand.
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
          {['Vision', 'Mission'].map((type, index) => (
            <MotionDiv
              key={type}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">
                Our {type}
              </h3>
              <p className="">
                {type === 'Vision' ? (
                  'Volta Generators is a distinguished manufacturer specializing in the production of high-quality diesel generating sets and comprehensive power systems. Our esteemed "VOLTA" range encompasses a wide spectrum of power solutions, with capacities ranging from 4.5KVA to 4125 KVA. Renowned for our commitment to excellence, Volta Generators has established an international reputation for delivering superior power generation products that meet the diverse needs of our clients across various sectors.'
                ) : (
                  'At Volta Generators, our mission is to provide reliable and efficient power solutions that empower businesses and communities worldwide. We are dedicated to innovation, quality, and customer satisfaction, ensuring that our products are at the forefront of technology and performance.'
                )}
              </p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
} 