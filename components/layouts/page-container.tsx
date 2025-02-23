export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-[calc(100vh-96px)] lg:h-[calc(100vh-136px)] relative">
      <div className="absolute inset-0">
        <div className="container mx-auto h-full flex flex-col items-center justify-center">
          <div className="w-full h-full flex justify-center items-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};