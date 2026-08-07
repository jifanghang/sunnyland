import { env } from "cloudflare:workers";
import { normaliseProductCategory } from "../lib/product-categories";

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
  { id: 1, type: "product", title: "Golf pong game set", slug: "SSG011", summary: "A putting-green party challenge for 2–4 players, complete with putters, golf balls and scoring-hole covers.", body: "Players putt towards the opposing team’s holes, covering each successful target until one side completes the board. The long artificial-grass mat rolls up for compact storage and supports indoor or outdoor play.\n\nThe set includes a putting mat, two putters, golf balls, scoring-hole covers and a carry bag.", category: "Other indoor sports", imageUrl: "/product-ssg011.jpg", publishedAt: "2026-08-06", featured: true, sortOrder: 1 },
  { id: 2, type: "product", title: "Fast sling puck game", slug: "SSB002", summary: "A rapid two-player wooden tabletop game built around aim, speed and instant rematches.", body: "Each player uses the elastic launcher to send wooden pucks through the centre gate. The first player to clear every puck from their side wins.\n\nAvailable in large and small formats, the solid-wood game supports hand-eye coordination and packs easily for family play.", category: "Other indoor sports", imageUrl: "/product-ssb002.jpg", publishedAt: "2026-08-06", featured: false, sortOrder: 2 },
  { id: 3, type: "product", title: "3-in-1 giant checkers set", slug: "SSB001", summary: "Oversized checkers, tic-tac-toe and a reversible game rug in one portable family set.", body: "This three-in-one set combines giant checkers, tic-tac-toe and an additional play format on a reversible rug. Large pieces and a clear playing surface make it easy to use at home, school, parties and events.", category: "Other indoor sports", imageUrl: "/product-ssb001.jpg", publishedAt: "2026-08-06", featured: false, sortOrder: 3 },
  { id: 4, type: "product", title: "Tabletop air hockey game", slug: "SSO020", summary: "A compact battery-powered air hockey table with smooth airflow, two pushers, pucks and built-in scoring.", body: "The 21-inch tabletop format brings air hockey to any flat surface without occupying a full games room. Dense fibreboard construction, foam-protected feet and double airflow create smooth play while protecting furniture.\n\nThe set includes two pushers, pucks and sliding scorers and is powered by eight AA batteries.", category: "Other indoor sports", imageUrl: "/product-sso020.jpg", publishedAt: "2026-08-06", featured: false, sortOrder: 4 },
  { id: 5, type: "product", title: "Mini aluminium tabletop basketball", slug: "SSO001", summary: "A foldable desktop basketball launcher that turns any table into a quick shooting challenge.", body: "Place the tethered ball in the launcher, pull back and aim for the miniature hoop. The compact aluminium-alloy game supports hand-eye coordination without loose balls rolling away.\n\nIt folds for easy storage and travel and includes the complete miniature basketball game with instructions.", category: "Other indoor sports", imageUrl: "/product-sso001.jpg", publishedAt: "2026-08-06", featured: false, sortOrder: 5 },
  { id: 6, type: "product", title: "4-player magnetic skill game", slug: "SSO014", summary: "An energetic four-player tabletop challenge that combines the feel of foosball and air hockey.", body: "Players use magnetic controls to manoeuvre their pieces and compete around the tabletop arena. Fast reactions, aim and positioning keep every round active for children and adults.\n\nThe four-player format makes it a natural choice for family game nights, parties and group play.", category: "Other indoor sports", imageUrl: "/product-sso014.jpg", publishedAt: "2026-08-06", featured: false, sortOrder: 6 },
  { id: 7, type: "product", title: "Portable table tennis set", slug: "SSO009", summary: "A take-anywhere table tennis kit with a retractable net, two paddles, six balls and a carry bag.", body: "The lightweight retractable net fits a wide range of tables and packs down quickly after play. Durable mesh, two paddles and six balls make the set ready for children and adults at home, on holiday or outdoors.", category: "Other indoor sports", imageUrl: "/product-sso009.jpg", publishedAt: "2026-08-06", featured: false, sortOrder: 7 },
  { id: 8, type: "product", title: "Spike ball game set", slug: "SSO004", summary: "A three-ball net game for fast team play indoors, in the garden, at the park or on the beach.", body: "Teams strike the ball onto the central net and work together to return each shot. The fast-moving format develops hand-eye coordination, reactions and teamwork.\n\nThe kit includes the playing net, three balls and a carry bag for portable indoor and outdoor play.", category: "Other indoor sports", imageUrl: "/product-sso004.jpg", publishedAt: "2026-08-06", featured: false, sortOrder: 8 },
  { id: 9, type: "product", title: "Reversible roll-up magnetic dartboard", slug: "SSDT005", summary: "A double-sided 15-inch roll-up dartboard with eight child-safe magnetic darts and easy hanging.", body: "The front uses a traditional dartboard layout while the reverse offers an alternative target game. Strong magnetic tips give a satisfying hold without sharp points, making the set suitable for family play indoors or outside.\n\nThe flexible board rolls for compact storage and includes eight magnetic darts.", category: "Other indoor sports", imageUrl: "/product-ssdt005.jpg", publishedAt: "2026-08-06", featured: false, sortOrder: 9 },
  { id: 10, type: "product", title: "Magnetic dartboard game", slug: "SSDT003", summary: "A classic 37 cm magnetic dartboard with eight safe darts and a simple rear hanging slot.", body: "Magnetic tips recreate the aim and scoring of darts without sharp points or damaged walls. The strong magnets hold where they land for reliable family competition.\n\nThe set includes a 37 cm dartboard and eight magnetic darts, four red and four yellow.", category: "Other indoor sports", imageUrl: "/product-ssdt003.jpg", publishedAt: "2026-08-06", featured: false, sortOrder: 10 },
  { id: 11, type: "product", title: "Pop-up golf chipping practice net", slug: "SSG001", summary: "An 86 × 66 cm foldable chipping target for practice, games and friendly competitions outdoors.", body: "The pop-up target offers a generous practice area while folding down for transport and storage. Multiple scoring zones help players work on accuracy in the garden, park or campsite.", category: "Outdoor leisure sports", imageUrl: "/product-ssg001.jpg", publishedAt: "2026-08-06", featured: true, sortOrder: 11 },
  { id: 12, type: "product", title: "Premium kubb game set", slug: "SSL008", summary: "A complete 21-piece solid-pine Viking lawn game for gardens, beaches, campsites and snow.", body: "Teams throw wooden batons to knock down the opposing kubbs before taking aim at the king. The game is easy to learn, tactical to master and suitable across grass, sand, dirt or snow.\n\nThe set includes one king, ten kubb blocks, six batons and four boundary sticks.", category: "Outdoor leisure sports", imageUrl: "/product-ssl008.jpg", publishedAt: "2026-08-06", featured: false, sortOrder: 12 },
  { id: 13, type: "product", title: "Giant wooden dice set of 6", slug: "SSL006", summary: "Six oversized wooden dice that bring larger-than-life play to familiar dice and lawn games.", body: "The oversized wooden format adds tactile, easy-to-see fun to classic dice games. Use the set on lawns, at campsites, for parties or as a flexible component in original outdoor game ideas.", category: "Outdoor leisure sports", imageUrl: "/product-ssl006.jpg", publishedAt: "2026-08-06", featured: false, sortOrder: 13 },
  { id: 14, type: "product", title: "6-piece French boules set", slug: "SSL001", summary: "A classic six-ball chrome-plated iron boules set for gardens, parks, beaches and holidays.", body: "The set includes six chrome-plated iron boules for traditional target play. Its durable, portable format makes it easy to bring friendly competition to gardens, parks, campsites and beaches.", category: "Outdoor leisure sports", imageUrl: "/product-ssl001.jpg", publishedAt: "2026-08-06", featured: false, sortOrder: 14 },
  { id: 15, type: "product", title: "Ladder ball toss game set", slug: "SSL002", summary: "A durable, portable ladder toss set designed for quick setup and repeat outdoor play.", body: "Players throw bolas towards the ladder rungs to build their score. The lightweight frame assembles and packs down easily for gardens, campsites, events and family afternoons.", category: "Outdoor leisure sports", imageUrl: "/product-ssl002.jpg", publishedAt: "2026-08-06", featured: false, sortOrder: 15 },
  { id: 16, type: "product", title: "Wooden number block toss", slug: "SSL003", summary: "A tactile wooden throwing game where every knockdown creates a new scoring decision.", body: "Players toss the throwing pin towards numbered wooden blocks. Knock down one block to score its number, or several blocks to score the number of blocks toppled.\n\nThe compact format is easy to teach and brings simple strategy to lawns, campsites and events.", category: "Outdoor leisure sports", imageUrl: "/product-ssl003.jpg", publishedAt: "2026-08-06", featured: false, sortOrder: 16 },
  { id: 17, type: "product", title: "16-piece shot glass roulette", slug: "SSD002", summary: "A roulette-inspired party centrepiece with sixteen numbered glasses and a spinning wheel.", body: "Players spin the wheel and follow the numbered result for a simple social party game. The set combines sixteen glasses, a roulette wheel and steel ball in a compact presentation made for group occasions.", category: "Indoor game", imageUrl: "/product-ssd002.jpg", publishedAt: "2026-08-06", featured: true, sortOrder: 17 },
  { id: 18, type: "product", title: "Shot glass drop game", slug: "SSD001", summary: "A colourful social game where players drop tokens through the board to select a matching glass.", body: "Place the coloured glasses beneath the board, choose a token and take turns dropping it through the pegs. The final landing position decides the next action, making each round quick, visual and unpredictable.", category: "Indoor game", imageUrl: "/product-ssd001.jpg", publishedAt: "2026-08-06", featured: false, sortOrder: 18 },
  { id: 19, type: "product", title: "Wheel of shots", slug: "SSD007", summary: "A compact spinning-wheel party game that turns every round into a quick surprise.", body: "Players take turns spinning the wheel and following the result. The simple format is easy to introduce at parties and group occasions, while the compact construction stores and displays neatly.", category: "Indoor game", imageUrl: "/product-ssd007.jpg", publishedAt: "2026-08-06", featured: false, sortOrder: 19 },
  { id: 20, type: "product", title: "Spin the shot", slug: "SSD008", summary: "A tabletop spinner game with a central glass, made for simple, fast-moving social rounds.", body: "Set the glass in the centre, spin the pointer and follow where it lands. Minimal setup and clear play make this an easy party-game addition for adult social occasions.", category: "Indoor game", imageUrl: "/product-ssd008.jpg", publishedAt: "2026-08-06", featured: false, sortOrder: 20 },
  { id: 21, type: "product", title: "Roulette shots game set", slug: "SSD009", summary: "A numbered roulette drinking-game set where one spin determines the next glass.", body: "Arrange the numbered glasses around the wheel, spin and let the result choose the next move. The familiar roulette format makes the rules immediate and keeps group rounds moving.", category: "Indoor game", imageUrl: "/product-ssd009.jpg", publishedAt: "2026-08-06", featured: false, sortOrder: 21 },
  { id: 22, type: "product", title: "Hook and ring toss game", slug: "SSO021", summary: "A handmade wooden hook-and-ring challenge with a scoring ladder for children and adults.", body: "Players swing the ring towards the hook and move their marker along the scoring ladder after each success. The compact wooden set supports head-to-head play at home, parties and family gatherings.", category: "Indoor game", imageUrl: "/product-sso021.jpg", publishedAt: "2026-08-06", featured: false, sortOrder: 22 },
  { id: 7, type: "news", title: "Six floor curling sets, one focused range", slug: "six-floor-curling-sets", summary: "From 8 cm mini stones to our 20 cm model, the current Sunnyland range offers six clearly sized floor curling sets.", body: "Sunnyland’s current curling collection comprises six floor curling stone sets: SSC001-A, SSC001-B, SSC001-C, SSC001-D, SSC001-E and SSC001-F. Every set includes eight stones and a target mat for off-ice play.\n\nThe range covers 8 cm, 11 cm, 17 cm, 19 cm, 19.5 cm and 20 cm stone diameters, with target mats selected for each format—from compact square targets to full-length playing surfaces.\n\nThis focused line-up gives retailers, schools, clubs and activity spaces a clear choice of scale while keeping the familiar tactics, teamwork and satisfying glide of curling.", category: "Product range", imageUrl: "/curling-ssc001-a.jpg", publishedAt: "2026-06-21", featured: true, sortOrder: 1 },
  { id: 8, type: "news", title: "Why floor curling keeps everyone moving", slug: "floor-curling-guide", summary: "A simple guide to setup, scoring and the small details that make the game so inclusive.", body: "Floor curling keeps the strategy of the ice while removing the need for skates, cold conditions or a specialist rink. A smooth indoor floor is enough to begin.\n\nPlayers take turns sending stones towards a target, balancing accuracy, weight and teamwork. Because the motion is controlled and the rules are easy to explain, the game works well across ages and ability levels.\n\nStart with short rounds, clear scoring zones and teams of two to four. Once everyone understands the pace, introduce blocking shots and tactical placement.", category: "How to play", imageUrl: "/curling-floor.jpg", publishedAt: "2026-05-30", featured: false, sortOrder: 2 },
  { id: 9, type: "news", title: "From Ningbo to game night", slug: "made-in-ningbo", summary: "A look at how our team develops, checks and prepares new games for markets around the world.", body: "Every product begins with a play experience: what should people do, feel and want to repeat? From there, our Ningbo team turns the idea into materials, mechanisms, samples and packaging.\n\nApproved designs move through production and quality checks before export preparation. Close access to Ningbo and Shanghai ports helps us coordinate programmes for retailers and importers around the world.\n\nThat combination of playful thinking and practical manufacturing is what carries an idea from the first sketch to game night.", category: "Inside Sunnyland", imageUrl: "/about-production.jpg", publishedAt: "2026-04-16", featured: false, sortOrder: 3 },
  { id: 10, type: "news", title: "Exhibition announcement: Hong Kong Toys & Games Fair", slug: "sunnyland-hk-toy-fair-2027", summary: "Visit Sunnyland at booth 5E-G18 in Hong Kong from 11–14 January 2027.", body: "You are cordially invited to visit Sunnyland at the Hong Kong Toys & Games Fair.\n\nDate: 11–14 January 2027\nVenue: Hong Kong Convention and Exhibition Centre, Wan Chai\nBooth number: 5E-G18\n\nWe look forward to welcoming customers, partners and new friends to our booth and sharing the latest additions to the Sunnyland range.", category: "Events", imageUrl: "/exhibition.jpg", publishedAt: "2026-08-01", featured: true, sortOrder: 0 },
  { id: 11, type: "news", title: "SSC001-F: our 20 cm floor curling set", slug: "20cm-iceless-curling-stone", summary: "The largest model in our current floor curling range pairs eight 20 cm stones with a full-length target mat.", body: "Meet SSC001-F, Sunnyland’s floor curling stone set with eight 20 cm diameter stones. It is the largest stone size in our current six-product curling range.\n\nIts generous size, considered weight and smooth glide bring the tactics and teamwork of curling to smooth indoor floors without requiring ice.\n\nThe complete set includes eight curling stones and a 150 cm × 520 cm target mat, ready for competitive play in homes, schools, clubs and activity spaces.", category: "New product", imageUrl: "/curling-ssc001-f.jpg", publishedAt: "2026-08-01", featured: false, sortOrder: 1 },
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
  if (!columns.results.some((column: { name: string }) => column.name === "body")) {
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

  const catalogueProducts = defaultContent.filter((item) => item.type === "product");
  const catalogueCount = await database.prepare(
    `SELECT COUNT(DISTINCT slug) AS total FROM content_items
     WHERE type='product' AND slug IN ('SSG011','SSB002','SSB001','SSO020','SSO001','SSO014','SSO009','SSO004','SSDT005','SSDT003','SSG001','SSL008','SSL006','SSL001','SSL002','SSL003','SSD002','SSD001','SSD007','SSD008','SSD009','SSO021')`
  ).first<{ total: number }>();
  if ((catalogueCount?.total ?? 0) < catalogueProducts.length) {
    await database.batch(catalogueProducts.map((item) => database.prepare(
      `INSERT INTO content_items (type,title,slug,summary,body,category,image_url,published_at,featured,sort_order)
       SELECT ?,?,?,?,?,?,?,?,?,?
       WHERE NOT EXISTS (SELECT 1 FROM content_items WHERE type='product' AND slug=?)`
    ).bind(
      item.type,
      item.title,
      item.slug,
      item.summary,
      item.body,
      item.category,
      item.imageUrl,
      item.publishedAt,
      item.featured ? 1 : 0,
      item.sortOrder,
      item.slug,
    )));

    await database.batch(catalogueProducts.map((item) => database.prepare(
      `UPDATE content_items SET title=?,summary=?,body=?,category=?,image_url=?,published_at=?,featured=?,sort_order=?
       WHERE type='product' AND slug=? AND image_url IN ('/golf.jpg','/ladder-ball.jpg','/wooden-toss.jpg','/checkers.jpg','/sling-puck.jpg','/roulette.jpg')`
    ).bind(
      item.title,
      item.summary,
      item.body,
      item.category,
      item.imageUrl,
      item.publishedAt,
      item.featured ? 1 : 0,
      item.sortOrder,
      item.slug,
    )));
  }

  const fairNews = defaultContent.find((item) => item.slug === "sunnyland-hk-toy-fair-2027");
  if (fairNews) {
    await database.prepare(
      "UPDATE content_items SET image_url=? WHERE type='news' AND slug=? AND image_url='/about-exhibition-1.jpg'"
    ).bind(fairNews.imageUrl, fairNews.slug).run();
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

  const curlingRangeNews = defaultContent.find((item) => item.slug === "six-floor-curling-sets");
  if (curlingRangeNews) {
    await database.prepare(
      `UPDATE content_items SET title=?,slug=?,summary=?,body=?,category=?,image_url=?,published_at=?,featured=?,sort_order=?
       WHERE type='news' AND slug='shuffleboard-curling' AND image_url='/curling-2in1.jpg'`
    ).bind(
      curlingRangeNews.title,
      curlingRangeNews.slug,
      curlingRangeNews.summary,
      curlingRangeNews.body,
      curlingRangeNews.category,
      curlingRangeNews.imageUrl,
      curlingRangeNews.publishedAt,
      curlingRangeNews.featured ? 1 : 0,
      curlingRangeNews.sortOrder,
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
    await database.prepare(
      `UPDATE content_items SET title=?,summary=?,body=?,category=?,image_url=?,published_at=?,featured=?,sort_order=?
       WHERE type='news' AND slug=? AND (image_url='/new-iceless-curling-stone.jpg' OR body LIKE '%4.8 ft%')`
    ).bind(
      newCurlingNews.title,
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

  await database.prepare(
    `UPDATE content_items
     SET category = CASE
       WHEN slug IN ('SSG011','SSB001','SSB002','SSO020','SSO001','SSO014','SSO009','SSO004','SSDT005','SSDT003') THEN 'Other indoor sports'
       WHEN slug IN ('SSG001','SSL008','SSL006','SSL001','SSL002','SSL003') THEN 'Outdoor leisure sports'
       WHEN slug IN ('SSD002','SSD001','SSD007','SSD008','SSD009','SSO021') THEN 'Indoor game'
       WHEN category IN ('Curling', 'Curling & shuffleboard', 'Curling and shuffleboard') THEN 'Curling game'
       WHEN category IN ('Darts', 'Indoor sports') THEN 'Other indoor sports'
       WHEN category IN ('Golf', 'Lawn games', 'Outdoor games') THEN 'Outdoor leisure sports'
       WHEN category IN ('Board games', 'Party games') THEN 'Indoor game'
       ELSE category
     END
     WHERE type = 'product'`
  ).run();
}

function normalise(row: Record<string, unknown>): ContentItem {
  return {
    id: Number(row.id),
    type: row.type as ContentType,
    title: String(row.title),
    slug: String(row.slug),
    summary: String(row.summary),
    body: row.body ? String(row.body) : "",
    category: row.type === "product"
      ? normaliseProductCategory(String(row.category), String(row.slug))
      : String(row.category),
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
