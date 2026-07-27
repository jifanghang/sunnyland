import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("defines the complete Sunnyland landing page", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(page, /Sunnyland/);
  assert.match(page, /Bring curling/);
  assert.match(page, /CurlingCarousel/);
  assert.match(page, /Products worth/);
  assert.match(page, /Ready<br \/>to play/);
  assert.match(page, /formsubmit\.co\/info@chinasunnyland\.com/);
  assert.match(page, /King Intl Mansion/);
  assert.doesNotMatch(page, /codex-preview|react-loading-skeleton|Starter Project/);
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
