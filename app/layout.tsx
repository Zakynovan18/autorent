import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "./components/BottomNav";
import WAButton from "./components/WAButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RentalKu",
  description: "Sewa Mobil Impianmu dengan Mudah",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {children}
        <WAButton />
        <BottomNav />
      </body>
    </html>
  );
}