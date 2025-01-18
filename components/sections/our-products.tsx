"use client";

import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNavigation } from "@/components/ui/carousel";

const MotionDiv = motion.div as any;

const products = [
  {
    title: "Diesel Generators",
    description: "The leading generator brand in the MENA area",
    image: "/images/products/test-284x284.png",
    link: "/learn-more"
  },
  {
    title: "Maintenance",
    description: "Professional after sales support",
    image: "/images/products/test-284x284.png",
    link: "/learn-more"
  },
  {
    title: "Genuine Spare Parts & Accessories",
    description: "Meeting the requirements of business across the globe",
    image: "/images/products/test-284x284.png",
    link: "/learn-more"
  },
  {
    title: "ATS & Synchro Solutions",
    description: "High Performance digital controllers",
    image: "/images/products/test-284x284.png",
    link: "/learn-more"
  },
  {
    title: "Diesel Generators",
    description: "The leading generator brand in the MENA area",
    image: "/images/products/test-284x284.png",
    link: "/learn-more"
  },
  {
    title: "Diesel Generators",
    description: "The leading generator brand in the MENA area",
    image: "/images/products/test-284x284.png",
    link: "/learn-more"
  },
  {
    title: "Diesel Generators",
    description: "The leading generator brand in the MENA area",
    image: "/images/products/test-284x284.png",
    link: "/learn-more"
  }
];

export function OurProducts() {
  return (
    <div className="w-full bg-brand-surface-light dark:bg-brand-surface-dark py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-brand-text-light-primary dark:text-brand-text-dark-primary">
          OUR PRODUCTS
          <div className="h-1 w-24 bg-brand-secondary mt-2 mx-auto"></div>
        </h2>
        
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {products.map((product, index) => (
              <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/4">
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
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
                </MotionDiv>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNavigation className="mt-4" />
        </Carousel>
      </div>
    </div>
  );
} 