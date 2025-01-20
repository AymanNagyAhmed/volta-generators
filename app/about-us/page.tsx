"use client";

import { title } from "@/components/primitives";
import { PageContainer } from "@/components/layout/page-container";

export default function AboutPage() {
  return (
    <PageContainer>
      <div className="relative w-[95%] md:w-[98%] max-w-[1920px] mx-auto">
        <div className="bg-gray-200/70 backdrop-blur-[1px] px-8 py-4 rounded-2xl shadow-lg">
          <h1 className={title({
            className: "text-gray-900 transition-colors text-nav text-center font-bold"
          })}>
            About Us
          </h1>
          <div className="page-content text-gray-900 hover:text-black transition-colors mt-4 text-center text-page-content font-medium">
            Volta Generators is a leading manufacturer renowned for our 
            exceptional range of diesel generating sets and power systems.
            With an extensive portfolio that spans from 4.5 KVA to 4125 KVA, we have established an international reputation for delivering high-quality, reliable power solutions tailored to meet diverse energy needs.
            Our commitment to excellence is reflected in our innovative designs and rigorous quality control processes, ensuring that every product meets the highest industry standards.
            At Volta Generators, we understand the critical role that dependable power plays in various sectors including industrial, commercial, 
            and residential applications.
            75 years experience of serving power markets world-wide, reputation for innovative product design, customer service, quality and reliability is renowned.
          </div>
        </div>
      </div>
    </PageContainer>
  );
}