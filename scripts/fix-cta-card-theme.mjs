import StoryblokClient from "storyblok-js-client";

const client = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
  region: "eu",
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

// List components first
try {
  const { data } = await client.get(`spaces/${spaceId}/components`, {});
  console.log("Components:");
  data.components.forEach((c) => console.log(`  ${c.id} - ${c.name}`));

  // Find cta_card
  const ctaCard = data.components.find((c) => c.name === "cta_card");
  if (ctaCard) {
    console.log("\ncta_card schema:", JSON.stringify(ctaCard.schema, null, 2));

    // Add theme field
    if (!ctaCard.schema.theme) {
      ctaCard.schema.theme = {
        type: "option",
        pos: 0,
        options: [
          { name: "Aqua", value: "aqua" },
          { name: "Navy", value: "navy" },
        ],
        default_value: "aqua",
      };

      await client.put(`spaces/${spaceId}/components/${ctaCard.id}`, {
        component: ctaCard,
      });
      console.log("\nAdded theme field to cta_card");
    }
  }
} catch (err) {
  console.error("Components error:", err.response?.status, err.response?.data || err.message);
}

// Update homepage story
try {
  const { data } = await client.get(`spaces/${spaceId}/stories`, {
    starts_with: "home",
  });
  console.log("\nStories found:", data.stories.length);

  if (data.stories.length > 0) {
    const home = data.stories[0];
    console.log("Story:", home.id, home.full_slug);

    const { data: storyData } = await client.get(
      `spaces/${spaceId}/stories/${home.id}`
    );
    const story = storyData.story;
    const body = story.content.body;

    const dualCta = body.find((b) => b.component === "dual_cta_cards");
    if (dualCta && dualCta.cards && dualCta.cards.length >= 2) {
      dualCta.cards[0].theme = "aqua";
      dualCta.cards[1].theme = "navy";
      console.log("Set themes on CTA cards");

      await client.put(`spaces/${spaceId}/stories/${home.id}`, {
        story: { content: story.content },
        publish: 1,
      });
      console.log("Homepage saved and published");
    }
  }
} catch (err) {
  console.error("Story error:", err.response?.status, err.response?.data || err.message);
}
