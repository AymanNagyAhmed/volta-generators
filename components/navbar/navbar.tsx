"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  SearchIcon,
  Logo,
  Phone,
  Mail,
  MapPin,
} from "@/components/shared/icons";
import { ProductsDropdown } from "@/components/navbar/products-dropdown";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Search Input Component
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100 h-8 w-64",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full lg:w-[80%] max-w-[1400px]">
        {/* Top Contact Bar */}
        <div className="w-fit mx-auto text-white py-2 px-4 hidden lg:block bg-gradient-to-l from-[#2563eb]/90 via-[#1d4ed8]/90 to-[#1e40af]/90 rounded-lg backdrop-blur-sm">
          <div className="flex justify-center items-center">
            {/* Contact Items */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              {/* Phone */}
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-white" />
                <span className="text-sm text-white font-medium">+1 234 567 890</span>
              </div>
              {/* Email */}
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-white" />
                <span className="text-sm text-white font-medium">contact@example.com</span>
              </div>
              {/* Address */}
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-white" />
                <span className="text-sm text-white font-medium">123 Business Street, NY</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 ml-4 flex-shrink-0">
              <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter} 
                className="text-white hover:text-white/80 transition-colors">
                <TwitterIcon size={16} />
              </Link>
              <Link isExternal aria-label="Discord" href={siteConfig.links.discord} 
                className="text-white hover:text-white/80 transition-colors">
                <DiscordIcon size={16} />
              </Link>
              <Link isExternal aria-label="Github" href={siteConfig.links.github} 
                className="text-white hover:text-white/80 transition-colors">
                <GithubIcon size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <NextUINavbar
          maxWidth="sm"
          position="sticky"
          onMenuOpenChange={setIsMenuOpen}
          className="bg-[#1e40af] text-white backdrop-blur-sm border-b border-white/10"
        >
          {/* Logo Section */}
          <NavbarContent className="basis-auto" justify="start">
            <NavbarBrand as="li" className="gap-3">
              <NextLink className="flex justify-start items-center gap-1" href="/">
                <div className="flex items-center">
                  <img 
                    src="/images/logo-new.png" 
                    alt="Logo" 
                    className="h-8 w-auto object-contain"
                  />
                </div>
              </NextLink>
            </NavbarBrand>
          </NavbarContent>

          {/* Navigation Links Section */}
          <NavbarContent className="hidden sm:flex flex-1" justify="center">
            <ul className="hidden lg:flex gap-4 justify-center items-center">
              {siteConfig.navItems.map((item) => {
                if (item.type === "dropdown" && item.component === "ProductsDropdown") {
                  return <ProductsDropdown key="products-dropdown" />;
                }
                return (
                  <NavbarItem key={item.href || item.label}>
                    {item.href ? (
                      <NextLink
                        className={clsx(
                          "text-white hover:text-white/80 transition-colors",
                          "data-[active=true]:text-white data-[active=true]:font-medium"
                        )}
                        href={item.href}
                      >
                        {item.label}
                      </NextLink>
                    ) : (
                      <span className="text-white">{item.label}</span>
                    )}
                  </NavbarItem>
                );
              })}
            </ul>
          </NavbarContent>

          {/* Search Section */}
          <NavbarContent className="hidden sm:flex basis-auto" justify="end">
            <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
          </NavbarContent>

          {/* Mobile Menu Toggle Section */}
          <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
            <NavbarMenuToggle />
          </NavbarContent>

          {/* Mobile Menu Dropdown */}
          <NavbarMenu>
            {/* Mobile Search */}
            {searchInput}
            <div className="mx-4 mt-2 flex flex-col gap-2">
              {/* Mobile Contact Info */}
              <div className="flex flex-col space-y-4 py-4 border-b">
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span className="text-sm">+1 234 567 890</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span className="text-sm">contact@example.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span className="text-sm">123 Business Street, NY</span>
                </div>
              </div>
              {/* Mobile Navigation Items */}
              {siteConfig.navMenuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <Link
                    color={
                      index === 2
                        ? "primary"
                        : index === siteConfig.navMenuItems.length - 1
                          ? "danger"
                          : "foreground"
                    }
                    href="#"
                    size="lg"
                  >
                    {item.label}
                  </Link>
                </NavbarMenuItem>
              ))}
            </div>
          </NavbarMenu>
        </NextUINavbar>
      </div>
    </div>
  );
};
