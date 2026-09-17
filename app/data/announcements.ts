export const megaShowAnnouncement = {
  id: 12,
  type: "news" as const,
  title: "Meet Sunnyland at HK MEGA SHOW 2026",
  slug: "sunnyland-hk-mega-show-2026",
  summary: "Visit us at booth 3C-C38 in Hong Kong from 20–23 October 2026 to explore our sports and games range.",
  body: "Sunnyland will be attending HK MEGA SHOW from 20–23 October 2026. We invite customers, partners and new visitors to meet our team at booth 3C-C38.\n\nDates: 20–23 October 2026\nBooth: 3C-C38\nLocation: Hong Kong\n\nExplore our sports and games range and talk with us about your market, product ideas and upcoming orders. To arrange a meeting, contact info@chinasunnyland.com. We look forward to seeing you there.",
  category: "Events",
  imageUrl: "/news-hk-mega-show-2026.jpg",
  publishedAt: "2026-09-17",
  featured: true,
  sortOrder: -1,
};

export const exhibitionDetails: Record<string, { booth: string; dates: string }> = {
  "sunnyland-hk-mega-show-2026": { booth: "3C-C38", dates: "20–23 Oct 2026" },
  "sunnyland-hk-toy-fair-2027": { booth: "5E-G18", dates: "11–14 Jan 2027" },
};
