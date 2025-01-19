"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const MotionDiv = motion.div as any;

const brands = [
  {
    id: 1,
    name: "Leroy Somer",
    logo: "/images/brands/leroysomer.png",
  },
  {
    id: 2,
    name: "DSE",
    logo: "/images/brands/dse.png",
  },
  {
    id: 3,
    name: "Cummins",
    logo: "/images/brands/cummins.png",
  },
  {
    id: 4,
    name: "Perkins",
    logo: "/images/brands/perkins.png",
  },
  {
    id: 5,
    name: "Stamford",
    logo: "/images/brands/stamford.png",
  },
  {
    id: 6,
    name: "Meccalte",
    logo: "/images/brands/meccalte.png",
  },
  {
    id: 7,
    name: "Linz",
    logo: "/images/brands/linz.png",
  },
  {
    id: 8,
    name: "Murphy",
    logo: "/images/brands/murphy.png",
  },
  {
    id: 9,
    name: "Stamford",
    logo: "/images/brands/stamford.png",
  },
];

export function OurBrands() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % brands.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
          Our Brands
        </h2>
        
        <div className="relative overflow-hidden">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {brands.map((brand, index) => (
              <MotionDiv
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-40 h-24 relative flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 