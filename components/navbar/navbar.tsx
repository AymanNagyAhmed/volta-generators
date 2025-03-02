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
import NextLink from "next/link";
import clsx from "clsx";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import {
  SearchIcon,
  Phone,
  Mail,
  MapPin,
} from "@/components/shared/icons";
import { FacebookIcon, InstagramIcon, YoutubeIcon, WhatsappIcon } from "@/components/icons";
import { ProductsDropdown } from "@/components/navbar/products-dropdown";
import { getAllSiteSections } from "@/lib/services/site-sections.service";
import { SiteSection, SiteSetting } from "@/lib/types/site-sections.types";
import { Button } from "@nextui-org/button";

// Define interfaces for navbar data
interface NavbarData {
  navText: string;
  menuItems: string[];
  searchPlaceholder: string;
  logo: string;
}

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  
  // State for navbar data from API
  const [navbarData, setNavbarData] = useState<NavbarData>({
    navText: "Volta Generators FZE",
    menuItems: siteConfig.navItems.map(item => item.label),
    searchPlaceholder: "Search...",
    logo: "/images/logo-volta.jpg"
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for contact info from API (for the top bar)
  const [contactInfo, setContactInfo] = useState({
    email: siteConfig.contact.email,
    phone: siteConfig.contact.phones[0] || "",
    address: siteConfig.contact.address,
    facebook: siteConfig.links.facebook,
    instagram: siteConfig.links.instagram,
    youtube: siteConfig.links.youtube,
    whatsapp: siteConfig.links.whatsapp
  });

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = () => {
      const accessToken = Cookies.get('access_token');
      const userData = Cookies.get('user_data');
      setIsAuthenticated(!!accessToken && !!userData);
    };
    
    // Check on initial load
    checkAuth();
    
    // Set up an interval to check periodically
    const interval = setInterval(checkAuth, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  // Fetch navbar and footer data from API
  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        setIsLoading(true);
        const response = await getAllSiteSections();
        
        if ('success' in response && response.success) {
          // Find the navbar section
          const navbarSection = response.data.find(
            (section: SiteSection) => section.title === "navbar"
          );
          
          // Find the footer section for contact info
          const footerSection = response.data.find(
            (section: SiteSection) => section.title === "footer"
          );
          
          if (navbarSection && navbarSection.settings) {
            // Process navbar settings
            const navTextSetting = navbarSection.settings.find(
              setting => setting.key === "nav_text"
            );
            
            const menuItemsSetting = navbarSection.settings.find(
              setting => setting.key === "menu_items"
            );
            
            const searchPlaceholderSetting = navbarSection.settings.find(
              setting => setting.key === "search_placeholder"
            );
            
            const logoSetting = navbarSection.settings.find(
              setting => setting.key === "logo"
            );
            
            // Update navbar data state
            const updatedNavbarData = { ...navbarData };
            
            if (navTextSetting) {
              updatedNavbarData.navText = navTextSetting.value;
            }
            
            if (menuItemsSetting) {
              try {
                const parsedMenuItems = JSON.parse(menuItemsSetting.value);
                if (Array.isArray(parsedMenuItems) && parsedMenuItems.length > 0) {
                  updatedNavbarData.menuItems = parsedMenuItems;
                }
              } catch (parseErr) {
                console.error("Error parsing menu items:", parseErr);
              }
            }
            
            if (searchPlaceholderSetting) {
              updatedNavbarData.searchPlaceholder = searchPlaceholderSetting.value;
            }
            
            if (logoSetting) {
              // Process the logo path
              let logoPath = logoSetting.value;
              
              // Get the API URL from environment variables
              const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
              
              // Handle different path formats
              if (logoPath.startsWith('/public/')) {
                // If it starts with /public/, it's a path on the backend
                logoPath = `${apiUrl}${logoPath}`;
              }
              
              updatedNavbarData.logo = logoPath;
            }
            
            setNavbarData(updatedNavbarData);
          }
          
          // Process footer contact info if available
          if (footerSection && footerSection.settings) {
            const contactInfoSetting = footerSection.settings.find(
              setting => setting.key === "contact_info"
            );
            
            if (contactInfoSetting) {
              try {
                const parsedContactInfo = JSON.parse(contactInfoSetting.value);
                setContactInfo({
                  email: parsedContactInfo.email || siteConfig.contact.email,
                  phone: parsedContactInfo.phone || siteConfig.contact.phones[0] || "",
                  address: parsedContactInfo.address || siteConfig.contact.address,
                  facebook: parsedContactInfo.facebook || siteConfig.links.facebook,
                  instagram: parsedContactInfo.instagram || siteConfig.links.instagram,
                  youtube: parsedContactInfo.youtube || siteConfig.links.youtube,
                  whatsapp: parsedContactInfo.tiktok || siteConfig.links.whatsapp // Use tiktok from API as whatsapp if available
                });
              } catch (parseErr) {
                console.error("Error parsing contact info:", parseErr);
              }
            }
          }
        } else {
          setError("Failed to fetch navbar data");
        }
      } catch (err) {
        console.error("Error fetching navbar data:", err);
        setError("Error loading navbar data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNavbarData();
  }, []);

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
      placeholder={navbarData.searchPlaceholder}
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

  // Map API menu items to nav items with proper structure
  const mappedNavItems = navbarData.menuItems.map(item => {
    // Find matching item in siteConfig if it exists
    const configItem = siteConfig.navItems.find(configItem => 
      configItem.label.toLowerCase() === item.toLowerCase()
    );
    
    if (configItem) {
      return configItem;
    }
    
    // Create a new item with default href based on label
    return {
      label: item,
      href: `/${item.toLowerCase()}`
    };
  });

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
              <div className="flex items-center space-x-2">
                <Phone size={20} className="text-corporate-blue-dark" />
                <span className="text-sm text-corporate-blue-dark font-medium">{contactInfo.phone}</span>
              </div>
              {/* Email */}
              <div className="flex items-center space-x-2">
                <Mail size={20} className="text-corporate-blue-dark" />
                <span className="text-sm text-corporate-blue-dark font-medium">{contactInfo.email}</span>
              </div>
              {/* Address */}
              <div className="flex items-center space-x-2">
                <MapPin size={20} className="text-corporate-blue-dark" />
                <span className="text-sm text-corporate-blue-dark font-medium">{contactInfo.address}</span>
              </div>
            </div>

            {/* Social Links - Updated with Footer icons */}
            <div className="flex items-center gap-4 ml-6 flex-shrink-0">
              <Link 
                isExternal 
                aria-label="Instagram" 
                href={contactInfo.instagram} 
                className="text-corporate-blue-dark hover:text-corporate-blue transition-colors"
              >
                <InstagramIcon className="w-5 h-5" />
              </Link>
              <Link 
                isExternal 
                aria-label="Facebook" 
                href={contactInfo.facebook} 
                className="text-corporate-blue-dark hover:text-corporate-blue transition-colors"
              >
                <FacebookIcon className="w-5 h-5" />
              </Link>
              <Link 
                isExternal 
                aria-label="Youtube" 
                href={contactInfo.youtube} 
                className="text-corporate-blue-dark hover:text-corporate-blue transition-colors"
              >
                <YoutubeIcon className="w-5 h-5" />
              </Link>
              <Link 
                isExternal 
                aria-label="Whatsapp" 
                href={contactInfo.whatsapp} 
                className="text-corporate-blue-dark hover:text-corporate-blue transition-colors"
              >
                <WhatsappIcon className="w-5 h-5" />
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
                    src={navbarData.logo} 
                    alt="Logo" 
                    className="h-20 w-auto object-contain"
                  />
                  <span className="ml-4 font-bold text-gray-800 hidden sm:block text-nav">
                    {navbarData.navText}
                  </span>
                </div>
              </NextLink>
            </NavbarBrand>
          </NavbarContent>

          {/* Navigation Links Section */}
          <NavbarContent className="hidden sm:flex flex-1" justify="center">
            <ul className="hidden lg:flex gap-6 justify-center items-center">
              {mappedNavItems.map((item) => {
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
            
            {/* Sign In Button - Only show when not authenticated and not on login page */}
            {!isAuthenticated && pathname !== "/login" && (
              <NavbarItem className="hidden sm:flex">
                <Button
                  as={NextLink}
                  href="/login"
                  variant="shadow"
                  color="default"
                  size="sm"
                  className="ml-2 bg-gray-800 hover:bg-gray-700 text-white"
                >
                  Sign In
                </Button>
              </NavbarItem>
            )}
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
              {mappedNavItems.map((item, index) => {
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

              {/* Sign In Button for Mobile - Only show when not authenticated and not on login page */}
              {!isAuthenticated && pathname !== "/login" && (
                <NavbarMenuItem>
                  <Link
                    className="w-full text-lg bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex justify-center"
                    href="/login"
                    size="lg"
                    onClick={handleLinkClick}
                  >
                    Sign In
                  </Link>
                </NavbarMenuItem>
              )}

              {/* Divider */}
              <div className="mx-4 my-2 h-[1px] bg-gray-600/50" />

              {/* Mobile Contact Info */}
              <div className="flex flex-col space-y-4 py-4 border-b border-gray-600/50">
                {/* Phone */}
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span className="text-sm">{contactInfo.phone}</span>
                </div>
                
                {/* Rest of contact info */}
                <div className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span className="text-sm">{contactInfo.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span className="text-sm">{contactInfo.address}</span>
                </div>
              </div>

              {/* Social Links - Updated with Footer icons */}
              <div className="flex justify-center gap-4 py-4">
                <Link 
                  isExternal 
                  href={contactInfo.instagram}
                  className="text-gray-700 hover:text-gray-900"
                  onClick={handleLinkClick}
                >
                  <InstagramIcon className="w-5 h-5" />
                </Link>
                <Link 
                  isExternal 
                  href={contactInfo.facebook}
                  className="text-gray-700 hover:text-gray-900"
                  onClick={handleLinkClick}
                >
                  <FacebookIcon className="w-5 h-5" />
                </Link>
                <Link 
                  isExternal 
                  href={contactInfo.youtube}
                  className="text-gray-700 hover:text-gray-900"
                  onClick={handleLinkClick}
                >
                  <YoutubeIcon className="w-5 h-5" />
                </Link>
                <Link 
                  isExternal 
                  href={contactInfo.whatsapp}
                  className="text-gray-700 hover:text-gray-900"
                  onClick={handleLinkClick}
                >
                  <WhatsappIcon className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </NavbarMenu>
        </NextUINavbar>
      </div>
    </div>
  );
};
