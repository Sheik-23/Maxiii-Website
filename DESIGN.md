# MAXIII  -  Design System & Agent Guidance (`DESIGN.md`)

This file governs how coding agents, engineers, and designers build pages and interfaces for **MAXIII**. It establishes our visual judgment, bounded tokens, voice rules, and explicit anti-patterns.

---

## 1. Scope & Product Truths

MAXIII is a mobile calorie and macro tracker built specifically for the Indian market. **Gym-goers and lifters come first, everyday home-food users second.**

### Core Promise
In MAXIII, every macro is tracked from day one. Carbohydrates, dietary fibre, protein, and fat are foundational nutrition data.

### Uncompromising Product Facts (Only Claim What Is True)
- **Home-Cooked Yield Engine**: Raw to cooked, with oil and ghee counted.
- **Native Household Measures**: Standard katori, large katori, cooking ladles, and precision grams.
- **Multi-Language Search**: Database indexed across English, Tamil, Hindi, and Telugu.
- **Features**: Barcode scanner ("Scan packaged foods to log them faster"), customisation, and adaptive calorie targets ("Your target adjusts as your body responds").
- **Planned Expansion**: Affordable gym wear marketplace for lifters.
- **Launch Model**: 14 days free. No payment up front. Then a subscription.

---

## 2. Hard Constraints & Named Anti-Patterns

Any page or component containing the following patterns is an **immediate failure**:

| Anti-Pattern Name | Description | What to Do Instead |
| :--- | :--- | :--- |
| **`ai-mention`** | Mentioning "AI", "AI coach", "AI summary", "0% synthetic AI", sparkles (✨), or automated AI diet advice. | **MAXIII has zero AI mentions.** Focus strictly on macros, raw-to-cooked yield, and adaptive targets. |
| **`ifct-icmr-claim`** | Mentioning "ICMR-NIN", "IFCT", or unconfirmed data source baselines. | Omit unconfirmed data sources. Refer simply to the Indian food and home cooking database. |
| **`paywall-language`** | Using the words "paywall", "hard paywall", "locked", "upsell", or "zero payment". | Use the friendly line: **"14 days free. No payment up front."** |
| **`phonetic-leak`** | Writing "maxeee" anywhere on screen. | "maxeee" is for spoken audio/voiceovers only. The visual brand is strictly **`maxiii`** (lowercase wordmark) or **`MAXIII`** (in prose). |
| **`competitor-attacks`** | Calling out competitors ("HealthifyMe", "Most Indian fitness apps hide...", etc.). | Speak directly about MAXIII's own values: "Every macro, from day one." |
| **`regional-cliche`** | Using regional-language words in marketing copy (e.g., "tadka", "phulka", "desi"). | Use crisp, international English. |
| **`fake-numbers`** | Claiming invented stats, fake caloric estimates (+40 kcal, 2,380 kcal, etc.). | Label graphs "Illustration". |
| **`generic-cta-drift`** | Using mixed CTA labels ("Claim spot", "Get started", "Explore"). | Use one CTA everywhere: **"Join the waitlist"**. |

---

## 3. Brand Identity & Visual Language

### Wordmark Rules
- Logo is a lowercase **`maxiii`** wordmark.
- Heavy geometric letters, single-story `a`, flat terminals, and three round circular dots centered over the three `i` stems.
- Color: Amber/orange (`#F59E0B`).

### Color Tokens
```css
--color-cobalt: #1428D0;
--color-mustard: #EBB945;
--color-deep-red: #7C0F0F;
--color-burnt-orange: #E4501A;
--color-saffron: #FF8A1F;
--color-cream: #FBF1DC;
--color-black: #000000;
```

---

## 4. Copywriting Standard

1. **One CTA Everywhere**: `"Join the waitlist"`
2. **One Commercial Line Everywhere**: `"14 days free. No payment up front."`
3. **Yield Headline**: `"Raw to cooked, with oil and ghee counted."`
4. **Adaptive Headline**: `"Your target adjusts as your body responds."`
5. **Macro Headline**: `"Every macro, from day one."`
