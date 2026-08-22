export const productGalleries: Record<string, readonly string[]> = {};

export function galleryFor(code: string, primaryImage: string): readonly string[] {
  return productGalleries[code.toUpperCase()] ?? [primaryImage];
}
