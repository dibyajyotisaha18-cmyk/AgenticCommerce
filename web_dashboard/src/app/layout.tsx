import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ShaderBackground from "@/components/ShaderBackground";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "AgenticCommerce — Autonomous E-Commerce Agent",
  description: "AI-powered dynamic pricing and inventory management agent for e-commerce businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen" style={{ background: '#0a0500' }}>
        {/* Global WebGL Shader Background */}
        <ShaderBackground />
        {/* Page Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
