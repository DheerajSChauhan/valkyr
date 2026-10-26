# ⚡ Valkyr — Premium Hypertrophy & Athletic Fitness Platform

**Valkyr** is a modern, high-performance web fitness application built for progressive overload, hypertrophy tracking, periodized training blocks, and social athletic achievements.

![Valkyr UI Preview](https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80)

---

## ⚡ Core Features

- **Athletic Workout Hub**:
  - Full-bleed category drilldowns: *For The Gym, Strength, HIIT, Yoga, Pilates, Mobility & Recovery*.
  - Curated compound movements, substitutions, and target rep/intensity metrics.
  - Quick-launch cards for Saved, All Workouts, and Completed training logs.
- **Interactive Live Session Tracker**:
  - Real-time active workout stopwatch timer (`MM:SS`).
  - Interactive set completion checkmark pills.
  - Movement-by-movement navigation with integrated rest intervals.
- **Periodization & Training Splits**:
  - 12-Week Foundation and Ramping periodization matrix.
  - Warm-up pyramids, RPE protocols, and PDF guidelines.
  - Custom multi-day program and routine builder.
- **Exercise Directory**:
  - High-definition GIF demonstrations and autoplay YouTube technical embeds.
  - Target muscle group and equipment filtering.
- **Social Club & Strava-Style Share Cards**:
  - Community workout activity feed and kudos tracking.
  - DOTS score and monthly volume leaderboards.
  - Canvas-rendered Strava-style athletic share cards.
- **Offline-First & PocketBase Sync**:
  - Automatic fallback to local storage queue with automatic sync upon reconnecting.

---

## 🛠️ Tech Stack

- **Framework**: React 19, TypeScript
- **Bundler & Dev Server**: Vite 6
- **Styling**: Tailwind CSS & Obsidian Dark Glassmorphism Design System
- **Icons**: Lucide React
- **Backend / Sync**: PocketBase (offline-first sync queue)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/DheerajSChauhan/valkyr.git

# Navigate into project directory
cd valkyr

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit [http://localhost:5173/](http://localhost:5173/) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE.md` for more information.
