import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import { FacebookIcon, InstagramIcon, YoutubeIcon, WhatsappIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="w-full bg-blue-900 text-white">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        {/* Logo and Description */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Image
              src="/images/logo-volta.jpg"
              alt="Volta Generators"
              width={200}
              height={80}
              className="mb-4 w-auto h-auto"
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
                <div className="text-gray-300">Email</div>
                <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
              </div>
              
              <div>
                <h4 className="font-semibold">United Arab Emirates</h4>
                <div>Volta Generators FZE</div>
                <div>Hot Lines:</div>
                {siteConfig.contact.phones.map((phone) => (
                  <a 
                    key={phone}
                    href={`tel:${phone}`} 
                    className="block text-yellow-500 hover:text-yellow-400"
                  >
                    {phone}
                  </a>
                ))}
                <div className="mt-2">
                  <div>{siteConfig.contact.address}</div>
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
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">Newsletter signup</h3>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your Email"
                className="bg-white"
              />
              <Button 
                className="w-full bg-yellow-500 text-black hover:bg-yellow-600"
              >
                SIGN ME UP
              </Button>
              <p className="text-sm">
                Sign up to our monthly newsletter for useful articles, tips and tricks.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <Link 
                  href={siteConfig.links.instagram} 
                  isExternal
                  className="text-white hover:text-yellow-500"
                >
                  <InstagramIcon className="w-6 h-6" />
                </Link>
                <Link 
                  href={siteConfig.links.facebook}
                  isExternal
                  className="text-white hover:text-yellow-500"
                >
                  <FacebookIcon className="w-6 h-6" />
                </Link>
                <Link 
                  href={siteConfig.links.youtube}
                  isExternal
                  className="text-white hover:text-yellow-500"
                >
                  <YoutubeIcon className="w-6 h-6" />
                </Link>
                <Link 
                  href={siteConfig.links.whatsapp}
                  isExternal
                  className="text-white hover:text-yellow-500"
                >
                  <WhatsappIcon className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-300">
              © {new Date().getFullYear()} Volta Generators. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/cookie-policy" className="text-sm text-gray-300 hover:text-white">
                Cookie policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-300 hover:text-white">
                Terms & conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 