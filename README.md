# 2048 — Curated Edition

A modern, customizable implementation of the classic **2048** puzzle game built entirely with **vanilla HTML, CSS, and JavaScript** — zero external libraries, frameworks, or asset dependencies.

---

## ✨ Features

### 🎨 6 Color Themes × Light & Dark Modes (12 Palettes)
Every color theme includes both a **Light Mode** and a **Dark Mode** palette that transforms the entire viewport, frosted-glass Bento cards, tile color scales, and background doodles:
- **Classic Warm** — *Retro Cream & Amber* (Light) / *Midnight Black & Blue* (Dark)
- **Ocean Blue** — *Sky & Azure* (Light) / *Abyssal Trench* (Dark)
- **Cyberpunk Neon** — *Daylight Synthwave* (Light) / *Night City Violet & Cyan* (Dark)
- **Forest Emerald** — *Mint Sage* (Light) / *Deep Pine & Glowing Jade* (Dark)
- **Crimson Sunset** — *Warm Peach & Coral* (Light) / *Volcanic Ember* (Dark)
- **Royal Amethyst** — *Soft Lavender* (Light) / *Cosmic Velvet & Gold* (Dark)

### 🌀 Theme-Adaptive Spiral & Doodle Backdrop
- Full-viewport SVG pattern featuring Archimedean spirals, tilted tile outlines, dashed orbital rings, waves, sparkles, and `2` / `4` / `2048` glyphs.
- Two slowly rotating ambient corner spirals (`spiral-tl` and `spiral-br`).
- Automatically re-tints stroke and accent colors to match your active theme and Light/Dark mode.

### 🍱 Curated Two-Column Bento Layout
- **Left Control Column:**
  - **Brand Card:** Game title, active grid size badge, and one-click **🌙 Dark Mode / ☀️ Light Mode** toggle button.
  - **Score & Telemetry Card:** Live `SCORE`, `BEST` (saved per grid size), `Moves`, active `Time (MM:SS)`, and `Max Tile`.
  - **Action Deck:** `New Game`, multi-step `Undo` (up to 25 moves), `Hint`, `Auto-Play AI`, and `Sound` toggle.
  - **Customization Studio:** Instant selectors for **Color Palette**, **Board Grid (`3×3`, `4×4`, `5×5`, `6×6`)**, and **Motion Speed (`Fast`, `Normal`, `Relaxed`)**.
- **Right Stage Column:**
  - Smoothly animated 2048 board and a compact keyboard shortcut legend bar.
  - Automatically adapts to a single-column layout on mobile and tablet screens.

### 🧠 Smart Hint & Auto-Play AI
- **Hint (`H`):** Evaluates all valid moves using a heuristic scoring empty cells, merge gains, board smoothness, and snake-order corner monotonicity to suggest the best direction.
- **Auto-Play (`P`):** Watch the built-in heuristic AI play the board automatically in real time.

### 🔊 Web Audio Synthesizer
- Built-in Web Audio API sound effects with zero external audio files:
  - Soft slide tones on movement
  - Pitch-scaled chime notes on tile merges (higher tile values produce higher pitches)
  - Victory fanfare chord progression when reaching `2048`

### 💾 Full LocalStorage Persistence
- Automatically saves your active board state, move history, timer, theme, Light/Dark mode, animation speed, and independent **Best Scores** for each grid size (`3×3`, `4×4`, `5×5`, `6×6`).

---

## ⌨️ Controls & Keyboard Shortcuts

| Input / Key | Action |
| :--- | :--- |
| `↑` `↓` `←` `→` or `W` `A` `S` `D` | Move tiles |
| **Touch Swipe** | Move tiles on mobile / touchscreens |
| `L` or `B` | Toggle **Dark Mode / Light Mode** |
| `T` | Cycle through the **6 Color Themes** |
| `Z` or `U` | **Undo** last move |
| `H` | Show **Suggested Move Hint** |
| `P` | Toggle **Auto-Play AI** |
| `M` | Mute / Unmute **Sound Effects** |
| `R` | Start a **New Game** |

---

## 🚀 How to Run

No build step or server is required:
1. Clone or download this folder.
2. Open `index.html` directly in any modern web browser.

---

## 📁 Project Structure

```text
2048/
├── index.html   # Two-column Bento structure & SVG spiral/doodle backdrop
├── style.css    # 12 theme/mode palettes, responsive layout, and tile animations
├── script.js    # Core 2048 engine, Undo stack, AI heuristic, Web Audio synth & storage
└── README.md    # Project documentation
```
