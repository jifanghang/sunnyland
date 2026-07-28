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
  assert.match(page, /Built here/);
  assert.match(page, /Ready everywhere/);
  assert.match(page, /company-build-section/);
  assert.doesNotMatch(page, /about-section|partnership-section/);
  assert.match(page, /\/news\/\$\{encodeURIComponent\(article\.slug\)\}/);
  assert.match(page, /Ready<br \/>to play/);
  assert.match(page, /formsubmit\.co\/info@chinasunnyland\.com/);
  assert.match(page, /King Intl Mansion/);
  assert.doesNotMatch(page, /codex-preview|react-loading-skeleton|Starter Project/);
});

test("provides catalogue, news index and managed article pages", async () => {
  const [products, news, article, content, admin, migration] = await Promise.all([
    readFile(new URL("../app/products/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/news/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/news/[slug]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../db/content.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/admin/AdminManager.tsx", import.meta.url), "utf8"),
    readFile(new URL("../drizzle/0001_add_content_body.sql", import.meta.url), "utf8"),
  ]);

  assert.match(products, /The Sunnyland range/);
  assert.match(products, /curlingProducts/);
  assert.match(products, /Request the full catalogue/);
  assert.match(news, /Ideas in play/);
  assert.match(article, /article\.body/);
  assert.match(article, /More from Sunnyland/);
  assert.match(content, /body: string/);
  assert.match(content, /sunnyland-hk-toy-fair-2027/);
  assert.match(content, /WHERE NOT EXISTS/);
  assert.match(admin, /Page content/);
  assert.match(migration, /ADD COLUMN body/);
});

test("uses one shared height for every jumbotron slide", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.hero-carousel\s*\{[^}]*display:\s*grid/s);
  assert.match(css, /\.hero-slide\s*\{[^}]*grid-area:\s*1\s*\/\s*1/s);
  assert.match(css, /grid-template-rows:\s*minmax\(650px,\s*auto\)\s+560px/);
});

test("includes the content manager and durable database binding", async () => {
  const [page, layout, admin, hosting, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/admin/AdminManager.tsx", import.meta.url), "utf8"),
    readFile(new URL("../.openai/hosting.json", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /getContentItems/);
  assert.match(layout, /Sunnyland Sports/);
  assert.match(layout, /og\.png/);
  assert.match(admin, /Publish item/);
  assert.match(hosting, /"d1": "DB"/);
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
