'use client';

export const Hero = () => {
  return (
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
  );
}; 