# MAXIII Website Audit: Prototype to Awwwards Site of the Day

This audit identifies every element in the current implementation that reads as a prototype, generic template, or flat web layout, along with the architectural plan to elevate the site into an Awwwards Site of the Day contender.

---

## 1. Depth & Visual Layering ("The Plate is a Poster")
- **Issue**: Several sections (`HomeFoodScene`, `GymwearScannerScene`, `MacrosScene`) currently rely on flat solid color fields with text cards, lacking the signature magazine-cover poster depth.
- **Root Cause**: There is no depth layering between typography and visual subjects.
- **Fix**: Build a reusable `<PosterLayer>` component system featuring 5 discrete depth planes:
  1. *Background field* (saturated poster color).
  2. *Giant typographic backdrop* (condensed display type with outline/fill variants, bleeding off screen).
  3. *Subject cutout plane* (transparent-background subject floating in front of giant letters, casting subtle poster contact shadows).
  4. *Foreground editorial typography* (Bodoni italic accents, precise serif captions, magazine folio details).
  5. *Layered parallax engine* with distinct scroll velocities per plane.

---

## 2. Subject Imagery & Placeholders
- **Issue**: Lack of photographic subject matter leaves sections feeling purely typographic.
- **Root Cause**: Cutout food, gym, and device assets have not yet been placed in `/public/assets/`.
- **Fix**:
  - Create `/public/assets/` and `ASSETS.md` specifying exact requirements for transparent WebP cutouts (dal katori, roti stack, rice bowl, sabzi, barbell silhouette, folded training apparel, packaged snack with barcode).
  - Provide structured, labeled poster placeholder frames with architectural wireframes and dimensional annotations until real photography is supplied.
  - Create `/public/app-screens/` for real app screenshots, backed by a 3D-tilted device component (`DeviceFrame3D.tsx`) with neutral "App preview coming" states - never inventing UI features.

---

## 3. Motion System & Easings
- **Issue**: Animations use mixed default GSAP `power3.out` or standard CSS transitions without a unified cinematic feel.
- **Root Cause**: Lack of a centralized motion token system.
- **Fix**:
  - Implement `src/motion/tokens.ts` defining 3 calibrated durations (`fast: 0.35s`, `base: 0.75s`, `slow: 1.2s`), 3 custom cubic-bezier easings (`dramaticEnter`, `smoothExit`, `punchyBounce`), and 1 unified stagger rule (`0.08s`).
  - Introduce velocity-based skew on giant typography during fast scrolls.
  - Add pinned scroll storytelling with full-bleed poster color wipes.
  - Implement masked line-by-line text reveals and clip-path polygon reveals.
  - Add magnetic physics to primary CTAs.
  - Enhance custom cursor with explicit states: `default`, `link`, `drag`, `view`.

---

## 4. WebGL & Halftone Shader
- **Issue**: The halftone moon is implemented on a CPU 2D canvas context, missing GPU shader depth, film grain integration, and cursor reaction.
- **Root Cause**: Missing hardware-accelerated WebGL implementation.
- **Fix**:
  - Implement a dedicated WebGL canvas component (`WebGLHeroPoster.tsx`) running custom vertex and fragment shaders.
  - Features: Lit-sphere dithered halftone shading, real-time mouse coordinate tracking, subtle film grain noise pass, and cursor displacement ripple.
  - Performance: DPR capped at 2, automatic `requestAnimationFrame` pause when out of viewport via `IntersectionObserver`, and graceful CSS fallback for `prefers-reduced-motion` or low-power modes.

---

## 5. Preloader & Transitions
- **Issue**: The preloader is an abrupt curtain split without numerical loading feedback. Route transitions do not feel like intentional poster wipes.
- **Root Cause**: Prototype loader without progress interpolation.
- **Fix**:
  - Upgrade preloader to include an active 0–100% numerical counter, SVG wordmark fill animation, and staged curtain split.
  - Build circular clip-path route wipe originating exactly from click coordinates in rich poster colors.

---

## 6. Typography & Micro-Interactions
- **Issue**: Missing refined micro-details: default browser scrollbars, standard text selection, missing sound toggle, and basic 404 page.
- **Fix**:
  - Styled scrollbar (`::-webkit-scrollbar`) matching dark saffron palette.
  - Branded text selection (`::selection`) in vibrant saffron `#FF8A1F` with black text.
  - Synthesized Web Audio API subtle sound feedback (OFF by default, tactile micro-clicks on hover/toggle without external audio files).
  - Animated SVG favicon that indicates focus state.
  - Standalone magazine-cover 404 poster page with navigation back to safety.

---

## 7. Layout Pacing & Horizontal Gallery
- **Issue**: Linear vertical stack of sections creates rhythm fatigue.
- **Fix**:
  - Introduce a pinned horizontal poster exhibition strip showcasing the art direction.
  - Enforce strict restraint: one signature interaction moment per section, eliminating clutter.

