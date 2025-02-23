export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] gap-4">
      <div className="w-full">
        {children}
      </div>
    </section>
  );
} 