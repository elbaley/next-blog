import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Furkan Leba",
  description:
    "Kişisel blogumda JavaScript, React, Node.js ve diğer teknolojiler hakkında rehberler, öğreticiler ve ipuçları bulabilirsiniz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <Header />
        <main className="pt-4 max-xl:px-8 xl:pt-16  max-w-screen-lg mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
