'use client';

import { 
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

export const Hero = () => {
  const heroImages = [
    { src: "/images/generators/generator-1.webp", alt: "Generator 1" },
    { src: "/images/generators/generator-2.webp", alt: "Generator 2" },
    { src: "/images/generators/generator-3.webp", alt: "Generator 3" },
    { src: "/images/generators/generator-4.webp", alt: "Generator 4" },
    { src: "/images/generators/generator-5.webp", alt: "Generator 5" },
    { src: "/images/generators/generator-6.webp", alt: "Generator 6" },
  ];

  return (
    <div className="relative w-full h-[600px] -mt-16">
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-blue-900/50">
          <div className="container mx-auto h-full flex flex-col items-center justify-center text-white">
            <div className="text-center space-y-8">
              <Carousel>
                <CarouselContent>
                  {heroImages.map((item) => (
                    <CarouselItem key={item.src}>
                      <Image src={item.src} alt={item.alt} width={1000} height={1000} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 