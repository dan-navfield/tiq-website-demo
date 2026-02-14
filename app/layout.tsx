import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import StoryblokProvider from "@/components/StoryblokProvider";

export const metadata: Metadata = {
  title: "Trade and Investment Queensland",
  description:
    "Trade and Investment Queensland helps businesses invest in and export from Queensland, Australia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black font-sans">
        <StoryblokProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </StoryblokProvider>
      </body>
    </html>
  );
}
