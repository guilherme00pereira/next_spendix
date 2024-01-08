import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/components/theme-registry/ThemeRegistry";
import React from "react";

const inter = Inter({ subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spendix",
  description: "Manage your expenses and income with Spendix",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <body className={`${inter.className} ${jakarta.className}`}>        
          <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
