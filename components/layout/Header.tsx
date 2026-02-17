"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Search, X, Menu, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { SUPPORTED_LANGUAGES } from "@/lib/storyblok";

const navigation = [
  {
    label: "Why Queensland",
    href: "/why-queensland",
    items: [
      { label: "About Queensland", href: "/why-queensland/about-queensland" },
      { label: "Queensland House", href: "/why-queensland/queensland-house" },
      { label: "Brisbane 2032", href: "/why-queensland/brisbane-2032" },
      { label: "Region Profiles", href: "/why-queensland/region-profiles" },
    ],
  },
  {
    label: "Invest",
    href: "/invest",
    items: [
      { label: "Industry Opportunities", href: "/invest/industry-opportunities" },
      { label: "Mining and resources", href: "/invest/mining-and-resources" },
      { label: "Office space applications", href: "/invest/office-space" },
      { label: "National Innovation visa nominations", href: "/invest/national-innovation-visa" },
      { label: "Choose Queensland", href: "/invest/choose-queensland" },
      { label: "Investor Success Stories", href: "/invest/investor-success-stories" },
    ],
  },
  {
    label: "Export",
    href: "/export",
    items: [
      { label: "Book a free consultation", href: "/export/free-consultation" },
      { label: "Market Finder", href: "/export/marketfinder" },
      { label: "Mining and resources", href: "/export/mining-and-resources" },
      { label: "Grants and assistance", href: "/export/grants" },
      { label: "Market Accelerator Program", href: "/export/market-accelerator-program" },
      { label: "METS", href: "/export/mets" },
      { label: "Food, beverage and agriculture", href: "/export/food-beverage-agriculture" },
      { label: "Market profiles", href: "/export/market-profiles" },
      { label: "E-commerce", href: "/export/e-commerce" },
      { label: "Export success stories", href: "/export/export-success-stories" },
    ],
  },
  {
    label: "News and events",
    href: "/news-and-events",
    items: [
      { label: "Export Awards", href: "/news-and-events/events/premier-of-qld-export-awards" },
      { label: "Tariff hub", href: "/news-and-events/tariffs" },
      { label: "World Expo 2025 Osaka", href: "/news-and-events/world-expo-2025-osaka" },
      { label: "News", href: "/news-and-events/news" },
      { label: "Events", href: "/news-and-events/events" },
      { label: "Success stories", href: "/news-and-events/success-stories" },
    ],
  },
  {
    label: "About",
    href: "/about",
    items: [
      { label: "How We Help", href: "/about/how-we-help" },
      { label: "Global Network", href: "/about/global-network" },
      { label: "Regional Advisors", href: "/about/regional-advisors" },
      { label: "Publications", href: "/about/strategies-publications-policies" },
      { label: "Board", href: "/about/board" },
      { label: "Management", href: "/about/management" },
      { label: "Careers", href: "/about/careers" },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    items: [
      { label: "Our Offices", href: "/contact/our-offices" },
    ],
  },
];

const languages = [
  { code: "ar", label: "العربية" },
  { code: "de", label: "Deutsch" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "hi", label: "हिन्दी" },
  { code: "id", label: "Bahasa Indonesia" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "pt", label: "Português" },
  { code: "si", label: "සිංහල" },
  { code: "th", label: "ไทย" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "zh-Hans", label: "简体中文" },
  { code: "zh-Hant", label: "繁體中文" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Detect current language from URL
  const pathSegments = pathname.split("/").filter(Boolean);
  const currentLang = SUPPORTED_LANGUAGES.includes(pathSegments[0])
    ? pathSegments[0]
    : "en";
  const currentLangLabel =
    languages.find((l) => l.code === currentLang)?.label ?? "English";

  // Strip current language prefix to get the base path
  const basePath =
    currentLang !== "en" ? "/" + pathSegments.slice(1).join("/") : pathname;

  function switchLanguage(code: string) {
    setLangOpen(false);
    setMobileMenuOpen(false);
    if (code === "en") {
      router.push(basePath || "/");
    } else {
      router.push(`/${code}${basePath === "/" ? "" : basePath}`);
    }
  }

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "z-40 transition-colors duration-300",
        scrolled && "shadow-md"
      )}
      style={{
        backgroundColor: scrolled ? "#FFFFFF" : "rgba(0,0,0,0.1)",
        boxShadow: scrolled
          ? "0 2px 8px rgba(0,0,0,0.1)"
          : "rgba(0,0,0,0.08) 0px 4px 24px 0px",
      }}
    >
      <div className="max-w-[1384px] mx-auto px-6">
        <div className="flex items-center h-[88px]">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 mx-4">
            <Image
              src={scrolled ? "/images/tiq-logo-black.png" : "/images/tiq-logo-white.png"}
              alt="Trade and Investment Queensland"
              width={262}
              height={53}
              className="w-[262px] h-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center flex-1">
            {navigation.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-4 h-[88px] text-base font-normal transition-colors",
                    scrolled
                      ? "text-navy hover:text-navy/70"
                      : "text-white hover:text-white/80"
                  )}
                >
                  {item.label}
                  {item.items.length > 0 && (
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform ml-0.5",
                        activeDropdown === item.label && "rotate-180"
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {activeDropdown === item.label && item.items.length > 0 && (
                  <div
                    className="absolute top-full left-0 mt-0 w-64 bg-white border border-gray-200 shadow-lg py-2"
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.items.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block px-6 py-2 text-base text-navy hover:bg-gray-50 transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side: Search + Language + Mobile toggle */}
          <div className="flex items-center ml-auto">
            {/* Search panel - visible on desktop */}
            <div className="hidden lg:flex items-center relative mx-4">
              <input
                type="text"
                placeholder="Search..."
                className={cn(
                  "w-[234px] h-[48px] text-base rounded-t px-4 pr-16 outline-none",
                  scrolled
                    ? "text-navy placeholder:text-gray-400 border border-gray-200"
                    : "text-white placeholder:text-white/50"
                )}
                style={{ backgroundColor: scrolled ? "#F5F5F0" : "rgba(240,240,236,0.1)" }}
                aria-label="Search input"
              />
              <button
                className={cn(
                  "absolute right-0 top-0 h-[48px] w-[48px] flex items-center justify-center",
                  scrolled ? "text-navy" : "text-white"
                )}
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </div>

            {/* Language Selector */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={cn(
                  "flex items-center gap-1.5 px-6 h-[88px] text-[15px] font-medium uppercase transition-colors",
                  scrolled
                    ? "text-navy hover:text-navy/70"
                    : "text-white hover:text-white/80"
                )}
                aria-label="Select language"
              >
                <Globe size={18} />
                <span>{currentLangLabel}</span>
              </button>

              {langOpen && (
                <div className="absolute right-0 top-full mt-0 w-48 bg-white border border-gray-200 shadow-lg py-2 max-h-80 overflow-y-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={cn(
                        "block w-full text-left px-6 py-2 text-base text-navy hover:bg-gray-50 transition-colors",
                        currentLang === lang.code && "font-semibold bg-gray-50"
                      )}
                      onClick={() => switchLanguage(lang.code)}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 transition-colors",
                scrolled
                  ? "text-navy hover:text-navy/70"
                  : "text-white hover:text-white/80"
              )}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {/* Mobile Search */}
            <div className="flex items-center border border-gray-300 rounded px-3 py-2 mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 text-base bg-transparent outline-none placeholder:text-gray-400"
              />
              <Search size={16} className="text-gray-500" />
            </div>

            {navigation.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() =>
                    setMobileExpanded(
                      mobileExpanded === item.label ? null : item.label
                    )
                  }
                  className="flex items-center justify-between w-full py-3 text-base font-medium text-gray-800 border-b border-gray-100"
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    className={cn(
                      "transition-transform",
                      mobileExpanded === item.label && "rotate-180"
                    )}
                  />
                </button>

                {mobileExpanded === item.label && (
                  <div className="pl-4 py-2 space-y-1">
                    {item.items.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block py-2 text-base text-gray-600 hover:text-navy"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Language Selector */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Language
              </p>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={cn(
                      "px-3 py-1.5 text-xs border border-gray-200 rounded hover:bg-gray-50",
                      currentLang === lang.code && "font-semibold bg-gray-100 border-navy"
                    )}
                    onClick={() => switchLanguage(lang.code)}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
