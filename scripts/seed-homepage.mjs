import dotenv from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env.local") });

const OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const SPACE_ID = process.env.STORYBLOK_SPACE_ID;
const BASE_URL = `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`;

const headers = {
  Authorization: OAUTH_TOKEN,
  "Content-Type": "application/json",
};

async function apiCall(method, path, body) {
  const url = `${BASE_URL}${path}`;
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  if (!res.ok) {
    console.error(`  ERROR ${res.status}: ${JSON.stringify(data)}`);
    return null;
  }
  return data;
}

// ============================================================
// HOMEPAGE CONTENT
// ============================================================

const homepageContent = {
  component: "page",
  body: [
    // 1. Alert Banner
    {
      component: "alert_banner",
      message: "Tariff updates - support for Queensland businesses",
      link_text: "Learn more",
      link_url: "/news-and-events/tariffs",
      dismissible: true,
      _uid: "alert-banner-1",
    },

    // 2. Hero Section - QEC 2026
    {
      component: "hero_section",
      image: {
        id: 145161794013484,
        filename: "https://s3.amazonaws.com/a.storyblok.com/f/290527677944998/1080x439/c74ed2a265/qec-2026-logo.webp",
        alt: "Queensland Exporter Conference 2026",
      },
      headline:
        "If you're a Queensland business with ambitions beyond our borders, the Queensland Exporter Conference",
      highlight_text: "will define your next move.",
      cta_text: "REGISTER YOUR INTEREST",
      cta_url: "/exporterconference",
      background_image: {
        id: 144876318134874,
        filename: "https://s3.amazonaws.com/a.storyblok.com/f/290527677944998/188534/d49635ec8b/hero-qec-conference.jpg",
        alt: "Hero background",
      },
      background_theme: "dark",
      _uid: "hero-1",
    },

    // 3. Dual CTA Cards
    {
      component: "dual_cta_cards",
      cards: [
        {
          component: "cta_card",
          icon: {
            id: 144873747190350,
            filename: "https://s3.amazonaws.com/a.storyblok.com/f/290527677944998/1307/d03837d163/icon-qld.png",
            alt: "Queensland icon",
          },
          heading: "Investing in Queensland?",
          description:
            "Looking to invest in, buy from, migrate to or study in Queensland, Australia?",
          button_text: "Start Investing",
          button_url: "/invest",
          _uid: "cta-card-invest",
        },
        {
          component: "cta_card",
          icon: {
            id: 144873757508175,
            filename: "https://s3.amazonaws.com/a.storyblok.com/f/290527677944998/1061/7cb90eda41/icon-globe.png",
            alt: "Globe icon",
          },
          heading: "Exporting internationally?",
          description:
            "Want to learn more about exporting, expanding and taking your business global?",
          button_text: "Start Exporting",
          button_url: "/export",
          _uid: "cta-card-export",
        },
      ],
      _uid: "dual-cta-1",
    },

    // 4. What's Making News
    {
      component: "news_grid",
      heading: "What's making news",
      items: [
        {
          component: "news_item",
          title: "Home | Premier of Queensland's Export Awards",
          url: "/news-and-events/events/premier-of-qld-export-awards",
          label: "Events",
          image: {
            id: 144873653707334,
            filename: "https://s3.amazonaws.com/a.storyblok.com/f/290527677944998/467719/abf9c81e42/news-export-awards.jpg",
            alt: "Premier of Queensland's Export Awards",
          },
          _uid: "news-1",
        },
        {
          component: "news_item",
          title:
            "Queensland celebrates state's top exporters at Premier of Queensland's Export Awards 2025",
          url: "/news-and-events/news/export-awards-2025-winners",
          label: "News",
          image: {
            id: 144873664496199,
            filename: "https://s3.amazonaws.com/a.storyblok.com/f/290527677944998/1548756/047ac9601e/news-export-awards-2.png",
            alt: "Export Awards 2025",
          },
          _uid: "news-2",
        },
        {
          component: "news_item",
          title:
            "From Expo 88 to World Expo 2025: Queensland ready to shine in Osaka",
          url: "/news-and-events/news/from-expo-88-to-world-expo-2025-queensland-ready-to-shine-in-osaka",
          label: "News",
          image: {
            id: 144873674842696,
            filename: "https://s3.amazonaws.com/a.storyblok.com/f/290527677944998/1070712/3e33d78a64/news-expo-mascot.png",
            alt: "World Expo 2025 Osaka",
          },
          _uid: "news-3",
        },
      ],
      _uid: "news-grid-1",
    },

    // 5. Featured Card - QueensLand of Opportunity
    {
      component: "featured_card",
      image: {
        id: 144873686848073,
        filename: "https://s3.amazonaws.com/a.storyblok.com/f/290527677944998/155346/d34713f75f/queensland-opportunity.jpg",
        alt: "QueensLand of Opportunity",
      },
      headline:
        "Queensland unveils its first global business brand: QueensLand of Opportunity",
      cta_text: "LEARN MORE",
      cta_url: "https://www.queenslandofopportunity.com/",
      _uid: "featured-1",
    },

    // 6. Read More Grid
    {
      component: "read_more_grid",
      heading: "Read more",
      items: [
        {
          component: "read_more_item",
          title: "About Queensland",
          url: "/why-queensland/about-queensland",
          image: {
            id: 144873702412874,
            filename: "https://s3.amazonaws.com/a.storyblok.com/f/290527677944998/1425042/a75c2b8261/readmore-port.jpg",
            alt: "About Queensland",
          },
          _uid: "readmore-1",
        },
        {
          component: "read_more_item",
          title: "Investment opportunities",
          url: "/invest/industry-opportunities",
          image: {
            id: 144873716130379,
            filename: "https://s3.amazonaws.com/a.storyblok.com/f/290527677944998/10123/ad98275fb1/readmore-mining.png",
            alt: "Investment opportunities",
          },
          _uid: "readmore-2",
        },
        {
          component: "read_more_item",
          title: "Choose Queensland",
          url: "/invest/choose-queensland",
          image: {
            id: 144873726804556,
            filename: "https://s3.amazonaws.com/a.storyblok.com/f/290527677944998/9792/7c37528f4f/readmore-food.png",
            alt: "Choose Queensland",
          },
          _uid: "readmore-3",
        },
        {
          component: "read_more_item",
          title: "Market Profiles",
          url: "/export/market-profiles",
          image: {
            id: 144873736778317,
            filename: "https://s3.amazonaws.com/a.storyblok.com/f/290527677944998/1001787/1c0ed8d38f/readmore-brisbane.jpg",
            alt: "Market Profiles",
          },
          _uid: "readmore-4",
        },
      ],
      _uid: "readmore-grid-1",
    },

    // 7. Study in Queensland
    {
      component: "icon_text_card",
      icon: {
        id: 144873767936592,
        filename: "https://s3.amazonaws.com/a.storyblok.com/f/290527677944998/1485/712c3f3d40/icon-education.png",
        alt: "Education icon",
      },
      heading: "Study in Queensland",
      description:
        "Queensland is a place that nurtures talent, builds innovation and launches global careers. When you start studying in Queensland, you can go anywhere.",
      link_text: "Learn More",
      link_url: "https://www.studyqueensland.qld.gov.au/",
      _uid: "icon-study",
    },

    // 8. Migrate to Queensland
    {
      component: "icon_text_card",
      icon: {
        id: 144873777779281,
        filename: "https://s3.amazonaws.com/a.storyblok.com/f/290527677944998/2154/94fc1bb0b6/icon-migrate.png",
        alt: "Migrate icon",
      },
      heading: "Migrate to Queensland",
      description:
        "Queensland is a progressive, multicultural place where entrepreneurship is celebrated and stability is a way of life. Discover what Queensland has to offer.",
      link_text: "Learn More",
      link_url: "https://www.migration.qld.gov.au/",
      _uid: "icon-migrate",
    },

    // 9. Talk to a Specialist CTA
    {
      component: "cta_section",
      heading: "Talk to a specialist",
      description:
        "Let's work together to create your Queensland success story. Connect with our team of global advisors and sector specialists today and discover what Queensland has to offer.",
      button_text: "Get in touch",
      button_url: "/contact",
      _uid: "cta-specialist",
    },
  ],
};

// ============================================================
// MAIN
// ============================================================

async function main() {
  console.log("=== TIQ Homepage Content Seeding ===\n");

  // 1. Find existing home story
  console.log("1. Looking for existing home story...");
  const storiesData = await apiCall("GET", "/stories?with_slug=home");

  if (!storiesData || !storiesData.stories) {
    console.error("Failed to fetch stories");
    return;
  }

  const homeStory = storiesData.stories.find((s) => s.slug === "home");

  if (homeStory) {
    console.log(`   Found home story (ID: ${homeStory.id}). Updating...`);

    const result = await apiCall("PUT", `/stories/${homeStory.id}`, {
      story: {
        name: "Home",
        slug: "home",
        content: homepageContent,
      },
      publish: 1,
    });

    if (result) {
      console.log("   Home story updated and published!");
    }
  } else {
    console.log("   No home story found. Creating...");

    const result = await apiCall("POST", "/stories", {
      story: {
        name: "Home",
        slug: "home",
        content: homepageContent,
        parent_id: 0,
      },
      publish: 1,
    });

    if (result) {
      console.log(`   Home story created (ID: ${result.story.id}) and published!`);
    }
  }

  console.log("\n=== Homepage seeding complete! ===");
}

main().catch(console.error);
