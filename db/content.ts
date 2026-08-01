import { env } from "cloudflare:workers";

export type ContentType = "product" | "news";

export type ContentItem = {
  id: number;
  type: ContentType;
  title: string;
  slug: string;
  summary: string;
  body: string;
  category: string;
  imageUrl: string;
  publishedAt: string;
  featured: boolean;
  sortOrder: number;
};

export type ContentInput = Omit<ContentItem, "id">;

export const defaultContent: ContentItem[] = [
  { id: 1, type: "product", title: "Pop-up golf chipping net", slug: "SSG001", summary: "A quick-fold practice target made for gardens, parks and spontaneous competitions.", body: "A portable target designed for quick setup and repeat practice. The folding frame packs down neatly for retail, travel and easy storage.\n\nAvailable for private-label programmes with custom colours, targets and packaging.", category: "Golf", imageUrl: "/golf.jpg", publishedAt: "2026-05-12", featured: true, sortOrder: 1 },
  { id: 2, type: "product", title: "Ladder ball toss set", slug: "SSL002", summary: "Colourful, easy-to-learn outdoor play for family afternoons and event spaces.", body: "A familiar lawn-game format with lightweight construction and straightforward scoring. Built for gardens, campsites, events and family play.\n\nAsk our team about material, colour and packaging options.", category: "Lawn games", imageUrl: "/ladder-ball.jpg", publishedAt: "2026-04-28", featured: false, sortOrder: 2 },
  { id: 3, type: "product", title: "Wooden number toss", slug: "SSL003", summary: "A tactile throwing game that brings simple strategy to lawns and campsites.", body: "Numbered wooden pins turn every throw into a choice between accuracy and points. The set is compact, tactile and easy to teach.\n\nCustom finishes and retail packaging are available.", category: "Lawn games", imageUrl: "/wooden-toss.jpg", publishedAt: "2026-04-10", featured: false, sortOrder: 3 },
  { id: 4, type: "product", title: "3-in-1 giant checkers", slug: "SSB001", summary: "Oversized checkers, tic-tac-toe and a play mat packed into one portable set.", body: "Three classic ways to play in one easy-to-carry format. The oversized pieces and clear game mat make it a natural fit for homes, schools and events.", category: "Board games", imageUrl: "/checkers.jpg", publishedAt: "2026-03-18", featured: true, sortOrder: 4 },
  { id: 5, type: "product", title: "Fast sling puck", slug: "SSB002", summary: "Fast, focused tabletop action with satisfying wooden pieces and simple rules.", body: "A head-to-head tabletop game built around speed, aim and instant rematches. Wooden construction gives every round a satisfying feel.", category: "Board games", imageUrl: "/sling-puck.jpg", publishedAt: "2026-02-26", featured: false, sortOrder: 5 },
  { id: 6, type: "product", title: "Shot glass roulette", slug: "SSD002", summary: "A bold party-game centrepiece with sixteen glasses and a classic roulette wheel.", body: "A compact social game combining a roulette wheel, numbered glasses and simple party rules. Packaging and component colours can be adapted for private-label ranges.", category: "Party games", imageUrl: "/roulette.jpg", publishedAt: "2026-02-07", featured: false, sortOrder: 6 },
  { id: 7, type: "news", title: "Two ways to play: shuffleboard meets curling", slug: "shuffleboard-curling", summary: "Our two-in-one set brings the tactics of floor curling and the pace of shuffleboard to one portable rink.", body: "Why choose one target game when the same playing surface can deliver two? Sunnyland’s two-in-one set combines floor curling and shuffleboard with scoring zones at both ends of a portable rink.\n\nThe format is simple to introduce, quick to reset and flexible enough for families, schools, clubs and activity spaces. Players can focus on curling-style placement in one round, then switch to the faster scoring rhythm of shuffleboard in the next.\n\nFor buyers, the combined format gives one retail box a broader play story and encourages repeat use across different age groups.", category: "New product", imageUrl: "/curling-2in1.jpg", publishedAt: "2026-06-21", featured: true, sortOrder: 1 },
  { id: 8, type: "news", title: "Why floor curling keeps everyone moving", slug: "floor-curling-guide", summary: "A simple guide to setup, scoring and the small details that make the game so inclusive.", body: "Floor curling keeps the strategy of the ice while removing the need for skates, cold conditions or a specialist rink. A smooth indoor floor is enough to begin.\n\nPlayers take turns sending stones towards a target, balancing accuracy, weight and teamwork. Because the motion is controlled and the rules are easy to explain, the game works well across ages and ability levels.\n\nStart with short rounds, clear scoring zones and teams of two to four. Once everyone understands the pace, introduce blocking shots and tactical placement.", category: "How to play", imageUrl: "/curling-floor.jpg", publishedAt: "2026-05-30", featured: false, sortOrder: 2 },
  { id: 9, type: "news", title: "From Ningbo to game night", slug: "made-in-ningbo", summary: "A look at how our team develops, checks and prepares new games for markets around the world.", body: "Every product begins with a play experience: what should people do, feel and want to repeat? From there, our Ningbo team turns the idea into materials, mechanisms, samples and packaging.\n\nApproved designs move through production and quality checks before export preparation. Close access to Ningbo and Shanghai ports helps us coordinate programmes for retailers and importers around the world.\n\nThat combination of playful thinking and practical manufacturing is what carries an idea from the first sketch to game night.", category: "Inside Sunnyland", imageUrl: "/about-production.jpg", publishedAt: "2026-04-16", featured: false, sortOrder: 3 },
  { id: 10, type: "news", title: "Exhibition announcement: Hong Kong Toys & Games Fair", slug: "sunnyland-hk-toy-fair-2027", summary: "Visit Sunnyland at booth 5E-G18 in Hong Kong from 11–14 January 2027.", body: "You are cordially invited to visit Sunnyland at the Hong Kong Toys & Games Fair.\n\nDate: 11–14 January 2027\nVenue: Hong Kong Convention and Exhibition Centre, Wan Chai\nBooth number: 5E-G18\n\nWe look forward to welcoming customers, partners and new friends to our booth and sharing the latest additions to the Sunnyland range.", category: "Events", imageUrl: "/about-exhibition-1.jpg", publishedAt: "2026-08-01", featured: true, sortOrder: 0 },
  { id: 11, type: "news", title: "New arrival: 20 cm iceless curling stone", slug: "20cm-iceless-curling-stone", summary: "Our largest curling stone yet brings size, weight and glide closer to the feel of the real game.", body: "Meet this month’s featured launch: Sunnyland’s new 20 cm diameter iceless curling stone. It is the largest model in our curling stone line-up.\n\nIts generous size, considered weight and smooth glide create a playing feel that is much closer to a real curling stone—without requiring ice.\n\nThe complete set includes eight curling stones and a 4.8 ft × 4.8 ft scoring mat, ready for competitive play in homes, schools, clubs and activity spaces.", category: "New product", imageUrl: "/new-iceless-curling-stone.jpg", publishedAt: "2026-08-01", featured: false, sortOrder: 1 },
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
      body TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL,
      image_url TEXT NOT NULL,
      published_at TEXT NOT NULL,
      featured INTEGER NOT NULL DEFAULT 0,
      sort_order INTEGER NOT NULL DEFAULT 0
    )`),
    database.prepare("CREATE INDEX IF NOT EXISTS content_items_type_order_idx ON content_items(type, sort_order, published_at)"),
  ]);

  const columns = await database.prepare("PRAGMA table_info(content_items)").all<{ name: string }>();
  if (!columns.results.some((column) => column.name === "body")) {
    await database.prepare("ALTER TABLE content_items ADD COLUMN body TEXT NOT NULL DEFAULT ''").run();
  }
  await database.batch(defaultContent
    .filter((item) => item.type === "news")
    .map((item) => database.prepare(
      "UPDATE content_items SET body=? WHERE type='news' AND slug=? AND TRIM(body)=''"
    ).bind(item.body, item.slug)));

  const count = await database.prepare("SELECT COUNT(*) AS total FROM content_items").first<{ total: number }>();
  if (!count?.total) {
    await database.batch(defaultContent.map((item) => database.prepare(
      "INSERT INTO content_items (type,title,slug,summary,body,category,image_url,published_at,featured,sort_order) VALUES (?,?,?,?,?,?,?,?,?,?)"
    ).bind(item.type, item.title, item.slug, item.summary, item.body, item.category, item.imageUrl, item.publishedAt, item.featured ? 1 : 0, item.sortOrder)));
  }

  const fairNews = defaultContent.find((item) => item.slug === "sunnyland-hk-toy-fair-2027");
  if (fairNews) {
    await database.prepare(
      `UPDATE content_items SET title=?,summary=?,body=?,category=?,image_url=?,published_at=?,featured=?,sort_order=?
       WHERE type='news' AND slug=? AND body LIKE '%Booth details will be added%'`
    ).bind(
      fairNews.title,
      fairNews.summary,
      fairNews.body,
      fairNews.category,
      fairNews.imageUrl,
      fairNews.publishedAt,
      fairNews.featured ? 1 : 0,
      fairNews.sortOrder,
      fairNews.slug,
    ).run();
    await database.prepare(
      `INSERT INTO content_items (type,title,slug,summary,body,category,image_url,published_at,featured,sort_order)
       SELECT ?,?,?,?,?,?,?,?,?,?
       WHERE NOT EXISTS (SELECT 1 FROM content_items WHERE type='news' AND slug=?)`
    ).bind(
      fairNews.type,
      fairNews.title,
      fairNews.slug,
      fairNews.summary,
      fairNews.body,
      fairNews.category,
      fairNews.imageUrl,
      fairNews.publishedAt,
      fairNews.featured ? 1 : 0,
      fairNews.sortOrder,
      fairNews.slug,
    ).run();
  }

  const newCurlingNews = defaultContent.find((item) => item.slug === "20cm-iceless-curling-stone");
  if (newCurlingNews) {
    await database.prepare(
      `INSERT INTO content_items (type,title,slug,summary,body,category,image_url,published_at,featured,sort_order)
       SELECT ?,?,?,?,?,?,?,?,?,?
       WHERE NOT EXISTS (SELECT 1 FROM content_items WHERE type='news' AND slug=?)`
    ).bind(
      newCurlingNews.type,
      newCurlingNews.title,
      newCurlingNews.slug,
      newCurlingNews.summary,
      newCurlingNews.body,
      newCurlingNews.category,
      newCurlingNews.imageUrl,
      newCurlingNews.publishedAt,
      newCurlingNews.featured ? 1 : 0,
      newCurlingNews.sortOrder,
      newCurlingNews.slug,
    ).run();
  }
}

function normalise(row: Record<string, unknown>): ContentItem {
  return {
    id: Number(row.id),
    type: row.type as ContentType,
    title: String(row.title),
    slug: String(row.slug),
    summary: String(row.summary),
    body: row.body ? String(row.body) : "",
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
    "INSERT INTO content_items (type,title,slug,summary,body,category,image_url,published_at,featured,sort_order) VALUES (?,?,?,?,?,?,?,?,?,?) RETURNING *"
  ).bind(input.type, input.title, input.slug, input.summary, input.body, input.category, input.imageUrl, input.publishedAt, input.featured ? 1 : 0, input.sortOrder).first<Record<string, unknown>>();
  if (!result) throw new Error("Could not create item");
  return normalise(result);
}

export async function updateContentItem(id: number, input: ContentInput): Promise<ContentItem> {
  await ensureDatabase();
  const result = await db().prepare(
    "UPDATE content_items SET type=?,title=?,slug=?,summary=?,body=?,category=?,image_url=?,published_at=?,featured=?,sort_order=? WHERE id=? RETURNING *"
  ).bind(input.type, input.title, input.slug, input.summary, input.body, input.category, input.imageUrl, input.publishedAt, input.featured ? 1 : 0, input.sortOrder, id).first<Record<string, unknown>>();
  if (!result) throw new Error("Item not found");
  return normalise(result);
}

export async function deleteContentItem(id: number): Promise<void> {
  await ensureDatabase();
  await db().prepare("DELETE FROM content_items WHERE id=?").bind(id).run();
}
