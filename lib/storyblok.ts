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
import { storyblokInit, apiPlugin } from "@storyblok/react";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: "eu",
  },
  components: {
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
  },
});
