"use client";

import { InfiniteSlider } from '@/components/ui/infinite-slider';

const flags = [
  { country: "Lebanon", src: "/images/flags/lb-flag.webp" },
  { country: "Qatar", src: "/images/flags/qa-flag.webp" },
  { country: "Saudi Arabia", src: "/images/flags/sa-flag.webp" },
  { country: "United Arab Emirates", src: "/images/flags/uae-flag.webp" },
  { country: "Kuwait", src: "/images/flags/kw-flag.webp" },
  { country: "Iraq", src: "/images/flags/iq-flag.webp" },
  { country: "Egypt", src: "/images/flags/eg-flag.webp" },
  { country: "Jordan", src: "/images/flags/jo-flag.webp" },
  { country: "Oman", src: "/images/flags/om-flag.webp" },
];

const testimonials = [
  {
    text: "Mashallah, excellent service from AQT Generators. I ordered a 660 KVA generator for my factory and it was delivered on time at a very competitive price. Thanks to Mahmoud for his continuous follow-up of the shipment.",
    author: "ASHRAF MANSOUR",
    rating: 5
  },
  {
    text: "Just wanted to leave a quick review for AQT generators. Their prices are really competitive, and the delivery was faster than expected. The sales guy, Ibrahim, was great at answering all my questions and making sure I got the right generator for my needs. Will be using them again!",
    author: "KYLE",
    rating: 5
  },
  {
    text: "After a long extensive search for companies, all details and specifications were available thanks for Meryam. I appreciate the completion of the deal with the most important thing.",
    author: "AWAD K",
    rating: 5
  }
];

export function GeographicalCoverage() {
  return (
    <section className="w-full py-8 sm:py-16 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-brand-text-light-primary dark:text-brand-text-dark-primary">
          OUR GEOGRAPHICAL COVERAGE
          <div className="h-1 w-24 bg-brand-secondary mt-2 mx-auto"></div>
        </h2>
        
        {/* Flags InfiniteSlider */}
        <div className="relative w-full flex justify-center mb-12 sm:mb-20">
          <InfiniteSlider durationOnHover={75} gap={16} reverse>
            {flags.map((flag, index) => (
              <img
                key={index}
                src={flag.src}
                alt={`${flag.country} flag`}
                className="aspect-square w-[80px] sm:w-[120px] rounded-[4px] object-contain border border-zinc-200 dark:border-zinc-800"
              />
            ))}
          </InfiniteSlider>
        </div>

        {/* Testimonials */}
        <div className="mt-12 sm:mt-20">
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
            TESTIMONIALS
            <div className="h-1 w-24 bg-brand-secondary mt-2 mx-auto"></div>
          </h2>
          
          <div className="relative overflow-hidden py-4 sm:py-8">
            <InfiniteSlider duration={30} gap={16} className="sm:gap-[32px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[300px] sm:w-[400px] p-4 sm:p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-lg"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <p className="text-right font-semibold text-gray-800 dark:text-gray-200">
                    - {testimonial.author}
                  </p>
                </div>
              ))}
            </InfiniteSlider>
          </div>
        </div>
      </div>
    </section>
  );
} 