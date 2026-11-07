# 2048 — Curated Studio Edition (`v2.3.0`)

![Version](https://img.shields.io/badge/release-v2.3.0-eab308?style=flat-square)
![Tech](https://img.shields.io/badge/stack-HTML5%20Canvas%20%7C%20CSS3%20%7C%20AngularJS%20%7C%20Node.js-f59e0b?style=flat-square)
![Offline](https://img.shields.io/badge/standalone-100%25%20offline%20ready-0284c7?style=flat-square)

A minimalist, studio-crafted edition of the classic **2048** exponential puzzle game — featuring a first-run translucent Welcome Showcase, a focused centered puzzle stage, **10 interactive 60 FPS theme-connected Live Wallpapers**, an **AngularJS Live Wallpaper Studio**, **Node.js** server/bundler tooling, and slide-out side tabs for **Achievements**, **Settings**, **Analytics**, and **Strategy**.

---

## 🆕 Release Changelog (`v2.3.0`)

### `v2.3.0` — 24K Imperial Gold Classic Dark Mode & First-Run Translucent Welcome Showcase
- **Refined Classic Warm — Dark Mode (`Obsidian & 24K Imperial Gold`):** Completely redesigned *Classic Warm's* Dark Mode palette (previously blue-tinted like *Ocean Blue*) into a rich **Obsidian, Antique Bronze & 24K Imperial Gold** color scale across the background glow, frosted-glass cards, gilded tile ranks (`2` → `2048`), and floating 60 FPS *Warm Spiral Doodles*.
- **First-Run Translucent Welcome Showcase (`▶ Let's Start`):** First-time players are greeted by a curated frosted-glass showcase suspended over the live translucent game board and 60 FPS wallpaper — complete with an animated `2·0·4·8` tile crest, live **Starting Vibe & Dark/Light Mode** preview pills, and a shimmering **`▶ Let's Start`** CTA button (`Enter` / `Space` supported).
- **Forever-Once Persistence (Until Cookie or Cache Clear):** Completion is saved permanently in **both** a long-lived browser cookie (`Expires=2099`) and `localStorage`. Returning players bypass the welcome screen instantaneously with zero flicker — unless browser cookies or cache/site-data are cleared (or re-opened manually via **✨ View Welcome Showcase Screen** in `📖 Guide`).

### Previous Releases
- **`v2.2.0`:** Added 10 interactive 60 FPS HTML5 `<canvas>` Live Wallpapers with 2-way Theme ↔ Wallpaper sync, AngularJS Wallpaper Studio, Fullscreen mode, Audio Synth Volume slider, 14 Achievements, and Node.js server/build scripts.
- **`v2.1.0`:** Redesigned front UI into a minimalist centered stage with docked right-edge Side Tabs, slide-out glass drawer, and Achievement progress/filtering.
- **`v2.0.2` & `v2.0.1`:** Streamlined release-only CI pipeline, 10 Themes × Light/Dark modes (20 palettes), 4 Game Modes, Power-Ups (`Shuffle` & `Zap`), Lifetime Analytics, and JSON Backup Export/Import.

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
- **🏆 Achievements (`B`):** Live `0/14` rail counter, amber unlock-notification dot, completion bar, `All` / `Unlocked` / `Locked` filters, and 14 milestone badges.
- **🖼️ Wallpaper (`V`):** AngularJS-powered Live Wallpaper gallery, **🔗 Connected to Theme (2-Way Sync)** vs **🔓 Mix & Match** switch, category chips, motion pause/resume, speed slider, density selector, and merge shockwave ripple toggle.
- **⚙️ Settings (`O`):** Game Mode selector, Color Theme dropdown + **10-Theme Quick Swatch Dots**, Dark/Light switch, Board Grid (`3×3` to `6×6`), Tile Skin (`Numbers`, `Powers 2ⁿ`, `Roman`, `Cosmic`), Tile Shape (`Rounded`, `Crisp Sharp`, `Soft Bubble`), Slide Speed, **Audio Synth Volume (`0%`–`100%`)**, and Celebration Particles.
- **📊 Analytics (`G`):** Current Run Tile Vault (`2`–`2048`), Session Efficiency (`pts/move`), 8 Lifetime KPIs, Lifetime Tile Forge Matrix (`4`–`4096`), 10-Run Match History, and JSON Backup Export/Import.
- **📖 Guide (`?`):** Rotating Grandmaster Pro Tips, strategy breakdown, keyboard shortcut reference, and on-demand **✨ View Welcome Showcase Screen** button.

---

## 🎮 4 Game Modes & Tactical Power-Ups

- **Classic Endless:** Standard rules (90% `2`, 10% `4` spawns). Forge `2048` to win, then click **Keep going** toward `4096` and `8192`.
- **⏱️ 2-Min Time Blitz:** Race against a 120-second countdown clock to maximize your score before time expires.
- **🧘 Zen Relax:** Stress-free endless sandbox with unlimited `Undo`, `Shuffle`, and `Zap` charges and zero Game Over lockouts.
- **🔥 Hardcore Purist:** 25% `4`-tile spawn rate with `Undo`, `Hint`, `Auto-Play`, and `Power-Ups` disabled.
- **🔀 Shuffle (`X`), ⚡ Zap (`C`), 💡 Smart Hint (`H`) & 🤖 Auto-Play AI (`P`):** Built-in snake-monotonicity solver and milestone bonus charges (`512`, `1024`, `2048`, `4096`).

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
| `X` / `C` | Use **🔀 Shuffle** / **⚡ Zap** power-up |
| `F` | Toggle **⛶ Fullscreen Mode** |
| `M` / `R` / `Esc` | Mute Audio / Start **New Game** / Close open side drawer |

---

## 🚀 Running Locally & App Releases (`v2.3.0`)

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
`.github/workflows/release.yml` sets up Node.js 20, installs AngularJS, runs `npm run verify` and `npm run build` to embed CSS + AngularJS + `wallpaper.js` + `script.js` into **`2048-standalone.html`**, and publishes `.zip`, `.tar.gz`, and standalone HTML assets to **GitHub Releases** (`v2.3.0`, `v2.3.1`, …) with **zero deployment jobs**.

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
├── wallpaper.js                 # 60 FPS HTML5 Canvas Live Wallpaper Engine + AngularJS Studio & offline fallback
├── script.js                    # Core 2048 engine, cookie+localStorage welcome persistence, AI, 14 badges & synth
├── server.js                    # Lightweight Node.js local HTTP server & /api/wallpapers endpoint
├── package.json                 # Node.js package manifest (v2.3.0), AngularJS dependency & npm scripts
└── README.md                    # Documentation, v2.3.0 changelog & theme-wallpaper pairing guide
```
