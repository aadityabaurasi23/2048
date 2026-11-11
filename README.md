# 2048 — Curated Studio Edition (`v2.4.0`)

![Version](https://img.shields.io/badge/release-v2.4.0-eab308?style=flat-square)
![Tech](https://img.shields.io/badge/stack-HTML5%20Canvas%20%7C%20CSS3%20%7C%20AngularJS%20%7C%20Node.js-f59e0b?style=flat-square)
![Offline](https://img.shields.io/badge/standalone-100%25%20offline%20ready-0284c7?style=flat-square)

A minimalist, studio-crafted edition of the classic **2048** exponential puzzle game — featuring a **Daily Seeded Challenge**, **Scorecard PNG Poster Generator**, **3 Tactical Power-Ups (`Shuffle`, `Zap`, `Upgrade`)**, a first-run translucent **Welcome Showcase**, **10 interactive 60 FPS theme-connected Live Wallpapers**, an **AngularJS Live Wallpaper Studio**, **Node.js** server/bundler tooling, and slide-out side tabs for **16 Achievements**, **Settings**, **Analytics**, and **Strategy**.

---

## 🆕 Release Changelog (`v2.4.0`)

### `v2.4.0` — Daily Seeded Challenge, Upgrade Power-Up, Scorecard PNG Generator & Engine Bug Fixes
- **📅 Daily Seeded Challenge Mode (`daily`):** Added a 5th game mode powered by a deterministic Mulberry32 PRNG seeded with today's date (`YYYY-MM-DD`). Every player on the same calendar day receives the **exact same starting board and tile spawn sequence**, with independent daily saved state and best-score tracking.
- **🔨 Tile Upgrade Power-Up (`#upgrade-btn` / `E`):** Added a 3rd tactical power-up in the Command Dock that doubles the rank of a lowest-value tile on the board (`2 → 4`, `4 → 8`, etc.), complete with celebration particles, Live Wallpaper shockwaves, and `+1` bonus charges on `512`, `1024`, `2048`, and `4096` milestones.
- **📸 One-Click Scorecard PNG Poster & Clipboard Summary:** Click **📸 Scorecard** on the Game Over / Win overlay (or **📸 Save Run Scorecard (PNG)** inside `📊 Analytics`) to render a high-DPI (`1280×1640`) themed scorecard poster on HTML5 `<canvas>` — displaying your active palette, mode, score, best score, max tile, moves/time, and a rendered snapshot of your 2048 board — plus automatically copy a text summary to your clipboard.
- **🏆 Expanded to 16 Achievements:** Added **📅 Daily Challenger** (*Score 2,500+ in the seeded Daily Challenge mode*) and **🔨 Tile Alchemist** (*Use the Upgrade power-up to evolve a tile*).
- **🛠️ Engine & Quality Bug Fixes:**
  - **JSON Backup Wallpaper Restore Fix:** Importing a backup JSON file (`importBackupJSON`) now calls `LiveWallpaperEngine.restoreState(data.wallpaper)` so your saved Live Wallpaper, speed, density, ripple settings, and `wallpapersTried` history are fully restored.
  - **Smart Anti-Deadlock Shuffle & History Recording Fix:** `🔀 Shuffle` now tests up to 12 board permutations to actively find a playable arrangement (`movesAvailable() === true`); if no valid arrangement exists on the board, it cleanly stops Auto-Play and logs the finished game to Match History.
  - **True Lock-Free Zen Mode:** When all cells fill up with no adjacent matches in `🧘 Zen Mode`, the engine automatically vaporizes a lowest-value tile with a particle burst so gameplay and Auto-Play AI never soft-lock.
  - **Blitz & Session Clock Auto-Pause:** The timer now pauses automatically whenever the Welcome Showcase is open (`isWelcomeOpen`) or the browser tab is hidden (`document.hidden`), and touch swipes are guarded while the Welcome Showcase is active.

### Previous Releases
- **`v2.3.0`:** Redesigned *Classic Warm — Dark Mode* into an **Obsidian, Antique Bronze & 24K Imperial Gold** palette and added the **First-Run Translucent Welcome Showcase (`▶ Let's Start`)** with forever-once persistence in both a 2099 browser cookie and `localStorage`.
- **`v2.2.0`:** Added 10 interactive 60 FPS HTML5 `<canvas>` Live Wallpapers with 2-way Theme ↔ Wallpaper sync, AngularJS Wallpaper Studio, Fullscreen mode, Audio Synth Volume slider, and Node.js server/build scripts.
- **`v2.1.0`:** Redesigned front UI into a minimalist centered stage with docked right-edge Side Tabs, slide-out glass drawer, and Achievement progress/filtering.
- **`v2.0.2` & `v2.0.1`:** Streamlined release-only CI pipeline, 10 Themes × Light/Dark modes (20 palettes), Power-Ups, Lifetime Analytics, and JSON Backup Export/Import.

---

## 🎨 10 Themes × Connected 60 FPS Live Wallpapers (20 Palettes)

Every theme includes bespoke **☀️ Light Mode** and **🌙 Dark Mode** palettes and connects directly to its own animated Live Wallpaper:

| Theme | Connected Live Wallpaper | Animated Background Elements | ☀️ Light / 🌙 Dark Mood |
| :--- | :--- | :--- | :--- |
| **Classic Warm** | **🌀 Warm Spiral Doodles** | Rotating Archimedean spirals, `2`/`4`/`2048` doodle tiles & golden motes | Retro Cream / **Obsidian & 24K Imperial Gold** |
| **Forest Emerald** | **🌿 Green Doodle Grove** | Botanical green doodle leaves, emerald vine spirals, sprout tiles & fireflies | Mint Sage / Deep Glowing Jade |
| **Ocean Blue** | **🌊 Abyssal Wave Currents** | Multi-layered ocean sine currents & rising specular bubbles | Coastal Azure / Bioluminescent Trench |
| **Cyberpunk Neon** | **⚡ Synthwave Cyber Grid** | 3D scrolling neon horizon grid, synth sun & digital data pulses | Daylight Magenta / Night City Cyan |
| **Crimson Sunset** | **🔥 Solar Horizon Embers** | Expanding solar halo rings, rising flickering embers & prism shards | Warm Peach / Volcanic Molten Gold |
| **Royal Amethyst** | **✨ Celestial Constellations** | Twinkling stars dynamically linked by cursor-reactive constellation lines | Soft Lavender / Cosmic Velvet |
| **Sakura Blossom** | **🌸 Sakura Petal Drift** | Wind-swept cherry blossom petals with 3D flutter & doodle swirls | Spring Blush / Midnight Hanami |
| **Nordic Frost** | **❄️ Aurora Borealis & Frost** | Silky undulating northern-lights curtains & drifting 6-spoke snow crystals | Glacier Slate / Arctic Aurora |
| **Mocha Espresso** | **☕ Café Roast Doodles** | Coffee bean sketches, latte-art spirals & rising aromatic steam wisps | Warm Oat Latte / Dark Roast Crema |
| **Minimalist Ink** | **✒️ Sumi Ink Geometry** | Architectural orbit rings, precision crosshairs & minimal `2ⁿ` glyphs | Sumi Paper / Pure OLED Obsidian |

*(Plus **🫧 Clean Static Gradient** for zero-motion battery saving on any theme.)*

---

## 🗂️ Curated Front Stage, Welcome Showcase & 5 Side Tabs

- **✨ First-Run Welcome Showcase:** Translucent glass intro over the live board & wallpaper with instant Theme/Dark-Mode previewing and **`▶ Let's Start`** button — shown once forever until browser cookies or cache are cleared.
- **🏆 Achievements (`B`):** Live `0/16` rail counter, amber unlock-notification dot, completion bar, `All` / `Unlocked` / `Locked` filters, and 16 milestone badges.
- **🖼️ Wallpaper (`V`):** AngularJS-powered Live Wallpaper gallery, **🔗 Connected to Theme (2-Way Sync)** vs **🔓 Mix & Match** switch, category chips, motion pause/resume, speed slider, density selector, and merge shockwave ripple toggle.
- **⚙️ Settings (`O`):** 5 Game Modes, Color Theme dropdown + **10-Theme Quick Swatch Dots**, Dark/Light switch, Board Grid (`3×3` to `6×6`), Tile Skin (`Numbers`, `Powers 2ⁿ`, `Roman`, `Cosmic`), Tile Shape (`Rounded`, `Crisp Sharp`, `Soft Bubble`), Slide Speed, **Audio Synth Volume (`0%`–`100%`)**, and Celebration Particles.
- **📊 Analytics (`G`):** Current Run Tile Vault (`2`–`2048`), Session Efficiency (`pts/move`), 8 Lifetime KPIs, Lifetime Tile Forge Matrix (`4`–`4096`), 10-Run Match History, **📸 Save Run Scorecard (PNG)**, and JSON Backup Export/Import.
- **📖 Guide (`?`):** Rotating Grandmaster Pro Tips, strategy breakdown, keyboard shortcut reference, and on-demand **✨ View Welcome Showcase Screen** button.

---

## 🎮 5 Game Modes & 3 Tactical Power-Ups

- **Classic Endless:** Standard rules (90% `2`, 10% `4` spawns). Forge `2048` to win, then click **Keep going** toward `4096` and `8192`.
- **📅 Daily Challenge (Seeded):** Deterministic daily seed (`YYYY-MM-DD`) so every run on the same day spawns the exact same sequence of tiles.
- **⏱️ 2-Min Time Blitz:** Race against a 120-second countdown clock to maximize your score before time expires.
- **🧘 Zen Relax:** Stress-free endless sandbox with unlimited `Undo`, `Shuffle`, `Zap`, and `Upgrade` charges plus automatic low-tile clearing when the board fills.
- **🔥 Hardcore Purist:** 25% `4`-tile spawn rate with `Undo`, `Hint`, `Auto-Play`, and `Power-Ups` disabled.
- **🔀 Shuffle (`X`), ⚡ Zap (`C`), 🔨 Upgrade (`E`), 💡 Smart Hint (`H`) & 🤖 Auto-Play AI (`P`):** Built-in snake-monotonicity solver and milestone bonus charges (`512`, `1024`, `2048`, `4096`).

---

## ⌨️ Controls & Keyboard Shortcuts

| Input / Key | Action |
| :--- | :--- |
| `Enter` / `Space` | Dismiss first-run **Welcome Showcase** (`▶ Let's Start`) |
| `↑` `↓` `←` `→` or `W` `A` `S` `D` | Slide tiles (also drives Live Wallpaper breeze & merge ripples) |
| **Touch Swipe** | Slide tiles on mobile & tablets |
| `L` | Toggle **🌙 Dark Mode / ☀️ Light Mode** |
| `T` | Cycle through all **10 Themes & Connected Wallpapers** |
| `V` | Toggle **🖼️ Live Wallpaper Studio** drawer |
| `O` | Toggle **⚙️ Settings & Theme Studio** drawer |
| `B` / `G` / `?` | Toggle **🏆 Achievements** / **📊 Analytics** / **📖 Guide** drawer |
| `Z` or `U` | **Undo** previous move / action (up to 30 steps) |
| `H` / `P` | Show **💡 Best Move Hint** / Toggle **🤖 Auto-Play AI** |
| `X` / `C` / `E` | Use **🔀 Shuffle** / **⚡ Zap** / **🔨 Upgrade** power-up |
| `F` | Toggle **⛶ Fullscreen Mode** |
| `M` / `R` / `Esc` | Mute Audio / Start **New Game** / Close open side drawer |

---

## 🚀 Running Locally & App Releases (`v2.4.0`)

### Option 1: Open Directly in Browser (Zero Install)
Simply double-click **`index.html`** (or download **`2048-standalone.html`** from GitHub Releases) in any modern browser — works immediately out of the box, online or offline!

### Option 2: Run with Node.js Server & Build Scripts
If you have **Node.js 18+** installed:
```bash
npm install
npm start        # Launches local Studio Server at http://localhost:3000 (+ /api/wallpapers)
npm run verify   # Verifies JS syntax and DOM ID / asset tag integrity
npm run build    # Compiles self-contained release-assets/2048-standalone.html
```

### Automated Release-Only GitHub Actions Workflow
`.github/workflows/release.yml` sets up Node.js 20, installs AngularJS, runs `npm run verify` and `npm run build` to embed CSS + AngularJS + `wallpaper.js` + `script.js` into **`2048-standalone.html`**, and publishes `.zip`, `.tar.gz`, and standalone HTML assets to **GitHub Releases** (`v2.4.0`, `v2.4.1`, …) with **zero deployment jobs**.

---

## 📁 Project Structure

```text
2048/
├── .github/
│   └── workflows/
│       └── release.yml          # Node.js 20 CI verification, standalone bundler & GitHub Release (no deployment)
├── scripts/
│   ├── build-standalone.js      # Compiles single-file offline 2048-standalone.html
│   └── verify.js                # V8 syntax & DOM ID integrity checker
├── index.html                   # Minimalist stage, translucent Welcome Showcase, side tabs & AngularJS Studio
├── style.css                    # 20 palettes (incl. 24K Gold Classic Dark), welcome glass card & tile skins
├── wallpaper.js                 # 60 FPS HTML5 Canvas Live Wallpaper Engine + AngularJS Studio & restoreState API
├── script.js                    # Core 2048 engine, Daily Seed PRNG, Upgrade power-up, Scorecard PNG & 16 badges
├── server.js                    # Lightweight Node.js local HTTP server & /api/wallpapers endpoint
├── package.json                 # Node.js package manifest (v2.4.0), AngularJS dependency & npm scripts
└── README.md                    # Documentation, v2.4.0 changelog & theme-wallpaper pairing guide
```
