"use client";

import { title } from "@/components/primitives";
import { PageContainer } from "@/components/layout/page-container";

export default function AboutPage() {
  return (
    <PageContainer>
      <div className="w-[90%] md:w-[60%] min-w-[280px]">
        <h1 className={title({ className: "text-center" })}>About Us</h1>
        {/* Add your about content here */}
      </div>
    </PageContainer>
  );
} 