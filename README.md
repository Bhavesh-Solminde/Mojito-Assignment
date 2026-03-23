# LEDGER — *"Every coin has two sides."*

> **Assignment Submission** · Marketing Mojito · Personal Expense Tracker

---

## Overview

**LEDGER** is a cinematic, dark-luxury personal expense tracker built as a React single-page application. The experience opens with a scroll-driven coin animation — 240 frames of a gold coin rendered in real time on an HTML5 Canvas — before revealing a fully-functional expense management dashboard.

The interface is designed around three guiding principles: **Track**, **Convert**, and **Control**.

---

## Features

| Feature | Description |
|---|---|
| **Scroll-driven Intro** | A 240-frame coin flip plays as the user scrolls, powered by `requestAnimationFrame` and Framer Motion. Four copywriting scenes fade in/out at precise scroll positions. |
| **Expense Entry** | Add transactions with a name, amount (USD), and category. Submitted via `crypto.randomUUID()` for unique IDs. |
| **Delete Transactions** | Hover over any expense card to reveal a delete button with an animated exit. |
| **Grand Total Panel** | A live-updating animated counter showing the accumulated total with a spring-physics flip animation on every change. |
| **Live Currency Converter** | Converts the total expense amount to EUR, GBP, INR, AED, or JPY using the live **ExchangeRate-API**. Gracefully handles loading and network errors. |
| **Category Breakdown** | An interactive donut chart (via Recharts) visualising spending across Food, Travel, Marketing, Utilities, and Other. Sorted by spend and displayed with percentage splits. |
| **Local Persistence** | All expenses are saved to `localStorage` so data survives page reloads. |
| **Responsive Layout** | Adapts from a single-column mobile layout to a 5-column desktop grid with sticky navigation. |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 + Vite 6 |
| **Styling** | Tailwind CSS v4 |
| **Animation** | Framer Motion (`motion`, `AnimatePresence`, `useScroll`, `useTransform`) |
| **Charts** | Recharts (`PieChart`, `ResponsiveContainer`) |
| **Icons** | Lucide React |
| **Currency API** | ExchangeRate-API v6 (live USD base rates) |
| **Rendering** | HTML5 Canvas (scroll-synced frame animation) |

---

## Project Structure

```
src/
├── App.jsx                    # Root — state management, layout, routing
├── index.css                  # Design tokens (CSS variables: --void, --gold-bright, etc.)
│
├── components/
│   ├── ScrollyCanvas.jsx      # 240-frame scroll animation + 4 cinematic scenes
│   ├── ExpenseForm.jsx        # Controlled form for adding new entries
│   ├── ExpenseCard.jsx        # Individual transaction card with hover/delete
│   ├── ExpenseList.jsx        # Animated grid of expense cards
│   ├── SummaryPanel.jsx       # Grand total with spring flip animation
│   ├── CurrencyConverter.jsx  # Live multi-currency converter
│   └── CategoryBreakdown.jsx  # Donut chart analytics (lazy-loaded)
│
├── hooks/
│   ├── useFramePreloader.js   # Preloads 240 PNG frames, reports % progress
│   └── useCurrencyRates.js    # Fetches & caches live exchange rates
│
└── utils/
    ├── categories.js          # Category definitions (id, name, icon, color)
    └── formatCurrency.js      # Intl.NumberFormat wrapper for any currency
```

---

## Performance Decisions

- **`React.memo`** on all components to prevent unnecessary re-renders.
- **`useCallback`** on `addExpense` and `deleteExpense` for stable references.
- **`useMemo`** for `totalAmount` and chart data aggregation.
- **Lazy loading** (`React.lazy + Suspense`) for `CategoryBreakdown` — the chart library is deferred until after the initial render.
- **`requestAnimationFrame`** throttles canvas redraws during scroll to maintain 60 fps.
- **Cleanup pattern** in `useCurrencyRates` (`let active`) prevents state updates on unmounted components.

---

## Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation & Dev Server

```bash
# Clone the repository
git clone <repo-url>
cd Mojito-assignment

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Expense Categories

| Category | Colour |
|---|---|
| Food | `#D4A853` |
| Travel | `#B8922A` |
| Marketing | `#9A7A22` |
| Utilities | `#7D6420` |
| Other | `#5A4A18` |

---

## Key React Concepts Demonstrated

1. **Custom Hooks** — `useFramePreloader` (canvas frame loading), `useCurrencyRates` (async API with cleanup).
2. **State & Effects** — `useState`, `useEffect` with proper cleanup, localStorage sync.
3. **Performance Hooks** — `useMemo`, `useCallback` used deliberately where beneficial.
4. **Code Splitting** — `React.lazy` + `Suspense` for the analytics chart.
5. **Animation** — Framer Motion for enter/exit transitions, layout animations, and scroll-linked opacity.
6. **Canvas API** — Direct DOM manipulation via `useRef` + `useEffect` for performant frame playback.

---

## License

This project is submitted as an academic assignment for **Marketing Mojito**. All rights reserved.
