import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/nav/Navbar";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "Track your daily tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
