"use client";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Users,
  Shield,
  Zap,
  Crosshair,
  Target,
  Anchor,
  Cpu,
  Database,
  Key,
  Link,
  Lock,
} from "lucide-react";

// Use the provided raw image path for the main character
const ACHAN_LOGO_2_PATH = "/achan-logo-2.png";

const ChoosePage = () => {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  // Array of Lucide icons for the character grid
  const characterIcons = [
    Users,
    Shield,
    Zap,
    Crosshair,
    Target,
    Anchor,
    Cpu,
    Database,
    Key,
    Link,
    Lock,
    Users,
  ];

  return (
    <motion.div
      className="relative min-h-screen bg-black text-white font-sans overflow-hidden flex flex-col items-center justify-start pt-12 p-8"
      style={{
        backgroundImage:
          "radial-gradient(circle at center, #0f1a14 0%, #000000 100%)",
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Geometric Elements & Circuit Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,0 L100,0 L100,100 L0,100 Z"
              fill="none"
              stroke="#00ff00"
              strokeWidth="0.5"
              strokeOpacity="0.2"
            />
            {/* Add more complex circuit lines here based on image_9.png */}
            <line
              x1="10%"
              y1="20%"
              x2="30%"
              y2="20%"
              stroke="#00ff00"
              strokeWidth="1"
              className="animate-pulse"
            />
            <line
              x1="30%"
              y1="20%"
              x2="40%"
              y2="40%"
              stroke="#00ff00"
              strokeWidth="1"
              className="animate-pulse"
            />
            <line
              x1="60%"
              y1="20%"
              x2="80%"
              y2="20%"
              stroke="#00ff00"
              strokeWidth="1"
              className="animate-pulse"
            />
            <line
              x1="60%"
              y1="20%"
              x2="50%"
              y2="40%"
              stroke="#00ff00"
              strokeWidth="1"
              className="animate-pulse"
            />
            {/* Corner Accents */}
            <polygon
              points="0,0 50,0 0,50"
              fill="#00ff00"
              opacity="0.8"
              className="absolute top-4 left-4"
            />
            <polygon
              points="100,0 50,0 100,50"
              fill="#00ff00"
              opacity="0.8"
              className="absolute top-4 right-4 transform rotate-90"
            />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-green-500" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-green-500" />
          </svg>
        </div>
        {/* Diagonal Lines - Top Right */}
        <div className="absolute top-0 right-0 p-4 flex space-x-2 z-10">
          <div className="w-1 h-8 bg-white transform -skew-x-12" />
          <div className="w-1 h-8 bg-white transform -skew-x-12" />
          <div className="w-1 h-8 bg-white transform -skew-x-12" />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center space-y-12">
        {/* Top Section: Skill, Portrait, Button */}
        <motion.div
          className="flex w-full items-center justify-between px-12"
          variants={itemVariants}
        >
          {/* Desc Skill Panel */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-transparent opacity-20 rounded-lg blur-md group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative bg-black/70 border-2 border-green-500/70 rounded-lg p-6 backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,0,0.4)] flex flex-col items-center">
              <div className="mb-2">
                <ArrowUpRight className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-green-400 tracking-wider">
                desc skill
              </h2>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
            </div>
          </div>

          {/* Central Character Portrait */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-green-500 blur-[20px] opacity-30 animate-pulse"></div>
            <div className="relative w-32 h-32 rounded-full border-4 border-green-500/80 p-1 shadow-[0_0_25px_rgba(0,255,0,0.6)] overflow-hidden flex items-center justify-center bg-black">
              {/* Use the specified raw image path */}
              <img
                src={ACHAN_LOGO_2_PATH}
                alt="Character Portrait"
                className="w-full h-full object-cover rounded-full"
              />
              <div
                className="absolute inset-0 rounded-full border-2 border-white/20 animate-spin-slow"
                style={{ animationDuration: "10s" }}
              ></div>
            </div>
            {/* Arc Indicators */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-36 h-36 rounded-full border-t-4 border-green-400 opacity-70"></div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-36 h-36 rounded-full border-b-4 border-green-400 opacity-70"></div>
          </div>

          {/* Spectre Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(0,255,0,0.7)",
            }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-3 bg-gradient-to-r from-green-900 to-black border-2 border-green-500 rounded-md shadow-[0_0_15px_rgba(0,255,0,0.5)] overflow-hidden group"
          >
            <span className="relative z-10 text-xl font-bold text-green-400 tracking-widest uppercase">
              Spectre
            </span>
            <div className="absolute inset-0 w-full h-full bg-green-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </motion.button>
        </motion.div>

        {/* Bottom Section: Character Grid */}
        <motion.div className="relative" variants={itemVariants}>
          {/* Connecting Lines to Grid */}
          <svg
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-64 h-8 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32,0 L32,8 L0,8 L0,32"
              fill="none"
              stroke="#00ff00"
              strokeWidth="2"
              className="animate-pulse"
            />
            <path
              d="M224,0 L224,8 L256,8 L256,32"
              fill="none"
              stroke="#00ff00"
              strokeWidth="2"
              className="animate-pulse"
            />
          </svg>

          <div className="relative bg-black/70 border-2 border-green-500/70 rounded-xl p-2 backdrop-blur-sm shadow-[0_0_20px_rgba(0,255,0,0.4)]">
            {/* Electric Effect Border */}
            <div className="absolute inset-0 rounded-xl border-2 border-green-400 opacity-50 animate-pulse"></div>
            <div className="grid grid-cols-6 gap-2 p-2 relative z-10">
              {characterIcons.map((Icon, index) => (
                <motion.div
                  key={index}
                  className="w-12 h-12 bg-gray-900/50 border border-green-500/50 rounded-md flex items-center justify-center hover:bg-green-900/30 hover:border-green-400 transition-colors duration-200 cursor-pointer shadow-[0_0_5px_rgba(0,255,0,0.2)]"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <Icon className="w-6 h-6 text-green-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChoosePage;
