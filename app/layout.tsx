import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        <body className={inter.className}>
            {children}
        </body>
        </html>
    );
}