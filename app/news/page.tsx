import { PageContainer } from "@/components/layouts/page-container";

export default function NewsPage() {
  return (
    <PageContainer>
      <div className="w-[90%] md:w-[60%] min-w-[280px]">
        <h1 className="text-4xl font-bold text-center mb-8">News</h1>
        {/* Add news content here */}
      </div>
    </PageContainer>
  );
} 