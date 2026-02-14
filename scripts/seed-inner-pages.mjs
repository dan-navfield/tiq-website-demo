import dotenv from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env.local") });

const OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN;
const SPACE_ID = process.env.STORYBLOK_SPACE_ID;
const BASE_URL = `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`;
const headers = { Authorization: OAUTH_TOKEN, "Content-Type": "application/json" };

async function api(method, path, body) {
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE_URL}${path}`, opts);
  const data = await res.json().catch(() => null);
  if (!res.ok) { console.error(`  ERROR ${res.status}:`, JSON.stringify(data).substring(0, 200)); return null; }
  return data;
}

async function createOrUpdateStory(slug, name, content, parentId = 0) {
  // Check if story exists
  const existing = await api("GET", `/stories?with_slug=${slug}`);
  const story = existing?.stories?.find(s => s.slug === slug);

  if (story) {
    console.log(`  Updating: ${name} (${slug})`);
    return await api("PUT", `/stories/${story.id}`, {
      story: { name, slug, content },
      publish: 1,
    });
  } else {
    console.log(`  Creating: ${name} (${slug})`);
    return await api("POST", "/stories", {
      story: { name, slug, content, parent_id: parentId },
      publish: 1,
    });
  }
}

async function createFolder(name, slug, parentId = 0) {
  const existing = await api("GET", `/stories?with_slug=${slug}`);
  const folder = existing?.stories?.find(s => s.slug === slug && s.is_folder);
  if (folder) {
    console.log(`  Folder exists: ${slug} (ID: ${folder.id})`);
    return folder.id;
  }

  console.log(`  Creating folder: ${slug}`);
  const result = await api("POST", "/stories", {
    story: { name, slug, parent_id: parentId, is_folder: true, default_root: "page" },
  });
  return result?.story?.id;
}

// ============================================================
// PAGE CONTENT DEFINITIONS
// ============================================================

const pages = {
  "why-queensland": {
    name: "Why Queensland",
    slug: "why-queensland",
    isFolder: true,
  },

  "about-queensland": {
    name: "About Queensland",
    slug: "about-queensland",
    parent: "why-queensland",
    content: {
      component: "page",
      body: [
        {
          component: "page_hero",
          heading: "About Queensland",
          subheading: "Queensland is Australia's second largest state, with an economy worth more than $430 billion. It is home to diverse industries, world-class infrastructure and a highly skilled workforce.",
          background: "dark",
          _uid: "hero-aq",
        },
        {
          component: "text_section",
          heading: "A diverse and dynamic economy",
          body: "Queensland's economy is one of the most diverse in Australia, with major strengths across resources and energy, agriculture and food, advanced manufacturing, defence and aerospace, and the knowledge-intensive services sector.\n\nThe state offers a strategic gateway to Asia-Pacific markets, with a time zone advantage and world-class transport infrastructure including major international airports and deep-water ports.",
          background: "white",
          _uid: "text-aq-1",
        },
        {
          component: "card_grid",
          heading: "Key industries",
          columns: "4",
          background: "neutral",
          cards: [
            { component: "content_card", heading: "Advanced Manufacturing", description: "Queensland is a hub for advanced manufacturing, from aerospace to biomedical devices.", url: "/invest/industry-opportunities", _uid: "card-am" },
            { component: "content_card", heading: "Aerospace & Defence", description: "Home to Australia's largest defence footprint and growing aerospace sector.", url: "/invest/industry-opportunities", _uid: "card-ad" },
            { component: "content_card", heading: "Agriculture & Food", description: "One of the world's premier food bowls, exporting to over 140 countries.", url: "/invest/industry-opportunities", _uid: "card-af" },
            { component: "content_card", heading: "Mining & Resources", description: "A global leader in mining with significant reserves of coal, gas and critical minerals.", url: "/invest/industry-opportunities", _uid: "card-mr" },
            { component: "content_card", heading: "Digital & Games", description: "A thriving digital economy with strengths in gaming, fintech and cybersecurity.", url: "/invest/industry-opportunities", _uid: "card-dg" },
            { component: "content_card", heading: "Film & Screen", description: "World-class studios and stunning locations attracting global productions.", url: "/invest/industry-opportunities", _uid: "card-fs" },
            { component: "content_card", heading: "Infrastructure", description: "Major infrastructure investment supporting growth and connectivity.", url: "/invest/industry-opportunities", _uid: "card-in" },
            { component: "content_card", heading: "Renewable Energy", description: "Leading Australia's energy transformation with significant solar, wind and hydrogen potential.", url: "/invest/industry-opportunities", _uid: "card-re" },
          ],
          _uid: "grid-industries",
        },
        {
          component: "cta_section",
          heading: "Talk to a specialist",
          description: "Our specialists can help you find the right opportunities in Queensland.",
          button_text: "Get in touch",
          button_url: "/contact",
          _uid: "cta-aq",
        },
      ],
    },
  },

  invest: {
    name: "Invest",
    slug: "invest",
    content: {
      component: "page",
      body: [
        {
          component: "page_hero",
          heading: "Invest in Queensland",
          subheading: "Queensland offers unparalleled investment opportunities across diverse industries, backed by a stable economy, skilled workforce and strategic location.",
          background: "dark",
          cta_text: "Talk to a specialist",
          cta_url: "/contact",
          _uid: "hero-invest",
        },
        {
          component: "text_section",
          heading: "Why invest in Queensland?",
          body: "Queensland is Australia's fastest-growing state, with a $430 billion economy and a population of over 5.3 million. With proximity to Asia-Pacific markets, world-class infrastructure and a business-friendly environment, Queensland is the ideal destination for international investment.\n\nOur team of investment specialists can connect you with the right people, intelligence and support to make your investment a success.",
          background: "white",
          _uid: "text-invest-1",
        },
        {
          component: "stats_grid",
          heading: "Queensland at a glance",
          background: "navy",
          items: [
            { component: "stat_item", number: "$430B+", label: "Gross State Product", _uid: "stat-1" },
            { component: "stat_item", number: "5.3M", label: "Population", _uid: "stat-2" },
            { component: "stat_item", number: "#1", label: "Fastest growing Australian state", _uid: "stat-3" },
            { component: "stat_item", number: "200+", label: "Export markets globally", _uid: "stat-4" },
          ],
          _uid: "stats-invest",
        },
        {
          component: "card_grid",
          heading: "Investment opportunities",
          columns: "3",
          background: "white",
          cards: [
            { component: "content_card", heading: "Industry Opportunities", description: "Explore key sectors where Queensland offers competitive advantages for investors.", url: "/invest/industry-opportunities", _uid: "ic-1" },
            { component: "content_card", heading: "Choose Queensland", description: "Discover why Queensland is the destination of choice for international business.", url: "/invest/choose-queensland", _uid: "ic-2" },
            { component: "content_card", heading: "Investor Success Stories", description: "Read about businesses that have successfully invested in Queensland.", url: "/invest/investor-success-stories", _uid: "ic-3" },
          ],
          _uid: "grid-invest",
        },
        {
          component: "cta_section",
          heading: "Ready to invest?",
          description: "Let's work together to create your Queensland success story. Talk to one of our investment specialists.",
          button_text: "Book a free consult",
          button_url: "/contact",
          _uid: "cta-invest",
        },
      ],
    },
  },

  export: {
    name: "Export",
    slug: "export",
    content: {
      component: "page",
      body: [
        {
          component: "page_hero",
          heading: "Export from Queensland",
          subheading: "Whether you're a new or experienced exporter, we can help you take your Queensland business to the world.",
          background: "dark",
          cta_text: "Book a free consultation",
          cta_url: "/contact",
          _uid: "hero-export",
        },
        {
          component: "text_section",
          heading: "Your passport to export success",
          body: "Trade and Investment Queensland provides free, confidential export assistance to help Queensland businesses enter and expand in international markets.\n\nOur global network of trade commissioners and market specialists can help you identify opportunities, navigate regulations and connect with buyers and partners worldwide.",
          background: "white",
          _uid: "text-export-1",
        },
        {
          component: "card_grid",
          heading: "How we can help",
          columns: "3",
          background: "neutral",
          cards: [
            { component: "content_card", heading: "Market Finder", description: "Use our Market Finder tool to identify the best international markets for your products or services.", url: "/export/marketfinder", _uid: "ec-1" },
            { component: "content_card", heading: "Grants & Assistance", description: "Access funding and support programs to help you enter or expand in international markets.", url: "/export/grants", _uid: "ec-2" },
            { component: "content_card", heading: "Market Profiles", description: "Detailed market intelligence covering regulations, opportunities and business culture.", url: "/export/market-profiles", _uid: "ec-3" },
          ],
          _uid: "grid-export",
        },
        {
          component: "accordion",
          heading: "Frequently asked questions",
          items: [
            { component: "accordion_item", question: "How can TIQ help my business export?", answer: "TIQ provides free, confidential export assistance including market research, introductions to buyers and distributors, in-market support through our global network, and access to trade missions and events.", _uid: "faq-1" },
            { component: "accordion_item", question: "Is there a cost for TIQ's export services?", answer: "No. TIQ's core export advisory services are free and confidential. Some programs may have eligibility criteria, but the initial consultation and advice is always at no cost.", _uid: "faq-2" },
            { component: "accordion_item", question: "What markets does TIQ cover?", answer: "TIQ has a network of trade commissioners and representatives across Asia, the Americas, Europe, the Middle East and India. We can provide market intelligence and support for virtually any export destination.", _uid: "faq-3" },
            { component: "accordion_item", question: "How do I get started?", answer: "The best first step is to book a free consultation with one of our export advisors. They will assess your export readiness and help you develop a market entry strategy.", _uid: "faq-4" },
            { component: "accordion_item", question: "What grants are available for exporters?", answer: "TIQ offers several grant programs including the Market Accelerator Program. We also help businesses access Commonwealth programs like the Export Market Development Grant (EMDG).", _uid: "faq-5" },
          ],
          _uid: "faq-export",
        },
        {
          component: "cta_section",
          heading: "Start a conversation today",
          description: "Whether you're a first-time exporter or looking to expand into new markets, our team is ready to help.",
          button_text: "Book a free consultation",
          button_url: "/contact",
          _uid: "cta-export",
        },
      ],
    },
  },

  "news-and-events": {
    name: "News and events",
    slug: "news-and-events",
    content: {
      component: "page",
      body: [
        {
          component: "page_hero",
          heading: "Insights, news and events",
          subheading: "Stay up to date with the latest trade and investment news, upcoming events and success stories from Queensland businesses.",
          background: "light",
          _uid: "hero-news",
        },
        {
          component: "card_grid",
          heading: "Explore",
          columns: "4",
          background: "white",
          cards: [
            { component: "content_card", heading: "Events", description: "Find upcoming trade events, missions and networking opportunities.", url: "/news-and-events/events", _uid: "nc-1" },
            { component: "content_card", heading: "Tariff Updates", description: "The latest information on tariffs and their impact on Queensland businesses.", url: "/news-and-events/tariffs", _uid: "nc-2" },
            { component: "content_card", heading: "News", description: "Latest news from Trade and Investment Queensland.", url: "/news-and-events/news", _uid: "nc-3" },
            { component: "content_card", heading: "Success Stories", description: "Read about Queensland businesses making their mark internationally.", url: "/news-and-events/success-stories", _uid: "nc-4" },
          ],
          _uid: "grid-news",
        },
        {
          component: "cta_section",
          heading: "Getting started",
          description: "Whether you're looking to invest in Queensland or take your business global, we can help. Contact our team for a free, confidential consultation.",
          button_text: "Get in touch",
          button_url: "/contact",
          _uid: "cta-news",
        },
      ],
    },
  },

  about: {
    name: "About",
    slug: "about",
    content: {
      component: "page",
      body: [
        {
          component: "page_hero",
          heading: "About Trade and Investment Queensland",
          subheading: "Trade and Investment Queensland is the Queensland Government's dedicated global business agency, helping businesses trade, invest and grow.",
          background: "dark",
          _uid: "hero-about",
        },
        {
          component: "text_section",
          heading: "What we do",
          body: "Trade and Investment Queensland (TIQ) connects Queensland businesses with international markets and helps international investors find opportunities in our state.\n\nWe provide specialist trade and investment advisory services, market intelligence and in-market support through our global network of offices spanning Asia, Europe, the Americas, the Middle East and India.\n\nOur mission is to grow Queensland's economy by facilitating trade, attracting investment and promoting the state as a world-class business destination.",
          background: "white",
          _uid: "text-about-1",
        },
        {
          component: "card_grid",
          heading: "How we help",
          columns: "3",
          background: "neutral",
          cards: [
            { component: "content_card", heading: "Export Services", description: "Free, confidential export assistance to help Queensland businesses enter and grow in international markets.", url: "/export", _uid: "ac-1" },
            { component: "content_card", heading: "Investment Attraction", description: "Specialist support to help international businesses invest and establish operations in Queensland.", url: "/invest", _uid: "ac-2" },
            { component: "content_card", heading: "Global Network", description: "A network of trade and investment commissioners across key markets worldwide.", url: "/about/global-network", _uid: "ac-3" },
          ],
          _uid: "grid-about",
        },
        {
          component: "link_list",
          heading: "Learn more about TIQ",
          background: "white",
          links: [
            { component: "link_item", label: "Our Global Network", url: "/about/global-network", _uid: "ll-1" },
            { component: "link_item", label: "Regional Advisors", url: "/about/regional-advisors", _uid: "ll-2" },
            { component: "link_item", label: "Publications", url: "/about/strategies-publications-policies", _uid: "ll-3" },
            { component: "link_item", label: "Board", url: "/about/board", _uid: "ll-4" },
            { component: "link_item", label: "Management", url: "/about/management", _uid: "ll-5" },
            { component: "link_item", label: "Careers", url: "/about/careers", _uid: "ll-6" },
          ],
          _uid: "links-about",
        },
        {
          component: "cta_section",
          heading: "Talk to a specialist",
          description: "Our team is ready to help you with investing, exporting or finding the right opportunities in Queensland.",
          button_text: "Get in touch",
          button_url: "/contact",
          _uid: "cta-about",
        },
      ],
    },
  },

  contact: {
    name: "Contact",
    slug: "contact",
    content: {
      component: "page",
      body: [
        {
          component: "page_hero",
          heading: "Contact us",
          subheading: "Get in touch with our team for enquiries about investing, exporting, studying or migrating to Queensland.",
          background: "light",
          _uid: "hero-contact",
        },
        {
          component: "contact_section",
          heading: "Brisbane Head Office",
          description: "Our head office is located in Brisbane, Queensland. Contact us for general enquiries or to speak with one of our specialists.",
          address: "Level 10, 1 William Street\nBrisbane QLD 4000\nAustralia",
          phone: "+61 7 3514 3147",
          email: "info@tiq.qld.gov.au",
          cta_text: "View all offices",
          cta_url: "/contact/our-offices",
          _uid: "contact-hq",
        },
        {
          component: "card_grid",
          heading: "How can we help?",
          columns: "3",
          background: "neutral",
          cards: [
            { component: "content_card", heading: "Investing in Queensland", description: "Talk to our investment team about opportunities in Queensland.", url: "/invest", _uid: "cc-1" },
            { component: "content_card", heading: "Exporting from Queensland", description: "Get free, confidential export advice from our trade specialists.", url: "/export", _uid: "cc-2" },
            { component: "content_card", heading: "Study in Queensland", description: "Find out about studying in Queensland's world-class institutions.", url: "https://www.studyqueensland.qld.gov.au/", _uid: "cc-3" },
          ],
          _uid: "grid-contact",
        },
      ],
    },
  },
};

// ============================================================
// MAIN
// ============================================================

async function main() {
  console.log("=== Seeding Inner Pages ===\n");

  // Create folders first
  const folders = {};
  for (const [key, page] of Object.entries(pages)) {
    if (page.isFolder) {
      folders[key] = await createFolder(page.name, page.slug);
    }
  }

  // Create content pages
  for (const [key, page] of Object.entries(pages)) {
    if (page.isFolder) continue;

    const parentId = page.parent ? folders[page.parent] || 0 : 0;
    await createOrUpdateStory(page.slug, page.name, page.content, parentId);
  }

  console.log("\n=== Inner pages seeded! ===");
}

main().catch(console.error);
