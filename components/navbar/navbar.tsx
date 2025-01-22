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
import { useState, useEffect } from "react";

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
  const [showTopBar, setShowTopBar] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        setShowTopBar(false);
      } else if (currentScrollY === 0) {
        setShowTopBar(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  // Add this handler function
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="w-full flex flex-col items-center fixed top-0 z-50">
      <div className="w-full lg:w-[95%]">
        {/* Top Contact Bar */}
        <div
          className={`
            w-fit mx-auto text-corporate-blue-dark py-2 px-6
            hidden lg:block bg-transparent backdrop-blur-sm rounded-lg
            transition-all duration-300 ease-in-out
            ${showTopBar ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}
          `}
        >
          <div className="flex justify-center items-center">
            {/* Contact Items - Updated text and icon sizes */}
            <div className="flex items-center space-x-6 flex-shrink-0">
              {/* Phone */}
              {siteConfig.contact.phones.map((phone, index) => (
                <div key={phone} className="flex items-center space-x-2">
                  <Phone size={20} className="text-corporate-blue-dark" />
                  <span className="text-sm text-corporate-blue-dark font-medium">{phone}</span>
                </div>
              ))}
              {/* Email */}
              <div className="flex items-center space-x-2">
                <Mail size={20} className="text-corporate-blue-dark" />
                <span className="text-sm text-corporate-blue-dark font-medium">{siteConfig.contact.email}</span>
              </div>
              {/* Address */}
              <div className="flex items-center space-x-2">
                <MapPin size={20} className="text-corporate-blue-dark" />
                <span className="text-sm text-corporate-blue-dark font-medium">{siteConfig.contact.address}</span>
              </div>
            </div>

            {/* Social Links - Updated icon sizes */}
            <div className="flex items-center gap-4 ml-6 flex-shrink-0">
              <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter} 
                className="text-corporate-blue-dark hover:text-corporate-blue transition-colors">
                <TwitterIcon size={20} />
              </Link>
              <Link isExternal aria-label="Discord" href={siteConfig.links.discord} 
                className="text-corporate-blue-dark hover:text-corporate-blue transition-colors">
                <DiscordIcon size={20} />
              </Link>
              <Link isExternal aria-label="Github" href={siteConfig.links.github} 
                className="text-corporate-blue-dark hover:text-corporate-blue transition-colors">
                <GithubIcon size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <NextUINavbar
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
          maxWidth="full"
          isBlurred={true}
          className={`
            bg-corporate-gray-light text-gray-700 backdrop-blur-md
            border-b border-gray-400 transition-all duration-300 px-4
            py-6
            ${showTopBar ? '' : 'shadow-xl'}
          `}
        >
          {/* Logo Section */}
          <NavbarContent className="basis-auto w-full" justify="start">
            <NavbarBrand as="li" className="gap-3">
              <NextLink className="flex justify-start items-center gap-1" href="/">
                <div className="flex items-center">
                  <img
                    src="/images/logo-volta.jpg" 
                    alt="Logo" 
                    className="h-20 w-auto object-contain"
                  />
                  <span className="ml-4 font-bold text-gray-800 hidden sm:block text-nav">
                    Volta Generators FZE
                  </span>
                </div>
              </NextLink>
            </NavbarBrand>
          </NavbarContent>

          {/* Navigation Links Section */}
          <NavbarContent className="hidden sm:flex flex-1" justify="center">
            <ul className="hidden lg:flex gap-6 justify-center items-center">
              {siteConfig.navItems.map((item) => {
                if (item.type === "dropdown" && item.component === "ProductsDropdown") {
                  return <ProductsDropdown key="products-dropdown" />;
                }
                return (
                  <NavbarItem key={item.href || item.label}>
                    {item.href ? (
                      <NextLink
                        className={clsx(
                          "text-gray-700 hover:text-gray-900 transition-colors text-nav",
                          "data-[active=true]:text-gray-900 data-[active=true]:font-medium"
                        )}
                        href={item.href}
                      >
                        {item.label}
                      </NextLink>
                    ) : (
                      <span className="text-gray-700 text-nav">{item.label}</span>
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

          {/* Mobile Menu Dropdown - Updated */}
          <NavbarMenu>
            {/* Mobile Search */}
            {searchInput}
            
            <div className="mx-4 mt-2 flex flex-col gap-2">
              {/* Mobile Navigation Links - Updated with click handler */}
              {siteConfig.navItems.map((item, index) => {
                if (item.type === "dropdown" && item.component === "ProductsDropdown") {
                  return (
                    <NavbarMenuItem key={`${item.label}-${index}`}>
                      <Link
                        className="w-full text-lg"
                        href="#"
                        size="lg"
                        onClick={handleLinkClick}
                      >
                        {item.label}
                      </Link>
                    </NavbarMenuItem>
                  );
                }
                return (
                  <NavbarMenuItem key={`${item.label}-${index}`}>
                    <Link
                      className="w-full text-lg"
                      href={item.href || "#"}
                      size="lg"
                      onClick={handleLinkClick}
                    >
                      {item.label}
                    </Link>
                  </NavbarMenuItem>
                );
              })}

              {/* Divider */}
              <div className="mx-4 my-2 h-[1px] bg-gray-600/50" />

              {/* Mobile Contact Info */}
              <div className="flex flex-col space-y-4 py-4 border-b border-gray-600/50">
                {/* Phone Numbers */}
                {siteConfig.contact.phones.map((phone, index) => (
                  <div key={phone} className="flex items-center space-x-2">
                    <Phone size={16} />
                    <span className="text-sm">{phone}</span>
                  </div>
                ))}
                
                {/* Rest of contact info */}
                <div className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span className="text-sm">{siteConfig.contact.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span className="text-sm">{siteConfig.contact.address}</span>
                </div>
              </div>

              {/* Social Links - Updated with click handler */}
              <div className="flex justify-center gap-4 py-4">
                <Link 
                  isExternal 
                  href={siteConfig.links.twitter} 
                  className="text-gray-300 hover:text-white"
                  onClick={handleLinkClick}
                >
                  <TwitterIcon size={20} />
                </Link>
                <Link 
                  isExternal 
                  href={siteConfig.links.discord}
                  className="text-gray-300 hover:text-white"
                  onClick={handleLinkClick}
                >
                  <DiscordIcon size={20} />
                </Link>
                <Link 
                  isExternal 
                  href={siteConfig.links.github}
                  className="text-gray-300 hover:text-white"
                  onClick={handleLinkClick}
                >
                  <GithubIcon size={20} />
                </Link>
              </div>
            </div>
          </NavbarMenu>
        </NextUINavbar>
      </div>
    </div>
  );
};
