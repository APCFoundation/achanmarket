import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-lime-400 to-green-600">
              ACHAN MARKET
            </h2>
            <p className="text-gray-400 mb-6 max-w-sm">
              The world's first and largest digital marketplace for crypto
              collectibles and non-fungible tokens (NFTs). Buy, sell, and
              discover exclusive digital items.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Twitter size={20} />} />
              <SocialLink href="#" icon={<Instagram size={20} />} />
              <SocialLink href="#" icon={<Github size={20} />} />
              <SocialLink href="#" icon={<Linkedin size={20} />} />
            </div>
          </div>

          {/* Links Columns */}
          <FooterColumn
            title="Marketplace"
            links={[
              { label: "All NFTs", href: "/explore" },
              { label: "Art", href: "/explore?category=art" },
              { label: "Music", href: "/explore?category=music" },
              {
                label: "Virtual Worlds",
                href: "/explore?category=virtual-worlds",
              },
            ]}
          />

          <FooterColumn
            title="My Account"
            links={[
              { label: "Profile", href: "/dashboard/profile" },
              { label: "Favorites", href: "/dashboard/favorites" },
              { label: "Watchlist", href: "/dashboard/watchlist" },
              { label: "My Collections", href: "/dashboard/collections" },
            ]}
          />

          <FooterColumn
            title="Company"
            links={[
              { label: "About", href: "/about" },
              { label: "Careers", href: "/careers" },
              { label: "Ventures", href: "/ventures" },
              { label: "Grants", href: "/grants" },
            ]}
          />
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <div className="mb-4 md:mb-0">
            © 2026 Achan Market. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components
const FooterColumn = ({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) => (
  <div>
    <h3 className="font-bold text-lg mb-4">{title}</h3>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SocialLink = ({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) => (
  <Link
    href={href}
    className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors duration-300"
  >
    {icon}
  </Link>
);

export default FooterSection;
