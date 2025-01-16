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
          className="p-0 bg-transparent data-[hover=true]:bg-transparent"
          endContent={<ChevronDown fill="currentColor" size={16} />}
          radius="sm"
          variant="light"
        >
          Products
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Products navigation"
        className="w-[240px]"
        itemClasses={{
          base: "gap-4",
        }}
      >
        <DropdownItem key="analytics" description="Real-time analytics and reports">
          Analytics
        </DropdownItem>
        <DropdownItem key="automation" description="Automate your workflow">
          Automation
        </DropdownItem>
        <DropdownItem key="integrations" description="Connect with other tools">
          Integrations
        </DropdownItem>
        <DropdownItem key="api" description="API documentation and resources">
          API
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}; 