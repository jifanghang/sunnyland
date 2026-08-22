export const productCategories = [
  "Curling game",
  "Outdoor Leisure Sports",
  "Indoor Sports",
  "Indoor Game",
] as const;

export type ProductCategory = (typeof productCategories)[number];

export function normaliseProductCategory(category: string, slug = ""): ProductCategory {
  if (productCategories.includes(category as ProductCategory)) {
    return category as ProductCategory;
  }

  const code = slug.toUpperCase();
  if (code.startsWith("SSC")) return "Curling game";
  if (slug.toLowerCase().startsWith("outdoor-")) return "Outdoor Leisure Sports";
  if (slug.toLowerCase().startsWith("indoor-game-")) return "Indoor Game";
  if (["SSB001", "SSB002", "SSD001", "SSD002", "SSD003", "SSG001", "SSG002", "SST001", "SST002", "SST003"].includes(code)) {
    return "Indoor Sports";
  }

  switch (category.trim().toLowerCase()) {
    case "curling":
    case "curling & shuffleboard":
    case "curling and shuffleboard":
      return "Curling game";
    case "darts":
    case "indoor sports":
    case "other indoor sports":
      return "Indoor Sports";
    case "golf":
    case "lawn games":
    case "outdoor games":
    case "outdoor leisure sports":
      return "Outdoor Leisure Sports";
    case "board games":
    case "party games":
    case "indoor game":
    default:
      return "Indoor Game";
  }
}
