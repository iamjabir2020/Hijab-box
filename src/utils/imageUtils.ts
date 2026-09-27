/**
 * Utilities for high-fidelity 4K image rendering and cross-origin loading.
 */

// Elegant warm fallback SVG when an image completely fails or is offline
export const FALLBACK_IMAGE_DATA_URL =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800" fill="none">
      <rect width="600" height="800" fill="#f7ebe8"/>
      <circle cx="300" cy="380" r="80" fill="#ede0d8"/>
      <path d="M260 410 C260 360, 340 360, 340 410" stroke="#ba7a7c" stroke-width="4" stroke-linecap="round" fill="none"/>
      <circle cx="300" cy="350" r="24" fill="#ba7a7c" opacity="0.8"/>
      <text x="300" y="500" font-family="'Google Sans', sans-serif" font-size="16" fill="#844c4e" text-anchor="middle" letter-spacing="3">HIJAB BOX</text>
      <text x="300" y="525" font-family="'Google Sans', sans-serif" font-size="12" fill="#655d56" text-anchor="middle" letter-spacing="1">Artisanal Modesty</text>
    </svg>
  `);

/**
 * Transforms Google User Content URLs into pristine 4K uncompressed resolution (=s0)
 * and ensures any existing downsampling parameters are removed.
 */
export function to4kUrl(url: string | undefined): string {
  if (!url) return FALLBACK_IMAGE_DATA_URL;
  if (url.includes('googleusercontent.com')) {
    const clean = url.split('=')[0];
    return `${clean}=s0`;
  }
  return url;
}

/**
 * Handles image loading errors gracefully without displaying broken image icons
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc = FALLBACK_IMAGE_DATA_URL
) {
  const target = event.currentTarget;
  if (target.src !== fallbackSrc) {
    target.src = fallbackSrc;
  }
}
