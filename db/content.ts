import { env } from "cloudflare:workers";

export type ContentType = "product" | "news";

export type ContentItem = {
  id: number;
  type: ContentType;
  title: string;
  slug: string;
  summary: string;
  category: string;
  imageUrl: string;
  publishedAt: string;
  featured: boolean;
  sortOrder: number;
};

export type ContentInput = Omit<ContentItem, "id">;

export const defaultContent: ContentItem[] = [
  { id: 1, type: "product", title: "Pop-up golf chipping net", slug: "SSG001", summary: "A quick-fold practice target made for gardens, parks and spontaneous competitions.", category: "Golf", imageUrl: "/golf.jpg", publishedAt: "2026-05-12", featured: true, sortOrder: 1 },
  { id: 2, type: "product", title: "Ladder ball toss set", slug: "SSL002", summary: "Colourful, easy-to-learn outdoor play for family afternoons and event spaces.", category: "Lawn games", imageUrl: "/ladder-ball.jpg", publishedAt: "2026-04-28", featured: false, sortOrder: 2 },
  { id: 3, type: "product", title: "Wooden number toss", slug: "SSL003", summary: "A tactile throwing game that brings simple strategy to lawns and campsites.", category: "Lawn games", imageUrl: "/wooden-toss.jpg", publishedAt: "2026-04-10", featured: false, sortOrder: 3 },
  { id: 4, type: "product", title: "3-in-1 giant checkers", slug: "SSB001", summary: "Oversized checkers, tic-tac-toe and a play mat packed into one portable set.", category: "Board games", imageUrl: "/checkers.jpg", publishedAt: "2026-03-18", featured: true, sortOrder: 4 },
  { id: 5, type: "product", title: "Fast sling puck", slug: "SSB002", summary: "Fast, focused tabletop action with satisfying wooden pieces and simple rules.", category: "Board games", imageUrl: "/sling-puck.jpg", publishedAt: "2026-02-26", featured: false, sortOrder: 5 },
  { id: 6, type: "product", title: "Shot glass roulette", slug: "SSD002", summary: "A bold party-game centrepiece with sixteen glasses and a classic roulette wheel.", category: "Party games", imageUrl: "/roulette.jpg", publishedAt: "2026-02-07", featured: false, sortOrder: 6 },
  { id: 7, type: "news", title: "Two ways to play: shuffleboard meets curling", slug: "shuffleboard-curling", summary: "Our two-in-one set brings the tactics of floor curling and the pace of shuffleboard to one portable rink.", category: "New product", imageUrl: "/sling-puck.jpg", publishedAt: "2026-06-21", featured: true, sortOrder: 1 },
  { id: 8, type: "news", title: "Why floor curling keeps everyone moving", slug: "floor-curling-guide", summary: "A simple guide to setup, scoring and the small details that make the game so inclusive.", category: "How to play", imageUrl: "/about.jpg", publishedAt: "2026-05-30", featured: false, sortOrder: 2 },
  { id: 9, type: "news", title: "From Ningbo to game night", slug: "made-in-ningbo", summary: "A look at how our team develops, checks and prepares new games for markets around the world.", category: "Inside Sunnyland", imageUrl: "/party-game.jpg", publishedAt: "2026-04-16", featured: false, sortOrder: 3 },
];

function db() {
  if (!env.DB) throw new Error("D1 binding DB is unavailable");
  return env.DB;
}

async function ensureDatabase() {
  const database = db();
  await database.batch([
    database.prepare(`CREATE TABLE IF NOT EXISTS content_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL CHECK(type IN ('product','news')),
      title TEXT NOT NULL,
      slug TEXT NOT NULL,
      summary TEXT NOT NULL,
      category TEXT NOT NULL,
      image_url TEXT NOT NULL,
      published_at TEXT NOT NULL,
      featured INTEGER NOT NULL DEFAULT 0,
      sort_order INTEGER NOT NULL DEFAULT 0
    )`),
    database.prepare("CREATE INDEX IF NOT EXISTS content_items_type_order_idx ON content_items(type, sort_order, published_at)"),
  ]);

  const count = await database.prepare("SELECT COUNT(*) AS total FROM content_items").first<{ total: number }>();
  if (!count?.total) {
    await database.batch(defaultContent.map((item) => database.prepare(
      "INSERT INTO content_items (type,title,slug,summary,category,image_url,published_at,featured,sort_order) VALUES (?,?,?,?,?,?,?,?,?)"
    ).bind(item.type, item.title, item.slug, item.summary, item.category, item.imageUrl, item.publishedAt, item.featured ? 1 : 0, item.sortOrder)));
  }
}

function normalise(row: Record<string, unknown>): ContentItem {
  return {
    id: Number(row.id),
    type: row.type as ContentType,
    title: String(row.title),
    slug: String(row.slug),
    summary: String(row.summary),
    category: String(row.category),
    imageUrl: String(row.image_url),
    publishedAt: String(row.published_at),
    featured: Boolean(row.featured),
    sortOrder: Number(row.sort_order),
  };
}

export async function getContentItems(): Promise<ContentItem[]> {
  try {
    await ensureDatabase();
    const result = await db().prepare(
      "SELECT * FROM content_items ORDER BY type DESC, sort_order ASC, published_at DESC"
    ).all<Record<string, unknown>>();
    return result.results.map(normalise);
  } catch {
    return defaultContent;
  }
}

export async function createContentItem(input: ContentInput): Promise<ContentItem> {
  await ensureDatabase();
  const result = await db().prepare(
    "INSERT INTO content_items (type,title,slug,summary,category,image_url,published_at,featured,sort_order) VALUES (?,?,?,?,?,?,?,?,?) RETURNING *"
  ).bind(input.type, input.title, input.slug, input.summary, input.category, input.imageUrl, input.publishedAt, input.featured ? 1 : 0, input.sortOrder).first<Record<string, unknown>>();
  if (!result) throw new Error("Could not create item");
  return normalise(result);
}

export async function updateContentItem(id: number, input: ContentInput): Promise<ContentItem> {
  await ensureDatabase();
  const result = await db().prepare(
    "UPDATE content_items SET type=?,title=?,slug=?,summary=?,category=?,image_url=?,published_at=?,featured=?,sort_order=? WHERE id=? RETURNING *"
  ).bind(input.type, input.title, input.slug, input.summary, input.category, input.imageUrl, input.publishedAt, input.featured ? 1 : 0, input.sortOrder, id).first<Record<string, unknown>>();
  if (!result) throw new Error("Item not found");
  return normalise(result);
}

export async function deleteContentItem(id: number): Promise<void> {
  await ensureDatabase();
  await db().prepare("DELETE FROM content_items WHERE id=?").bind(id).run();
}
