export function getHighResolutionImageUrl(
  imageUrl: string | null | undefined
): string | null {
  if (!imageUrl) return null;

  return imageUrl.replace(
    /s\.jpg$/i,
    "rd-w1280_h960.webp"
  );
}