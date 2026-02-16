"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react";

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

const components = {
  page: Page,
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
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: "eu",
  },
  components,
});

export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
