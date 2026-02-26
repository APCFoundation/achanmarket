"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  PlusSquare,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, label: "World", href: "/" },
  { icon: Search, label: "Explore", href: "/explore" },
  { icon: PlusSquare, label: "Mint", href: "/create", isSpecial: true },
  { icon: LayoutDashboard, label: "Guild", href: "/dashboard" },
];

const GameBottomNav = () => {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="rpg-glass-panel p-2 rounded-2xl flex justify-around items-center relative border-t-4 border-primary/30"
    >
      {/* Hiasan tengah */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary/20 rotate-45 border-2 border-primary z-0"></div>

      {navItems.map((item, index) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            href={item.href}
            key={item.href}
            className="relative z-10 group"
          >
            <div
              className={`
                flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300
                ${item.isSpecial ? "-translate-y-4" : ""}
                ${isActive ? "text-primary bg-primary/10 scale-110 shadow-[0_0_10px_rgba(var(--primary),0.5)]" : "text-muted-foreground hover:text-primary hover:bg-primary/5"}
            `}
            >
              <div
                className={`
                 p-2 rounded-lg mb-1 relative overflow-hidden
                 ${item.isSpecial ? "bg-primary text-primary-foreground h-12 w-12" : "h-10 w-10 bg-background/40"}
                 ${isActive && !item.isSpecial ? "border-2 border-primary" : ""}
              `}
              >
                <Icon
                  className={
                    item.isSpecial
                      ? "w-6 h-6 mx-auto mt-1"
                      : "w-5 h-5 mx-auto mt-0.5"
                  }
                />
                {/* Efek kilatan saat hover */}
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </div>
              <span className="text-[10px] font-game uppercase tracking-widest opacity-80 group-hover:opacity-100">
                {item.label}
              </span>
            </div>
            {/* Indikator Aktif */}
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-primary rounded-full glow-primary"
              />
            )}
          </Link>
        );
      })}
    </motion.nav>
  );
};

export default GameBottomNav;
