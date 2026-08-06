import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("defines the complete Sunnyland landing page", async () => {
  const [page, hero] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/HeroCarousel.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(page, /Sunnyland/);
  assert.match(hero, /Bring curling/);
  assert.match(hero, /\/products#curling/);
  assert.match(page, /HeroCarousel/);
  assert.match(page, /CurlingCarousel/);
  assert.match(page, /Products worth/);
  assert.match(page, /View all products/);
  assert.match(page, /Questions,/);
  assert.match(page, /minimum order quantity/);
  assert.match(page, /average lead time/);
  assert.match(page, /faq-section/);
  assert.doesNotMatch(page, /Built here|Ready everywhere|company-build-section/);
  assert.match(page, /\/news\/\$\{encodeURIComponent\(article\.slug\)\}/);
  assert.match(page, /Ready<br \/>to play/);
  assert.match(page, /formsubmit\.co\/info@chinasunnyland\.com/);
  assert.match(page, /King Intl Mansion/);
  assert.doesNotMatch(page, /codex-preview|react-loading-skeleton|Starter Project/);
});

test("provides catalogue, news index and managed article pages", async () => {
  const [products, news, article, content, admin, migration, categories, home, hero, curling] = await Promise.all([
    readFile(new URL("../app/products/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/news/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/news/[slug]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../db/content.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/admin/AdminManager.tsx", import.meta.url), "utf8"),
    readFile(new URL("../drizzle/0001_add_content_body.sql", import.meta.url), "utf8"),
    readFile(new URL("../lib/product-categories.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/HeroCarousel.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/data/curling.ts", import.meta.url), "utf8"),
  ]);

  assert.match(products, /The Sunnyland range/);
  assert.match(products, /curlingProducts/);
  assert.match(products, /Request the full catalogue/);
  assert.match(news, /Ideas in play/);
  assert.match(article, /article\.body/);
  assert.match(article, /More from Sunnyland/);
  assert.match(content, /body: string/);
  assert.match(content, /sunnyland-hk-toy-fair-2027/);
  assert.match(content, /5E-G18/);
  assert.match(content, /imageUrl: "\/exhibition\.jpg"/);
  assert.match(content, /20cm-iceless-curling-stone/);
  assert.match(content, /new-iceless-curling-stone\.jpg/);
  assert.match(content, /WHERE NOT EXISTS/);
  assert.match(admin, /Page content/);
  assert.match(admin, /productCategories/);
  assert.match(migration, /ADD COLUMN body/);
  for (const category of ["Curling game", "Other indoor sports", "Outdoor leisure sports", "Indoor game"]) {
    assert.match(categories, new RegExp(category));
  }
  assert.match(home, /productCategories/);
  assert.match(hero, /<strong>4<\/strong>/);
  assert.match(products, /4 categories/);
  for (const code of ["SSC001-A", "SSC001-B", "SSC001-C", "SSC001-D", "SSC001-E", "SSC001-F"]) {
    assert.match(curling, new RegExp(code));
  }
  assert.doesNotMatch(curling, /SSC003B|SSC010|SSC007|SSC003A|SSC002/);
  assert.match(curling, /150 × 520 cm/);
  assert.match(content, /SSC001-F: our 20 cm floor curling set/);
  assert.match(content, /Six floor curling sets, one focused range/);
  assert.doesNotMatch(content, /Two ways to play: shuffleboard meets curling/);
  const migratedCodes = [
    "SSG011", "SSB002", "SSB001", "SSO020", "SSO001", "SSO014", "SSO009", "SSO004", "SSDT005", "SSDT003",
    "SSG001", "SSL008", "SSL006", "SSL001", "SSL002", "SSL003",
    "SSD002", "SSD001", "SSD007", "SSD008", "SSD009", "SSO021",
  ];
  for (const code of migratedCodes) {
    assert.match(content, new RegExp(`slug: "${code}"`));
    assert.match(content, new RegExp(`imageUrl: "/product-${code.toLowerCase()}\\.jpg"`));
  }
  assert.equal((content.match(/type: "product"/g) || []).length, 22);
});

test("uses one shared height for every jumbotron slide", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.hero-carousel\s*\{[^}]*display:\s*grid/s);
  assert.match(css, /\.hero-carousel\s*\{[^}]*width:\s*100%/s);
  assert.match(css, /\.hero-carousel\s*\{[^}]*height:\s*var\(--home-hero-height\)/s);
  assert.match(css, /\.hero-carousel\s*\{[^}]*--home-hero-height:\s*clamp\(726px,\s*calc\(110svh\s*-\s*198px\),\s*759px\)/s);
  assert.match(css, /\.hero-carousel\s*\{[^}]*min-height:\s*var\(--home-hero-height\)/s);
  assert.match(css, /\.hero-slide\s*\{[^}]*height:\s*100%[^}]*min-height:\s*0/s);
  assert.match(css, /\.hero-carousel \.hero-visual\s*\{[^}]*min-height:\s*0/s);
  assert.match(css, /\.hero-carousel\s*\{[^}]*margin:\s*0/s);
  assert.match(css, /\.hero-slide\s*\{[^}]*grid-area:\s*1\s*\/\s*1/s);
  assert.match(css, /grid-template-rows:\s*minmax\(520px,\s*auto\)\s+420px/);
  assert.match(css, /\.hero-news-title\s*\{[^}]*overflow-wrap:\s*break-word/s);
  assert.match(css, /\.hero-slide-range \.hero-copy\s*\{[^}]*background:[^;]*var\(--ink\)/s);
  assert.match(css, /\.range-visual\s*\{[^}]*background:\s*var\(--red\)/s);
});

test("uses the generated Sunnyland favicon", async () => {
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const favicon = await readFile(new URL("../public/sunnyland-favicon-v3.png", import.meta.url));
  assert.match(layout, /metadataBase: new URL\("https:\/\/www\.sunnylandsports\.com"\)/);
  assert.match(layout, /icon:\s*"\/sunnyland-favicon-v3\.png"/);
  assert.match(layout, /apple:\s*"\/sunnyland-favicon-v3\.png"/);
  assert.ok(favicon.length > 10_000);
});

test("gives the FAQ a contrasting animated treatment", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.faq-section\s*\{[^}]*background:\s*var\(--ink\)/s);
  assert.match(css, /details::details-content\s*\{[^}]*transition:/s);
  assert.match(css, /details\[open\]::details-content\s*\{[^}]*block-size:\s*auto/s);
});

test("includes the content manager and durable database binding", async () => {
  const [page, layout, admin, auth, hosting, packageJson, viteConfig, deployCheck] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/admin/AdminManager.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/admin-auth.ts", import.meta.url), "utf8"),
    readFile(new URL("../.openai/hosting.json", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../vite.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../scripts/validate-cloudflare-env.mjs", import.meta.url), "utf8"),
  ]);

  assert.match(page, /getContentItems/);
  assert.match(layout, /Sunnyland Sports/);
  assert.match(layout, /og\.png/);
  assert.match(admin, /Publish item/);
  assert.match(auth, /jwtVerify/);
  assert.match(auth, /cf-access-jwt-assertion/);
  assert.match(hosting, /"d1": "DB"/);
  assert.match(packageJson, /build:cloudflare/);
  assert.match(viteConfig, /database_name: "sunnyland-content"/);
  assert.match(deployCheck, /CLOUDFLARE_D1_DATABASE_ID/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});

test("includes a media-rich company and factory page", async () => {
  const [about, aboutCss] = await Promise.all([
    readFile(new URL("../app/about/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/about/about.css", import.meta.url), "utf8"),
  ]);

  assert.match(about, /5,000 m²/);
  assert.match(about, /100\+/);
  assert.match(about, /about-company\.mp4/);
  assert.match(about, /about-factory\.mp4/);
  assert.match(about, /BSCI/);
  assert.match(about, /ISO 9001/);
  assert.match(about, /Factory tour/);
  assert.match(about, /Curland trademark/);
  assert.match(aboutCss, /video-grid/);
});
