# Apothecary Express — Design System & Architecture Specification

> **Stitch Project ID:** `9259884318619257055`  
> **Source Platform:** Google Stitch (Text-to-UI Pro)  
> **Target Framework:** React + Vite (Vanilla CSS Tokens & Modules, Strict Semantic HTML)

---

## 1. Executive Overview & Brand Identity

The **Apothecary Express UI/UX System** embodies a high-assurance, precision-engineered pharmaceutical supply chain platform. It bridges institutional clinical governance with high-end editorial SaaS refinement.

- **Design Philosophy:** Modern Clinical Minimalism fused with Architectural Data Density.
- **Tone:** Authoritative, zero-latency clarity, cryptographic auditability, discreet luxury.
- **Target Audience:** Health system enterprise leaders, clinical pharmacy directors, and regulated distributor leads demanding zero-trust fulfillment and real-time cold-chain telemetry.
- **Departures:** Rejects generic healthcare tropes (saturated medical greens, sterile generic blues, and utilitarian flat tables) in favor of deep naval authority, intellectual purple command structures, and crisp architectural layout discipline.

---

## 2. Color Palette & Functional Tokens

The color architecture establishes an institutional hierarchy driven by deep navy foundations, royal purple command accents, and luminous lavender highlights.

### 2.1 CSS Custom Properties (`variables.css`)

```css
:root {
  /* Canvas & Foundations */
  --canvas-base: #f9f9ff;
  --canvas-surface: #f9f9ff;
  --surface-dim: #d3daea;
  --surface-bright: #f9f9ff;
  --surface-container-lowest: #ffffff;
  --surface-container-low: #f0f3ff;
  --surface-container: #e7eefe;
  --surface-container-high: #e2e8f8;
  --surface-container-highest: #dce2f3;
  --surface-variant: #dce2f3;

  /* Text & Foreground */
  --on-background: #151c27;
  --on-surface: #151c27;
  --on-surface-variant: #464650;
  --inverse-surface: #2a313d;
  --inverse-on-surface: #ebf1ff;

  /* Structural Outlines */
  --outline: #767681;
  --outline-variant: #c7c5d1;
  --border-hairline: #e2e8f0;
  --border-subtle: rgba(8, 15, 79, 0.06);
  --border-focus: #6d28d9;

  /* Primary Pillar: Deep Navy Authority */
  --primary: #000000;
  --on-primary: #ffffff;
  --primary-container: #0c1352;       /* Deep Navy Command Pod */
  --primary-container-dark: #080f4f;  /* Core Feature Navy */
  --on-primary-container: #787fc1;
  --primary-fixed: #dfe0ff;
  --primary-fixed-dim: #bdc2ff;
  --on-primary-fixed: #0c1352;
  --on-primary-fixed-variant: #3a417f;

  /* Secondary Pillar: Royal Purple Pipeline */
  --secondary: #712edd;               /* Royal Purple */
  --secondary-hover: #5b00c5;
  --on-secondary: #ffffff;
  --secondary-container: #8b4ef7;
  --on-secondary-container: #fffbff;
  --secondary-fixed: #ebddff;         /* Lavender Pill Fill */
  --secondary-fixed-dim: #d3bbff;
  --on-secondary-fixed: #250059;
  --on-secondary-fixed-variant: #5b00c5;

  /* Tertiary Accents */
  --tertiary: #000000;
  --on-tertiary: #ffffff;
  --tertiary-container: #28064f;
  --on-tertiary-container: #9476bf;
  --tertiary-fixed: #eddcff;
  --tertiary-fixed-dim: #d7baff;
  --on-tertiary-fixed: #28064f;
  --on-tertiary-fixed-variant: #55387d;

  /* Clinical Status Accents */
  --status-success: #10b981;          /* Muted Emerald */
  --status-success-bg: rgba(16, 185, 129, 0.08);
  --status-success-border: rgba(16, 185, 129, 0.2);
  --status-success-text: #065f46;

  --status-warning: #f59e0b;          /* Controlled Amber */
  --status-warning-bg: rgba(245, 158, 11, 0.08);
  --status-warning-border: rgba(245, 158, 11, 0.2);
  --status-warning-text: #92400e;

  --status-error: #ba1a1a;            /* Restrained Crimson */
  --status-error-bg: rgba(239, 68, 68, 0.08);
  --status-error-border: rgba(239, 68, 68, 0.2);
  --status-error-text: #991b1b;
  --error-container: #ffdad6;
  --on-error-container: #93000a;
}
```

---

## 3. Typography Hierarchy

The system balances editorial presence with technical data legibility by combining **Manrope** for macro titles and numerical telemetry with **Geist** for rapid information intake.

| Token | Family | Weight | Size | Line Height | Tracking | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `display-hero` | Manrope | 700 | 56px | 64px | -0.03em | Desktop Hero Display Headlines |
| `display-hero-mobile` | Manrope | 700 | 36px | 44px | -0.02em | Mobile Hero Headlines |
| `headline-lg` | Manrope | 700 | 32px | 40px | -0.02em | Page Section Titles & Major Cards |
| `headline-lg-mobile` | Manrope | 700 | 26px | 34px | -0.01em | Mobile Major Headers |
| `headline-md` | Manrope | 600 | 22px | 28px | -0.015em | Secondary Module Headers |
| `headline-sm` | Manrope | 600 | 18px | 24px | 0em | Card Titles, Modal Headers |
| `metric-display` | Manrope | 700 | 40px | 44px | -0.03em | Primary Numerical Telemetry |
| `section-eyebrow` | Manrope | 700 | 11px | 16px | 0.12em (UPPERCASE) | Overlines & Protocol Flags |
| `body-lg` | Geist | 400 | 16px | 24px | -0.01em | Lead paragraphs & hero subtitles |
| `body-md` | Geist | 400 | 14px | 20px | 0em | Default body & table row text |
| `body-sm` | Geist | 400 | 12px | 16px | 0em | Captions, footnotes, table headers |
| `label-nav` | Geist | 500 | 13px | 18px | 0.01em | Primary navigation links & buttons |
| `label-code` | Geist | 600 | 12px | 16px | 0.04em (Tabular) | NDC codes, Lot IDs, Hash blocks |

*All numeric and tabular metrics leverage `font-variant-numeric: tabular-nums` to prevent horizontal layout shift during dynamic updates.*

---

## 4. Spacing Scale, Shapes & Elevation

### 4.1 Spacing Scale
- `space-xs`: `0.25rem` (4px)
- `space-sm`: `0.5rem` (8px)
- `space-md`: `1rem` (16px)
- `space-lg`: `1.5rem` (24px)
- `space-xl`: `2.5rem` (40px)
- `gutter-sm`: `1rem` (16px)
- `gutter`: `1.5rem` (24px)
- `gutter-lg`: `2rem` (32px)
- `margin-mobile`: `1rem` (16px)
- `margin`: `2rem` (32px)
- `margin-desktop`: `3rem` (48px)
- `max-canvas-width`: `1600px`

### 4.2 Border Radius System
- `rounded-sm`: `4px` (0.25rem) — micro badges, tags
- `rounded`: `8px` (0.5rem) — buttons, inputs, dropdown items
- `rounded-md`: `12px` (0.75rem) — inner cards, preview tiles
- `rounded-lg`: `16px` (1rem) — standard cards, containers
- `rounded-xl`: `24px` (1.5rem) — primary operational cards, metric modules
- `rounded-full`: `9999px` — status chips, avatars, indicators

### 4.3 Elevation & Layering
1. **Level 0 (Canvas):** Ground layer `#f9f9ff` / `#EEF0F2`.
2. **Level 1 (Elevated White Cards):** `#ffffff`, border `1px solid rgba(8, 15, 79, 0.06)`, shadow `0 4px 20px -2px rgba(8, 15, 79, 0.03), 0 1px 3px 0 rgba(8, 15, 79, 0.02)`.
3. **Level 2 (Deep Navy Feature Pods):** `#080f4f` / `#0c1352`, border `1px solid rgba(200, 167, 245, 0.15)`, shadow `0 12px 32px -4px rgba(8, 15, 79, 0.18)`.
4. **Level 3 (Modals & Verification Drawers):** `box-shadow: 0 24px 48px -12px rgba(8, 15, 79, 0.22)`, backdrop `blur(8px)` with `rgba(8, 15, 79, 0.4)`.

---

## 5. Reusable Component Specifications

### 5.1 Buttons
- **Primary Operational (`.btn-primary`):** Deep Navy background (`#0c1352`), pure white text, 8px radius, height 40px/48px, subtle hover lift `-1px` and shadow increase.
- **Secondary Protocol (`.btn-secondary`):** White background, border `1px solid #e2e8f0`, navy text. Hover: `#f0f3ff` background, `#6d28d9` border.
- **Urgent Authorization (`.btn-urgent`):** Royal Purple (`#712edd` / `#6d28d9`), white text, reserved for irreversible state actions (e.g., "Authorize Lot Dispatch").
- **Lavender Pill (`.btn-pill-lavender`):** `#ebddff` background, `#0c1352` text, 9999px radius, 36px height.

### 5.2 Status Chips & Chain-of-Custody Indicators
- **Optimal / Released:** Green dot + `rgba(16, 185, 129, 0.08)` fill, `#065F46` text, `1px solid rgba(16, 185, 129, 0.2)`.
- **Warning / Near Threshold:** Amber dot + `rgba(245, 158, 11, 0.08)` fill, `#92400e` text, `1px solid rgba(245, 158, 11, 0.2)`.
- **Critical / Quarantine:** Red dot + `rgba(239, 68, 68, 0.08)` fill, `#991b1b` text, `1px solid rgba(239, 68, 68, 0.2)`.
- **Protocol Active:** Royal purple dot + `#ebddff` fill, `#250059` text.

### 5.3 Metric Cards (`MetricCard.jsx`)
- 24px radius, pure white container, level 1 elevation.
- Upper eyebrow: overline in uppercase `Manrope 11px`, with circular icon avatar.
- Main metric: `Manrope 40px` bold, with tabular alignment.
- Trend / Context: Subtitle with positive (emerald) or critical (crimson) trend delta.

### 5.4 Medicine Cards (`MedicineCard.jsx`)
- Bento grid presentation with 16px radius, hover scale `1.01` transition.
- Top badges: Regulatory status (`Rx Only`, `OTC`, `Cold Chain 2-8°C`) + Stock condition.
- Icon visual tile with soft themed background tint.
- Micro data grid: NDC, Lot Code, Storage Temp, Available Stock.
- Live telemetry bar / sparkline indicator.
- Action footer: Unit price and primary requisition trigger.

### 5.5 Abstract Route & Telemetry Map (`OrderTracking.jsx`)
- Vector path canvas with verified node checkpoints (Alpha Regional Hub, Transit Corridors, Mercy General Node).
- Real-time animated courier locator dot with radial radar pulse.
- Real-time vehicle telemetrics: vault temperature (4.2°C), battery (94%), shock/tilt (0.02G), geofence locked.

---

## 6. Screens & Routing Architecture

| Route | Screen Title | Key Modules & Sections |
| :--- | :--- | :--- |
| `/home` | **Apothecary Express Homepage** | Hero section with microservices badge, Asymmetric Clinical Telemetry cards (SVG Gauge, Sparkline, Deep Navy feature pod), 4-step Microservices Pipeline Flow, Feature Capabilities Bento Grid with imagery, Quick Action CTA. |
| `/pharmacy` | **Pharmacy Operations Dashboard** | Architectural Header with HSM Dual-Key sync, Top 4 Metric Cards (1,248 Medicines, 86 Active Orders, 12 Low Stock, 99.4% Fulfillment), Multi-tier SVG Stock Dynamics Chart, Order Fulfillment Funnel, Live Orders stream, Deep Navy Custody Pod, Cold-Chain Alerts list, Microservices Heartbeat widget. |
| `/catalog` | **Medicine Catalog & Formulary** | Asymmetric Header with 21 CFR Part 11 badge, Level 2 Navy Med-Sync telemetry card, Search bar with ⌘K shortcut, Category filter pill ribbons, Sort selector, 6 High-Assurance Medicine Bento Cards, Bottom Lot Serialization assurance banner. |
| `/orders` | **Order Tracking & Dispatch Telemetry** | Chain-of-Custody Quickbar, Master Tracking Card (#AE-1001), 5-Stage Stepper Pipeline, Abstract Minimalist Route Vector Chart with courier GPS pulse, Cold-Chain Telemetry Card with 6-Hour Temp Drift sparkline, Prescribed Items Manifest Table, Dual RPh & Hospital Signature pods. |
| `/clinical` | **Clinical Intelligence Platform** | Enterprise Command Node view integrating real-time lot serialization audits, temperature integrity telemetry, microservices topology, and custody verification streams. |

---

## 7. Layout & Navigation Specifications

### 7.1 Unified Dashboard Layout (`DashboardLayout.jsx`)
- **Header:** Fixed top bar (64px / `h-16`), pure white (`#ffffff`), hairline bottom border `#e2e8f0`.
  - Brand Logo (SVG) with "Apothecary Express" wordmark.
  - Active Service indicator: "SERVICES ACTIVE: 6/6 ONLINE" with pulsing emerald dot.
  - Quick Search input with `⌘K` keyboard shortcut badge.
  - Notification icon button with unread count badge `3`.
  - Pharmacist profile block: Dr. Evelyn Vance, PharmD (Chief Clinical Pharmacist).
  - Mobile hamburger toggle for sidebar drawer.
- **Sidebar:** Fixed left navigation (256px / `w-64`), pure white with right border `#e2e8f0`.
  - Mode Switcher: Operations vs. Customer pill toggle.
  - Protocol Navigation: Overview (`/pharmacy`), Medicines (`/catalog`), Cold Chain & Orders (`/orders`), Clinical Intelligence (`/clinical`), Home (`/home`).
  - Bottom Node Audit widget: "US-EAST-VA-09 // Dual-Key HSM Active".
- **Main Canvas:** Fluid container, `margin-left: 256px` on desktop, full width on tablet/mobile with backdrop drawer.

---

## 8. Assets & Imagery Specifications

- **Brand Logo:** `src/assets/logo.svg` (Geometric clinical cross with express arrow and dual-weight wordmark).
- **Clinical Carousel Lab:** `src/assets/images/carousel-lab.webp`.
- **Cold-Chain Storage Vault:** `src/assets/images/cold-chain-vault.webp`.
- **Prescription Vials:** `src/assets/images/medicine-vials.webp`.
- **System Icons:** Material Symbols Outlined (`medication`, `vaccines`, `science`, `biotech`, `ac_unit`, `package_2`, `insights`, `radar`, `verified_user`, `lock`, `thermostat`, etc.).

---

## 9. Responsive Breakpoints

- **Desktop (1200px+):** Full 12-column grid, persistent 256px sidebar, 4-column metric grids, 8/4 split telemetry panels.
- **Tablet (768px – 1199px):** Collapsible sidebar, 2-column metric cards, stacked telemetry modules, horizontal scrolling tables with sticky key columns.
- **Mobile (< 768px):** Slide-over navigation drawer, single-column vertical stacks, condensed header with quick access chips, touch-friendly 44px tap targets.
