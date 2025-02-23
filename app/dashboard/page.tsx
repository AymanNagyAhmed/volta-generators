"use client";

import { Card } from "@nextui-org/react";
import { title } from "@/components/primitives";

export default function DashboardPage() {
  return (
    <div className="gap-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className={title({ className: "text-gray-900 dark:text-white" })}>
          Dashboard
        </h1>
      </div>

      {/* Dashboard Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Overview Card */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Overview</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome to your dashboard
          </p>
        </Card>
        {/* Settings Card */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Settings</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your site settings
          </p>
        </Card>
        {/* Users Card */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-2">Users</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your users
          </p>
        </Card>



      </div>
    </div>
  );
} 