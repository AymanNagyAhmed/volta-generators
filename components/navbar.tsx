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
import { ThemeSwitch } from "@/components/theme-switch";
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
import { ProductsDropdown } from "./navbar/products-dropdown";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Search Input Component
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100 h-11 w-64",
        input: "text-base",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[90%] max-w-[1400px]">
        {/* Top Contact Bar */}
        <div className="w-full bg-layout-navbar-bg dark:bg-layout-navbar-bg-dark text-layout-navbar-text-primary dark:text-layout-navbar-text-primary-dark py-2 rounded-b-lg px-4 hidden lg:block border-b border-layout-navbar-border dark:border-layout-navbar-border-dark backdrop-blur-[2px]">
          <div className="flex justify-center items-center max-w-[1024px] mx-auto">
            {/* Contact Items */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              {/* Phone */}
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-layout-navbar-text-secondary dark:text-layout-navbar-text-secondary-dark" />
                <span className="text-sm text-layout-navbar-text-primary dark:text-layout-navbar-text-primary-dark">+1 234 567 890</span>
              </div>
              {/* Email */}
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-layout-navbar-text-secondary dark:text-layout-navbar-text-secondary-dark" />
                <span className="text-sm text-layout-navbar-text-primary dark:text-layout-navbar-text-primary-dark">contact@example.com</span>
              </div>
              {/* Address */}
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-layout-navbar-text-secondary dark:text-layout-navbar-text-secondary-dark" />
                <span className="text-sm text-layout-navbar-text-primary dark:text-layout-navbar-text-primary-dark">123 Business Street, NY</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 ml-4 flex-shrink-0">
              <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter} 
                className="text-layout-navbar-text-secondary dark:text-layout-navbar-text-secondary-dark hover:text-layout-navbar-text-hover dark:hover:text-layout-navbar-text-hover-dark transition-colors">
                <TwitterIcon size={16} />
              </Link>
              <Link isExternal aria-label="Discord" href={siteConfig.links.discord} className="text-layout-navbar-text-secondary dark:text-layout-navbar-text-secondary-dark hover:text-layout-navbar-text-hover dark:hover:text-layout-navbar-text-hover-dark transition-colors">
                <DiscordIcon size={16} />
              </Link>
              <Link isExternal aria-label="Github" href={siteConfig.links.github} className="text-layout-navbar-text-secondary dark:text-layout-navbar-text-secondary-dark hover:text-layout-navbar-text-hover dark:hover:text-layout-navbar-text-hover-dark transition-colors">
                <GithubIcon size={16} />
              </Link>
              <ThemeSwitch />
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <NextUINavbar
          maxWidth="sm"
          position="sticky"
          onMenuOpenChange={setIsMenuOpen}
          className="bg-layout-navbar-bg dark:bg-layout-navbar-bg-dark backdrop-blur-sm border-b border-layout-navbar-border dark:border-layout-navbar-border-dark"
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
                          "text-slate-600 hover:text-blue-500 transition-colors",
                          "data-[active=true]:text-blue-400 data-[active=true]:font-medium"
                        )}
                        href={item.href}
                      >
                        {item.label}
                      </NextLink>
                    ) : (
                      <span className="text-slate-600">{item.label}</span>
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
            <ThemeSwitch />
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
