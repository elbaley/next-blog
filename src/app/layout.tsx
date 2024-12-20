import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header/Header";
import { Footer } from "@/components/site/Footer/Footer";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark flex flex-col min-h-screen`}
      >
        <Header />
        <main className="pt-4 max-xl:px-8 xl:pt-16 max-md:w-full  xl:max-w-screen-lg mx-auto mb-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
