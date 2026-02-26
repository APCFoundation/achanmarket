"use client";
import { useAccount } from "wagmi";
import { Wallet, User, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import useHydrate from "@/hook/useHydrate";

const GameTopHUD = () => {
  const { address, isConnected } = useAccount();
  const isClient = useHydrate();
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex justify-between items-start pointer-events-auto"
    >
      {/* Kiri: Player Status Bar */}
      <div className="rpg-glass-panel p-3 flex items-center gap-3 ornate-border max-w-[300px]">
        <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary relative overflow-hidden">
          <User className="text-primary" />
          {/* Efek scanline pada avatar */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent animate-scan"></div>
        </div>
        <div>
          <h2 className="font-game text-xs text-primary mb-1">Investor-san</h2>
          <div className="w-32 h-3 bg-background/50 rounded-full overflow-hidden border border-primary/30 relative">
            <div className="h-full bg-gradient-to-r from-blue-500 to-primary w-[75%] relative">
              <span className="absolute right-1 top-[1px] text-[8px] font-game text-white leading-none">
                LV. 15
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Kanan: Wallet / Resources */}
      <div className="rpg-glass-panel p-2 px-4 flex items-center gap-4">
        <div className="flex flex-col items-end">
          <span className="text-xs text-muted-foreground font-game">
            Balance
          </span>
          <div className="flex items-center gap-1 text-primary font-bold">
            <Sparkles size={14} />
            <span className="font-game tracking-wider">2.45 ETH</span>
          </div>
        </div>

        {/* Tombol connect wallet dari Reown/Wagmi bisa dimodifikasi di sini */}
        <button className="font-game text-xs bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/80 transition-all border-b-4 border-primary-dark active:border-b-0 active:translate-y-[4px]">
          {isConnected && isClient
            ? address
              ? `${address.substring(0, 6)}...`
              : "Connected"
            : "LINK SOUL"}
        </button>
      </div>
    </motion.header>
  );
};

export default GameTopHUD;
