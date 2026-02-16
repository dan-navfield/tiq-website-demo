import Page from "@/components/Page";
import AlertBanner from "@/components/blocks/AlertBanner";
import HeroSection from "@/components/blocks/HeroSection";
import DualCtaCards from "@/components/blocks/DualCtaCards";
import CtaCard from "@/components/blocks/CtaCard";
import NewsGrid from "@/components/blocks/NewsGrid";
import NewsItem from "@/components/blocks/NewsItem";
import FeaturedCard from "@/components/blocks/FeaturedCard";
import ReadMoreGrid from "@/components/blocks/ReadMoreGrid";
import ReadMoreItem from "@/components/blocks/ReadMoreItem";
import IconTextCard from "@/components/blocks/IconTextCard";
import CtaSection from "@/components/blocks/CtaSection";
import Breadcrumb from "@/components/blocks/Breadcrumb";
import BreadcrumbItem from "@/components/blocks/BreadcrumbItem";
import PageHero from "@/components/blocks/PageHero";
import TextSection from "@/components/blocks/TextSection";
import CardGrid from "@/components/blocks/CardGrid";
import ContentCard from "@/components/blocks/ContentCard";
import StatsGrid from "@/components/blocks/StatsGrid";
import StatItem from "@/components/blocks/StatItem";
import TwoColumnContent from "@/components/blocks/TwoColumnContent";
import Accordion from "@/components/blocks/Accordion";
import AccordionItem from "@/components/blocks/AccordionItem";
import TestimonialBlock from "@/components/blocks/TestimonialBlock";
import ContactSection from "@/components/blocks/ContactSection";
import LinkList from "@/components/blocks/LinkList";
import VideoEmbed from "@/components/blocks/VideoEmbed";
import { storyblokInit, apiPlugin } from "@storyblok/react";

const STORYBLOK_API_BASE = "https://api.storyblok.com/v2";

export const SUPPORTED_LANGUAGES = [
  "ar", "de", "es", "fr", "hi", "id", "ja", "ko", "pt", "si", "th", "vi",
  "zh-Hans", "zh-Hant",
];

export async function fetchStory(slug: string, language?: string) {
  const token = process.env.STORYBLOK_TOKEN;
  let apiUrl = `${STORYBLOK_API_BASE}/cdn/stories/${slug}?version=draft&token=${token}`;
  if (language) {
    apiUrl += `&language=${language}`;
  }
  const res = await fetch(apiUrl, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Storyblok API error: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data.story;
}

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: "eu",
  },
  components: {
    // Core
    page: Page,
    // Homepage blocks
    alert_banner: AlertBanner,
    hero_section: HeroSection,
    dual_cta_cards: DualCtaCards,
    cta_card: CtaCard,
    news_grid: NewsGrid,
    news_item: NewsItem,
    featured_card: FeaturedCard,
    read_more_grid: ReadMoreGrid,
    read_more_item: ReadMoreItem,
    icon_text_card: IconTextCard,
    cta_section: CtaSection,
    // Inner page blocks
    breadcrumb: Breadcrumb,
    breadcrumb_item: BreadcrumbItem,
    page_hero: PageHero,
    text_section: TextSection,
    card_grid: CardGrid,
    content_card: ContentCard,
    stats_grid: StatsGrid,
    stat_item: StatItem,
    two_column_content: TwoColumnContent,
    accordion: Accordion,
    accordion_item: AccordionItem,
    testimonial_block: TestimonialBlock,
    contact_section: ContactSection,
    link_list: LinkList,
    video_embed: VideoEmbed,
  },
});
