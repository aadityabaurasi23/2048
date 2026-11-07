# 2048 — Curated Studio Edition (`v2.0.2`)

![Version](https://img.shields.io/badge/release-v2.0.2-0284c7?style=flat-square)
![Tech](https://img.shields.io/badge/stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-f59e0b?style=flat-square)
![Dependencies](https://img.shields.io/badge/dependencies-zero-10b981?style=flat-square)

A richly customizable, studio-crafted edition of the classic **2048** exponential puzzle game — built from scratch using **100% vanilla HTML, CSS, and JavaScript** with zero external libraries, frameworks, or asset files.

---

## 🆕 Release Changelog (`v2.0.2`)

### `v2.0.2` — Clean App Release Pipeline Fix
- **Fixed Failing GitHub Pages Check on Private Repositories:** Removed the `deploy-pages` job from `.github/workflows/release.yml` (GitHub Pages is unavailable on private repositories on GitHub Free, which caused a failing check even when app packaging and release succeeded). Every push now completes with **100% passing checks** and marks the new release as `Latest`.

### `v2.0.1` — Curated Studio Edition Upgrade
- **Symmetrical 3-Column Bento Workspace:** Re-engineered layout placing the 2048 game board dead-center on the screen, flanked by **Live Telemetry & Power-Ups** on the left and **Customization Studio & Run Tile Progression** on the right.
- **Expanded to 10 Themes × Light & Dark Modes (20 Palettes):** Added **Sakura Blossom**, **Nordic Frost**, **Mocha Espresso**, and **Minimalist Ink**, each with bespoke Light and Dark palettes.
- **4 Distinct Game Modes:** Added **⏱️ 2-Min Time Blitz**, **🧘 Zen Relax (No Lockout)**, and **🔥 Hardcore Purist** alongside **Classic Endless**, with independent saved states and Best Scores per `(mode, gridSize)`.
- **Tactical Power-Ups & Streak Engine:** Added **🔀 Shuffle (`X`)**, **⚡ Zap Low (`C`)**, milestone charge rewards (`512` / `1024` / `2048` / `4096`), **✨ Celebration Particle Bursts**, and a live **🔥 Consecutive Merge Streak** counter.
- **New Tile Skins, Shapes & Backdrops:** Added 4 Tile Skins (`Numbers`, `Powers 2ⁿ`, `Roman Ranks`, `Cosmic Icons`), 4 SVG Backdrop Art Styles (`Spirals & Doodles`, `Star Constellations`, `Zen Topo Waves`, `Clean Gradient`), and 3 Tile Shapes (`Rounded`, `Crisp Sharp`, `Soft Bubble`).
- **Player Hub Modal:** Added **📊 Lifetime Analytics**, **Tile Forge Matrix**, **Last 10 Runs Match History**, **🏆 12 Unlockable Achievements** with toast notifications, **📖 Grandmaster Strategy Guide**, and **JSON Backup Export/Import**.

---

## 📖 Overview

Inspired by Gabriele Cirulli's 2014 classic, **2048 — Curated Studio Edition** blends crisp tile-sliding physics with deep personalization and analytics. Every slide shifts all tiles across the grid; when two tiles of identical rank collide, they fuse into the next power of two ($2^1 \rightarrow 2^2 \rightarrow \dots \rightarrow 2^{11}$ and beyond), adding the newly forged tile's value to your score.

---

## ✨ Features & Customizations

### 🎨 10 Color Themes × Light & Dark Modes (20 Complete Palettes)
Switch seamlessly between **🌙 Dark Mode** and **☀️ Light Mode** on *any* of the 10 curated themes — transforming the full viewport gradient, frosted-glass Bento cards, tile color scales, and SVG backdrop art:

| Theme | ☀️ Light Mode Variant | 🌙 Dark Mode Variant |
| :--- | :--- | :--- |
| **Classic Warm** | Retro Cream & Golden Amber | Midnight Black & Electric Blue |
| **Ocean Blue** | Coastal Sky & Crisp Azure | Abyssal Trench & Bioluminescent Cyan |
| **Cyberpunk Neon** | Daylight Synthwave Magenta | Night City Violet & Neon Pink/Cyan |
| **Forest Emerald** | Mint Sage & Botanical Green | Deep Pine & Glowing Jade |
| **Crimson Sunset** | Warm Peach & Coral | Volcanic Ember & Molten Gold |
| **Royal Amethyst** | Soft Lavender & Iris | Cosmic Velvet & Imperial Gold |
| **Sakura Blossom** | Spring Cherry Petal Blush | Midnight Hanami Plum & Rose |
| **Nordic Frost** | Polar Glacier Ice & Slate | Arctic Night & Aurora Borealis |
| **Mocha Espresso** | Warm Oat Latte & Caramel | Dark Roast Espresso & Golden Crema |
| **Minimalist Ink** | Gallery Paper & Sumi Charcoal | Pure OLED Obsidian & Platinum |

---

### 🎭 Deep Visual Customization Studio
- **4 Board Grid Dimensions:** `3×3 Mini`, `4×4 Classic`, `5×5 Big`, and `6×6 Giant` — each maintaining its own saved board state and high score.
- **4 Tile Display Skins:**
  - **Numbers:** Classic powers of two (`2, 4, 8 … 2048`)
  - **Powers (`2ⁿ`):** Exponential notation (`2¹, 2², 2³ … 2¹¹`)
  - **Roman Ranks:** Classical numerals with numeric sub-labels (`I, II, III … XI`)
  - **Cosmic Icons:** Evolution emblems (`🌱 → 🌿 → 🌸 → 🔥 → ⚡ → 💎 → 🌙 → ☀️ → 🪐 → 🌟 → 🌌`)
- **4 Theme-Adaptive SVG Backdrops:**
  - **Spirals & Doodles:** Archimedean spirals, tilted geometric tiles, dashed rings, squiggles, and rotating corner spirals
  - **Star Constellations:** Connected star maps, astrolabe rings, and compass stars
  - **Zen Topo Waves:** Flowing concentric wave arcs and ripples
  - **Clean Gradient:** Distraction-free smooth ambient lighting
- **3 Tile Corner Shapes:** `Rounded`, `Crisp Sharp`, and `Soft Bubble`.
- **3 Motion Speeds:** `Fast (65ms)`, `Normal (110ms)`, and `Relaxed (175ms)`, plus toggleable **✨ Celebration Particle Bursts** on major merges (`128+` and `2048`).

---

### 🎮 4 Playable Game Modes
1. **Classic Endless:** Standard rules (90% `2`, 10% `4` spawns). Reach `2048` to win, then click **Keep going** to push toward `4096` and `8192`.
2. **⏱️ 2-Min Time Blitz:** Race against a 120-second countdown timer to rack up the highest score possible before time runs out.
3. **🧘 Zen Relax:** Stress-free endless sandbox with unlimited `Undo`, `Shuffle`, and `Zap` charges and zero Game Over lockouts.
4. **🔥 Hardcore Purist:** 25% `4`-tile spawn rate with `Undo`, `Hint`, `Auto-Play`, and `Power-Ups` completely disabled.

---

### ⚡ Tactical Power-Ups, Streaks & AI Solver
- **🔥 Consecutive Merge Streak:** Merging tiles on back-to-back moves builds your live Streak multiplier badge.
- **🔀 Shuffle (`X`):** Smoothly glides all active tiles into newly shuffled board coordinates when your layout becomes gridlocked.
- **⚡ Zap Low (`C`):** Vaporizes a lowest-ranking tile on the board to open critical breathing room.
- **Milestone Charge Rewards:** Forging `512`, `1024`, `2048`, or `4096` for the first time in a run grants `+1` bonus Shuffle & Zap charge (up to 3).
- **💡 Smart Hint (`H`) & 🤖 Auto-Play AI (`P`):** Built-in heuristic solver evaluating empty space, merge gain, neighbor smoothness, and serpentine corner monotonicity.

---

### 📊 Player Hub: Lifetime Data, Achievements & JSON Backups
Open the **Player Hub** (`📊 Data`, `🏆 Badges`, or `📖 Guide`) at any time to view:
- **Lifetime KPIs:** Games Logged, `2048` Wins, Win Rate %, All-Time High Score, Total Merges, Lifetime Score, Best Merge Streak, and Fastest `2048` Time.
- **Lifetime Tile Forge Matrix:** Tracks how many times you have forged every tile tier from `4` through `4096`.
- **Recent Match History:** Detailed table of your last 10 runs (Mode, Grid, Score, Max Tile, Moves, Duration).
- **12 Unlockable Achievements:** Earn badges like *First Spark*, *Halfway to Legend*, *2048 Grandmaster*, *Chain Reaction*, *Pure Tactician*, *Pocket Genius*, *Chrono Sprinter*, *Night Owl*, and *Palette Collector* — complete with live toast notifications.
- **Portable Save Data:** One-click **⬇ Export JSON Backup** and **⬆ Import JSON Backup** to back up or transfer your progress across browsers/devices.
- **🔊 Web Audio Synthesizer:** Zero-asset procedural sound engine for tile slides, pitch-scaled merge chimes, power-ups, and victory fanfare.

---

## ⌨️ Controls & Keyboard Shortcuts

| Input / Key | Action |
| :--- | :--- |
| `↑` `↓` `←` `→` or `W` `A` `S` `D` | Slide tiles |
| **Touch Swipe** | Slide tiles on mobile & tablets |
| `L` or `B` | Toggle **🌙 Dark Mode / ☀️ Light Mode** |
| `T` | Cycle through all **10 Color Themes** |
| `Z` or `U` | **Undo** previous move / action (up to 30 steps) |
| `H` | Show **Suggested Best Move Hint** |
| `X` | Use **🔀 Shuffle** power-up |
| `C` | Use **⚡ Zap Low** power-up |
| `P` | Toggle **🤖 Auto-Play AI** |
| `G` | Open **📊 Analytics & Data Hub** |
| `?` (`Shift + /`) | Open **📖 Rules & Grandmaster Strategy Guide** |
| `M` | Mute / Unmute **🔊 Web Audio Effects** |
| `R` | Start a **New Game** |
| `Esc` | Close Player Hub modal |

---

## 🚀 Running Locally & App Releases (`v2.0.2`)

### Option 1: Download Standalone Release (`v2.0.2`)
From the **GitHub Releases** page (`v2.0.2`), you can download:
- **`2048-standalone.html`** — A single self-contained HTML file with all CSS and JS embedded. Double-click to play offline anywhere.
- **`2048-app-v2.0.2.zip` / `2048-app-v2.0.2.tar.gz`** — Complete web & source bundle.

### Option 2: Run from Source
No installation, bundler, or local server is needed:
1. Clone or download this repository.
2. Open `index.html` directly in any modern browser.

### Automated CI/CD App Release Pipeline
`.github/workflows/release.yml` automatically packages and publishes a new **GitHub App Release** (`v2.0.2`, `v2.0.3`, …) whenever you push to `main` (or push a `v*` tag), attaching `2048-standalone.html`, `.zip`, and `.tar.gz` bundles with zero external hosting requirements.

---

## 📁 Project Structure

```text
2048/
├── .github/
│   └── workflows/
│       └── release.yml  # Automated v2.0.2+ packaging, standalone HTML builder & GitHub Release CI
├── index.html           # 3-column symmetrical Bento workspace, SVG patterns & Player Hub modal
├── style.css            # 20 theme/mode palettes, tile skins/shapes, particle FX & responsive layout
├── script.js            # Core engine, 4 modes, power-ups, AI heuristic, analytics, badges & synth
└── README.md            # Documentation, v2.0.2 changelog & strategy overview
```
