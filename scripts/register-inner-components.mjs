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
  if (!res.ok) { console.error(`  ERROR ${res.status} on ${path}:`, data); return null; }
  return data;
}

async function getExisting() {
  const data = await api("GET", "/components");
  const map = {};
  for (const c of data.components) map[c.name] = c;
  return map;
}

async function upsert(existing, comp) {
  if (existing[comp.name]) {
    console.log(`  Updating: ${comp.name}`);
    return await api("PUT", `/components/${existing[comp.name].id}`, { component: comp });
  } else {
    console.log(`  Creating: ${comp.name}`);
    return await api("POST", "/components", { component: comp });
  }
}

const components = [
  {
    name: "breadcrumb",
    display_name: "Breadcrumb",
    is_nestable: true,
    is_root: false,
    schema: {
      items: { type: "bloks", display_name: "Breadcrumb Items", restrict_components: true, component_whitelist: ["breadcrumb_item"] },
    },
  },
  {
    name: "breadcrumb_item",
    display_name: "Breadcrumb Item",
    is_nestable: true,
    is_root: false,
    schema: {
      label: { type: "text", display_name: "Label" },
      url: { type: "text", display_name: "URL" },
    },
  },
  {
    name: "page_hero",
    display_name: "Page Hero",
    is_nestable: true,
    is_root: false,
    schema: {
      eyebrow: { type: "text", display_name: "Eyebrow Text" },
      heading: { type: "text", display_name: "Heading" },
      subheading: { type: "textarea", display_name: "Subheading" },
      image: { type: "asset", display_name: "Background Image", filetypes: ["images"] },
      background: { type: "option", display_name: "Background", options: [{ name: "Dark", value: "dark" }, { name: "Light", value: "light" }], default_value: "light" },
      cta_text: { type: "text", display_name: "CTA Text" },
      cta_url: { type: "text", display_name: "CTA URL" },
      cta_secondary_text: { type: "text", display_name: "Secondary CTA Text" },
      cta_secondary_url: { type: "text", display_name: "Secondary CTA URL" },
    },
  },
  {
    name: "text_section",
    display_name: "Text Section",
    is_nestable: true,
    is_root: false,
    schema: {
      heading: { type: "text", display_name: "Heading" },
      body: { type: "textarea", display_name: "Body Text" },
      centered: { type: "boolean", display_name: "Center Aligned" },
      background: { type: "option", display_name: "Background", options: [{ name: "White", value: "white" }, { name: "Neutral", value: "neutral" }] },
      cta_text: { type: "text", display_name: "CTA Text" },
      cta_url: { type: "text", display_name: "CTA URL" },
    },
  },
  {
    name: "card_grid",
    display_name: "Card Grid",
    is_nestable: true,
    is_root: false,
    schema: {
      heading: { type: "text", display_name: "Heading" },
      description: { type: "textarea", display_name: "Description" },
      columns: { type: "option", display_name: "Columns", options: [{ name: "2", value: "2" }, { name: "3", value: "3" }, { name: "4", value: "4" }], default_value: "3" },
      background: { type: "option", display_name: "Background", options: [{ name: "White", value: "white" }, { name: "Neutral", value: "neutral" }] },
      cards: { type: "bloks", display_name: "Cards", restrict_components: true, component_whitelist: ["content_card"] },
    },
  },
  {
    name: "content_card",
    display_name: "Content Card",
    is_nestable: true,
    is_root: false,
    schema: {
      image: { type: "asset", display_name: "Image", filetypes: ["images"] },
      label: { type: "text", display_name: "Label" },
      heading: { type: "text", display_name: "Heading" },
      description: { type: "textarea", display_name: "Description" },
      url: { type: "text", display_name: "URL" },
    },
  },
  {
    name: "stats_grid",
    display_name: "Stats Grid",
    is_nestable: true,
    is_root: false,
    schema: {
      heading: { type: "text", display_name: "Heading" },
      background: { type: "option", display_name: "Background", options: [{ name: "Neutral", value: "neutral" }, { name: "Navy", value: "navy" }], default_value: "neutral" },
      items: { type: "bloks", display_name: "Stat Items", restrict_components: true, component_whitelist: ["stat_item"] },
    },
  },
  {
    name: "stat_item",
    display_name: "Stat Item",
    is_nestable: true,
    is_root: false,
    schema: {
      number: { type: "text", display_name: "Number / Value" },
      label: { type: "text", display_name: "Label" },
    },
  },
  {
    name: "two_column_content",
    display_name: "Two Column Content",
    is_nestable: true,
    is_root: false,
    schema: {
      eyebrow: { type: "text", display_name: "Eyebrow" },
      heading: { type: "text", display_name: "Heading" },
      body: { type: "textarea", display_name: "Body Text" },
      image: { type: "asset", display_name: "Image", filetypes: ["images"] },
      layout: { type: "option", display_name: "Layout", options: [{ name: "Image Left", value: "image_left" }, { name: "Image Right", value: "image_right" }], default_value: "image_left" },
      background: { type: "option", display_name: "Background", options: [{ name: "White", value: "white" }, { name: "Neutral", value: "neutral" }] },
      cta_text: { type: "text", display_name: "CTA Text" },
      cta_url: { type: "text", display_name: "CTA URL" },
    },
  },
  {
    name: "accordion",
    display_name: "FAQ Accordion",
    is_nestable: true,
    is_root: false,
    schema: {
      heading: { type: "text", display_name: "Heading" },
      items: { type: "bloks", display_name: "FAQ Items", restrict_components: true, component_whitelist: ["accordion_item"] },
    },
  },
  {
    name: "accordion_item",
    display_name: "Accordion Item",
    is_nestable: true,
    is_root: false,
    schema: {
      question: { type: "text", display_name: "Question" },
      answer: { type: "textarea", display_name: "Answer" },
    },
  },
  {
    name: "testimonial_block",
    display_name: "Testimonials",
    is_nestable: true,
    is_root: false,
    schema: {
      heading: { type: "text", display_name: "Heading" },
      background: { type: "option", display_name: "Background", options: [{ name: "Neutral", value: "neutral" }, { name: "Navy", value: "navy" }] },
      testimonials: { type: "bloks", display_name: "Testimonials", restrict_components: true, component_whitelist: ["testimonial_item"] },
    },
  },
  {
    name: "testimonial_item",
    display_name: "Testimonial Item",
    is_nestable: true,
    is_root: false,
    schema: {
      quote: { type: "textarea", display_name: "Quote" },
      name: { type: "text", display_name: "Person Name" },
      company: { type: "text", display_name: "Company" },
      logo: { type: "asset", display_name: "Company Logo", filetypes: ["images"] },
    },
  },
  {
    name: "contact_section",
    display_name: "Contact Section",
    is_nestable: true,
    is_root: false,
    schema: {
      heading: { type: "text", display_name: "Heading" },
      description: { type: "textarea", display_name: "Description" },
      address: { type: "textarea", display_name: "Address" },
      phone: { type: "text", display_name: "Phone" },
      email: { type: "text", display_name: "Email" },
      map_embed: { type: "textarea", display_name: "Map Embed HTML" },
      cta_text: { type: "text", display_name: "CTA Text" },
      cta_url: { type: "text", display_name: "CTA URL" },
    },
  },
  {
    name: "link_list",
    display_name: "Link List",
    is_nestable: true,
    is_root: false,
    schema: {
      heading: { type: "text", display_name: "Heading" },
      background: { type: "option", display_name: "Background", options: [{ name: "White", value: "white" }, { name: "Neutral", value: "neutral" }] },
      links: { type: "bloks", display_name: "Links", restrict_components: true, component_whitelist: ["link_item"] },
    },
  },
  {
    name: "link_item",
    display_name: "Link Item",
    is_nestable: true,
    is_root: false,
    schema: {
      label: { type: "text", display_name: "Label" },
      url: { type: "text", display_name: "URL" },
    },
  },
];

async function main() {
  console.log("=== Registering Inner Page Components ===\n");
  const existing = await getExisting();
  console.log(`Found ${Object.keys(existing).length} existing components\n`);

  for (const comp of components) {
    await upsert(existing, comp);
  }

  console.log("\n=== Done! ===");
}

main().catch(console.error);
