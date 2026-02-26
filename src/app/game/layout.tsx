import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "../globals.css";
import GameLayoutContent from "@/features/game/GameLayoutContent";

const inter = Inter({ subsets: ["latin"] });
const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

export const metadata: Metadata = {
  title: "Achan Market - Arcane Terminal",
  description: "Anime NFT Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GameLayoutContent>{children}</GameLayoutContent>;
}
