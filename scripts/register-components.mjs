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

// Get existing components
async function getExistingComponents() {
  const data = await apiCall("GET", "/components");
  if (!data) return {};
  const map = {};
  for (const c of data.components) {
    map[c.name] = c;
  }
  return map;
}

// Create or update a component
async function upsertComponent(existing, component) {
  const name = component.name;
  if (existing[name]) {
    console.log(`  Updating: ${name}`);
    const result = await apiCall("PUT", `/components/${existing[name].id}`, {
      component,
    });
    return result?.component;
  } else {
    console.log(`  Creating: ${name}`);
    const result = await apiCall("POST", "/components", { component });
    return result?.component;
  }
}

// ============================================================
// COMPONENT DEFINITIONS
// ============================================================

const components = [
  // Page (root content type) - update existing
  {
    name: "page",
    display_name: "Page",
    is_root: true,
    is_nestable: false,
    schema: {
      body: {
        type: "bloks",
        display_name: "Body",
        restrict_type: "",
        restrict_components: false,
      },
    },
  },

  // Alert Banner
  {
    name: "alert_banner",
    display_name: "Alert Banner",
    is_nestable: true,
    is_root: false,
    schema: {
      message: {
        type: "text",
        display_name: "Message",
      },
      link_text: {
        type: "text",
        display_name: "Link Text",
      },
      link_url: {
        type: "text",
        display_name: "Link URL",
      },
      dismissible: {
        type: "boolean",
        display_name: "Dismissible",
        default_value: "1",
      },
    },
  },

  // Hero Section
  {
    name: "hero_section",
    display_name: "Hero Section",
    is_nestable: true,
    is_root: false,
    schema: {
      image: {
        type: "asset",
        display_name: "Image / Logo",
        filetypes: ["images"],
      },
      headline: {
        type: "textarea",
        display_name: "Headline",
      },
      highlight_text: {
        type: "text",
        display_name: "Highlight Text (Aqua Italic)",
      },
      cta_text: {
        type: "text",
        display_name: "CTA Button Text",
      },
      cta_url: {
        type: "text",
        display_name: "CTA Button URL",
      },
      background_image: {
        type: "asset",
        display_name: "Background Image",
        filetypes: ["images"],
      },
      background_theme: {
        type: "option",
        display_name: "Background Theme",
        options: [
          { name: "Dark (Navy)", value: "dark" },
          { name: "Light (Neutral)", value: "light" },
          { name: "White", value: "white" },
        ],
        default_value: "dark",
      },
    },
  },

  // Dual CTA Cards (wrapper)
  {
    name: "dual_cta_cards",
    display_name: "Dual CTA Cards",
    is_nestable: true,
    is_root: false,
    schema: {
      cards: {
        type: "bloks",
        display_name: "Cards",
        restrict_type: "groups",
        restrict_components: true,
        component_whitelist: ["cta_card"],
        maximum: 2,
      },
    },
  },

  // CTA Card (nestable inside dual_cta_cards)
  {
    name: "cta_card",
    display_name: "CTA Card",
    is_nestable: true,
    is_root: false,
    schema: {
      icon: {
        type: "asset",
        display_name: "Icon",
        filetypes: ["images"],
      },
      heading: {
        type: "text",
        display_name: "Heading",
      },
      description: {
        type: "textarea",
        display_name: "Description",
      },
      button_text: {
        type: "text",
        display_name: "Button Text",
      },
      button_url: {
        type: "text",
        display_name: "Button URL",
      },
    },
  },

  // News Grid
  {
    name: "news_grid",
    display_name: "News Grid",
    is_nestable: true,
    is_root: false,
    schema: {
      heading: {
        type: "text",
        display_name: "Heading",
      },
      items: {
        type: "bloks",
        display_name: "News Items",
        restrict_type: "groups",
        restrict_components: true,
        component_whitelist: ["news_item"],
      },
    },
  },

  // News Item
  {
    name: "news_item",
    display_name: "News Item",
    is_nestable: true,
    is_root: false,
    schema: {
      title: {
        type: "text",
        display_name: "Title",
      },
      url: {
        type: "text",
        display_name: "URL",
      },
      image: {
        type: "asset",
        display_name: "Thumbnail Image",
        filetypes: ["images"],
      },
      label: {
        type: "text",
        display_name: "Label / Category",
      },
    },
  },

  // Featured Card
  {
    name: "featured_card",
    display_name: "Featured Card",
    is_nestable: true,
    is_root: false,
    schema: {
      image: {
        type: "asset",
        display_name: "Image",
        filetypes: ["images"],
      },
      headline: {
        type: "text",
        display_name: "Headline",
      },
      cta_text: {
        type: "text",
        display_name: "CTA Text",
      },
      cta_url: {
        type: "text",
        display_name: "CTA URL",
      },
    },
  },

  // Read More Grid
  {
    name: "read_more_grid",
    display_name: "Read More Grid",
    is_nestable: true,
    is_root: false,
    schema: {
      heading: {
        type: "text",
        display_name: "Heading",
      },
      items: {
        type: "bloks",
        display_name: "Items",
        restrict_type: "groups",
        restrict_components: true,
        component_whitelist: ["read_more_item"],
      },
    },
  },

  // Read More Item
  {
    name: "read_more_item",
    display_name: "Read More Item",
    is_nestable: true,
    is_root: false,
    schema: {
      title: {
        type: "text",
        display_name: "Title",
      },
      url: {
        type: "text",
        display_name: "URL",
      },
      image: {
        type: "asset",
        display_name: "Image",
        filetypes: ["images"],
      },
    },
  },

  // Icon Text Card
  {
    name: "icon_text_card",
    display_name: "Icon + Text Card",
    is_nestable: true,
    is_root: false,
    schema: {
      icon: {
        type: "asset",
        display_name: "Icon",
        filetypes: ["images"],
      },
      heading: {
        type: "text",
        display_name: "Heading",
      },
      description: {
        type: "textarea",
        display_name: "Description",
      },
      link_text: {
        type: "text",
        display_name: "Link Text",
      },
      link_url: {
        type: "text",
        display_name: "Link URL",
      },
      background: {
        type: "option",
        display_name: "Background",
        options: [
          { name: "White (Default)", value: "white" },
          { name: "Navy", value: "navy" },
          { name: "Aqua", value: "aqua" },
        ],
        default_value: "white",
      },
    },
  },

  // CTA Section
  {
    name: "cta_section",
    display_name: "CTA Section",
    is_nestable: true,
    is_root: false,
    schema: {
      heading: {
        type: "text",
        display_name: "Heading",
      },
      description: {
        type: "textarea",
        display_name: "Description",
      },
      button_text: {
        type: "text",
        display_name: "Button Text",
      },
      button_url: {
        type: "text",
        display_name: "Button URL",
      },
    },
  },
];

// ============================================================
// MAIN
// ============================================================

async function main() {
  console.log("=== TIQ Storyblok Component Registration ===\n");
  console.log(`Space ID: ${SPACE_ID}`);
  console.log(`API URL:  ${BASE_URL}\n`);

  // 1. Get existing components
  console.log("1. Fetching existing components...");
  const existing = await getExistingComponents();
  console.log(`   Found: ${Object.keys(existing).join(", ")}\n`);

  // 2. Register/update all components
  console.log("2. Registering components...");
  for (const comp of components) {
    await upsertComponent(existing, comp);
  }

  console.log("\n=== Component registration complete! ===\n");
}

main().catch(console.error);
