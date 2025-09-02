import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";
import { headers } from "next/headers";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const pressFont = Press_Start_2P({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-press-start-2p",
});

export const metadata: Metadata = {
  title: "A-Chan Market",
  description: "Marketplace NFT with anime style",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = (await headers()).get("cookie");
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="character.ico" sizes="any" />
      </head>
      <body
        className={` ${inter.variable} ${pressFont.variable} `}
        suppressHydrationWarning
      >
        <Provider cookies={cookies}>{children}</Provider>
      </body>
    </html>
  );
}
