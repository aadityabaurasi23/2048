(() => {
  const STORAGE_KEY_WALLPAPER = "custom2048_wallpaper_v22";

  const WALLPAPER_CATALOG = [
    {
      id: "classic",
      name: "Warm Spiral Doodles",
      themeId: "classic",
      themeLabel: "Classic Warm",
      icon: "🌀",
      category: "doodles",
      previewLight: "linear-gradient(135deg, #fbf8ef 0%, #ede0c8 55%, #edc22e 100%)",
      previewDark: "linear-gradient(135deg, #0d0a06 0%, #3b2d18 55%, #facc15 100%)",
      palettes: {
        light: {
          primary: "rgba(143, 122, 102, 0.24)",
          secondary: "rgba(237, 194, 46, 0.30)",
          accent: "rgba(245, 149, 99, 0.28)",
          glow: "rgba(237, 194, 46, 0.35)",
        },
        dark: {
          primary: "rgba(234, 179, 8, 0.25)",
          secondary: "rgba(250, 204, 21, 0.30)",
          accent: "rgba(245, 158, 11, 0.28)",
          glow: "rgba(250, 204, 21, 0.45)",
        },
      },
    },
    {
      id: "emerald",
      name: "Green Doodle Grove",
      themeId: "emerald",
      themeLabel: "Forest Emerald",
      icon: "🌿",
      category: "doodles",
      previewLight: "linear-gradient(135deg, #ecfdf5 0%, #a7f3d0 55%, #10b981 100%)",
      previewDark: "linear-gradient(135deg, #04130d 0%, #064e3b 55%, #34d399 100%)",
      palettes: {
        light: {
          primary: "rgba(5, 150, 105, 0.25)",
          secondary: "rgba(16, 185, 129, 0.30)",
          accent: "rgba(52, 211, 153, 0.32)",
          glow: "rgba(16, 185, 129, 0.36)",
        },
        dark: {
          primary: "rgba(52, 211, 153, 0.22)",
          secondary: "rgba(16, 185, 129, 0.28)",
          accent: "rgba(250, 204, 21, 0.26)",
          glow: "rgba(52, 211, 153, 0.40)",
        },
      },
    },
    {
      id: "ocean",
      name: "Abyssal Wave Currents",
      themeId: "ocean",
      themeLabel: "Ocean Blue",
      icon: "🌊",
      category: "nature",
      previewLight: "linear-gradient(135deg, #f0f9ff 0%, #7dd3fc 55%, #0284c7 100%)",
      previewDark: "linear-gradient(135deg, #040d1a 0%, #0c4a6e 55%, #38bdf8 100%)",
      palettes: {
        light: {
          primary: "rgba(2, 132, 199, 0.22)",
          secondary: "rgba(56, 189, 248, 0.28)",
          accent: "rgba(14, 165, 233, 0.26)",
          glow: "rgba(14, 165, 233, 0.34)",
        },
        dark: {
          primary: "rgba(56, 189, 248, 0.22)",
          secondary: "rgba(34, 211, 238, 0.26)",
          accent: "rgba(125, 211, 252, 0.28)",
          glow: "rgba(56, 189, 248, 0.40)",
        },
      },
    },
    {
      id: "cyberpunk",
      name: "Synthwave Cyber Grid",
      themeId: "cyberpunk",
      themeLabel: "Cyberpunk Neon",
      icon: "⚡",
      category: "cosmic",
      previewLight: "linear-gradient(135deg, #fdf4ff 0%, #f0abfc 55%, #d946ef 100%)",
      previewDark: "linear-gradient(135deg, #090414 0%, #4a044e 55%, #06b6d4 100%)",
      palettes: {
        light: {
          primary: "rgba(192, 38, 211, 0.24)",
          secondary: "rgba(6, 182, 212, 0.28)",
          accent: "rgba(236, 72, 153, 0.28)",
          glow: "rgba(217, 70, 239, 0.36)",
        },
        dark: {
          primary: "rgba(232, 121, 249, 0.26)",
          secondary: "rgba(34, 211, 238, 0.28)",
          accent: "rgba(244, 63, 94, 0.28)",
          glow: "rgba(34, 211, 238, 0.42)",
        },
      },
    },
    {
      id: "sunset",
      name: "Solar Horizon Embers",
      themeId: "sunset",
      themeLabel: "Crimson Sunset",
      icon: "🔥",
      category: "nature",
      previewLight: "linear-gradient(135deg, #fff7ed 0%, #fdba74 55%, #ea580c 100%)",
      previewDark: "linear-gradient(135deg, #160705 0%, #7c2d12 55%, #fb923c 100%)",
      palettes: {
        light: {
          primary: "rgba(234, 88, 12, 0.24)",
          secondary: "rgba(251, 146, 60, 0.30)",
          accent: "rgba(244, 63, 94, 0.26)",
          glow: "rgba(249, 115, 22, 0.36)",
        },
        dark: {
          primary: "rgba(251, 146, 60, 0.25)",
          secondary: "rgba(250, 204, 21, 0.28)",
          accent: "rgba(248, 113, 113, 0.28)",
          glow: "rgba(251, 146, 60, 0.42)",
        },
      },
    },
    {
      id: "royal",
      name: "Celestial Constellations",
      themeId: "royal",
      themeLabel: "Royal Amethyst",
      icon: "✨",
      category: "cosmic",
      previewLight: "linear-gradient(135deg, #f5f3ff 0%, #c4b5fd 55%, #7c3aed 100%)",
      previewDark: "linear-gradient(135deg, #0a0518 0%, #3b0764 55%, #a78bfa 100%)",
      palettes: {
        light: {
          primary: "rgba(109, 40, 217, 0.24)",
          secondary: "rgba(139, 92, 246, 0.28)",
          accent: "rgba(245, 158, 11, 0.30)",
          glow: "rgba(124, 58, 237, 0.35)",
        },
        dark: {
          primary: "rgba(167, 139, 250, 0.26)",
          secondary: "rgba(192, 132, 252, 0.26)",
          accent: "rgba(250, 204, 21, 0.30)",
          glow: "rgba(167, 139, 250, 0.42)",
        },
      },
    },
    {
      id: "sakura",
      name: "Sakura Petal Drift",
      themeId: "sakura",
      themeLabel: "Sakura Blossom",
      icon: "🌸",
      category: "nature",
      previewLight: "linear-gradient(135deg, #fff5f8 0%, #fbcfe8 55%, #ec4899 100%)",
      previewDark: "linear-gradient(135deg, #140610 0%, #831843 55%, #f472b6 100%)",
      palettes: {
        light: {
          primary: "rgba(219, 39, 119, 0.24)",
          secondary: "rgba(244, 114, 182, 0.34)",
          accent: "rgba(251, 113, 133, 0.30)",
          glow: "rgba(236, 72, 153, 0.35)",
        },
        dark: {
          primary: "rgba(244, 114, 182, 0.26)",
          secondary: "rgba(251, 207, 232, 0.26)",
          accent: "rgba(232, 121, 249, 0.26)",
          glow: "rgba(244, 114, 182, 0.40)",
        },
      },
    },
    {
      id: "nordic",
      name: "Aurora Borealis & Frost",
      themeId: "nordic",
      themeLabel: "Nordic Frost",
      icon: "❄️",
      category: "nature",
      previewLight: "linear-gradient(135deg, #f8fafc 0%, #bae6fd 55%, #5e81ac 100%)",
      previewDark: "linear-gradient(135deg, #1b202b 0%, #3b4252 50%, #88c0d0 100%)",
      palettes: {
        light: {
          primary: "rgba(71, 85, 105, 0.22)",
          secondary: "rgba(56, 189, 248, 0.26)",
          accent: "rgba(94, 129, 172, 0.28)",
          glow: "rgba(56, 189, 248, 0.32)",
        },
        dark: {
          primary: "rgba(136, 192, 208, 0.24)",
          secondary: "rgba(163, 190, 140, 0.24)",
          accent: "rgba(180, 142, 173, 0.24)",
          glow: "rgba(136, 192, 208, 0.38)",
        },
      },
    },
    {
      id: "coffee",
      name: "Café Roast Doodles",
      themeId: "coffee",
      themeLabel: "Mocha Espresso",
      icon: "☕",
      category: "doodles",
      previewLight: "linear-gradient(135deg, #fdfaf6 0%, #ddb892 55%, #7f5539 100%)",
      previewDark: "linear-gradient(135deg, #120b07 0%, #432818 55%, #dda15e 100%)",
      palettes: {
        light: {
          primary: "rgba(127, 85, 57, 0.25)",
          secondary: "rgba(176, 137, 104, 0.30)",
          accent: "rgba(188, 108, 37, 0.28)",
          glow: "rgba(188, 108, 37, 0.34)",
        },
        dark: {
          primary: "rgba(221, 161, 94, 0.23)",
          secondary: "rgba(245, 158, 11, 0.25)",
          accent: "rgba(212, 163, 115, 0.26)",
          glow: "rgba(221, 161, 94, 0.38)",
        },
      },
    },
    {
      id: "monochrome",
      name: "Sumi Ink Geometry",
      themeId: "monochrome",
      themeLabel: "Minimalist Ink",
      icon: "✒️",
      category: "doodles",
      previewLight: "linear-gradient(135deg, #ffffff 0%, #d4d4d8 55%, #27272a 100%)",
      previewDark: "linear-gradient(135deg, #050505 0%, #27272a 55%, #e4e4e7 100%)",
      palettes: {
        light: {
          primary: "rgba(39, 39, 42, 0.20)",
          secondary: "rgba(113, 113, 122, 0.24)",
          accent: "rgba(24, 24, 27, 0.26)",
          glow: "rgba(63, 63, 70, 0.30)",
        },
        dark: {
          primary: "rgba(244, 244, 245, 0.16)",
          secondary: "rgba(161, 161, 170, 0.20)",
          accent: "rgba(255, 255, 255, 0.24)",
          glow: "rgba(255, 255, 255, 0.32)",
        },
      },
    },
    {
      id: "minimal",
      name: "Clean Static Gradient",
      themeId: null,
      themeLabel: "Any Theme (Battery Saver)",
      icon: "🫧",
      category: "cosmic",
      previewLight: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      previewDark: "linear-gradient(135deg, #0f172a 0%, #020617 100%)",
      palettes: {
        light: {
          primary: "rgba(0,0,0,0)",
          secondary: "rgba(0,0,0,0)",
          accent: "rgba(0,0,0,0)",
          glow: "rgba(0,0,0,0)",
        },
        dark: {
          primary: "rgba(0,0,0,0)",
          secondary: "rgba(0,0,0,0)",
          accent: "rgba(0,0,0,0)",
          glow: "rgba(0,0,0,0)",
        },
      },
    },
  ];

  const DEFAULT_STATE = {
    wallpaperId: "classic",
    syncWithTheme: true,
    animated: true,
    speed: 1.0,
    density: "balanced", // "subtle" | "balanced" | "lush"
    interactiveRipples: true,
    wallpapersTried: ["classic"],
  };

  let state = loadWallpaperState();
  let activeTheme = document.documentElement.getAttribute("data-theme") || "classic";
  let activeMode = document.documentElement.getAttribute("data-mode") || "light";

  let canvas = null;
  let ctx = null;
  let width = 0;
  let height = 0;
  let dpr = 1;
  let rafId = null;
  let lastTs = 0;
  let simTime = 0;

  // Interactive physics state
  let entities = [];
  let ripples = [];
  let driftVX = 0;
  let driftVY = 0;
  let pointer = { x: 0.5, y: 0.5, clientX: -999, clientY: -999, active: false };

  // External subscriber hooks (for script.js & AngularJS UI)
  const listeners = new Set();

  function loadWallpaperState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_WALLPAPER);
      if (!raw) return { ...DEFAULT_STATE };
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_STATE,
        ...parsed,
        wallpapersTried: Array.isArray(parsed.wallpapersTried)
          ? parsed.wallpapersTried
          : ["classic"],
      };
    } catch {
      return { ...DEFAULT_STATE };
    }
  }

  function saveWallpaperState() {
    try {
      localStorage.setItem(STORAGE_KEY_WALLPAPER, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors
    }
  }

  function notifyListeners(meta = {}) {
    updateLivePillDOM();
    listeners.forEach((fn) => {
      try {
        fn(getSnapshot(), meta);
      } catch {
        // Ignore subscriber errors
      }
    });
  }

  function getSnapshot() {
    const item =
      WALLPAPER_CATALOG.find((w) => w.id === state.wallpaperId) || WALLPAPER_CATALOG[0];
    return {
      ...state,
      activeTheme,
      activeMode,
      currentItem: item,
      catalog: WALLPAPER_CATALOG,
    };
  }

  function getDensityMultiplier() {
    if (state.density === "subtle") return 0.58;
    if (state.density === "lush") return 1.45;
    return 1.0;
  }

  function getActivePalette() {
    const item =
      WALLPAPER_CATALOG.find((w) => w.id === state.wallpaperId) || WALLPAPER_CATALOG[0];
    return item.palettes[activeMode === "dark" ? "dark" : "light"];
  }

  // ==========================================================================
  // Entity Initialization per Wallpaper Scene
  // ==========================================================================
  function rebuildEntities() {
    if (!width || !height) return;
    entities = [];
    const mult = getDensityMultiplier();
    const areaScale = Math.min(1.5, Math.max(0.65, (width * height) / (1366 * 768)));
    const wp = state.wallpaperId;

    if (wp === "minimal") return;

    const baseCount =
      wp === "royal"
        ? 58
        : wp === "sakura" || wp === "nordic"
        ? 42
        : wp === "cyberpunk"
        ? 30
        : 34;

    const count = Math.max(12, Math.round(baseCount * mult * areaScale));
    const glyphs = ["2", "4", "8", "16", "64", "2048"];
    const doodleShapes = ["spiral", "tile", "leaf", "plus", "ring", "bean"];

    for (let i = 0; i < count; i++) {
      entities.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 8 + Math.random() * 26,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -0.25 - Math.random() * 0.55,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.012,
        phase: Math.random() * Math.PI * 2,
        depth: 0.35 + Math.random() * 0.65,
        kind: doodleShapes[i % doodleShapes.length],
        glyph: glyphs[i % glyphs.length],
        colorSlot: i % 3,
      });
    }
  }

  // ==========================================================================
  // Custom Vector Doodle & Particle Primitives on Canvas
  // ==========================================================================
  function drawArchimedeanSpiral(c, radius, turns = 2.6) {
    c.beginPath();
    const steps = 42;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * Math.PI * 2 * turns;
      const r = (i / steps) * radius;
      const px = Math.cos(t) * r;
      const py = Math.sin(t) * r;
      if (i === 0) c.moveTo(px, py);
      else c.lineTo(px, py);
    }
    c.stroke();
  }

  function drawBotanicalLeaf(c, s) {
    c.beginPath();
    c.moveTo(0, -s);
    c.quadraticCurveTo(s * 0.85, -s * 0.25, 0, s);
    c.quadraticCurveTo(-s * 0.85, -s * 0.25, 0, -s);
    c.stroke();
    c.beginPath();
    c.moveTo(0, -s * 0.75);
    c.lineTo(0, s * 0.85);
    c.stroke();
  }

  function drawSakuraPetal(c, s) {
    c.beginPath();
    c.moveTo(0, s * 0.8);
    c.bezierCurveTo(s * 0.9, s * 0.2, s * 0.75, -s * 0.85, 0, -s * 0.45);
    c.bezierCurveTo(-s * 0.75, -s * 0.85, -s * 0.9, s * 0.2, 0, s * 0.8);
    c.fill();
  }

  function drawRoundedTile(c, s, label) {
    const half = s * 0.82;
    const r = Math.max(3, s * 0.24);
    c.beginPath();
    c.moveTo(-half + r, -half);
    c.arcTo(half, -half, half, half, r);
    c.arcTo(half, half, -half, half, r);
    c.arcTo(-half, half, -half, -half, r);
    c.arcTo(-half, -half, half, -half, r);
    c.closePath();
    c.stroke();

    if (label && s > 15) {
      c.font = `800 ${Math.round(s * 0.56)}px "Clear Sans", sans-serif`;
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText(label, 0, 1);
    }
  }

  function drawCoffeeBean(c, s) {
    c.beginPath();
    c.ellipse(0, 0, s * 0.72, s * 0.5, 0, 0, Math.PI * 2);
    c.stroke();
    c.beginPath();
    c.moveTo(-s * 0.55, 0);
    c.bezierCurveTo(-s * 0.15, -s * 0.25, s * 0.15, s * 0.25, s * 0.55, 0);
    c.stroke();
  }

  function drawFrostCrystal(c, s) {
    for (let k = 0; k < 3; k++) {
      c.save();
      c.rotate((Math.PI / 3) * k);
      c.beginPath();
      c.moveTo(0, -s);
      c.lineTo(0, s);
      c.stroke();
      c.restore();
    }
  }

  // ==========================================================================
  // Main 60 FPS Render Loop
  // ==========================================================================
  function renderFrame(ts) {
    if (!ctx || !canvas) return;
    if (!lastTs) lastTs = ts;
    const rawDt = Math.min(48, ts - lastTs);
    lastTs = ts;

    const dtFactor = (rawDt / 16.667) * (state.animated ? state.speed : 0);
    simTime += 0.012 * dtFactor;

    ctx.clearRect(0, 0, width, height);

    const wp = state.wallpaperId;
    if (wp === "minimal") {
      stopLoop();
      return;
    }

    const pal = getActivePalette();
    const colors = [pal.primary, pal.secondary, pal.accent];

    // Decay swipe momentum drift smoothly
    driftVX *= 0.94;
    driftVY *= 0.94;

    const parX = state.interactiveRipples ? (pointer.x - 0.5) * 26 : 0;
    const parY = state.interactiveRipples ? (pointer.y - 0.5) * 26 : 0;

    // 1. Scene-Specific Ambient Backdrops
    if (wp === "ocean" || wp === "emerald" || wp === "classic") {
      // Soft flowing topographic / botanical / aquatic sine ribbons
      const waveCount = wp === "ocean" ? 4 : 2;
      for (let w = 0; w < waveCount; w++) {
        ctx.save();
        ctx.strokeStyle = w % 2 === 0 ? pal.primary : pal.secondary;
        ctx.lineWidth = wp === "ocean" ? 2.2 : 1.4;
        ctx.beginPath();
        const baseY = height * (0.24 + w * 0.2);
        for (let x = 0; x <= width; x += 24) {
          const y =
            baseY +
            Math.sin(x * 0.0045 + simTime * (0.8 + w * 0.22) + w) * 24 +
            Math.cos(x * 0.009 - simTime * 0.5) * 10;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
      }
    } else if (wp === "cyberpunk") {
      // Synthwave Horizon Sun & Scrolling 3D Perspective Grid
      const horizonY = height * 0.58;
      ctx.save();
      const sunGrad = ctx.createRadialGradient(
        width * 0.5 + parX * 0.4,
        horizonY - 40,
        10,
        width * 0.5 + parX * 0.4,
        horizonY - 40,
        Math.min(width, height) * 0.28
      );
      sunGrad.addColorStop(0, pal.accent);
      sunGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(
        width * 0.5 + parX * 0.4,
        horizonY - 40,
        Math.min(width, height) * 0.28,
        0,
        Math.PI * 2
      );
      ctx.fill();

      ctx.strokeStyle = pal.primary;
      ctx.lineWidth = 1.15;
      // Perspective rays from center horizon
      const vanishX = width * 0.5 + parX * 0.5;
      for (let i = -10; i <= 10; i++) {
        ctx.beginPath();
        ctx.moveTo(vanishX + i * 26, horizonY);
        ctx.lineTo(vanishX + i * 150, height);
        ctx.stroke();
      }
      // Scrolling horizontal grid lines
      const scroll = (simTime * 0.55) % 1;
      for (let row = 0; row < 9; row++) {
        const p = (row + scroll) / 9;
        const gy = horizonY + Math.pow(p, 1.85) * (height - horizonY);
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
        ctx.stroke();
      }
      ctx.restore();
    } else if (wp === "nordic") {
      // Silky Aurora Borealis Curtains
      ctx.save();
      for (let band = 0; band < 3; band++) {
        ctx.beginPath();
        const topBase = height * (0.12 + band * 0.09);
        ctx.moveTo(0, height * 0.55);
        for (let x = 0; x <= width; x += 28) {
          const ay =
            topBase +
            Math.sin(x * 0.0038 + simTime * (0.65 + band * 0.2) + band * 1.7) * 38 +
            Math.cos(x * 0.008 - simTime * 0.4) * 18;
          ctx.lineTo(x, ay);
        }
        ctx.lineTo(width, 0);
        ctx.lineTo(0, 0);
        ctx.closePath();
        const aGrad = ctx.createLinearGradient(0, 0, 0, height * 0.48);
        aGrad.addColorStop(0, band === 1 ? pal.secondary : pal.primary);
        aGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = aGrad;
        ctx.fill();
      }
      ctx.restore();
    } else if (wp === "sunset") {
      // Concentric Solar Halo Rings
      ctx.save();
      ctx.strokeStyle = pal.secondary;
      ctx.lineWidth = 1.4;
      const cx = width * 0.5 + parX * 0.5;
      const cy = height * 0.52 + parY * 0.5;
      for (let r = 1; r <= 4; r++) {
        const rad = 110 * r + Math.sin(simTime + r) * 12;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    } else if (wp === "monochrome" || wp === "royal") {
      // Slow-turning Architectural / Astrolabe Orbit Rings
      ctx.save();
      ctx.translate(width * 0.5 + parX * 0.35, height * 0.5 + parY * 0.35);
      ctx.rotate(simTime * 0.08);
      ctx.strokeStyle = pal.primary;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([8, 10]);
      ctx.beginPath();
      ctx.arc(0, 0, Math.min(width, height) * 0.38, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(0, 0, Math.min(width, height) * 0.44, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // 2. Update & Draw Scene Entities
    for (let i = 0; i < entities.length; i++) {
      const e = entities[i];

      if (state.animated) {
        if (wp === "sakura") {
          e.x += (0.55 + Math.sin(simTime + e.phase) * 0.45 + driftVX) * dtFactor * e.depth;
          e.y += (0.72 + Math.cos(simTime * 0.7 + e.phase) * 0.2 + driftVY) * dtFactor * e.depth;
        } else if (wp === "nordic") {
          e.x += (Math.sin(simTime * 0.8 + e.phase) * 0.38 + driftVX) * dtFactor * e.depth;
          e.y += (0.48 + driftVY) * dtFactor * e.depth;
        } else if (wp === "ocean" || wp === "sunset" || wp === "coffee") {
          e.x += (Math.sin(simTime + e.phase) * 0.35 + driftVX) * dtFactor * e.depth;
          e.y += (e.vy + driftVY) * dtFactor * e.depth;
        } else {
          e.x += (e.vx + driftVX) * dtFactor * e.depth;
          e.y += (e.vy * 0.45 + driftVY) * dtFactor * e.depth;
        }
        e.rot += e.vRot * dtFactor;
      }

      // Wrap around screen edges cleanly
      const pad = 45;
      if (e.x < -pad) e.x = width + pad;
      if (e.x > width + pad) e.x = -pad;
      if (e.y < -pad) e.y = height + pad;
      if (e.y > height + pad) e.y = -pad;

      const drawX = e.x + parX * e.depth;
      const drawY = e.y + parY * e.depth;
      const col = colors[e.colorSlot];

      ctx.save();
      ctx.translate(drawX, drawY);
      ctx.rotate(e.rot);
      ctx.strokeStyle = col;
      ctx.fillStyle = col;
      ctx.lineWidth = 1.65;

      if (wp === "classic") {
        if (e.kind === "spiral") drawArchimedeanSpiral(ctx, e.size * 0.95, 2.5);
        else if (e.kind === "tile") drawRoundedTile(ctx, e.size * 0.85, e.glyph);
        else if (e.kind === "ring") {
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.arc(0, 0, e.size * 0.7, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.moveTo(-7, 0);
          ctx.lineTo(7, 0);
          ctx.moveTo(0, -7);
          ctx.lineTo(0, 7);
          ctx.stroke();
        }
      } else if (wp === "emerald") {
        // Green Doodle Grove: botanical doodle leaves, green spirals, sprout tiles & fireflies
        if (e.kind === "leaf" || e.kind === "bean") {
          drawBotanicalLeaf(ctx, e.size * 0.88);
        } else if (e.kind === "spiral") {
          drawArchimedeanSpiral(ctx, e.size * 0.9, 2.3);
        } else if (e.kind === "tile") {
          drawRoundedTile(ctx, e.size * 0.8, e.glyph);
        } else {
          const pulse = 3 + Math.sin(simTime * 2.2 + e.phase) * 2;
          ctx.beginPath();
          ctx.arc(0, 0, Math.max(2, pulse), 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (wp === "ocean") {
        const r = Math.max(3, e.size * 0.52);
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(-r * 0.3, -r * 0.3, r * 0.22, 0, Math.PI * 2);
        ctx.fill();
      } else if (wp === "cyberpunk") {
        if (e.colorSlot === 0) {
          ctx.strokeRect(-e.size * 0.45, -e.size * 0.45, e.size * 0.9, e.size * 0.9);
        } else {
          ctx.beginPath();
          ctx.moveTo(0, -e.size * 0.7);
          ctx.lineTo(0, e.size * 0.7);
          ctx.stroke();
        }
      } else if (wp === "sunset") {
        const flicker = 0.65 + 0.35 * Math.sin(simTime * 3 + e.phase);
        ctx.globalAlpha = flicker;
        if (e.colorSlot === 0) {
          ctx.beginPath();
          ctx.moveTo(0, -e.size * 0.5);
          ctx.lineTo(e.size * 0.38, 0);
          ctx.lineTo(0, e.size * 0.5);
          ctx.lineTo(-e.size * 0.38, 0);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, Math.max(2.2, e.size * 0.22), 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (wp === "royal") {
        const twinkle = 1.8 + Math.sin(simTime * 2.4 + e.phase) * 1.4;
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(1.4, twinkle), 0, Math.PI * 2);
        ctx.fill();
      } else if (wp === "sakura") {
        const flutter = 0.55 + 0.45 * Math.abs(Math.cos(simTime * 1.8 + e.phase));
        ctx.scale(1, flutter);
        if (e.colorSlot === 2 && e.kind === "spiral") {
          drawArchimedeanSpiral(ctx, e.size * 0.75, 2.0);
        } else {
          drawSakuraPetal(ctx, e.size * 0.52);
        }
      } else if (wp === "nordic") {
        drawFrostCrystal(ctx, e.size * 0.42);
      } else if (wp === "coffee") {
        if (e.kind === "bean" || e.kind === "leaf") {
          drawCoffeeBean(ctx, e.size * 0.75);
        } else if (e.kind === "spiral") {
          drawArchimedeanSpiral(ctx, e.size * 0.85, 2.2);
        } else {
          // Rising aromatic steam wisp
          ctx.beginPath();
          ctx.moveTo(0, e.size * 0.6);
          ctx.bezierCurveTo(6, e.size * 0.2, -6, -e.size * 0.2, 0, -e.size * 0.6);
          ctx.stroke();
        }
      } else if (wp === "monochrome") {
        if (e.kind === "tile") {
          drawRoundedTile(ctx, e.size * 0.78, e.glyph);
        } else if (e.kind === "ring") {
          ctx.beginPath();
          ctx.arc(0, 0, e.size * 0.62, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.moveTo(-8, 0);
          ctx.lineTo(8, 0);
          ctx.moveTo(0, -8);
          ctx.lineTo(0, 8);
          ctx.stroke();
        }
      }

      ctx.restore();
    }

    // 3. Constellation Lines for Royal Cosmos
    if (wp === "royal") {
      ctx.save();
      ctx.strokeStyle = pal.primary;
      ctx.lineWidth = 0.9;
      const maxDist = 135;
      for (let i = 0; i < entities.length; i++) {
        const a = entities[i];
        const ax = a.x + parX * a.depth;
        const ay = a.y + parY * a.depth;

        for (let j = i + 1; j < entities.length; j++) {
          const b = entities[j];
          const bx = b.x + parX * b.depth;
          const by = b.y + parY * b.depth;
          const dx = ax - bx;
          const dy = ay - by;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDist * maxDist) {
            ctx.globalAlpha = 1 - Math.sqrt(distSq) / maxDist;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }

        if (state.interactiveRipples && pointer.active) {
          const pdx = ax - pointer.clientX;
          const pdy = ay - pointer.clientY;
          const pDist = Math.hypot(pdx, pdy);
          if (pDist < 165) {
            ctx.globalAlpha = (1 - pDist / 165) * 0.85;
            ctx.strokeStyle = pal.accent;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(pointer.clientX, pointer.clientY);
            ctx.stroke();
          }
        }
      }
      ctx.restore();
    }

    // 4. Interactive Gameplay Merge Shockwaves / Ripples
    if (ripples.length > 0) {
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.radius += rp.speed * Math.max(0.4, dtFactor || 0.8);
        rp.alpha *= 0.955;

        if (rp.alpha < 0.02 || rp.radius > rp.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = rp.alpha;
        ctx.strokeStyle = pal.glow;
        ctx.lineWidth = rp.lineWidth;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    if (state.animated || ripples.length > 0) {
      rafId = requestAnimationFrame(renderFrame);
    } else {
      rafId = null;
    }
  }

  function startLoop() {
    if (state.wallpaperId === "minimal" || document.hidden) {
      stopLoop();
      if (ctx) ctx.clearRect(0, 0, width, height);
      return;
    }
    if (!rafId) {
      lastTs = 0;
      rafId = requestAnimationFrame(renderFrame);
    }
  }

  function stopLoop() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function resizeCanvas() {
    if (!canvas) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    rebuildEntities();
    if (!state.animated && state.wallpaperId !== "minimal") {
      renderFrame(performance.now());
    }
  }

  function updateLivePillDOM() {
    const livePill = document.getElementById("wallpaper-live-pill");
    if (!livePill) return;
    if (state.wallpaperId === "minimal") {
      livePill.textContent = "STATIC";
    } else {
      livePill.textContent = state.animated ? "LIVE" : "PAUSED";
    }
  }

  // ==========================================================================
  // Public Engine API (Consumed by script.js & AngularJS Controller)
  // ==========================================================================
  const EngineAPI = {
    init() {
      canvas = document.getElementById("live-wallpaper-canvas");
      if (!canvas) return;

      resizeCanvas();

      window.addEventListener("resize", resizeCanvas);
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) stopLoop();
        else startLoop();
      });

      window.addEventListener(
        "pointermove",
        (e) => {
          pointer.clientX = e.clientX;
          pointer.clientY = e.clientY;
          pointer.x = width ? e.clientX / width : 0.5;
          pointer.y = height ? e.clientY / height : 0.5;
          pointer.active = true;
        },
        { passive: true }
      );

      document.documentElement.setAttribute("data-wallpaper", state.wallpaperId);
      updateLivePillDOM();
      startLoop();
      mountWallpaperStudioUI();
    },

    getCatalog() {
      return WALLPAPER_CATALOG;
    },

    getState() {
      return getSnapshot();
    },

    restoreState(savedObj) {
      if (!savedObj || typeof savedObj !== "object") return;
      if (
        savedObj.wallpaperId &&
        WALLPAPER_CATALOG.some((w) => w.id === savedObj.wallpaperId)
      ) {
        state.wallpaperId = savedObj.wallpaperId;
      }
      if (typeof savedObj.syncWithTheme === "boolean") {
        state.syncWithTheme = savedObj.syncWithTheme;
      }
      if (typeof savedObj.animated === "boolean") {
        state.animated = savedObj.animated;
      }
      if (typeof savedObj.speed === "number") {
        state.speed = Math.min(2.0, Math.max(0.25, Number(savedObj.speed.toFixed(2))));
      }
      if (["subtle", "balanced", "lush"].includes(savedObj.density)) {
        state.density = savedObj.density;
      }
      if (typeof savedObj.interactiveRipples === "boolean") {
        state.interactiveRipples = savedObj.interactiveRipples;
      }
      if (Array.isArray(savedObj.wallpapersTried) && savedObj.wallpapersTried.length > 0) {
        state.wallpapersTried = Array.from(
          new Set(
            savedObj.wallpapersTried.filter((id) =>
              WALLPAPER_CATALOG.some((w) => w.id === id)
            )
          )
        );
      }

      document.documentElement.setAttribute("data-wallpaper", state.wallpaperId);
      saveWallpaperState();
      rebuildEntities();

      if (state.wallpaperId === "minimal") {
        stopLoop();
        if (ctx) ctx.clearRect(0, 0, width, height);
      } else {
        startLoop();
        if (!state.animated) renderFrame(performance.now());
      }

      notifyListeners({ source: "restore" });
    },

    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },

    onThemeOrModeChanged(themeId, modeId) {
      const prevWallpaper = state.wallpaperId;
      activeTheme = themeId || activeTheme;
      activeMode = modeId || activeMode;

      // When Connected to Theme is enabled, switching Theme switches to its connected Wallpaper!
      if (state.syncWithTheme && WALLPAPER_CATALOG.some((w) => w.id === activeTheme)) {
        state.wallpaperId = activeTheme;
        if (!state.wallpapersTried.includes(activeTheme)) {
          state.wallpapersTried.push(activeTheme);
        }
        document.documentElement.setAttribute("data-wallpaper", state.wallpaperId);
        saveWallpaperState();
        if (prevWallpaper !== state.wallpaperId) {
          rebuildEntities();
        }
      }

      if (!state.animated && state.wallpaperId !== "minimal") {
        renderFrame(performance.now());
      } else {
        startLoop();
      }
      notifyListeners({ source: "theme-sync" });
    },

    selectWallpaper(wallpaperId, { fromUserUI = true } = {}) {
      const target = WALLPAPER_CATALOG.find((w) => w.id === wallpaperId);
      if (!target) return;

      state.wallpaperId = target.id;
      if (target.id !== "minimal" && !state.wallpapersTried.includes(target.id)) {
        state.wallpapersTried.push(target.id);
      }

      document.documentElement.setAttribute("data-wallpaper", state.wallpaperId);
      saveWallpaperState();
      rebuildEntities();

      if (state.wallpaperId === "minimal") {
        stopLoop();
        if (ctx) ctx.clearRect(0, 0, width, height);
      } else {
        startLoop();
        if (!state.animated) renderFrame(performance.now());
      }

      notifyListeners({
        source: fromUserUI ? "user-wallpaper" : "internal",
        pairedThemeId: state.syncWithTheme ? target.themeId : null,
        wallpaperItem: target,
      });
    },

    setSyncWithTheme(enabled) {
      state.syncWithTheme = Boolean(enabled);
      if (state.syncWithTheme && WALLPAPER_CATALOG.some((w) => w.id === activeTheme)) {
        state.wallpaperId = activeTheme;
        document.documentElement.setAttribute("data-wallpaper", state.wallpaperId);
        rebuildEntities();
      }
      saveWallpaperState();
      startLoop();
      notifyListeners({ source: "sync-toggle" });
    },

    setAnimated(animated) {
      state.animated = Boolean(animated);
      saveWallpaperState();
      if (state.animated) startLoop();
      else if (state.wallpaperId !== "minimal") renderFrame(performance.now());
      notifyListeners({ source: "animated-toggle" });
    },

    setSpeed(speedVal) {
      const clamped = Math.min(2.0, Math.max(0.25, Number(speedVal) || 1.0));
      state.speed = Number(clamped.toFixed(2));
      saveWallpaperState();
      notifyListeners({ source: "speed" });
    },

    setDensity(densityKey) {
      if (["subtle", "balanced", "lush"].includes(densityKey)) {
        state.density = densityKey;
        saveWallpaperState();
        rebuildEntities();
        if (!state.animated && state.wallpaperId !== "minimal") {
          renderFrame(performance.now());
        }
        notifyListeners({ source: "density" });
      }
    },

    setInteractiveRipples(enabled) {
      state.interactiveRipples = Boolean(enabled);
      saveWallpaperState();
      notifyListeners({ source: "ripples" });
    },

    triggerSlideImpulse(direction) {
      if (!state.interactiveRipples || state.wallpaperId === "minimal") return;
      const push = 1.65;
      if (direction === "left") driftVX -= push;
      else if (direction === "right") driftVX += push;
      else if (direction === "up") driftVY -= push;
      else if (direction === "down") driftVY += push;
    },

    triggerMergeRipple(mergedValue, originX, originY) {
      if (!state.interactiveRipples || state.wallpaperId === "minimal") return;
      const cx = typeof originX === "number" ? originX : width * 0.5;
      const cy = typeof originY === "number" ? originY : height * 0.5;
      const tier = Math.min(12, Math.max(2, Math.log2(mergedValue || 4)));

      ripples.push({
        x: cx,
        y: cy,
        radius: 24,
        maxRadius: 160 + tier * 38,
        speed: 4.5 + tier * 0.6,
        alpha: Math.min(0.85, 0.28 + tier * 0.05),
        lineWidth: mergedValue >= 512 ? 3.2 : 2.0,
      });

      startLoop();
    },
  };

  // ==========================================================================
  // AngularJS Reactive Studio Module + Seamless Offline DOM Fallback
  // ==========================================================================
  function mountWallpaperStudioUI() {
    const mountEl = document.getElementById("wallpaper-angular-mount");
    if (!mountEl) return;

    if (window.angular) {
      try {
        const app = window.angular.module("WallpaperStudioApp", []);
        app.controller("WallpaperStudioCtrl", [
          "$scope",
          function ($scope) {
            $scope.categoryFilter = "all";
            $scope.snap = EngineAPI.getState();

            $scope.setCategory = function (cat) {
              $scope.categoryFilter = cat;
            };

            $scope.filteredCatalog = function () {
              if ($scope.categoryFilter === "all") return $scope.snap.catalog;
              return $scope.snap.catalog.filter((item) => item.category === $scope.categoryFilter);
            };

            $scope.getSwatchStyle = function (item) {
              return {
                background:
                  $scope.snap.activeMode === "dark" ? item.previewDark : item.previewLight,
              };
            };

            $scope.pickWallpaper = function (item) {
              EngineAPI.selectWallpaper(item.id, { fromUserUI: true });
            };

            $scope.toggleSync = function () {
              EngineAPI.setSyncWithTheme(!$scope.snap.syncWithTheme);
            };

            $scope.toggleAnimated = function () {
              EngineAPI.setAnimated(!$scope.snap.animated);
            };

            $scope.changeSpeed = function () {
              EngineAPI.setSpeed($scope.snap.speed);
            };

            $scope.selectDensity = function (d) {
              EngineAPI.setDensity(d);
            };

            $scope.toggleRipples = function () {
              EngineAPI.setInteractiveRipples(!$scope.snap.interactiveRipples);
            };

            EngineAPI.subscribe((nextSnap) => {
              $scope.$evalAsync(() => {
                $scope.snap = nextSnap;
              });
            });
          },
        ]);

        window.angular.bootstrap(mountEl, ["WallpaperStudioApp"]);
        mountEl.removeAttribute("data-ng-pending");
        return;
      } catch {
        // Fall through to native renderer if AngularJS bootstrap fails
      }
    }

    // Native Zero-Dependency Fallback Renderer (for offline air-gapped environments)
    mountFallbackWallpaperUI(mountEl);
  }

  function mountFallbackWallpaperUI(mountEl) {
    let catFilter = "all";

    const renderFallback = () => {
      const snap = EngineAPI.getState();
      const filtered =
        catFilter === "all"
          ? snap.catalog
          : snap.catalog.filter((w) => w.category === catFilter);

      mountEl.innerHTML = `
        <div class="panel-hero-box">
          <div class="panel-hero-row">
            <h2 class="panel-title">Live Wallpaper Studio</h2>
            <span class="panel-pill">${snap.wallpaperId === "minimal" ? "Static" : snap.animated ? "Live 60 FPS" : "Paused"}</span>
          </div>
          <p class="panel-desc">
            Active: <strong>${snap.currentItem.icon} ${snap.currentItem.name}</strong>
            · Paired with <strong>${snap.currentItem.themeLabel}</strong>
          </p>
          <div class="wp-sync-bar">
            <button type="button" class="btn btn-secondary btn-block ${snap.syncWithTheme ? "active" : ""}" id="fb-sync-btn">
              🔗 Connect Wallpaper & Theme: ${snap.syncWithTheme ? "ON" : "OFF (Mix & Match)"}
            </button>
          </div>
        </div>

        <div class="ach-filter-row wp-cat-row">
          ${["all", "doodles", "nature", "cosmic"]
            .map(
              (c) => `
            <button type="button" class="filter-chip ${catFilter === c ? "active" : ""}" data-fb-cat="${c}">
              ${c === "all" ? "All (11)" : c === "doodles" ? "Doodles" : c === "nature" ? "Nature" : "Cosmic"}
            </button>
          `
            )
            .join("")}
        </div>

        <div class="wp-gallery-grid">
          ${filtered
            .map((item) => {
              const isSelected = snap.wallpaperId === item.id;
              const bg = snap.activeMode === "dark" ? item.previewDark : item.previewLight;
              return `
                <button type="button" class="wp-card ${isSelected ? "active" : ""}" data-fb-wp="${item.id}">
                  <div class="wp-swatch" style="background:${bg}">
                    <span class="wp-swatch-icon">${item.icon}</span>
                    ${isSelected ? '<span class="wp-active-tag">✓ Active</span>' : ""}
                  </div>
                  <div class="wp-card-meta">
                    <div class="wp-card-name">${item.name}</div>
                    <div class="wp-card-theme">${item.themeId ? `Theme: ${item.themeLabel}` : "Battery Saver"}</div>
                  </div>
                </button>
              `;
            })
            .join("")}
        </div>

        <h3 class="drawer-subhead">Live Wallpaper Controls</h3>
        <div class="studio-form">
          <div class="setting-row-2">
            <button type="button" class="btn btn-secondary btn-sm ${snap.animated ? "active" : ""}" id="fb-anim-btn">
              ${snap.animated ? "⏸ Motion: ON" : "▶ Motion: Paused"}
            </button>
            <button type="button" class="btn btn-secondary btn-sm ${snap.interactiveRipples ? "active" : ""}" id="fb-ripple-btn">
              🌊 Merge Ripples: ${snap.interactiveRipples ? "ON" : "OFF"}
            </button>
          </div>
          <div class="setting-field">
            <label class="setting-label">Motion Speed (${snap.speed}×)</label>
            <input type="range" min="0.25" max="2" step="0.25" value="${snap.speed}" id="fb-speed-range" class="studio-range" />
          </div>
          <div class="setting-field">
            <label class="setting-label">Element Density</label>
            <div class="ach-filter-row">
              ${["subtle", "balanced", "lush"]
                .map(
                  (d) => `
                <button type="button" class="filter-chip ${snap.density === d ? "active" : ""}" data-fb-density="${d}">
                  ${d.charAt(0).toUpperCase() + d.slice(1)}
                </button>
              `
                )
                .join("")}
            </div>
          </div>
        </div>
      `;

      mountEl.querySelector("#fb-sync-btn")?.addEventListener("click", () => {
        EngineAPI.setSyncWithTheme(!snap.syncWithTheme);
      });
      mountEl.querySelector("#fb-anim-btn")?.addEventListener("click", () => {
        EngineAPI.setAnimated(!snap.animated);
      });
      mountEl.querySelector("#fb-ripple-btn")?.addEventListener("click", () => {
        EngineAPI.setInteractiveRipples(!snap.interactiveRipples);
      });
      mountEl.querySelector("#fb-speed-range")?.addEventListener("input", (ev) => {
        EngineAPI.setSpeed(ev.target.value);
      });
      mountEl.querySelectorAll("[data-fb-cat]").forEach((btn) => {
        btn.addEventListener("click", () => {
          catFilter = btn.getAttribute("data-fb-cat") || "all";
          renderFallback();
        });
      });
      mountEl.querySelectorAll("[data-fb-wp]").forEach((btn) => {
        btn.addEventListener("click", () => {
          EngineAPI.selectWallpaper(btn.getAttribute("data-fb-wp"), { fromUserUI: true });
        });
      });
      mountEl.querySelectorAll("[data-fb-density]").forEach((btn) => {
        btn.addEventListener("click", () => {
          EngineAPI.setDensity(btn.getAttribute("data-fb-density"));
        });
      });
    };

    renderFallback();
    EngineAPI.subscribe(() => renderFallback());
  }

  window.LiveWallpaperEngine = EngineAPI;
})();
