export const productGalleries: Record<string, readonly string[]> = {
  SSB001: ["/product-ssb001.jpg", "/product-ssb001-2.jpg"],
  SSB002: ["/product-ssb002.jpg", "/product-ssb002-2.jpg", "/product-ssb002-3.jpg"],
  SSG001: ["/product-ssg001.jpg", "/product-ssg001-2.jpg", "/product-ssg001-3.jpg", "/product-ssg001-4.jpg"],
  SSL001: ["/product-ssl001.jpg", "/product-ssl001-2.jpg"],
  SSL003: ["/product-ssl003.jpg", "/product-ssl003-2.jpg"],
  SSD001: ["/product-ssd001.jpg", "/product-ssd001-2.jpg", "/product-ssd001-3.jpg"],
  SSD002: ["/product-ssd002.jpg", "/product-ssd002-2.jpg", "/product-ssd002-3.jpg"],
};

export function galleryFor(code: string, primaryImage: string): readonly string[] {
  return productGalleries[code.toUpperCase()] ?? [primaryImage];
}
