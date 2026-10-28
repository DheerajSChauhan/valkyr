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

## 🌍 Free public hosting

Valkyr is a static Vite frontend plus a separate PocketBase backend. Do not try to
serve `pb_data` from the frontend host.

### Recommended free/low-cost stack

- **Frontend:** Cloudflare Pages connected to this GitHub repository
- **Frontend build command:** `npm run build`
- **Frontend output directory:** `dist`
- **Backend:** PocketBase on a persistent Docker/VM service with HTTPS and durable storage
- **API hostname:** use a separate hostname such as `api.example.com`
- **Optional custom domain:** point the web domain to Cloudflare Pages and the API
  subdomain to the PocketBase host

Static hosts such as Cloudflare Pages, Vercel, and Netlify cannot run PocketBase.
Free backend services may sleep, cap storage, or remove inactive workloads. Export
and test-restore PocketBase backups before storing important user data.

### Cloudflare Pages setup

1. Push the repository to GitHub.
2. Create a Cloudflare Pages project from the repository.
3. Select the production branch.
4. Configure:

   ```text
   Build command: npm run build
   Build output directory: dist
   Node version: 20 or newer
   ```

5. Add the production environment variable:

   ```text
   VITE_POCKETBASE_URL=https://api.example.com
   ```

6. Add the custom domain in Cloudflare Pages and enable HTTPS.
7. Deploy and confirm that `/manifest.json` and `/sw.js` are publicly reachable.

Never put PocketBase admin credentials in `VITE_*` variables. Vite embeds those
values into the browser bundle.

### Tracking collections and authentication

The optional Hevy-style cloud tracking schema is documented in
[`pb_schema.json`](./pb_schema.json). Use it as a field/rules reference when
creating the collections in the PocketBase Admin UI, then verify every private
collection rule uses the authenticated owner:

```text
@request.auth.id != "" && user = @request.auth.id
```

The app supports email/password registration and login from **Profile →
PocketBase Backend & Offline Gym Sync**. Google login is also available after
Google OAuth is enabled in PocketBase's Settings → Auth providers. Configure the
Google client ID, secret, allowed origin, and redirect URL for your deployed
frontend before using that button.

Workout entry remains available without an account. When a user authenticates,
queued local records are assigned to that authenticated user and flushed when
the API is reachable. Failed writes remain in the offline queue for retry.

### PocketBase production checklist

- Run PocketBase on a persistent host with a durable volume for `pb_data`.
- Use an HTTPS URL; the client rejects non-HTTPS production URLs.
- Configure CORS to allow only the Cloudflare Pages/custom frontend origin.
- Apply authenticated ownership rules to user-owned collections.
- Keep catalog collections public-read and admin/server-write only.
- Protect the PocketBase admin UI with a strong unique password and MFA at the
  hosting/provider layer where available.
- Schedule database exports and verify restoring one before launch.
- Do not commit `pb_data`, admin credentials, or `.env` files.

## 📱 Install on a smartphone

The project includes a production manifest and service worker, so the recommended
installation is a browser-installed PWA:

- **Android:** open the HTTPS site in Chrome, open the menu, then choose
  **Install app** or **Add to Home screen**.
- **iPhone/iPad:** open the HTTPS site in Safari, tap **Share**, then choose
  **Add to Home Screen**.

PWA installation requires HTTPS (localhost is the only normal development
exception). After deployment, test login, offline workout entry, queue flushing,
and refresh/update behavior from the installed app.

---

## 📄 License

Distributed under the MIT License. See `LICENSE.md` for more information.
