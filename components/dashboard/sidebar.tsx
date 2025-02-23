"use client";

import { Link } from "@nextui-org/react";
import { 
  Home,
  Settings,
  Users,
  BarChart,
  FileText,
  HelpCircle 
} from "lucide-react";

export function Sidebar() {
  const menuItems = [
    { icon: Home, label: "Overview", href: "/dashboard" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    { icon: Users, label: "Users", href: "/dashboard/users" },
    { icon: BarChart, label: "Analytics", href: "/dashboard/analytics" },
    { icon: FileText, label: "Reports", href: "/dashboard/reports" },
    { icon: HelpCircle, label: "Help", href: "/dashboard/help" },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Admin Panel
        </h2>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
} 