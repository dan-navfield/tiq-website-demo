import type { Metadata } from "next";
import { Roboto_Flex, Barlow } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SiteAlertBanner } from "@/components/layout/SiteAlertBanner";
import StoryblokProvider from "@/components/StoryblokProvider";

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

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
    <html lang="en" className={`${robotoFlex.variable} ${barlow.variable}`}>
      <body className="antialiased bg-white text-black font-sans">
        <StoryblokProvider>
          <div className="sticky top-0 z-40 -mb-[147px]">
            <SiteAlertBanner />
            <Header />
          </div>
          <main>{children}</main>
          <Footer />
        </StoryblokProvider>
      </body>
    </html>
  );
}
