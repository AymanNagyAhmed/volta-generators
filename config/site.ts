export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  contact: {
    phones: [
      "+971503635488",
    ],
    email: "Info@voltagenerators.com",
    address: "VOLTA GENERATORS FZC 4P-04, P.B.No.51564 Hamriyah Free Zone Sharjah, UAE"
  },
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About Us",
      href: "/about-us",
    },
    {
      label: "Products",
      type: "dropdown",
      component: "ProductsDropdown",
    },
    {
      label: "Gallery",
      href: "/gallery",
    },
    {
      label: "Calculator",
      href: "/calculator",
    },
    {
      label: "News",
      href: "/news",
    },
    
    {
      label: "Contact",
      href: "/contact",
    }
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
    instagram: "https://instagram.com/voltagenerators",
    facebook: "https://facebook.com/voltagenerators",
    youtube: "https://youtube.com/voltagenerators",
    whatsapp: "https://wa.me/971503635488"
  },
};
