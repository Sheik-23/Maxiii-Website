# MAXIII Asset Specification Guide (`ASSETS.md`)

This document lists the exact photographic cutout assets and app screens required for the MAXIII marketing website. Until real assets are placed in these folders, the site renders architectural, labeled poster placeholders with zero fake stock photos.

---

## 1. Food Cutout Subjects (`/public/assets/food/`)
All food assets must be **transparent-background WebP cutouts** (`.webp`), shot from a high-angle 45° or top-down perspective with realistic natural lighting and soft contact shadows.

| File Name | Description | Recommended Dimensions | Format |
| :--- | :--- | :--- | :--- |
| `plate-cutout.webp` | Home-cooked dish on a dinner plate. | 1200 × 1200 px | Transparent WebP (lossless/90+ quality) |
| `portion-cutout.webp` | Cooked grain portion or flatbread stack with natural sheen. | 1200 × 1200 px | Transparent WebP |
| `grain-bowl.webp` | Steamed rice or grain bowl. | 1200 × 1200 px | Transparent WebP |
| `dish-plate.webp` | Cooked vegetable or protein dish on a serving plate. | 1200 × 1200 px | Transparent WebP |

---

## 2. Gym & Training Floor Cutout Subjects (`/public/assets/gym/`)
All gym and training assets must be **transparent-background WebP cutouts** (`.webp`).

| File Name | Description | Recommended Dimensions | Format |
| :--- | :--- | :--- | :--- |
| `lifter-silhouette.webp` | High-contrast cutout or silhouette of a lifter during a deadlift or squat. | 1400 × 1800 px | Transparent WebP |
| `barbell-plates.webp` | Olympic barbell iron plates with chalk texture. | 1200 × 1200 px | Transparent WebP |
| `packaged-barcode.webp` | Packaged food snack showing nutritional label and visible barcode. | 1000 × 1400 px | Transparent WebP |

---

## 3. Real App Screenshots (`/public/app-screens/`)
**STRICT POLICY**: Only real screens from the production MAXIII iOS/Android build are permitted. Never invent UI features, fictional graphs, or fabricated numbers.

| File Name | Description | Recommended Dimensions | Format |
| :--- | :--- | :--- | :--- |
| `screen-macros.webp` | Home screen / meal logging stream showing carbs, fibre, protein, and fat. | 1170 × 2532 px (iPhone 14/15/16 Pro) | WebP or PNG |
| `screen-yield.webp` | Raw-to-cooked yield engine calculation for home cooking. | 1170 × 2532 px | WebP or PNG |
| `screen-adaptive.webp` | Adaptive expenditure / TDEE trend illustration. | 1170 × 2532 px | WebP or PNG |
| `screen-scanner.webp` | Barcode scanner camera viewport and food identification. | 1170 × 2532 px | WebP or PNG |
| `screen-customise.webp` | Customisation settings setup around routine. | 1170 × 2532 px | WebP or PNG |
| `screen-floor.webp` | Clean, dark training floor interface for logging between sets. | 1170 × 2532 px | WebP or PNG |
| `screen-gymwear.webp` | Curated training apparel preview (coming after launch). | 1170 × 2532 px | WebP or PNG |

*Note*: If screenshots are not yet available, the website's `<DeviceFrame3D>` component automatically renders a high-fidelity neutral device frame labeled `"App preview coming"` without inventing UI.
