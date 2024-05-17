import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import ThemeRegistry from "@/app/components/theme-registry/ThemeRegistry";
import "dayjs/locale/pt-br";
import "./global.css";

const inter = Inter({ subsets: ["latin"] });

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

      <body className={`${inter.className}`}>
        <AppRouterCacheProvider options={{ key: 'css'}}>
          <ThemeRegistry>{children}</ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
