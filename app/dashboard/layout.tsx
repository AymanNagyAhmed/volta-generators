"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>

      {/* Toast Container */}
      <Toaster 
        richColors 
        position="top-right" 
        closeButton
        theme="dark"
        style={{ zIndex: 1000 }}
      />
    </div>
  );
} 