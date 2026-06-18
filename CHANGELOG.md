# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0]

### Added

- Initial release.
- `<LiquidGlass>` polymorphic component with SVG filter-based refraction.
- Props: `backdropBlur`, `tintColor`, `displacementScale`, `turbulenceBaseFrequency`, `turbulenceSeed`, `glassBorder`, `as`, `className`, `style`.
- Safari/iOS automatic fallback via simplified filter chain.
- Hydration-safe `useBrowserDetection` hook.
- `'use client'` directive baked into ESM and UMD builds (Next.js App Router compatibility).
- Full TypeScript types bundled.
