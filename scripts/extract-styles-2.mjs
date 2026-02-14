import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://www.tiq.qld.gov.au/', { waitUntil: 'networkidle', timeout: 30000 });
try { await page.click('button:has-text("Allow all cookies")', { timeout: 3000 }); await page.waitForTimeout(500); } catch(e) {}

const data = await page.evaluate(() => {
  const gs = (el, label) => {
    if (!el) return { label, found: false };
    const cs = window.getComputedStyle(el);
    return {
      label, tag: el.tagName,
      classes: (el.className?.substring?.(0, 200) || ''),
      text: el.textContent?.trim().substring(0, 80),
      bg: cs.backgroundColor, color: cs.color,
      fontSize: cs.fontSize, fontWeight: cs.fontWeight,
      padding: cs.padding, margin: cs.margin,
      width: cs.width, height: cs.height, maxWidth: cs.maxWidth,
      lineHeight: cs.lineHeight, textDecoration: cs.textDecoration,
      borderRadius: cs.borderRadius, border: cs.border,
      display: cs.display, gap: cs.gap,
      gridTemplateColumns: cs.gridTemplateColumns,
      boxShadow: cs.boxShadow,
    };
  };
  const r = [];

  const allSections = document.querySelectorAll('section');
  let newsSection = null;
  let readMoreSection = null;
  let ctaSection = null;
  allSections.forEach(s => {
    const h = s.querySelector('h2');
    const t = h?.textContent?.trim() || '';
    if (t.includes('news')) newsSection = s;
    if (t.includes('Read more')) readMoreSection = s;
    if (t.includes('specialist')) ctaSection = s;
  });

  // NEWS
  if (newsSection) {
    r.push(gs(newsSection, 'NEWS_SECTION'));
    r.push(gs(newsSection.querySelector('.container-xl'), 'NEWS_CONTAINER'));
    r.push(gs(newsSection.querySelector('h2'), 'NEWS_H2'));
    const newsGrid = newsSection.querySelector('.row');
    r.push(gs(newsGrid, 'NEWS_GRID'));
    const newsCols = newsSection.querySelectorAll('.row > [class*="col"]');
    if (newsCols[0]) {
      r.push(gs(newsCols[0], 'NEWS_COL_0'));
      const card = newsCols[0].querySelector('.content-block');
      r.push(gs(card, 'NEWS_CARD_0'));
      const cardImg = card?.querySelector('img');
      r.push(gs(cardImg, 'NEWS_IMG_0'));
      const cardImgContainer = cardImg?.parentElement;
      r.push(gs(cardImgContainer, 'NEWS_IMG_WRAP_0'));
      const cardTitle = card?.querySelector('h3, h4, .card-title');
      r.push(gs(cardTitle, 'NEWS_TITLE_0'));
      const cardLink = card?.querySelector('a');
      r.push(gs(cardLink, 'NEWS_LINK_0'));
      const cardBody = card?.querySelector('.card-body, [class*="body"]');
      r.push(gs(cardBody, 'NEWS_BODY_0'));
    }
  }

  // FEATURED
  const allBlocks = document.querySelectorAll('.content-block');
  let featuredBlock = null;
  allBlocks.forEach(b => {
    if (b.textContent?.includes('Queensland unveils')) featuredBlock = b;
  });
  if (featuredBlock) {
    const featuredSection = featuredBlock.closest('section');
    r.push(gs(featuredSection, 'FEATURED_SECTION'));
    r.push(gs(featuredSection?.querySelector('.container-xl'), 'FEATURED_CONTAINER'));
    r.push(gs(featuredBlock, 'FEATURED_BLOCK'));
    r.push(gs(featuredBlock.querySelector('img'), 'FEATURED_IMG'));
    const featuredImgWrap = featuredBlock.querySelector('img')?.parentElement;
    r.push(gs(featuredImgWrap, 'FEATURED_IMG_WRAP'));
    r.push(gs(featuredBlock.querySelector('h2, h3'), 'FEATURED_H'));
    r.push(gs(featuredBlock.querySelector('p'), 'FEATURED_P'));
    r.push(gs(featuredBlock.querySelector('a.btn'), 'FEATURED_BTN'));
  }

  // READ MORE
  if (readMoreSection) {
    r.push(gs(readMoreSection, 'READMORE_SECTION'));
    r.push(gs(readMoreSection.querySelector('.container-xl'), 'READMORE_CONTAINER'));
    r.push(gs(readMoreSection.querySelector('h2'), 'READMORE_H2'));
    const rmGrid = readMoreSection.querySelector('.row');
    r.push(gs(rmGrid, 'READMORE_GRID'));
    const rmCols = readMoreSection.querySelectorAll('.row > [class*="col"]');
    if (rmCols[0]) {
      r.push(gs(rmCols[0], 'READMORE_COL_0'));
      const rmCard = rmCols[0].querySelector('.content-block, a');
      r.push(gs(rmCard, 'READMORE_CARD_0'));
      r.push(gs(rmCard?.querySelector('img'), 'READMORE_IMG_0'));
      r.push(gs(rmCard?.querySelector('h3, h4, span'), 'READMORE_TITLE_0'));
      r.push(gs(rmCard?.querySelector('a'), 'READMORE_LINK_0'));
    }
  }

  // CTA SPECIALIST
  if (ctaSection) {
    r.push(gs(ctaSection, 'CTA_SPEC_SECTION'));
    r.push(gs(ctaSection.querySelector('.container-xl'), 'CTA_SPEC_CONTAINER'));
    r.push(gs(ctaSection.querySelector('h2'), 'CTA_SPEC_H2'));
    r.push(gs(ctaSection.querySelector('p'), 'CTA_SPEC_P'));
    r.push(gs(ctaSection.querySelector('a.btn'), 'CTA_SPEC_BTN'));
  }

  // FOOTER
  const footer = document.querySelector('footer');
  r.push(gs(footer, 'FOOTER'));
  if (footer) {
    r.push(gs(footer.querySelector('.container-xl'), 'FOOTER_CONTAINER'));
    const footerLogo = footer.querySelector('img');
    r.push(gs(footerLogo, 'FOOTER_LOGO'));
    // Footer sections
    const footerSections = footer.querySelectorAll('section, [class*="footer"]');
    footerSections.forEach((s, i) => {
      if (i < 4) r.push(gs(s, 'FOOTER_SECTION_' + i));
    });
    // Footer links
    const footerH = footer.querySelectorAll('h3, h4, h5');
    footerH.forEach((h, i) => {
      if (i < 4) r.push(gs(h, 'FOOTER_H_' + i));
    });
  }

  return r;
});

console.log(JSON.stringify(data, null, 2));
await browser.close();
