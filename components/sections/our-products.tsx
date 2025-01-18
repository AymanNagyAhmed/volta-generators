"use client";

import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselNavigation,
  CarouselItem,
} from '@/components/core/carousel-with-custom-size';

const MotionDiv = motion.div as any;

const products = [
  {
    id: 1,
    title: "Diesel Generators",
    description: "The leading generator brand in the MENA area",
    image: "/images/products/test-284x284.png",
    link: "/learn-more"
  },
  {
    id: 2,
    title: "Maintenance",
    description: "Professional after sales support",
    image: "/images/products/test-284x284.png",
    link: "/learn-more"
  },
  {
    id: 3,
    title: "Genuine Spare Parts & Accessories",
    description: "Meeting the requirements of business across the globe",
    image: "/images/products/test-284x284.png",
    link: "/learn-more"
  },
  {
    id: 4,
    title: "ATS & Synchro Solutions",
    description: "High Performance digital controllers",
    image: "/images/products/test-284x284.png",
    link: "/learn-more"
  },
  {
    id: 5,
    title: "Diesel Generators",
    description: "The leading generator brand in the MENA area",
    image: "/images/products/test-284x284.png",
    link: "/learn-more"
  },
  {
    id: 6,
    title: "Diesel Generators",
    description: "The leading generator brand in the MENA area",
    image: "/images/products/test-284x284.png",
    link: "/learn-more"
  },
  {
    id: 7,
    title: "Diesel Generators",
    description: "The leading generator brand in the MENA area",
    image: "/images/products/test-284x284.png",
    link: "/learn-more"
  },
  {
    id: 8,
    title: "Diesel Generators",
    description: "The leading generator brand in the MENA area",
    image: "/images/products/test-284x284.png",
    link: "/learn-more"
  },
  {
    id: 9,
    title: "Diesel Generators",
    description: "The leading generator brand in the MENA area",
    image: "/images/products/test-284x284.png",
    link: "/learn-more"
  },
  {
    id: 10,
    title: "Diesel Generators",
    description: "The leading generator brand in the MENA area",
    image: "/images/products/test-284x284.png",
    link: "/learn-more"
  },
];

export function OurProducts() {
  return (
    <div className="w-full bg-brand-surface-light dark:bg-brand-surface-dark py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-brand-text-light-primary dark:text-brand-text-dark-primary">
          OUR PRODUCTS
          <div className="h-1 w-24 bg-brand-secondary mt-2 mx-auto"></div>
        </h2>
        
        <div className="relative w-full max-w-6xl mx-auto px-12">
          <Carousel>
            <CarouselContent className="-ml-4">
              {products.map((product) => (
                <CarouselItem 
                  key={product.id} 
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4 flex"
                >
                  <div className="flex flex-col items-center p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-gray-900 w-full">
                    <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-2 text-brand-text-light-primary dark:text-brand-text-dark-primary">
                      {product.title}
                    </h3>
                    <p className="text-sm text-brand-text-light-secondary dark:text-brand-text-dark-secondary text-center mb-4">
                      {product.description}
                    </p>
                    <a 
                      href={product.link}
                      className="inline-flex items-center text-brand-secondary hover:text-brand-secondary-hover transition-colors font-semibold"
                    >
                      LEARN MORE
                    </a>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
} 