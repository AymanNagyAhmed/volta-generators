import { PageContainer } from "@/components/layouts/page-container";

export default function ContactPage() {
  return (
    <PageContainer>
      <div className="w-[90%] md:w-[60%] min-w-[280px]">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        {/* Add contact form and information here */}
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            {/* Contact form will go here */}
            <p className="text-center text-gray-400">Contact form coming soon...</p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
} 