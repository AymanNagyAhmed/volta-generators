import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Hero } from "@/components/sections/hero";
import { WhoWeAre } from "@/components/sections/who-we-are";
import { CoreValues } from "@/components/sections/core-values";
import { ImageShowcase } from "@/components/sections/image-showcase";
import { TechnicalSupport } from "@/components/sections/technical-support";
import { WhyWeAreBest } from "@/components/sections/why-we-are-best";
import { OurProducts } from "@/components/sections/our-products";
import { GeographicalCoverage } from "@/components/sections/geographical-coverage";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      {/* Hero Section */}
      <Hero />

      {/* Who We Are Section */}
      <WhoWeAre />

      {/* Core Values Section */}
      <CoreValues />

      {/* Image Showcase Section */}
      <ImageShowcase />

      {/* Technical Support Section */}
      <TechnicalSupport />

      {/* Why We Are The Best Section */}
      <WhyWeAreBest />

      {/* Our Products Section */}
      <OurProducts />

      {/* Geographical Coverage Section */}
      <GeographicalCoverage />

      {/* Rest of your content */}
      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
