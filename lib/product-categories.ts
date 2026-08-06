export const productCategories = [
  "Curling game",
  "Other indoor sports",
  "Outdoor leisure sports",
  "Indoor game",
] as const;

export type ProductCategory = (typeof productCategories)[number];

export function normaliseProductCategory(category: string, slug = ""): ProductCategory {
  if (productCategories.includes(category as ProductCategory)) {
    return category as ProductCategory;
  }

  const code = slug.toUpperCase();
  if (code.startsWith("SSC")) return "Curling game";
  if (code === "SSB002") return "Other indoor sports";
  if (code.startsWith("SSG") || code.startsWith("SSL")) return "Outdoor leisure sports";
  if (code.startsWith("SSB") || code.startsWith("SSD")) return "Indoor game";

  switch (category.trim().toLowerCase()) {
    case "curling":
    case "curling & shuffleboard":
    case "curling and shuffleboard":
      return "Curling game";
    case "darts":
    case "indoor sports":
      return "Other indoor sports";
    case "golf":
    case "lawn games":
    case "outdoor games":
      return "Outdoor leisure sports";
    case "board games":
    case "party games":
    default:
      return "Indoor game";
  }
}
