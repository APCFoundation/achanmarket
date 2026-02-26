"use client";

import { usePathname } from "next/navigation";
import GameTopHUD from "./components/GameTopHUD";
import AchanCompanion from "./components/AchanCompanion";
import GameBottomNav from "./components/GameBottomNav";

export default function GameLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isChoosePage = pathname === "/game/choose";

  if (isChoosePage) {
    return <>{children}</>;
  }

  return (
    <div>
      {/* Lapisan Latar Belakang */}
      <div className="fixed inset-0 z-0 animated-bg opacity-60"></div>
      <div className="fixed inset-0 z-0 bg-linear-to-t from-background via-transparent to-background/80 pointer-events-none"></div>

      {/* Lapisan UI Utama (HUD) */}
      <div className="relative z-10 h-screen w-screen flex flex-col overflow-hidden p-4 md:p-6">
        {/* HUD Atas: Profil & Wallet */}
        <GameTopHUD />

        {/* Area Konten Utama (Scrollable di tengah) */}
        <main className="flex-1 overflow-y-auto my-4 scrollbar-hide z-20 relative">
          {/* Efek partikel magis di belakang konten */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-30"></div>
          {children}
        </main>

        {/* HUD Bawah: Navigasi & Companion */}
        <div className="absolute bottom-0 w-full flex justify-between px-12 pb-6 z-30 pointer-events-none">
          {/* Companion di Kiri Bawah */}
          <div className="pointer-events-auto">
            <AchanCompanion />
          </div>
          {/* Menu di Kanan Bawah */}
          <div className=" pointer-events-auto w-full max-w-md ">
            <GameBottomNav />
          </div>
        </div>
      </div>
    </div>
  );
}
