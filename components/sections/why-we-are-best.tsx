"use client";

import { motion } from "framer-motion";

const MotionDiv = motion.div as any;

const features = [
  {
    number: "1",
    title: "12 years of experience",
    description: "Committed to continuous growth and proactive management of our projects to deliver top-tier services."
  },
  {
    number: "2", 
    title: "Leading Industry Experts",
    description: "Driven by a strong sense of belonging, our team is dedicated to fostering talent and upholding company values."
  },
  {
    number: "3",
    title: "Fast & Effective Solutions",
    description: "Addressing the urgent demand for reliable electricity with solutions that keep pace with today's critical needs."
  },
  {
    number: "4",
    title: "Flexible pricing",
    description: "Offering dynamic pricing while ensuring value without compromising quality."
  },
  {
    number: "5",
    title: "Exceptional Team",
    description: "Focused on enhancing team performance through skill development, training, and a positive, supportive environment."
  }
];

export function WhyWeAreBest() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center mb-12">WHY WE ARE THE BEST</h2>
      
      <div className="flex flex-col gap-6">
        {features.map((feature, index) => (
          <MotionDiv
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center gap-6"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-amber-400 flex items-center justify-center text-xl font-semibold">
              {feature.number}
            </div>
            <div className="flex-1 bg-navy-900 rounded-full p-4 text-white">
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-sm opacity-90">{feature.description}</p>
            </div>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
} 