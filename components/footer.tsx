import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import { FacebookIcon, InstagramIcon, YoutubeIcon, WhatsappIcon } from "@/components/icons";
import { SparklesIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { getAllSiteSections } from "@/lib/services/site-sections.service";
import { SiteSection, SiteSetting } from "@/lib/types/site-sections.types";

// Define the contact info interface
interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  facebook: string;
  instagram: string;
  youtube: string;
  whatsapp: string;
}

export default function Footer() {
  // State management
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: siteConfig.contact.email,
    phone: siteConfig.contact.phones[0] || "",
    address: siteConfig.contact.address,
    facebook: siteConfig.links.facebook,
    instagram: siteConfig.links.instagram,
    youtube: siteConfig.links.youtube,
    whatsapp: siteConfig.links.whatsapp
  });
  const [logoPath, setLogoPath] = useState<string>("/images/logo-volta.jpg");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch footer data from API
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setIsLoading(true);
        const response = await getAllSiteSections();
        
        if ('success' in response && response.success) {
          // Find the footer section
          const footerSection = response.data.find(
            (section: SiteSection) => section.title === "footer"
          );
          
          // Find the navbar section for logo
          const navbarSection = response.data.find(
            (section: SiteSection) => section.title === "navbar"
          );
          
          if (footerSection && footerSection.settings) {
            // Find the contact_info setting
            const contactInfoSetting = footerSection.settings.find(
              setting => setting.key === "contact_info"
            );
            
            if (contactInfoSetting) {
              try {
                // Parse the JSON string value
                const parsedContactInfo = JSON.parse(contactInfoSetting.value);
                
                // Update the contact info state
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
                console.error("Error parsing contact info data:", parseErr);
              }
            }
          } else {
            setError("Footer data not found");
          }
          
          // Get logo from navbar section if available
          if (navbarSection && navbarSection.settings) {
            const logoSetting = navbarSection.settings.find(
              setting => setting.key === "logo"
            );
            
            if (logoSetting) {
              // Process the logo path
              let logo = logoSetting.value;
              
              // Get the API URL from environment variables
              const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
              
              // Handle different path formats
              if (logo.startsWith('/public/')) {
                // If it starts with /public/, it's a path on the backend
                logo = `${apiUrl}${logo}`;
              }
              
              setLogoPath(logo);
            }
          }
        } else {
          setError("Failed to fetch footer data");
        }
      } catch (err) {
        console.error("Error fetching footer data:", err);
        setError("Error loading footer data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  return (
    <footer className="w-full modern-container text-modern-300">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        {/* Logo and Description */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <img
              src={logoPath}
              alt="Volta Generators"
              className="mb-4 w-auto h-20 object-contain"
            />
            <div className="space-y-2">
              <div>Volta Generators in UAE</div>
              <div className="text-right">مولدات فولتا في الإمارات</div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">Contact info</h3>
            <div className="space-y-4">
              <div>
                <div>Email</div>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-gray-400">
                  {contactInfo.email}
                </a>
              </div>
              
              <div>
                <h4 className="font-semibold">United Arab Emirates</h4>
                <div>Volta Generators FZE</div>
                <div>Hot Lines:</div>
                <a 
                  href={`tel:${contactInfo.phone}`} 
                  className="block hover:text-gray-400"
                >
                  {contactInfo.phone}
                </a>
                <div className="mt-2">
                  <div>{contactInfo.address}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Services */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">Our services</h3>
            <ul className="space-y-2">
              <li>Diesel Generators</li>
              <li>Maintenance</li>
              <li>Genuine Spare Parts & Accessories</li>
              <li>ATS & Synchro Solutions</li>
              <li>Fuel Tanks</li>
              <li>Tower Light</li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="col-span-1 text-modern-300">
            <h3 className="text-xl font-semibold mb-4">Newsletter signup</h3>
            <div className="space-y-4 bg-transparent">
              <Input
                type="email"
                placeholder="Enter your Email"
                className="bg-transparent"
              />
              <Button 
                className="w-full bg-transparent text-modern-300 border border-gray-400"
                endContent={<SparklesIcon className="ml-2" />}
              >
                SIGN ME UP
              </Button>
              <p className="text-sm">
                Sign up to our monthly newsletter for useful articles, tips and tricks.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <Link 
                  href={contactInfo.instagram} 
                  isExternal
                  className="hover:text-gray-400"
                >
                  <InstagramIcon className="w-6 h-6" />
                </Link>
                <Link 
                  href={contactInfo.facebook}
                  isExternal
                  className="hover:text-gray-400"
                >
                  <FacebookIcon className="w-6 h-6" />
                </Link>
                <Link 
                  href={contactInfo.youtube}
                  isExternal
                  className="hover:text-gray-400"
                >
                  <YoutubeIcon className="w-6 h-6" />
                </Link>
                <Link 
                  href={contactInfo.whatsapp}
                  isExternal
                  className="hover:text-gray-400"
                >
                  <WhatsappIcon className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-400 ">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {new Date().getFullYear()} Volta Generators. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/cookie-policy" className="text-sm text-modern-300 hover:text-gray-400">
                Cookie policy
              </Link>
              <Link href="/terms" className="text-sm text-modern-300 hover:text-gray-400">
                Terms & conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 