import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("defines the complete Sunnyland landing page", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(page, /Sunnyland/);
  assert.match(page, /Bring more/);
  assert.match(page, /Products worth/);
  assert.match(page, /Ready to play/);
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
