"use client";
import { useState } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
// Anda perlu mengimpor komponen Chatbot asli Anda di sini dan menyesuaikannya agar pas di dalam modal ini.
// import ChatbotInterface from '@/features/landingPage/components/chatbot/ChatbotInterface';

const AchanCompanion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dragControls = useDragControls();

  return (
    <>
      {/* Tombol Potret Karakter */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group"
      >
        {/* Lingkaran Potret */}
        <div
          className={`
            size-20 md:size-28 rounded-full border-[3px] overflow-hidden relative z-10 transition-all
            ${isOpen ? "border-primary shadow-[0_0_20px_rgba(var(--primary),0.6)]" : "border-muted-foreground/50 hover:border-primary/80"}
        `}
        >
          {/* GANTI INI DENGAN GAMBAR KARAKTER ACHAN ANDA */}
          <img
            src="/achan-logo-2.png"
            alt="Achan"
            className="w-full h-full object-cover bg-background/50"
          />

          {/* Notifikasi Bubble */}
          {!isOpen && (
            <div className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-background animate-bounce">
              <MessageCircle size={12} className="text-white" />
            </div>
          )}
        </div>

        {/* Label Nama */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black/80 px-3 py-0.5 rounded-full border border-primary/50 z-20">
          <span className="text-[10px] font-game text-primary">Achan</span>
        </div>

        {/* Efek gelombang saat idle */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping-slow z-0"></div>
        )}
      </motion.button>

      {/* Modal Chat Windows 95/Retro Style */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragListener={false}
            dragControls={dragControls}
            dragMomentum={false}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-28 left-0 w-[350px] md:w-[400px] rpg-glass-panel overflow-hidden flex flex-col ornate-border"
            style={{ height: "500px", maxHeight: "60vh" }}
          >
            {/* Header Jendela Chat */}
            <div
              onPointerDown={(e) => dragControls.start(e)}
              className="bg-primary/20 p-2 flex justify-between items-center border-b border-primary/30 cursor-move touch-none"
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>
                <h3 className="font-game text-xs text-primary">
                  Achan Link System
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-primary/30 p-1 rounded"
              >
                <X size={16} />
              </button>
            </div>

            {/* Area Konten Chat (Tempatkan komponen chat asli Anda di sini) */}
            <div className="flex-1 bg-black/40 p-2 overflow-hidden relative">
              {/* Placeholder: Masukkan <Chatbot /> Anda di sini dan sesuaikan stylenya agar transparan */}
              <div className="h-full flex items-center justify-center text-muted-foreground font-game text-xs">
                [Chat Interface Module Loading...]
                {/* <Chatbot /> */}
              </div>

              {/* Efek garis scanline di atas chat */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,_rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] opacity-30"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AchanCompanion;
