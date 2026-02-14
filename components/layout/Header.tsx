"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, Menu, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
        setLangOpen(false);
        setSearchOpen(false);
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
    <header ref={headerRef} className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/tiq-logo-black.png"
              alt="Trade and Investment Queensland"
              width={180}
              height={60}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
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
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
                    activeDropdown === item.label
                      ? "text-navy"
                      : "text-gray-800 hover:text-navy"
                  )}
                >
                  {item.label}
                  {item.items.length > 0 && (
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform",
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
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-navy transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side: Language + Search + Mobile toggle */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => {
                  setLangOpen(!langOpen);
                  setSearchOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-700 hover:text-navy transition-colors"
                aria-label="Select language"
              >
                <Globe size={18} />
                <span className="text-xs font-medium">EN</span>
                <ChevronDown size={12} />
              </button>

              {langOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 shadow-lg py-2 max-h-80 overflow-y-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-navy transition-colors"
                      onClick={() => setLangOpen(false)}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search */}
            <button
              onClick={() => {
                setSearchOpen(!searchOpen);
                setLangOpen(false);
              }}
              className="p-2 text-gray-700 hover:text-navy transition-colors"
              aria-label="Search"
            >
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-navy transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar (Expandable) */}
        {searchOpen && (
          <div className="border-t border-gray-200 py-4">
            <div className="flex items-center gap-3">
              <Search size={20} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search tiq.qld.gov.au"
                className="w-full bg-transparent text-lg outline-none placeholder:text-gray-400"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-gray-400 hover:text-navy"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
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
                        className="block py-2 text-sm text-gray-600 hover:text-navy"
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
                {languages.slice(0, 6).map((lang) => (
                  <button
                    key={lang.code}
                    className="px-3 py-1.5 text-xs border border-gray-200 rounded hover:bg-gray-50"
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
