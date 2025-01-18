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
    <section className="w-full py-16 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-brand-text-light-primary dark:text-brand-text-dark-primary">
          WHY WE ARE THE BEST
          <div className="h-1 w-24 bg-brand-secondary mt-2 mx-auto"></div>
        </h2>
        
        <div className="flex flex-col gap-6">
          {features.map((feature, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-6"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-brand-secondary flex items-center justify-center text-xl font-semibold text-brand-text-light-primary dark:text-brand-text-dark-primary">
                {feature.number}
              </div>
              <div className="flex-1 bg-brand-primary rounded-full p-4">
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-gray-100 opacity-90">{feature.description}</p>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
} 