import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { siteConfig } from "@/config/site";

import { TwitterIcon, GithubIcon, DiscordIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="w-full border-t border-default-200 dark:border-default-100">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link
            isExternal
            href={siteConfig.links.twitter}
            aria-label="Twitter"
            className="text-default-500 hover:text-default-900"
          >
            <TwitterIcon className="h-6 w-6" />
          </Link>
          <Link
            isExternal
            href={siteConfig.links.discord}
            aria-label="Discord"
            className="text-default-500 hover:text-default-900"
          >
            <DiscordIcon className="h-6 w-6" />
          </Link>
          <Link
            isExternal
            href={siteConfig.links.github}
            aria-label="Github"
            className="text-default-500 hover:text-default-900"
          >
            <GithubIcon className="h-6 w-6" />
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-sm leading-5 text-default-500">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 