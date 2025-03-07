"use client";

import { Card } from "@nextui-org/react";
import { title } from "@/components/primitives";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  // Handle card clicks
  const handleCardClick = (path: string) => {
    router.push(path);
  };

  // Render dashboard for admin users
  return (
    <div className="gap-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className={title({ className: "text-gray-900 dark:text-white" })}>
          Admin Dashboard
        </h1>
      </div>

      {/* Dashboard Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Home Card */}
        <Card
          className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
          isPressable
          onPress={() => handleCardClick("/")}
        >
          <h2 className="text-lg font-semibold mb-2">Home</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your site settings
          </p>
        </Card>

        {/* Settings Card */}
        <Card
          className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
          isPressable
          onPress={() => handleCardClick("/dashboard/settings")}
        >
          <h2 className="text-lg font-semibold mb-2">Settings</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your site settings
          </p>
        </Card>
        
        {/* Users Card */}
        <Card 
          className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
          isPressable
          onPress={() => handleCardClick("/dashboard/users")}
        >
          <h2 className="text-lg font-semibold mb-2">Users</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your users
          </p>
        </Card>
      </div>
    </div>
  );
} 