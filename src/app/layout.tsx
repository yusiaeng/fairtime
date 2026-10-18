import type { Metadata } from "next";
import { Aclonica, Kadwa, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const aclonica = Aclonica({ weight: "400", subsets: ["latin"], variable: "--font-aclonica" });
const kadwa = Kadwa({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-kadwa" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FairTime — Meeting times that work for everyone",
  description: "FairTime helps groups find meeting times that balance availability, time zones and everyone's preferred hours.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${aclonica.variable} ${kadwa.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
