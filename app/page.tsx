import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {/* Hero Section */}
      <div className="relative w-full h-[600px] -mt-16">
        <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-blue-900/50">
            <div className="container mx-auto h-full flex flex-col items-center justify-center text-white">
              {/* Centered Content */}
              <div className="text-center space-y-8">
                <h1 className="text-4xl md:text-6xl font-bold">
                  YOUR GLOBAL POWER SOLUTION PARTNER
                </h1>
                
                {/* Get a Free Quote Button */}
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full">
                  GET A FREE QUOTE
                </button>
              </div>
              
              {/* Generator Image */}
              <div className="mt-8">
                <img 
                  src="/images/generator.jpg" 
                  alt="Generator" 
                  className="max-w-2xl mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

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
