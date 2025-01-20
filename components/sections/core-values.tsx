"use client";

import { TransitionPanel } from "@/components/ui/transition-panel";
import { useState } from "react";
import { Check } from "lucide-react";

const values = [
  {
    title: "Honesty",
    description: "At Volta Generators, integrity is the cornerstone of everything we do. We are committed to fostering trust through transparent and ethical practices in every interaction. Our approach is simple: clear communication, no hidden agendas, and fair dealings. You can rely on us to deliver genuine, high-quality solutions that prioritize your needs without compromise. Honesty isn’t just a value—it’s the foundation of our relationship with you."
  },
  {
    title: "Quality",
    description: "We take pride in our products, which are engineered for durability and efficiency, ensuring optimal performance in challenging environments. Quality is at the heart of everything we do. Our products undergo rigorous testing and quality control processes to ensure they meet the highest industry standards. We employ advanced manufacturing techniques, utilizing the finest materials to guarantee the longevity and reliability of our power systems."
  },
  {
    title: "Accessibility",
    description: "Power should be accessible to all. We focus on making our products and services accessible to a wide range of clients, ensuring that everyone can benefit from reliable and affordable power solutions."
  },
  {
    title: "Customer Focus",
    description: "We prioritize our customers’ needs, providing tailored solutions and exceptional service to meet their unique requirements."
  }
];

export function CoreValues() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-950 dark:text-white">
          Our Core Values
          <div className="h-1 w-24 bg-yellow-400 mt-2 mx-auto"></div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {values.map((value, index) => (
            <button
              key={value.title}
              onClick={() => setActiveIndex(index)}
              className={`flex flex-col items-center p-6 rounded-xl transition-all ${
                activeIndex === index 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
            </button>
          ))}
        </div>

        <TransitionPanel
          activeIndex={activeIndex}
          className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg"
          transition={{ duration: 0.5 }}
        >
          {values.map((value) => (
            <div key={value.title} className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-blue-950 dark:text-white">
                {value.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {value.description}
              </p>
            </div>
          ))}
        </TransitionPanel>
      </div>
    </section>
  );
} 