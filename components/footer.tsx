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
              src="/images/logo-new.png"
              alt="AQT Generators"
              width={200}
              height={80}
              className="mb-4 w-auto h-auto"
            />
            <div className="space-y-2">
              <div>Diesel Generators in UAE</div>
              <div>Diesel Generators in KSA</div>
              <div className="text-right">مولدات بيركنز في الإمارات</div>
              <div className="text-right">مولدات بيركنز في السعودية</div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">Contact info</h3>
            <div className="space-y-4">
              <div>
                <div className="text-gray-300">Email</div>
                <a href="mailto:info@aqtgenerators.com">info@aqtgenerators.com</a>
              </div>
              
              <div>
                <h4 className="font-semibold">United Arab Emirates</h4>
                <div>AQT Generators UAE</div>
                <div>Office Number:</div>
                <a href="tel:+97145471703" className="text-yellow-500">+971 4 5471703</a>
                <div>Hot Lines:</div>
                <a href="tel:+97150531303" className="text-yellow-500">+971 50 531 0303</a>
                <br />
                <a href="tel:+97150488984" className="text-yellow-500">+971 50 488 9841</a>
                <div className="mt-2">
                  <div>Al Owais Building (Airport Building)</div>
                  <div>Port Saeed, Plot No. 388-0</div>
                  <div>Makani No: 32476 94799</div>
                  <div>Office No: 204</div>
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
                <Link href="#" className="text-white hover:text-yellow-500">
                  <InstagramIcon className="w-6 h-6" />
                </Link>
                <Link href="#" className="text-white hover:text-yellow-500">
                  <FacebookIcon className="w-6 h-6" />
                </Link>
                <Link href="#" className="text-white hover:text-yellow-500">
                  <YoutubeIcon className="w-6 h-6" />
                </Link>
                <Link href="#" className="text-white hover:text-yellow-500">
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
              © {new Date().getFullYear()} AQT Generators. All rights reserved.
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