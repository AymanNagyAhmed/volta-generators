import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { siteConfig } from "@/config/site";

import { TwitterIcon, GithubIcon, DiscordIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="w-full bg-layout-footer-bg dark:bg-layout-footer-bg-dark text-layout-footer-text-primary dark:text-layout-footer-text-primary-dark border-t border-layout-footer-border dark:border-layout-footer-border-dark backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link
            isExternal
            href={siteConfig.links.twitter}
            aria-label="Twitter"
            className="text-layout-footer-text-secondary dark:text-layout-footer-text-secondary-dark hover:text-layout-footer-text-hover dark:hover:text-layout-footer-text-hover-dark transition-colors"
          >
            <TwitterIcon className="h-6 w-6" />
          </Link>
          <Link
            isExternal
            href={siteConfig.links.discord}
            aria-label="Discord"
            className="text-layout-footer-text-secondary dark:text-layout-footer-text-secondary-dark hover:text-layout-footer-text-hover dark:hover:text-layout-footer-text-hover-dark transition-colors"
          >
            <DiscordIcon className="h-6 w-6" />
          </Link>
          <Link
            isExternal
            href={siteConfig.links.github}
            aria-label="Github"
            className="text-layout-footer-text-secondary dark:text-layout-footer-text-secondary-dark hover:text-layout-footer-text-hover dark:hover:text-layout-footer-text-hover-dark transition-colors"
          >
            <GithubIcon className="h-6 w-6" />
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-sm leading-5 text-layout-footer-text-secondary dark:text-layout-footer-text-secondary-dark">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 