# 2048 — Curated Studio Edition (`v2.1.0`)

![Version](https://img.shields.io/badge/release-v2.1.0-0284c7?style=flat-square)
![Tech](https://img.shields.io/badge/stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-f59e0b?style=flat-square)
![Dependencies](https://img.shields.io/badge/dependencies-zero-10b981?style=flat-square)

A minimalist, studio-crafted edition of the classic **2048** exponential puzzle game — built from scratch using **100% vanilla HTML, CSS, and JavaScript** with zero external libraries, frameworks, or asset files.

---

## 🆕 Release Changelog (`v2.1.0`)

### `v2.1.0` — Curated Minimalist Stage & Side-Tab Drawer Redesign
- **Clean, Centered Front Stage:** Removed visual clutter from the main screen so the `464px × 464px` 2048 board takes center stage, framed only by a sleek **Hero Score Header**, compact **Command Dock** (with integrated milestone progress bar), and a slim **Live Telemetry Strip** (`Moves`, `Time`, `Streak`, `Next Goal`).
- **Docked Side Tabs & Slide-Out Glass Drawer:** Relocated secondary panels into right-edge side tabs (**🏆 Achievements**, **🎨 Studio**, **📊 Analytics**, **📖 Guide**) that glide open in a frosted-glass side drawer (and dock as a bottom pill bar on mobile/tablet) while letting you continue playing uninterrupted.
- **Curated Achievements Experience:** Added a live `0/12` counter and amber unlock-notification dot on the **🏆 Achievements** side tab, plus a completion progress bar and `All` / `Unlocked` / `Locked` filter chips inside the drawer.
- **Release-Only CI/CD Workflow (No Deployment):** Updated `.github/workflows/release.yml` for `v2.1.x` to package and publish standalone HTML + `.zip` / `.tar.gz` GitHub Releases cleanly without any deployment jobs.

### Previous Releases (`v2.0.2` & `v2.0.1`)
- **`v2.0.2`:** Removed GitHub Pages deployment steps for 100% compatibility with private and public repositories.
- **`v2.0.1`:** Expanded to **10 Themes × Light & Dark Modes (20 Palettes)**, **4 Game Modes**, **Tactical Power-Ups** (`Shuffle` & `Zap`), **4 Tile Skins**, **4 SVG Backdrops**, **Lifetime Analytics**, **12 Achievements**, and **JSON Save Export/Import**.

---

## 📖 Overview

Inspired by Gabriele Cirulli's 2014 classic, **2048 — Curated Studio Edition** pairs a calm, focused puzzle stage with slide-out side tabs for deep personalization and lifetime telemetry. Every slide shifts all tiles across the grid; when two tiles of identical rank collide, they fuse into the next power of two (`2¹ → 2² → … → 2¹¹` and beyond), adding each newly forged tile's value to your score.

---

## ✨ Architecture & Features

### 🗂️ Docked Side Tabs & Slide-Out Drawer
Keep your eyes on the board while accessing four dedicated side panels whenever you want:
1. **🏆 Achievements (`B`):** Live `0/12` progress badge, notification dot on new unlocks, percentage progress bar, `All` / `Unlocked` / `Locked` filters, and 12 milestone challenges.
2. **🎨 Customization Studio (`O`):** Switch Game Modes, Color Palettes, Board Grid Sizes (`3×3` to `6×6`), Tile Skins, SVG Backdrop Art, Tile Shapes, Motion Speeds, and Celebration Particles.
3. **📊 Analytics & Vault (`G`):** Current Run Tile Vault (`2` through `2048`), Session Efficiency (`pts/move`), 8 Lifetime KPIs, Lifetime Tile Forge Matrix (`4` through `4096`), 10-Run Match History, and JSON Backup Export/Import.
4. **📖 Guide & Shortcuts (`?`):** Rotating Grandmaster Pro Tips, strategy breakdown, and quick keyboard shortcut reference.

---

### 🎨 10 Color Themes × Light & Dark Modes (20 Complete Palettes)
Toggle **🌙 Dark Mode** / **☀️ Light Mode** directly from the top header on *any* of the 10 curated themes — dynamically transforming the viewport gradient, frosted-glass panels, slide-out drawer, tile color scales, and SVG backdrop art:

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

### 🎭 Visual Studio Options
- **4 Board Grid Dimensions:** `3×3 Mini`, `4×4 Classic`, `5×5 Big`, and `6×6 Giant` — each with independent saved state and high score.
- **4 Tile Display Skins:**
  - **Numbers:** Classic powers of two (`2, 4, 8 … 2048`)
  - **Powers (`2ⁿ`):** Exponential notation (`2¹, 2², 2³ … 2¹¹`)
  - **Roman Ranks:** Classical numerals with numeric sub-labels (`I, II, III … XI`)
  - **Cosmic Icons:** Evolution emblems (`🌱 → 🌿 → 🌸 → 🔥 → ⚡ → 💎 → 🌙 → ☀️ → 🪐 → 🌟 → 🌌`)
- **4 Theme-Adaptive SVG Backdrops:** `Spirals & Doodles`, `Star Constellations`, `Zen Topo Waves`, and `Clean Gradient`.
- **3 Tile Corner Shapes:** `Rounded`, `Crisp Sharp`, and `Soft Bubble`.
- **3 Motion Speeds:** `Fast (65ms)`, `Normal (110ms)`, and `Relaxed (175ms)`, plus toggleable **✨ Celebration Particles**.

---

### 🎮 4 Playable Game Modes & Tactical Power-Ups
- **Classic Endless:** Standard rules (90% `2`, 10% `4` spawns). Forge `2048` to win, then click **Keep going** to push toward `4096` and `8192`.
- **⏱️ 2-Min Time Blitz:** Race against a 120-second countdown clock to maximize your score before time expires.
- **🧘 Zen Relax:** Stress-free endless sandbox with unlimited `Undo`, `Shuffle`, and `Zap` charges and zero Game Over lockouts.
- **🔥 Hardcore Purist:** 25% `4`-tile spawn rate with `Undo`, `Hint`, `Auto-Play`, and `Power-Ups` disabled.
- **🔀 Shuffle (`X`) & ⚡ Zap (`C`):** Rearrange gridlocked boards or vaporize a lowest-value tile; forging `512`, `1024`, `2048`, or `4096` awards `+1` bonus charge (up to 3).
- **💡 Smart Hint (`H`) & 🤖 Auto-Play AI (`P`):** Built-in snake-monotonicity & corner-anchor heuristic solver, paired with a zero-asset **🔊 Web Audio Synthesizer**.

---

## ⌨️ Controls & Keyboard Shortcuts

| Input / Key | Action |
| :--- | :--- |
| `↑` `↓` `←` `→` or `W` `A` `S` `D` | Slide tiles |
| **Touch Swipe** | Slide tiles on mobile & tablets |
| `L` | Toggle **🌙 Dark Mode / ☀️ Light Mode** |
| `T` | Cycle through all **10 Color Themes** |
| `Z` or `U` | **Undo** previous move / action (up to 30 steps) |
| `H` | Show floating **Best Move Hint** |
| `X` / `C` | Use **🔀 Shuffle** / **⚡ Zap** power-up |
| `P` | Toggle **🤖 Auto-Play AI** |
| `B` | Toggle **🏆 Achievements** side drawer |
| `O` | Toggle **🎨 Customization Studio** side drawer |
| `G` | Toggle **📊 Analytics & Vault** side drawer |
| `?` (`Shift + /`) | Toggle **📖 Strategy Guide** side drawer |
| `M` | Mute / Unmute **🔊 Sound Effects** |
| `R` | Start a **New Game** |
| `Esc` | Close open side drawer |

---

## 🚀 Running Locally & App Releases (`v2.1.0`)

### Option 1: Download Standalone Release (`v2.1.0`)
From the **GitHub Releases** page (`v2.1.0`), download:
- **`2048-standalone.html`** — Single self-contained HTML app with all CSS and JS embedded for instant offline play.
- **`2048-app-v2.1.0.zip` / `2048-app-v2.1.0.tar.gz`** — Complete web & source archive.

### Option 2: Run from Source
1. Clone or download this repository.
2. Open `index.html` directly in any modern browser — no build step or server required.

### Release-Only GitHub Actions Workflow
`.github/workflows/release.yml` packages and publishes a new **GitHub App Release** (`v2.1.0`, `v2.1.1`, …) on pushes to `main`, `v*` tags, or manual `workflow_dispatch` runs — attaching `2048-standalone.html`, `.zip`, and `.tar.gz` bundles **without any external deployment jobs**.

---

## 📁 Project Structure

```text
2048/
├── .github/
│   └── workflows/
│       └── release.yml  # Release-only CI packaging (standalone HTML, .zip & .tar.gz — no deployment)
├── index.html           # Curated centered stage, docked side tabs rail & 4-panel slide-out drawer
├── style.css            # 20 theme/mode palettes, glass drawer transitions, tile skins & responsive layout
├── script.js            # Core engine, side-drawer controller, filtered achievements, AI & Web Audio synth
└── README.md            # Documentation, v2.1.0 changelog, palettes & controls reference
```
