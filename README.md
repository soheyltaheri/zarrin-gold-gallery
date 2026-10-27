# Zarrin Gold Gallery (زرین گالری)

<p align="center">
  <strong>Luxury Iranian Gold & Fine Jewelry E-Commerce Platform</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB.svg?logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF.svg?logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg?logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Oxlint-Fast%20Linter-blueviolet.svg" alt="Oxlint" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License" />
</p>

---

## 📌 Overview

**Zarrin Gold Gallery** is a modern, high-performance web application designed specifically for Iranian gold and jewelry retail. Engineered with **React 19**, **Vite 8**, and **Tailwind CSS v4**, it provides live market price synchronization (TGJU), real-time karat formula valuation, interactive gold investment calculators, digital gold vault tracking, and a luxury responsive mobile-first shopping experience.

---

## ✨ Key Features

- **Live Gold Market Ticker:** Real-time pricing synchronization for 18-karat gold, 24-karat bullion, and coin benchmarks directly from market feeds.
- **Dynamic Valuation Engine:** Transparent price calculation factoring base weight (gram), artisan manufacturing fee (Ojrat), union profit margin (7%), and official tax (9% VAT on fees only).
- **Interactive Gold Calculator:** Live calculator modal allowing customers to experiment with customized weights, karat purities, and artisan fee structures.
- **Digital Gold Vault (طلای آب‌شده):** Simulated digital asset ledger allowing fractional gold purchasing and weight accumulation starting from 100,000 Tomans.
- **Official Invoice Generator:** In-browser tax-compliant invoice generator with verification QR code and printable layouts.
- **Luxury Mobile Experience:** Mobile-optimized 2-column catalog grid, floating thumb navigation bar, bottom sheets, and responsive touch gestures.

---

## 🏗️ Architecture & Component Hierarchy

```
zarrin-gold-gallery/
├── src/
│   ├── components/            # Reusable UI widgets & Modals
│   │   ├── GoldCalculatorModal.jsx  # Dynamic gram/karat valuation engine
│   │   ├── OfficialInvoiceModal.jsx # Standardized Iranian gold invoice
│   │   ├── LiveRateTicker.jsx       # Floating real-time rate strip
│   │   ├── MobileBottomNav.jsx      # Mobile thumb navigation bar
│   │   ├── ProductCatalog.jsx       # Filterable jewelry showcase
│   │   └── ProductDetailModal.jsx   # High-res photo & spec viewer
│   ├── pages/                 # Full-screen module views
│   │   ├── DigitalGoldVault.jsx     # Fractional gold asset tracking
│   │   ├── MarketAnalysisPage.jsx   # Technical gold rate trend graphs
│   │   ├── ComparisonPage.jsx       # Side-by-side jewelry spec comparison
│   │   └── HeritagePage.jsx         # Atelier brand story & craftsmanship
│   ├── services/              # External TGJU market rate sync
│   ├── utils/                 # Persian number formatting & currency math
│   └── App.jsx                # Global state orchestrator
├── vite.config.js             # Vite 8 bundling & Tailwind plugin
└── package.json
```

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- Node.js 18+
- npm or pnpm / yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/soheyltaheri/zarrin-gold-gallery.git
   cd zarrin-gold-gallery
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📄 License

Distributed under the [MIT License](LICENSE).

