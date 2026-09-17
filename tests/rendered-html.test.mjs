import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("keeps the Sunnyland landing page connected to the refreshed catalogue", async () => {
  const [page, hero, categories, styles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/HeroCarousel.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/product-categories.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /HeroCarousel/);
  assert.match(page, /CurlingCarousel/);
  assert.match(page, /Various collections/);
  assert.match(page, /View all products/);
  assert.match(page, /formsubmit\.co\/info@chinasunnyland\.com/);
  assert.doesNotMatch(hero, /catalogueProducts/);
  assert.equal((hero.match(/code: "/g) || []).length, 12);
  for (const highlight of ["TENNIS", "AIR HOCKEY", "SSD003", "SLING PUCK"]) {
    assert.match(hero, new RegExp(highlight));
  }
  assert.match(styles, /\.comic-strips\s*\{[^}]*grid-template-rows:\s*repeat\(3,/s);
  assert.match(styles, /\.comic-panel img\s*\{[^}]*object-fit:\s*contain/s);
  assert.match(styles, /\.hero-slide-range \.hero-copy\s*\{[^}]*linear-gradient\(135deg,\s*#1b3c70/s);
  assert.match(hero, /href="#curling"/);
  for (const category of ["Curling game", "Outdoor Leisure Sports", "Indoor Sports", "Indoor Game"]) {
    assert.match(categories, new RegExp(category));
    assert.match(hero, new RegExp(category));
  }
});

test("matches all 32 products from the supplied master and references every supplied image", async () => {
  const catalogue = await readFile(new URL("../app/data/catalogue.ts", import.meta.url), "utf8");

  assert.equal((catalogue.match(/category: "Outdoor Leisure Sports"/g) || []).length, 11);
  assert.equal((catalogue.match(/category: "Indoor Sports"/g) || []).length, 10);
  assert.equal((catalogue.match(/category: "Indoor Game"/g) || []).length, 11);
  assert.match(catalogue, /catalogueRevision = "2026-08-22-product-master"/);
  assert.match(catalogue, /27 Inch Aluminum Tennis Racket/);
  assert.match(catalogue, /18 Inch Professional Sisal Dartboard With Dart Mat/);
  assert.match(catalogue, /Wooden Sling Puck/);

  const imagePaths = Array.from(
    catalogue.matchAll(/imageUrl: "(\/catalogue\/[^"]+)"/g),
    (match) => match[1],
  );
  assert.equal(imagePaths.length, 32);
  for (const imagePath of imagePaths) {
    const image = await readFile(new URL(`../public${imagePath}`, import.meta.url));
    assert.ok(image.length > 10_000, `${imagePath} should contain a product image`);
  }
});

test("replaces the three database-backed collections once while preserving curling", async () => {
  const [content, categories, galleries] = await Promise.all([
    readFile(new URL("../db/content.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/product-categories.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/data/product-galleries.ts", import.meta.url), "utf8"),
  ]);

  assert.match(content, /\.\.\.catalogueProducts/);
  assert.match(content, /site_content_state/);
  assert.match(content, /product_catalogue_revision/);
  assert.match(content, /DELETE FROM content_items/);
  assert.match(content, /UPPER\(slug\) NOT LIKE 'SSC%'/);
  assert.match(content, /LOWER\(category\) NOT IN \('curling', 'curling game'/);
  assert.match(content, /INSERT OR REPLACE INTO site_content_state/);
  assert.match(categories, /slug\.toLowerCase\(\)\.startsWith\("outdoor-"\)/);
  assert.match(categories, /slug\.toLowerCase\(\)\.startsWith\("indoor-game-"\)/);
  assert.match(galleries, /productGalleries: Record<string, readonly string\[]> = \{\}/);
});

test("leaves the six-product curling range unchanged", async () => {
  const curling = await readFile(new URL("../app/data/curling.ts", import.meta.url), "utf8");

  for (const code of ["SSC001-A", "SSC001-B", "SSC001-C", "SSC001-D", "SSC001-E", "SSC001-F"]) {
    assert.match(curling, new RegExp(code));
  }
  assert.equal((curling.match(/code: "SSC001-/g) || []).length, 6);
  assert.match(curling, /150 × 150 cm/);
});

test("keeps product details accessible and expandable", async () => {
  const [products, card, expandable] = await Promise.all([
    readFile(new URL("../app/products/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/products/ProductCard.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/products/ExpandableProductGrid.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(products, /catalogue\/outdoor\/27-inch-aluminum-tennis-racket\.png/);
  assert.match(products, /catalogue\/indoor-sports\/ssd003-sisal-dartboard\.jpg/);
  assert.match(products, /catalogue\/indoor-game\/tabletop-curling\.jpg/);
  assert.match(products, /ProductCard/);
  assert.match(card, /role="dialog"/);
  assert.match(card, /aria-modal="true"/);
  assert.match(card, /createPortal/);
  assert.match(card, /product\.code &&/);
  assert.match(expandable, /Show all \$\{itemCount\} products/);
  assert.match(expandable, /ResizeObserver/);
  assert.match(expandable, /aria-expanded/);
});

test("ships the refreshed sharing card and Sites configuration", async () => {
  const [layout, sharingCard, favicon, hosting, packageJson] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/og-catalogue-2026.png", import.meta.url)),
    readFile(new URL("../public/favicon.png", import.meta.url)),
    readFile(new URL("../.openai/hosting.json", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /og-catalogue-2026\.png/);
  assert.match(layout, /2026 Sunnyland range/);
  assert.match(layout, /favicon\.png\?v=20260828/);
  assert.match(layout, /rel="shortcut icon"/);
  assert.ok(sharingCard.length > 100_000);
  assert.ok(favicon.length > 10_000);
  assert.match(hosting, /"project_id": "appgprj_/);
  assert.match(hosting, /"d1": "DB"/);
  assert.match(packageJson, /build:cloudflare/);
});

test("retains the content manager and media-rich company page", async () => {
  const [admin, auth, about, aboutCss] = await Promise.all([
    readFile(new URL("../app/admin/AdminManager.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/admin-auth.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/about/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/about/about.css", import.meta.url), "utf8"),
  ]);

  assert.match(admin, /productCategories/);
  assert.match(admin, /catalogue\/outdoor\/27-inch-aluminum-tennis-racket\.png/);
  assert.match(auth, /jwtVerify/);
  assert.match(about, /5,000 m²/);
  assert.match(about, /about-company\.mp4/);
  assert.match(about, /about-factory\.mp4/);
  const partners = await readFile(new URL("../app/data/partners.ts", import.meta.url), "utf8");
  for (const partner of ["decathlon", "lekia", "svp-sports", "snoopy", "target", "wilson"]) {
    assert.match(partners, new RegExp(`/partners/${partner}\\.png`));
    const partnerCard = await readFile(new URL(`../public/partners/${partner}.png`, import.meta.url));
    assert.ok(partnerCard.length > 100_000, `${partner} should contain a partner-card image`);
  }
  assert.match(aboutCss, /grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(aboutCss, /aspect-ratio: 1/);
  assert.match(aboutCss, /video-grid/);
});

test("publishes the registered company identity and landlines", async () => {
  const [home, chrome, about] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/SiteChrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/about/page.tsx", import.meta.url), "utf8"),
  ]);

  for (const phone of ["+86 574 87163558", "+86 574 87124668"]) {
    assert.match(home, new RegExp(phone.replaceAll("+", "\\+")));
    assert.match(chrome, new RegExp(phone.replaceAll("+", "\\+")));
  }
  assert.match(chrome, /Sunnyland is a trademark/);
  assert.match(chrome, /official registered name is Ningbo Advancing and Rising Trading Co\. Ltd/);
  assert.match(about, /Ningbo Advancing and Rising Trading Co\. Ltd was founded in 2008/);
});
