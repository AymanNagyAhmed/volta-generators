"use client";

import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/react";
import { ChevronDown } from "./icons"; // You'll need to create/import this icon

export const ProductsDropdown = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          disableRipple
          className="p-0 bg-transparent data-[hover=true]:bg-transparent 
            text-gray-700 hover:text-gray-900 text-nav"
          endContent={<ChevronDown fill="currentColor"  />}
          radius="sm"
          variant="light"
        >
          Products
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Products navigation"
        className="w-[340px] bg-corporate-gray-light backdrop-blur-md"
        itemClasses={{
          base: [
            "gap-4",
            "data-[hover=true]:bg-corporate-gray-light-darker",
            "data-[hover=true]:text-gray-900",
            "text-gray-700",
            "text-lg",
          ].join(" "),
          title: "font-medium text-lg",
          description: "text-sm text-gray-600",
        }}
      >
        <DropdownItem 
          key="analytics" 
          description="Real-time analytics and reports"
          className="data-[hover=true]:bg-corporate-gray-light-darker"
        >
          Analytics
        </DropdownItem>
        <DropdownItem 
          key="automation" 
          description="Automate your workflow"
          className="data-[hover=true]:bg-corporate-gray-light-darker"
        >
          Automation
        </DropdownItem>
        <DropdownItem 
          key="integrations" 
          description="Connect with other tools"
          className="data-[hover=true]:bg-corporate-gray-light-darker"
        >
          Integrations
        </DropdownItem>
        <DropdownItem 
          key="api" 
          description="API documentation and resources"
          className="data-[hover=true]:bg-corporate-gray-light-darker"
        >
          API
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}; 