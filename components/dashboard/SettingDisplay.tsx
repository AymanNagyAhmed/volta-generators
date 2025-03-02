"use client";

import { SiteSetting } from "@/lib/types/site-sections.types";
import { SliderImage, FAQItem, ReasonItem } from "../../app/dashboard/settings/types";

interface SettingDisplayProps {
  setting: SiteSetting;
}

export function SettingDisplay({ setting }: SettingDisplayProps) {
  try {
    const parsedValue = JSON.parse(setting.value);
    
    if (Array.isArray(parsedValue) && parsedValue[0]?.image) {
      // Slider images array
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {parsedValue.map((item: SliderImage, index: number) => (
            <div
              key={index} 
              className="flex flex-col gap-2 border rounded-lg p-2 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative group">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
                  alt={item.description}
                  className="h-20 w-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    Slide {index + 1}
                  </span>
                </div>
              </div>
              <span className="text-xs text-gray-600 px-1 truncate" title={item.description}>
                {item.description}
              </span>
            </div>
          ))}
        </div>
      );
    } 
    
    if (Array.isArray(parsedValue) && parsedValue[0]?.question) {
      // FAQs
      return (
        <div className="grid gap-4">
          {parsedValue.map((item: FAQItem, index: number) => (
            <div 
              key={index}
              className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <h4 className="font-medium text-sm mb-2">
                {item.question}
              </h4>
              <p className="text-sm text-gray-600">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      );
    } 
    
    if (Array.isArray(parsedValue) && parsedValue[0]?.reason_id) {
      // Reasons
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {parsedValue.map((item: ReasonItem) => (
            <div 
              key={item.reason_id}
              className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                  Reason {item.reason_id}
                </span>
              </div>
              <h4 className="font-medium text-sm mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      );
    } 
    
    if (parsedValue && typeof parsedValue === 'object' && parsedValue.email) {
      // Contact information
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {Object.entries(parsedValue).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2 border rounded-md p-2">
              <span className="font-medium capitalize">{key}:</span>
              <span className="text-gray-600 truncate">{value as string}</span>
            </div>
          ))}
        </div>
      );
    } 
    
    if (Array.isArray(parsedValue)) {
      // Regular arrays
      return (
        <span className="text-sm break-words">
          {parsedValue.join(', ')}
        </span>
      );
    }
    
    // Default JSON display
    return <span className="text-sm break-words">{setting.value}</span>;
  } catch {
    // If not JSON or other cases
    return setting.value.startsWith('/') ? (
      <img
        src={`${process.env.NEXT_PUBLIC_API_URL}${setting.value}`}
        alt={setting.key}
        className="h-20 w-auto object-contain"
      />
    ) : (
      <span className="text-sm break-words">{setting.value}</span>
    );
  }
} 