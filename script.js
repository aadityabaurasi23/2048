(() => {
  const STORAGE_PREFIX = "custom2048_";
  const STORAGE_KEY_SETTINGS = `${STORAGE_PREFIX}settings_v2`;
  const STORAGE_KEY_ANALYTICS = `${STORAGE_PREFIX}analytics_v2`;
  const MAX_UNDO_HISTORY = 30;
  const BLITZ_DURATION_SEC = 120;

  const THEMES = [
    "classic",
    "ocean",
    "cyberpunk",
    "emerald",
    "sunset",
    "royal",
    "sakura",
    "nordic",
    "coffee",
    "monochrome",
  ];

  const SPEEDS = {
    fast: 65,
    normal: 110,
    relaxed: 175,
  };

  const GAME_MODES = {
    classic: {
      label: "Classic",
      desc: "<strong>Classic Endless:</strong> Merge matching tiles to reach 2048 and push your high score!",
    },
    blitz: {
      label: "2m Blitz",
      desc: "<strong>2-Min Time Blitz:</strong> Score as many points as possible before the 120s timer hits zero!",
    },
    zen: {
      label: "Zen Mode",
      desc: "<strong>Zen Relax:</strong> Unlimited Undos, Shuffles, and Zaps — play endlessly with zero stress.",
    },
    hardcore: {
      label: "Hardcore",
      desc: "<strong>Hardcore Purist:</strong> 25% 4-tile spawns with Undo, Hints, AI, and Power-Ups disabled!",
    },
  };

  const ROMAN_RANKS = {
    2: "I",
    4: "II",
    8: "III",
    16: "IV",
    32: "V",
    64: "VI",
    128: "VII",
    256: "VIII",
    512: "IX",
    1024: "X",
    2048: "XI",
    4096: "XII",
    8192: "XIII",
    16384: "XIV",
  };

  const COSMIC_ICONS = {
    2: "🌱",
    4: "🌿",
    8: "🌸",
    16: "🔥",
    32: "⚡",
    64: "💎",
    128: "🌙",
    256: "☀️",
    512: "🪐",
    1024: "🌟",
    2048: "🌌",
    4096: "👑",
    8192: "♾️",
  };

  const STRATEGY_TIPS = [
    "Anchor your highest-value tile in one corner and keep that row full so it never gets pushed out.",
    "Pick 3 primary directions (e.g., Up, Left, Right) and avoid the 4th direction unless no other move exists.",
    "Arrange tiles in a descending snake chain (2048 → 1024 → 512 → 256) so merges cascade effortlessly.",
    "Reaching 2048 requires at least 1,024 total two-equivalents — patience in keeping empty cells is key!",
    "Save your ⚡ Zap power-up for when a newly spawned 2 gets trapped beside your corner anchor.",
    "Consecutive merges build your 🔥 Streak — set up two pairs before triggering a double cascade.",
    "On the 3×3 Mini grid, only 9 cells exist (max theoretical tile is 1024). Every single slide counts!",
    "In 2-Min Blitz mode, Fast motion speed + quick corner sweeps maximize your Points-Per-Second.",
    "Avoid trapping small tiles between two large tiles; keep neighbor ranks smooth (e.g., 128 next to 64).",
    "Press 'H' anytime in Classic or Zen mode to see what the snake-monotonicity AI heuristic recommends.",
  ];

  const ACHIEVEMENTS = [
    { id: "spark_64", icon: "🔥", title: "First Spark", desc: "Forge the 64 tile in any mode." },
    { id: "glow_256", icon: "✨", title: "Radiant Momentum", desc: "Forge the 256 tile in any mode." },
    { id: "half_1024", icon: "🌟", title: "Halfway to Legend", desc: "Forge the 1024 tile." },
    { id: "win_2048", icon: "🏆", title: "2048 Grandmaster", desc: "Reach the iconic 2048 tile!" },
    { id: "beyond_4096", icon: "🌌", title: "Beyond the Horizon", desc: "Forge a 4096 tile or higher." },
    { id: "streak_5", icon: "⚡", title: "Chain Reaction", desc: "Achieve a 5-move consecutive merge streak." },
    { id: "score_10k", icon: "💎", title: "Five-Figure Club", desc: "Score 10,000+ points in a single game." },
    { id: "purist_5k", icon: "🛡️", title: "Pure Tactician", desc: "Score 5,000+ without using Undo, Hint, or Power-Ups." },
    { id: "mini_256", icon: "🧩", title: "Pocket Genius", desc: "Reach the 256 tile on the 3×3 Mini board." },
    { id: "blitz_runner", icon: "⏱️", title: "Chrono Sprinter", desc: "Score 3,000+ in 2-Min Time Blitz mode." },
    { id: "night_owl", icon: "🌙", title: "Night Owl", desc: "Switch to Dark Mode and play a move." },
    { id: "chameleon", icon: "🎨", title: "Palette Collector", desc: "Explore at least 5 different color themes." },
  ];

  const VAULT_TIERS = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
  const FORGE_TIERS = [4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];

  // ==========================================================================
  // DOM Elements
  // ==========================================================================
  const rootHtml = document.documentElement;
  const backdropPatternRect = document.getElementById("backdrop-pattern-rect");
  const gridContainer = document.getElementById("grid-container");
  const tileContainer = document.getElementById("tile-container");
  const particleLayer = document.getElementById("particle-layer");
  const gridBadge = document.getElementById("grid-badge");
  const modeTag = document.getElementById("mode-tag");
  const modeDesc = document.getElementById("mode-desc");

  const scoreElement = document.getElementById("score");
  const scoreAdditionElement = document.getElementById("score-addition");
  const bestScoreElement = document.getElementById("best-score");
  const streakPill = document.getElementById("streak-pill");
  const statMovesEl = document.getElementById("stat-moves");
  const timePill = document.getElementById("time-pill");
  const statTimeLabel = document.getElementById("stat-time-label");
  const statTimeEl = document.getElementById("stat-time");
  const statEfficiencyEl = document.getElementById("stat-efficiency");
  const statMaxTileEl = document.getElementById("stat-max-tile");
  const progressGoalLabel = document.getElementById("progress-goal-label");
  const progressFill = document.getElementById("progress-fill");

  const hintBanner = document.getElementById("hint-banner");
  const hintText = document.getElementById("hint-text");

  const gameMessage = document.getElementById("game-message");
  const messageText = document.getElementById("message-text");
  const messageSub = document.getElementById("message-sub");
  const keepPlayingBtn = document.getElementById("keep-playing-btn");
  const overlayUndoBtn = document.getElementById("overlay-undo-btn");
  const tryAgainBtn = document.getElementById("try-again-btn");
  const gameContainer = document.getElementById("game-container");

  // Front Dock Controls & Studio Selectors
  const modeBtn = document.getElementById("mode-btn");
  const fxBtn = document.getElementById("fx-btn");
  const restartBtn = document.getElementById("restart-btn");
  const undoBtn = document.getElementById("undo-btn");
  const hintBtn = document.getElementById("hint-btn");
  const shuffleBtn = document.getElementById("shuffle-btn");
  const shuffleCountEl = document.getElementById("shuffle-count");
  const zapBtn = document.getElementById("zap-btn");
  const zapCountEl = document.getElementById("zap-count");
  const aiBtn = document.getElementById("ai-btn");
  const soundBtn = document.getElementById("sound-btn");

  const gameModeSelect = document.getElementById("gamemode-select");
  const themeSelect = document.getElementById("theme-select");
  const sizeSelect = document.getElementById("size-select");
  const skinSelect = document.getElementById("skin-select");
  const backdropSelect = document.getElementById("backdrop-select");
  const shapeSelect = document.getElementById("shape-select");
  const speedSelect = document.getElementById("speed-select");

  // Side Tabs Rail & Slide-Out Drawer Elements
  const sideDrawer = document.getElementById("side-drawer");
  const drawerScrim = document.getElementById("drawer-scrim");
  const closeDrawerBtn = document.getElementById("close-drawer-btn");
  const sideTabBtns = document.querySelectorAll(".side-tab-btn");
  const drawerPills = document.querySelectorAll(".drawer-pill");
  const panelBadges = document.getElementById("panel-badges");
  const panelStudio = document.getElementById("panel-studio");
  const panelStats = document.getElementById("panel-stats");
  const panelGuide = document.getElementById("panel-guide");

  // Achievements, Vault, Analytics & Guide Elements
  const achievementSummaryEl = document.getElementById("achievement-summary");
  const badgeNotifyDot = document.getElementById("badge-notify-dot");
  const achPctLabel = document.getElementById("ach-pct-label");
  const achProgressFill = document.getElementById("ach-progress-fill");
  const achFilterChips = document.querySelectorAll(".filter-chip[data-ach-filter]");
  const achievementsGrid = document.getElementById("achievements-grid");

  const vaultGrid = document.getElementById("vault-grid");
  const vaultCountEl = document.getElementById("vault-count");
  const kpiGrid = document.getElementById("kpi-grid");
  const forgeMatrix = document.getElementById("forge-matrix");
  const historyTbody = document.getElementById("history-tbody");
  const exportDataBtn = document.getElementById("export-data-btn");
  const importDataBtn = document.getElementById("import-data-btn");
  const resetDataBtn = document.getElementById("reset-data-btn");
  const importFileInput = document.getElementById("import-file-input");

  const tipTextEl = document.getElementById("tip-text");
  const nextTipBtn = document.getElementById("next-tip-btn");
  const toastContainer = document.getElementById("toast-container");

  // ==========================================================================
  // Settings, Drawer, Session & Lifetime Analytics State
  // ==========================================================================
  let gridSize = 4;
  let gameMode = "classic";
  let currentTheme = "classic";
  let currentMode = "light";
  let currentSkin = "numbers";
  let currentBackdrop = "spirals";
  let currentShape = "rounded";
  let currentSpeed = "normal";
  let soundEnabled = true;
  let fxEnabled = true;
  let tipIndex = 0;

  // Side Drawer UI State
  let isDrawerOpen = false;
  let activeDrawerTab = "badges";
  let currentAchFilter = "all";

  // Active Run State
  let grid = [];
  let score = 0;
  let bestScore = 0;
  let moveCount = 0;
  let elapsedSeconds = 0;
  let mergeStreak = 0;
  let shuffleCharges = 1;
  let zapCharges = 1;
  let usedAssistInRun = false;
  let unlockedInRun = [2];
  let rewardedMilestones = [];
  let won = false;
  let keepPlaying = false;
  let over = false;
  let gameRecorded = false;
  let nextTileId = 1;
  let undoStack = [];

  // Lifetime Analytics
  let analytics = createDefaultAnalytics();

  // Timers & Audio
  let cleanupTimer = null;
  let gameClockTimer = null;
  let aiInterval = null;
  let hintHideTimer = null;
  let scrimHideTimer = null;
  let audioCtx = null;

  function createDefaultAnalytics() {
    return {
      gamesPlayed: 0,
      gamesWon: 0,
      totalMerges: 0,
      lifetimeScore: 0,
      totalMoves: 0,
      allTimeHigh: 0,
      bestStreak: 0,
      fastest2048Sec: null,
      tileCounts: {},
      themesTried: ["classic"],
      usedDarkMode: false,
      unlockedBadges: [],
      recentGames: [],
    };
  }

  // ==========================================================================
  // Web Audio Synthesizer
  // ==========================================================================
  function playSound(type, mergeValue = 4) {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        audioCtx = new AudioContextClass();
      }
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === "move") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(175, now);
        osc.frequency.exponentialRampToValueAtTime(118, now + 0.05);
        gain.gain.setValueAtTime(0.055, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === "merge") {
        const power = Math.min(Math.log2(mergeValue), 13);
        const baseFreq = 220 + power * 46;
        osc.type = "triangle";
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.35, now + 0.11);
        gain.gain.setValueAtTime(0.11, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.125);
        osc.start(now);
        osc.stop(now + 0.13);
      } else if (type === "power") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(640, now + 0.14);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.16);
      } else if (type === "win" || type === "badge") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        osc.frequency.setValueAtTime(1046.5, now + 0.24);
        gain.gain.setValueAtTime(0.13, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
        osc.start(now);
        osc.stop(now + 0.44);
      }
    } catch {
      // Ignore audio errors on restricted environments
    }
  }

  // ==========================================================================
  // Initialization & Settings Management
  // ==========================================================================
  function init() {
    loadAnalytics();
    loadSettings();

    applyTheme(currentTheme, false);
    applyMode(currentMode, false);
    applyBackdrop(currentBackdrop, false);
    applyShape(currentShape, false);
    applySpeed(currentSpeed, false);
    applySkin(currentSkin, false);
    applyGameModeUI();
    applyGridSizeDOM(gridSize);
    updateSoundUI();
    updateFxUI();
    updateAchievementSummaryUI();
    renderTip();
    renderDrawerContents();

    bestScore = getBestScore(gameMode, gridSize);
    bestScoreElement.textContent = bestScore;

    if (!loadSavedState(gameMode, gridSize)) {
      startNewGame(false);
    } else {
      startClock();
    }

    bindEvents();
  }

  function loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SETTINGS) || localStorage.getItem(`${STORAGE_PREFIX}settings`);
      if (!raw) return;
      const parsed = JSON.parse(raw);

      if (parsed.theme === "dark") {
        currentTheme = "classic";
        currentMode = "dark";
      } else if (parsed.theme && THEMES.includes(parsed.theme)) {
        currentTheme = parsed.theme;
      }
      if (parsed.mode === "dark" || parsed.mode === "light") currentMode = parsed.mode;
      if (parsed.gameMode && GAME_MODES[parsed.gameMode]) gameMode = parsed.gameMode;
      if ([3, 4, 5, 6].includes(Number(parsed.gridSize))) gridSize = Number(parsed.gridSize);
      if (["numbers", "exponents", "roman", "cosmic"].includes(parsed.skin)) currentSkin = parsed.skin;
      if (["spirals", "constellations", "waves", "minimal"].includes(parsed.backdrop)) currentBackdrop = parsed.backdrop;
      if (["rounded", "sharp", "pill"].includes(parsed.shape)) currentShape = parsed.shape;
      if (parsed.speed && SPEEDS[parsed.speed]) currentSpeed = parsed.speed;
      if (typeof parsed.soundEnabled === "boolean") soundEnabled = parsed.soundEnabled;
      if (typeof parsed.fxEnabled === "boolean") fxEnabled = parsed.fxEnabled;
    } catch {
      // Fall back to defaults
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem(
        STORAGE_KEY_SETTINGS,
        JSON.stringify({
          theme: currentTheme,
          mode: currentMode,
          gameMode,
          gridSize,
          skin: currentSkin,
          backdrop: currentBackdrop,
          shape: currentShape,
          speed: currentSpeed,
          soundEnabled,
          fxEnabled,
        })
      );
    } catch {
      // Ignore storage quota errors
    }
  }

  function loadAnalytics() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_ANALYTICS);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      analytics = {
        ...createDefaultAnalytics(),
        ...parsed,
        tileCounts: parsed.tileCounts || {},
        themesTried: Array.isArray(parsed.themesTried) ? parsed.themesTried : ["classic"],
        unlockedBadges: Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges : [],
        recentGames: Array.isArray(parsed.recentGames) ? parsed.recentGames : [],
      };
    } catch {
      analytics = createDefaultAnalytics();
    }
  }

  function saveAnalytics() {
    try {
      localStorage.setItem(STORAGE_KEY_ANALYTICS, JSON.stringify(analytics));
    } catch {
      // Ignore quota errors
    }
  }

  function applyTheme(theme, persist = true) {
    currentTheme = THEMES.includes(theme) ? theme : "classic";
    rootHtml.setAttribute("data-theme", currentTheme);
    themeSelect.value = currentTheme;

    if (!analytics.themesTried.includes(currentTheme)) {
      analytics.themesTried.push(currentTheme);
      saveAnalytics();
      checkAchievements();
    }
    if (persist) saveSettings();
  }

  function cycleTheme() {
    const idx = THEMES.indexOf(currentTheme);
    applyTheme(THEMES[(idx + 1) % THEMES.length]);
  }

  function applyMode(mode, persist = true) {
    currentMode = mode === "dark" ? "dark" : "light";
    rootHtml.setAttribute("data-mode", currentMode);
    // When in dark mode, button reads "Light Mode"; when in light mode, button reads "Dark Mode"
    modeBtn.textContent = currentMode === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
    if (persist) saveSettings();
  }

  function toggleMode() {
    applyMode(currentMode === "dark" ? "light" : "dark");
  }

  function applyBackdrop(backdrop, persist = true) {
    currentBackdrop = ["spirals", "constellations", "waves", "minimal"].includes(backdrop)
      ? backdrop
      : "spirals";
    rootHtml.setAttribute("data-backdrop", currentBackdrop);
    backdropSelect.value = currentBackdrop;
    if (currentBackdrop !== "minimal" && backdropPatternRect) {
      backdropPatternRect.setAttribute("fill", `url(#pattern-${currentBackdrop})`);
    }
    if (persist) saveSettings();
  }

  function applyShape(shape, persist = true) {
    currentShape = ["rounded", "sharp", "pill"].includes(shape) ? shape : "rounded";
    rootHtml.setAttribute("data-shape", currentShape);
    shapeSelect.value = currentShape;
    if (persist) saveSettings();
  }

  function applySpeed(speedKey, persist = true) {
    currentSpeed = SPEEDS[speedKey] ? speedKey : "normal";
    rootHtml.style.setProperty("--slide-duration", `${SPEEDS[currentSpeed]}ms`);
    speedSelect.value = currentSpeed;
    if (persist) saveSettings();
  }

  function applySkin(skin, persist = true) {
    currentSkin = ["numbers", "exponents", "roman", "cosmic"].includes(skin) ? skin : "numbers";
    skinSelect.value = currentSkin;
    if (grid.length > 0) {
      renderBoard({ fullRebuild: true });
      renderVaultUI();
      updateStatsUI();
    }
    if (persist) saveSettings();
  }

  function applyGameModeUI() {
    const cfg = GAME_MODES[gameMode] || GAME_MODES.classic;
    gameModeSelect.value = gameMode;
    modeTag.textContent = cfg.label;
    modeDesc.innerHTML = cfg.desc;
    statTimeLabel.textContent = gameMode === "blitz" ? "Left" : "Time";
  }

  function applyGridSizeDOM(size) {
    rootHtml.style.setProperty("--grid-count", size);
    sizeSelect.value = String(size);
    gridBadge.textContent = `${size}×${size}`;

    gridContainer.innerHTML = "";
    const totalCells = size * size;
    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement("div");
      cell.className = "grid-cell";
      gridContainer.appendChild(cell);
    }
  }

  function switchContext(newMode, newSize) {
    stopAutoPlay();
    gameMode = newMode;
    gridSize = Number(newSize);
    saveSettings();

    applyGameModeUI();
    applyGridSizeDOM(gridSize);

    bestScore = getBestScore(gameMode, gridSize);
    bestScoreElement.textContent = bestScore;

    if (!loadSavedState(gameMode, gridSize)) {
      startNewGame(false);
    } else {
      startClock();
    }
  }

  function getBestScoreKey(mode, size) {
    if (mode === "classic") return `${STORAGE_PREFIX}best_${size}`;
    return `${STORAGE_PREFIX}best_${mode}_${size}`;
  }

  function getStateKey(mode, size) {
    if (mode === "classic") return `${STORAGE_PREFIX}state_${size}`;
    return `${STORAGE_PREFIX}state_${mode}_${size}`;
  }

  function getBestScore(mode, size) {
    return Number(localStorage.getItem(getBestScoreKey(mode, size))) || 0;
  }

  // ==========================================================================
  // Side Tabs & Slide-Out Drawer Controller
  // ==========================================================================
  function openDrawer(tabName = "badges") {
    isDrawerOpen = true;
    activeDrawerTab = tabName;

    document.body.classList.add("drawer-open");
    sideDrawer.setAttribute("aria-hidden", "false");

    if (scrimHideTimer) {
      clearTimeout(scrimHideTimer);
      scrimHideTimer = null;
    }
    drawerScrim.hidden = false;
    requestAnimationFrame(() => {
      drawerScrim.classList.add("visible");
    });

    if (tabName === "badges") {
      badgeNotifyDot.hidden = true;
    }

    syncDrawerTabsUI();
    renderDrawerContents();
  }

  function closeDrawer() {
    isDrawerOpen = false;
    document.body.classList.remove("drawer-open");
    sideDrawer.setAttribute("aria-hidden", "true");
    drawerScrim.classList.remove("visible");

    if (scrimHideTimer) clearTimeout(scrimHideTimer);
    scrimHideTimer = setTimeout(() => {
      if (!isDrawerOpen) drawerScrim.hidden = true;
    }, 320);

    syncDrawerTabsUI();
  }

  function toggleDrawer(tabName) {
    if (isDrawerOpen && activeDrawerTab === tabName) {
      closeDrawer();
    } else {
      openDrawer(tabName);
    }
  }

  function syncDrawerTabsUI() {
    sideTabBtns.forEach((btn) => {
      btn.classList.toggle("active", isDrawerOpen && btn.dataset.drawerTab === activeDrawerTab);
    });

    drawerPills.forEach((pill) => {
      const isMatch = pill.dataset.drawerTab === activeDrawerTab;
      pill.classList.toggle("active", isMatch);
      pill.setAttribute("aria-selected", String(isMatch));
    });

    panelBadges.hidden = activeDrawerTab !== "badges";
    panelStudio.hidden = activeDrawerTab !== "studio";
    panelStats.hidden = activeDrawerTab !== "stats";
    panelGuide.hidden = activeDrawerTab !== "guide";
  }

  // ==========================================================================
  // Core Board, Power-Ups & Move Engine
  // ==========================================================================
  function createEmptyGrid(size = gridSize) {
    return Array.from({ length: size }, () => Array(size).fill(null));
  }

  function cloneGridState(sourceGrid) {
    return sourceGrid.map((row) =>
      row.map((tile) =>
        tile
          ? {
              id: tile.id,
              value: tile.value,
              row: tile.row,
              col: tile.col,
            }
          : null
      )
    );
  }

  function startNewGame(recordPreviousIfActive = true) {
    if (recordPreviousIfActive && moveCount >= 4 && !gameRecorded) {
      recordGameToHistory();
    }

    stopAutoPlay();
    clearCleanupTimer();
    hideHintBanner();

    grid = createEmptyGrid(gridSize);
    score = 0;
    moveCount = 0;
    elapsedSeconds = 0;
    mergeStreak = 0;
    usedAssistInRun = false;
    unlockedInRun = [2];
    rewardedMilestones = [];
    won = false;
    keepPlaying = false;
    over = false;
    gameRecorded = false;
    undoStack = [];

    if (gameMode === "hardcore") {
      shuffleCharges = 0;
      zapCharges = 0;
    } else if (gameMode === "zen") {
      shuffleCharges = 99;
      zapCharges = 99;
    } else {
      shuffleCharges = 1;
      zapCharges = 1;
    }

    const t1 = addRandomTile();
    const t2 = addRandomTile();
    if (t1) trackRunTile(t1.value);
    if (t2) trackRunTile(t2.value);

    startClock();
    saveState();
    renderBoard({ fullRebuild: true });
    updateScoreUI(0);
    updateStatsUI();
    updateActionButtonsUI();
    renderVaultUI();
    if (isDrawerOpen) renderDrawerContents();
    updateMessageUI();
  }

  function addRandomTile() {
    const emptyCells = [];
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (!grid[r][c]) emptyCells.push({ r, c });
      }
    }
    if (emptyCells.length === 0) return null;

    const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const fourChance = gameMode === "hardcore" ? 0.25 : 0.1;
    const value = Math.random() < fourChance ? 4 : 2;
    const tile = {
      id: nextTileId++,
      value,
      row: r,
      col: c,
      isNew: true,
      mergedFrom: null,
    };

    grid[r][c] = tile;
    return tile;
  }

  function trackRunTile(val) {
    if (!unlockedInRun.includes(val)) {
      unlockedInRun.push(val);
    }
  }

  function prepareTiles() {
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const tile = grid[r][c];
        if (tile) {
          tile.isNew = false;
          tile.mergedFrom = null;
        }
      }
    }
  }

  function pushUndoSnapshot() {
    if (gameMode === "hardcore") return;
    undoStack.push({
      grid: cloneGridState(grid),
      score,
      moveCount,
      mergeStreak,
      shuffleCharges,
      zapCharges,
      unlockedInRun: [...unlockedInRun],
      rewardedMilestones: [...rewardedMilestones],
      won,
      keepPlaying,
      over,
    });
    if (undoStack.length > MAX_UNDO_HISTORY) {
      undoStack.shift();
    }
  }

  function move(direction, fromAI = false) {
    if (isGameTerminated()) {
      stopAutoPlay();
      return false;
    }

    const vectors = {
      up: { r: -1, c: 0 },
      right: { r: 0, c: 1 },
      down: { r: 1, c: 0 },
      left: { r: 0, c: -1 },
    };

    const vector = vectors[direction];
    if (!vector) return false;

    const preSnapshot = {
      grid: cloneGridState(grid),
      score,
      moveCount,
      mergeStreak,
      shuffleCharges,
      zapCharges,
      unlockedInRun: [...unlockedInRun],
      rewardedMilestones: [...rewardedMilestones],
      won,
      keepPlaying,
      over,
    };

    prepareTiles();

    const traversals = buildTraversals(vector);
    let moved = false;
    let scoreDelta = 0;
    let mergesThisMove = 0;
    let highestMerge = 0;
    let justWon = false;
    const burstTargets = [];

    traversals.r.forEach((r) => {
      traversals.c.forEach((c) => {
        const tile = grid[r][c];
        if (!tile) return;

        const positions = findFarthestPosition({ r, c }, vector);
        const nextCell = withinBounds(positions.next)
          ? grid[positions.next.r][positions.next.c]
          : null;

        if (nextCell && nextCell.value === tile.value && !nextCell.mergedFrom) {
          const mergedValue = tile.value * 2;
          const mergedTile = {
            id: nextTileId++,
            value: mergedValue,
            row: positions.next.r,
            col: positions.next.c,
            isNew: false,
            mergedFrom: [tile, nextCell],
          };

          tile.row = positions.next.r;
          tile.col = positions.next.c;
          nextCell.row = positions.next.r;
          nextCell.col = positions.next.c;

          grid[r][c] = null;
          grid[positions.next.r][positions.next.c] = mergedTile;

          score += mergedValue;
          scoreDelta += mergedValue;
          mergesThisMove++;
          if (mergedValue > highestMerge) highestMerge = mergedValue;
          trackRunTile(mergedValue);

          // Lifetime merge stats
          analytics.totalMerges++;
          analytics.tileCounts[mergedValue] = (analytics.tileCounts[mergedValue] || 0) + 1;

          // Bonus power-up charge on major milestones (512, 1024, 2048, 4096)
          if (
            [512, 1024, 2048, 4096].includes(mergedValue) &&
            !rewardedMilestones.includes(mergedValue)
          ) {
            rewardedMilestones.push(mergedValue);
            if (gameMode !== "hardcore" && gameMode !== "zen") {
              shuffleCharges = Math.min(3, shuffleCharges + 1);
              zapCharges = Math.min(3, zapCharges + 1);
              showToast(`⚡ Milestone ${mergedValue}! +1 Shuffle & Zap Charge`);
            }
          }

          if (mergedValue >= 128) {
            burstTargets.push({
              row: positions.next.r,
              col: positions.next.c,
              count: mergedValue >= 2048 ? 26 : 10,
            });
          }

          if (mergedValue === 2048 && !won) {
            won = true;
            justWon = true;
            analytics.gamesWon++;
            if (
              analytics.fastest2048Sec === null ||
              elapsedSeconds < analytics.fastest2048Sec
            ) {
              analytics.fastest2048Sec = elapsedSeconds;
            }
          }
          moved = true;
        } else if (positions.farthest.r !== r || positions.farthest.c !== c) {
          grid[r][c] = null;
          grid[positions.farthest.r][positions.farthest.c] = tile;
          tile.row = positions.farthest.r;
          tile.col = positions.farthest.c;
          moved = true;
        }
      });
    });

    if (!moved) return false;

    if (fromAI) usedAssistInRun = true;
    moveCount++;
    analytics.totalMoves++;
    analytics.lifetimeScore += scoreDelta;
    if (currentMode === "dark") analytics.usedDarkMode = true;

    if (mergesThisMove > 0) {
      mergeStreak++;
      if (mergeStreak > analytics.bestStreak) {
        analytics.bestStreak = mergeStreak;
      }
    } else {
      mergeStreak = 0;
    }

    hideHintBanner();

    if (gameMode !== "hardcore") {
      undoStack.push(preSnapshot);
      if (undoStack.length > MAX_UNDO_HISTORY) undoStack.shift();
    }

    if (score > bestScore) {
      bestScore = score;
      localStorage.setItem(getBestScoreKey(gameMode, gridSize), String(bestScore));
    }
    if (score > analytics.allTimeHigh) {
      analytics.allTimeHigh = score;
    }

    if (justWon) {
      playSound("win");
    } else if (highestMerge > 0) {
      playSound("merge", highestMerge);
    } else {
      playSound("move");
    }

    const spawned = addRandomTile();
    if (spawned) trackRunTile(spawned.value);

    if (!movesAvailable()) {
      if (gameMode === "zen") {
        showToast("🧘 Zen Mode: Board full — use Shuffle or Zap freely!");
      } else {
        over = true;
        stopAutoPlay();
        recordGameToHistory();
      }
    }

    saveAnalytics();
    checkAchievements();
    saveState();

    renderBoard({ fullRebuild: false });
    burstTargets.forEach((b) => spawnParticles(b.row, b.col, b.count));

    updateScoreUI(scoreDelta);
    updateStatsUI();
    updateActionButtonsUI();
    renderVaultUI();
    if (isDrawerOpen) renderDrawerContents();
    updateMessageUI();
    return true;
  }

  function undoMove() {
    if (gameMode === "hardcore" || undoStack.length === 0) return;
    stopAutoPlay();
    clearCleanupTimer();

    usedAssistInRun = true;
    const lastState = undoStack.pop();
    grid = lastState.grid.map((row) =>
      row.map((tile) =>
        tile
          ? {
              ...tile,
              isNew: false,
              mergedFrom: null,
            }
          : null
      )
    );
    score = lastState.score;
    moveCount = lastState.moveCount ?? Math.max(0, moveCount - 1);
    mergeStreak = lastState.mergeStreak ?? 0;
    shuffleCharges = lastState.shuffleCharges ?? shuffleCharges;
    zapCharges = lastState.zapCharges ?? zapCharges;
    unlockedInRun = lastState.unlockedInRun || unlockedInRun;
    rewardedMilestones = lastState.rewardedMilestones || rewardedMilestones;
    won = lastState.won;
    keepPlaying = lastState.keepPlaying;
    over = lastState.over;

    saveState();
    renderBoard({ fullRebuild: true });
    updateScoreUI(0);
    updateStatsUI();
    updateActionButtonsUI();
    renderVaultUI();
    if (isDrawerOpen) renderDrawerContents();
    updateMessageUI();
  }

  function useShufflePowerUp() {
    if (gameMode === "hardcore") return;
    if (gameMode !== "zen" && shuffleCharges <= 0) return;
    if (won && !keepPlaying) return;

    const activeTiles = [];
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (grid[r][c]) activeTiles.push(grid[r][c]);
      }
    }
    if (activeTiles.length < 2) return;

    stopAutoPlay();
    pushUndoSnapshot();
    usedAssistInRun = true;
    if (gameMode !== "zen") shuffleCharges--;

    const allCoords = [];
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        allCoords.push({ r, c });
      }
    }
    for (let i = allCoords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allCoords[i], allCoords[j]] = [allCoords[j], allCoords[i]];
    }

    grid = createEmptyGrid(gridSize);
    activeTiles.forEach((tile, idx) => {
      const pos = allCoords[idx];
      tile.row = pos.r;
      tile.col = pos.c;
      tile.isNew = false;
      tile.mergedFrom = null;
      grid[pos.r][pos.c] = tile;
    });

    over = !movesAvailable() && gameMode !== "zen";
    playSound("power");
    saveState();
    renderBoard({ fullRebuild: false });
    updateActionButtonsUI();
    updateMessageUI();
  }

  function useZapPowerUp() {
    if (gameMode === "hardcore") return;
    if (gameMode !== "zen" && zapCharges <= 0) return;
    if (won && !keepPlaying) return;

    const activeTiles = [];
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (grid[r][c]) activeTiles.push(grid[r][c]);
      }
    }
    if (activeTiles.length <= 2) {
      showToast("Need at least 3 tiles on the board to Zap!");
      return;
    }

    stopAutoPlay();
    pushUndoSnapshot();
    usedAssistInRun = true;
    if (gameMode !== "zen") zapCharges--;

    const minVal = Math.min(...activeTiles.map((t) => t.value));
    const lowestCandidates = activeTiles.filter((t) => t.value === minVal);
    const target = lowestCandidates[Math.floor(Math.random() * lowestCandidates.length)];

    grid[target.row][target.col] = null;
    over = false;

    playSound("power");
    spawnParticles(target.row, target.col, 12);
    saveState();
    renderBoard({ fullRebuild: false });
    updateStatsUI();
    updateActionButtonsUI();
    updateMessageUI();
  }

  function buildTraversals(vector) {
    const indices = Array.from({ length: gridSize }, (_, i) => i);
    const traversals = { r: [...indices], c: [...indices] };
    if (vector.r === 1) traversals.r.reverse();
    if (vector.c === 1) traversals.c.reverse();
    return traversals;
  }

  function findFarthestPosition(cell, vector) {
    let previous;
    let current = { r: cell.r, c: cell.c };
    do {
      previous = current;
      current = { r: previous.r + vector.r, c: previous.c + vector.c };
    } while (withinBounds(current) && !grid[current.r][current.c]);
    return { farthest: previous, next: current };
  }

  function withinBounds(cell) {
    return cell.r >= 0 && cell.r < gridSize && cell.c >= 0 && cell.c < gridSize;
  }

  function movesAvailable() {
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const tile = grid[r][c];
        if (!tile) return true;
        if (c < gridSize - 1 && grid[r][c + 1] && grid[r][c + 1].value === tile.value) return true;
        if (r < gridSize - 1 && grid[r + 1][c] && grid[r + 1][c].value === tile.value) return true;
      }
    }
    return false;
  }

  function isGameTerminated() {
    return over || (won && !keepPlaying);
  }

  function getMaxTileValue() {
    let max = 0;
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (grid[r][c] && grid[r][c].value > max) max = grid[r][c].value;
      }
    }
    return max;
  }

  // ==========================================================================
  // Smart Hint & Auto-Play AI Heuristic
  // ==========================================================================
  function simulateMoveValues(valueMatrix, direction) {
    const size = valueMatrix.length;
    const clone = valueMatrix.map((row) => [...row]);
    let moved = false;
    let mergeGain = 0;

    const slideLine = (line) => {
      const filtered = line.filter((v) => v !== 0);
      const result = [];
      for (let i = 0; i < filtered.length; i++) {
        if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
          const merged = filtered[i] * 2;
          result.push(merged);
          mergeGain += merged;
          i++;
        } else {
          result.push(filtered[i]);
        }
      }
      while (result.length < size) result.push(0);
      return result;
    };

    for (let i = 0; i < size; i++) {
      const line = [];
      for (let j = 0; j < size; j++) {
        if (direction === "left") line.push(clone[i][j]);
        else if (direction === "right") line.push(clone[i][size - 1 - j]);
        else if (direction === "up") line.push(clone[j][i]);
        else if (direction === "down") line.push(clone[size - 1 - j][i]);
      }

      const newLine = slideLine(line);
      for (let j = 0; j < size; j++) {
        if (line[j] !== newLine[j]) moved = true;
        if (direction === "left") clone[i][j] = newLine[j];
        else if (direction === "right") clone[i][size - 1 - j] = newLine[j];
        else if (direction === "up") clone[j][i] = newLine[j];
        else if (direction === "down") clone[size - 1 - j][i] = newLine[j];
      }
    }

    return { moved, matrix: clone, mergeGain };
  }

  function evaluateMatrix(matrix, mergeGain) {
    const size = matrix.length;
    let emptyCount = 0;
    let smoothness = 0;
    let monotonicity = 0;
    let cornerBonus = 0;
    let maxVal = 0;

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const val = matrix[r][c];
        if (val === 0) {
          emptyCount++;
          continue;
        }
        if (val > maxVal) maxVal = val;

        if (c + 1 < size && matrix[r][c + 1] > 0) {
          smoothness -= Math.abs(Math.log2(val) - Math.log2(matrix[r][c + 1]));
        }
        if (r + 1 < size && matrix[r + 1][c] > 0) {
          smoothness -= Math.abs(Math.log2(val) - Math.log2(matrix[r + 1][c]));
        }

        const weight = (size - r) * size + (r % 2 === 0 ? size - c : c + 1);
        monotonicity += Math.log2(val) * weight;
      }
    }

    if (
      matrix[0][0] === maxVal ||
      matrix[0][size - 1] === maxVal ||
      matrix[size - 1][0] === maxVal ||
      matrix[size - 1][size - 1] === maxVal
    ) {
      cornerBonus = Math.log2(maxVal || 2) * 35;
    }

    return emptyCount * 42 + mergeGain * 1.4 + smoothness * 8 + monotonicity * 2.5 + cornerBonus;
  }

  function computeBestDirection() {
    const valueMatrix = grid.map((row) => row.map((tile) => (tile ? tile.value : 0)));
    const directions = ["up", "left", "right", "down"];
    let bestDir = null;
    let bestScoreEval = -Infinity;

    for (const dir of directions) {
      const sim = simulateMoveValues(valueMatrix, dir);
      if (!sim.moved) continue;
      const scoreEval = evaluateMatrix(sim.matrix, sim.mergeGain);
      if (scoreEval > bestScoreEval) {
        bestScoreEval = scoreEval;
        bestDir = dir;
      }
    }
    return bestDir;
  }

  function showHint() {
    if (gameMode === "hardcore" || isGameTerminated()) return;
    const bestDir = computeBestDirection();
    if (!bestDir) return;

    usedAssistInRun = true;
    const labels = {
      up: "⬆️ Up",
      right: "➡️ Right",
      down: "⬇️ Down",
      left: "⬅️ Left",
    };

    hintText.textContent = labels[bestDir];
    hintBanner.hidden = false;

    if (hintHideTimer) clearTimeout(hintHideTimer);
    hintHideTimer = setTimeout(() => hideHintBanner(), 2800);
  }

  function hideHintBanner() {
    hintBanner.hidden = true;
  }

  function toggleAutoPlay() {
    if (gameMode === "hardcore") return;
    if (aiInterval) {
      stopAutoPlay();
    } else {
      if (isGameTerminated()) return;
      aiBtn.classList.add("active");
      aiBtn.setAttribute("aria-pressed", "true");
      aiBtn.textContent = "⏹ Stop";
      aiInterval = setInterval(() => {
        if (isGameTerminated()) {
          stopAutoPlay();
          return;
        }
        const dir = computeBestDirection();
        if (dir) {
          move(dir, true);
        } else {
          stopAutoPlay();
        }
      }, 170);
    }
  }

  function stopAutoPlay() {
    if (aiInterval) {
      clearInterval(aiInterval);
      aiInterval = null;
    }
    aiBtn.classList.remove("active");
    aiBtn.setAttribute("aria-pressed", "false");
    aiBtn.textContent = "🤖 AI";
  }

  // ==========================================================================
  // Game Clock, Blitz Countdown & Telemetry UI
  // ==========================================================================
  function startClock() {
    if (gameClockTimer) clearInterval(gameClockTimer);
    gameClockTimer = setInterval(() => {
      if (!isGameTerminated() && moveCount > 0) {
        elapsedSeconds++;
        if (gameMode === "blitz" && elapsedSeconds >= BLITZ_DURATION_SEC) {
          elapsedSeconds = BLITZ_DURATION_SEC;
          over = true;
          stopAutoPlay();
          recordGameToHistory();
          checkAchievements();
          saveState();
          if (isDrawerOpen) renderDrawerContents();
          updateMessageUI();
        }
        updateStatsUI();
      }
    }, 1000);
  }

  function formatTime(totalSec) {
    const clamped = Math.max(0, totalSec);
    const mins = String(Math.floor(clamped / 60)).padStart(2, "0");
    const secs = String(clamped % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  }

  function updateStatsUI() {
    statMovesEl.textContent = moveCount;

    if (gameMode === "blitz") {
      const left = Math.max(0, BLITZ_DURATION_SEC - elapsedSeconds);
      statTimeEl.textContent = formatTime(left);
      timePill.classList.toggle("urgent", left <= 20 && !over && moveCount > 0);
    } else {
      statTimeEl.textContent = formatTime(elapsedSeconds);
      timePill.classList.remove("urgent");
    }

    const eff = moveCount > 0 ? (score / moveCount).toFixed(1) : "0.0";
    statEfficiencyEl.textContent = `${eff} pts/move`;

    streakPill.textContent = `🔥 ×${mergeStreak}`;
    streakPill.classList.toggle("hot", mergeStreak >= 3);

    // Max Tile & Milestone Progress
    const maxTile = getMaxTileValue() || 2;
    statMaxTileEl.textContent = formatPlainSkinLabel(maxTile);

    const milestones = [128, 256, 512, 1024, 2048, 4096, 8192, 16384];
    const nextGoal = milestones.find((m) => m > maxTile) || maxTile * 2;
    progressGoalLabel.textContent = `Goal ${formatPlainSkinLabel(nextGoal)}`;

    const currentPower = Math.log2(maxTile);
    const goalPower = Math.log2(nextGoal);
    const pct = Math.min(100, Math.max(8, Math.round((currentPower / goalPower) * 100)));
    progressFill.style.width = `${pct}%`;
  }

  function updateActionButtonsUI() {
    const isHardcore = gameMode === "hardcore";
    const isZen = gameMode === "zen";

    undoBtn.disabled = isHardcore || undoStack.length === 0;
    hintBtn.disabled = isHardcore;
    aiBtn.disabled = isHardcore;

    shuffleCountEl.textContent = isZen ? "∞" : String(shuffleCharges);
    zapCountEl.textContent = isZen ? "∞" : String(zapCharges);

    shuffleBtn.disabled = isHardcore || (!isZen && shuffleCharges <= 0);
    zapBtn.disabled = isHardcore || (!isZen && zapCharges <= 0);
  }

  function updateSoundUI() {
    soundBtn.classList.toggle("active", soundEnabled);
    soundBtn.setAttribute("aria-pressed", String(soundEnabled));
    soundBtn.textContent = soundEnabled ? "🔊" : "🔇";
  }

  function updateFxUI() {
    fxBtn.classList.toggle("active", fxEnabled);
    fxBtn.setAttribute("aria-pressed", String(fxEnabled));
    fxBtn.textContent = fxEnabled
      ? "✨ Celebration Particles: ON"
      : "✨ Celebration Particles: OFF";
  }

  // ==========================================================================
  // Tile Skins, Board Rendering & Celebration Particles
  // ==========================================================================
  function formatPlainSkinLabel(value) {
    if (currentSkin === "exponents") {
      return `2^${Math.round(Math.log2(value))}`;
    }
    if (currentSkin === "roman") {
      return ROMAN_RANKS[value] || String(value);
    }
    if (currentSkin === "cosmic") {
      return COSMIC_ICONS[value] ? `${COSMIC_ICONS[value]} ${value}` : String(value);
    }
    return String(value);
  }

  function setTileInnerMarkup(innerEl, value) {
    const key = `${currentSkin}_${value}`;
    if (innerEl.dataset.renderKey === key) return;
    innerEl.dataset.renderKey = key;

    if (currentSkin === "exponents") {
      const exp = Math.round(Math.log2(value));
      innerEl.innerHTML = `<span class="tile-main">2<sup>${exp}</sup></span>`;
    } else if (currentSkin === "roman") {
      const roman = ROMAN_RANKS[value] || `2^${Math.round(Math.log2(value))}`;
      innerEl.innerHTML = `<span class="tile-roman">${roman}</span><span class="tile-sub">${value}</span>`;
    } else if (currentSkin === "cosmic") {
      const icon = COSMIC_ICONS[value] || "✨";
      innerEl.innerHTML = `<span class="tile-emoji">${icon}</span><span class="tile-sub">${value}</span>`;
    } else {
      innerEl.textContent = value;
    }
  }

  function clearCleanupTimer() {
    if (cleanupTimer) {
      clearTimeout(cleanupTimer);
      cleanupTimer = null;
    }
  }

  function getTileClassList(tile) {
    const classes = ["tile"];
    classes.push(tile.value <= 2048 ? `tile-${tile.value}` : "tile-super");
    if (tile.isNew) classes.push("tile-new");
    if (tile.mergedFrom) classes.push("tile-merged");
    return classes.join(" ");
  }

  function createOrUpdateTileElement(tile, existingMap) {
    let el = existingMap.get(tile.id);
    if (!el) {
      el = document.createElement("div");
      el.dataset.id = String(tile.id);
      const inner = document.createElement("div");
      inner.className = "tile-inner";
      setTileInnerMarkup(inner, tile.value);
      el.appendChild(inner);
      tileContainer.appendChild(el);
    } else {
      const inner = el.querySelector(".tile-inner");
      setTileInnerMarkup(inner, tile.value);
      existingMap.delete(tile.id);
    }

    el.className = getTileClassList(tile);
    el.style.setProperty("--row", tile.row);
    el.style.setProperty("--col", tile.col);
    return el;
  }

  function renderBoard({ fullRebuild = false } = {}) {
    clearCleanupTimer();

    if (fullRebuild) {
      tileContainer.innerHTML = "";
    }

    const existingMap = new Map();
    Array.from(tileContainer.children).forEach((el) => {
      const id = Number(el.dataset.id);
      if (id) existingMap.set(id, el);
    });

    const mergedSourceIds = [];

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const tile = grid[r][c];
        if (!tile) continue;

        if (tile.mergedFrom && !fullRebuild) {
          tile.mergedFrom.forEach((sourceTile) => {
            createOrUpdateTileElement(sourceTile, existingMap);
            mergedSourceIds.push(sourceTile.id);
          });
        }

        createOrUpdateTileElement(tile, existingMap);
      }
    }

    existingMap.forEach((el) => el.remove());

    if (mergedSourceIds.length > 0) {
      const waitMs = (SPEEDS[currentSpeed] || 110) + 15;
      cleanupTimer = setTimeout(() => {
        mergedSourceIds.forEach((id) => {
          const sourceEl = tileContainer.querySelector(`[data-id="${id}"]`);
          if (sourceEl) sourceEl.remove();
        });
        cleanupTimer = null;
      }, waitMs);
    }
  }

  function spawnParticles(row, col, count = 10) {
    if (!fxEnabled || !particleLayer) return;
    const rect = particleLayer.getBoundingClientRect();
    if (!rect.width) return;

    const cellStep = rect.width / gridSize;
    const originX = (col + 0.5) * cellStep;
    const originY = (row + 0.5) * cellStep;

    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = "particle";
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const dist = 28 + Math.random() * 52;
      p.style.left = `${originX - 4}px`;
      p.style.top = `${originY - 4}px`;
      p.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
      p.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
      particleLayer.appendChild(p);
      setTimeout(() => p.remove(), 650);
    }
  }

  function renderVaultUI() {
    vaultGrid.innerHTML = "";
    let unlockedCount = 0;

    VAULT_TIERS.forEach((tier) => {
      const isUnlocked = unlockedInRun.includes(tier);
      if (isUnlocked) unlockedCount++;

      const chip = document.createElement("div");
      chip.className = `vault-chip v-${tier}${isUnlocked ? " unlocked" : ""}`;
      if (currentSkin === "cosmic") {
        chip.textContent = COSMIC_ICONS[tier] || tier;
      } else if (currentSkin === "exponents") {
        chip.textContent = `2^${Math.round(Math.log2(tier))}`;
      } else if (currentSkin === "roman") {
        chip.textContent = ROMAN_RANKS[tier] || tier;
      } else {
        chip.textContent = tier;
      }
      chip.title = `Tile ${tier} (${isUnlocked ? "Unlocked in this run" : "Locked"})`;
      vaultGrid.appendChild(chip);
    });

    vaultCountEl.textContent = `${unlockedCount}/${VAULT_TIERS.length}`;
  }

  function renderTip() {
    tipTextEl.textContent = STRATEGY_TIPS[tipIndex % STRATEGY_TIPS.length];
  }

  function updateScoreUI(scoreDelta) {
    scoreElement.textContent = score;
    bestScoreElement.textContent = bestScore;

    if (scoreDelta > 0) {
      scoreAdditionElement.classList.remove("animate");
      void scoreAdditionElement.offsetWidth;
      scoreAdditionElement.textContent = `+${scoreDelta}`;
      scoreAdditionElement.classList.add("animate");
    }
  }

  function updateMessageUI() {
    gameMessage.classList.remove("game-won", "game-over");
    overlayUndoBtn.hidden = true;

    if (won && !keepPlaying) {
      gameMessage.classList.add("game-won");
      messageText.textContent = "You win!";
      messageSub.textContent = `Forged 2048 in ${moveCount} moves (${formatTime(elapsedSeconds)})`;
    } else if (over) {
      gameMessage.classList.add("game-over");
      const isBlitzEnd = gameMode === "blitz" && elapsedSeconds >= BLITZ_DURATION_SEC;
      messageText.textContent = isBlitzEnd ? "Time's up!" : "Game over!";
      messageSub.textContent = `Final Score: ${score} · Max Tile: ${getMaxTileValue()} · Moves: ${moveCount}`;
      if (!isBlitzEnd && gameMode !== "hardcore" && undoStack.length > 0) {
        overlayUndoBtn.hidden = false;
      }
    }
  }

  // ==========================================================================
  // Achievements, Match History & Side Drawer Rendering
  // ==========================================================================
  function recordGameToHistory() {
    if (gameRecorded) return;
    gameRecorded = true;
    analytics.gamesPlayed++;

    analytics.recentGames.unshift({
      mode: GAME_MODES[gameMode]?.label || gameMode,
      grid: `${gridSize}×${gridSize}`,
      score,
      maxTile: getMaxTileValue(),
      moves: moveCount,
      time: formatTime(elapsedSeconds),
    });
    if (analytics.recentGames.length > 10) {
      analytics.recentGames.length = 10;
    }
    saveAnalytics();
  }

  function checkAchievements() {
    const maxTile = getMaxTileValue();
    const checks = {
      spark_64: maxTile >= 64,
      glow_256: maxTile >= 256,
      half_1024: maxTile >= 1024,
      win_2048: maxTile >= 2048 || analytics.gamesWon > 0,
      beyond_4096: maxTile >= 4096,
      streak_5: mergeStreak >= 5 || analytics.bestStreak >= 5,
      score_10k: score >= 10000 || analytics.allTimeHigh >= 10000,
      purist_5k: score >= 5000 && !usedAssistInRun,
      mini_256: gridSize === 3 && maxTile >= 256,
      blitz_runner: gameMode === "blitz" && score >= 3000,
      night_owl: analytics.usedDarkMode,
      chameleon: analytics.themesTried.length >= 5,
    };

    let newlyUnlocked = false;
    ACHIEVEMENTS.forEach((ach) => {
      if (checks[ach.id] && !analytics.unlockedBadges.includes(ach.id)) {
        analytics.unlockedBadges.push(ach.id);
        newlyUnlocked = true;
        showToast(`${ach.icon} Achievement Unlocked: ${ach.title}!`);
      }
    });

    if (newlyUnlocked) {
      playSound("badge");
      saveAnalytics();
      updateAchievementSummaryUI();
      if (!(isDrawerOpen && activeDrawerTab === "badges")) {
        badgeNotifyDot.hidden = false;
      }
      if (isDrawerOpen) {
        renderDrawerContents();
      }
    }
  }

  function updateAchievementSummaryUI() {
    achievementSummaryEl.textContent = `${analytics.unlockedBadges.length}/${ACHIEVEMENTS.length}`;
  }

  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3400);
  }

  function renderDrawerContents() {
    // 1. Achievements Progress, Filter Chips & Cards
    const unlockedCount = analytics.unlockedBadges.length;
    const totalCount = ACHIEVEMENTS.length;
    const achPct = Math.round((unlockedCount / totalCount) * 100);

    achPctLabel.textContent = `${achPct}% Complete`;
    achProgressFill.style.width = `${achPct}%`;

    achFilterChips.forEach((chip) => {
      const f = chip.dataset.achFilter;
      chip.classList.toggle("active", f === currentAchFilter);
      if (f === "all") chip.textContent = `All (${totalCount})`;
      else if (f === "unlocked") chip.textContent = `Unlocked (${unlockedCount})`;
      else if (f === "locked") chip.textContent = `Locked (${totalCount - unlockedCount})`;
    });

    const filteredAchievements = ACHIEVEMENTS.filter((ach) => {
      const isUnlocked = analytics.unlockedBadges.includes(ach.id);
      if (currentAchFilter === "unlocked") return isUnlocked;
      if (currentAchFilter === "locked") return !isUnlocked;
      return true;
    });

    if (filteredAchievements.length === 0) {
      const emptyMsg =
        currentAchFilter === "unlocked"
          ? "No achievements unlocked yet — slide and merge tiles to earn your first badge!"
          : "All 12 achievements unlocked — true 2048 Grandmaster!";
      achievementsGrid.innerHTML = `
        <div class="panel-hero-box" style="text-align:center;margin-bottom:0;">
          <p class="panel-desc">${emptyMsg}</p>
        </div>
      `;
    } else {
      achievementsGrid.innerHTML = filteredAchievements
        .map((ach) => {
          const unlocked = analytics.unlockedBadges.includes(ach.id);
          return `
            <div class="ach-card ${unlocked ? "unlocked" : ""}">
              <div class="ach-icon">${ach.icon}</div>
              <div class="ach-meta">
                <div class="ach-title-row">
                  <span class="ach-title">${ach.title}</span>
                  <span class="ach-status">${unlocked ? "Unlocked ✓" : "Locked"}</span>
                </div>
                <div class="ach-desc">${ach.desc}</div>
              </div>
            </div>
          `;
        })
        .join("");
    }

    // 2. Lifetime Telemetry KPIs
    const winRate =
      analytics.gamesPlayed > 0
        ? `${Math.round((analytics.gamesWon / analytics.gamesPlayed) * 100)}%`
        : "0%";
    const fastestStr =
      analytics.fastest2048Sec !== null ? formatTime(analytics.fastest2048Sec) : "—";

    const kpis = [
      { label: "Games Logged", val: analytics.gamesPlayed },
      { label: "2048 Wins", val: analytics.gamesWon },
      { label: "Win Rate", val: winRate },
      { label: "All-Time Best", val: Math.max(analytics.allTimeHigh, bestScore) },
      { label: "Total Merges", val: analytics.totalMerges },
      { label: "Lifetime Score", val: analytics.lifetimeScore },
      { label: "Best Streak", val: `×${analytics.bestStreak}` },
      { label: "Fastest 2048", val: fastestStr },
    ];

    kpiGrid.innerHTML = kpis
      .map(
        (k) => `
        <div class="kpi-box">
          <span class="kpi-label">${k.label}</span>
          <span class="kpi-val">${k.val}</span>
        </div>
      `
      )
      .join("");

    // 3. Lifetime Tile Forge Matrix
    forgeMatrix.innerHTML = FORGE_TIERS.map((tier) => {
      const count = analytics.tileCounts[tier] || 0;
      return `
        <div class="forge-cell">
          <div class="forge-tier">${tier}</div>
          <div class="forge-count">×${count}</div>
        </div>
      `;
    }).join("");

    // 4. Recent Match History (5 compact columns)
    if (analytics.recentGames.length === 0) {
      historyTbody.innerHTML = `<tr><td colspan="5" style="text-align:center;opacity:0.7;">Complete or restart a run to log match history.</td></tr>`;
    } else {
      historyTbody.innerHTML = analytics.recentGames
        .map(
          (g) => `
          <tr>
            <td><strong>${g.mode}</strong></td>
            <td>${g.grid}</td>
            <td>${g.score}</td>
            <td>${g.maxTile}</td>
            <td>${g.time}</td>
          </tr>
        `
        )
        .join("");
    }
  }

  function exportBackupJSON() {
    const payload = {
      exportedAt: new Date().toISOString(),
      settings: JSON.parse(localStorage.getItem(STORAGE_KEY_SETTINGS) || "{}"),
      analytics,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "2048-curated-backup.json";
    a.click();
    URL.revokeObjectURL(url);
    showToast("⬇ Exported backup JSON!");
  }

  function importBackupJSON(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(String(ev.target?.result || "{}"));
        if (data.analytics) {
          analytics = { ...createDefaultAnalytics(), ...data.analytics };
          saveAnalytics();
        }
        if (data.settings) {
          localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(data.settings));
          loadSettings();
          applyTheme(currentTheme);
          applyMode(currentMode);
          applyBackdrop(currentBackdrop);
          applyShape(currentShape);
          applySpeed(currentSpeed);
          applySkin(currentSkin);
          updateSoundUI();
          updateFxUI();
        }
        updateAchievementSummaryUI();
        renderDrawerContents();
        showToast("⬆ Backup imported successfully!");
      } catch {
        showToast("⚠️ Invalid JSON backup file.");
      }
    };
    reader.readAsText(file);
  }

  // ==========================================================================
  // Persistence per Mode & Grid Size
  // ==========================================================================
  function saveState() {
    try {
      const state = {
        grid: cloneGridState(grid),
        score,
        moveCount,
        elapsedSeconds,
        mergeStreak,
        shuffleCharges,
        zapCharges,
        usedAssistInRun,
        unlockedInRun,
        rewardedMilestones,
        won,
        keepPlaying,
        over,
        gameRecorded,
        nextTileId,
        undoStack,
      };
      localStorage.setItem(getStateKey(gameMode, gridSize), JSON.stringify(state));
    } catch {
      // Ignore storage quota errors
    }
  }

  function loadSavedState(mode, size) {
    try {
      const raw = localStorage.getItem(getStateKey(mode, size));
      if (!raw) return false;
      const saved = JSON.parse(raw);
      if (!saved || !Array.isArray(saved.grid) || saved.grid.length !== size) {
        return false;
      }

      grid = saved.grid;
      score = Number(saved.score) || 0;
      moveCount = Number(saved.moveCount) || 0;
      elapsedSeconds = Number(saved.elapsedSeconds) || 0;
      mergeStreak = Number(saved.mergeStreak) || 0;
      shuffleCharges =
        typeof saved.shuffleCharges === "number"
          ? saved.shuffleCharges
          : mode === "hardcore"
          ? 0
          : mode === "zen"
          ? 99
          : 1;
      zapCharges =
        typeof saved.zapCharges === "number"
          ? saved.zapCharges
          : mode === "hardcore"
          ? 0
          : mode === "zen"
          ? 99
          : 1;
      usedAssistInRun = Boolean(saved.usedAssistInRun);
      unlockedInRun = Array.isArray(saved.unlockedInRun) ? saved.unlockedInRun : [2];
      rewardedMilestones = Array.isArray(saved.rewardedMilestones) ? saved.rewardedMilestones : [];
      won = Boolean(saved.won);
      keepPlaying = Boolean(saved.keepPlaying);
      over = Boolean(saved.over);
      gameRecorded = Boolean(saved.gameRecorded);
      nextTileId = Number(saved.nextTileId) || 100;
      undoStack = Array.isArray(saved.undoStack) ? saved.undoStack : [];

      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (grid[r][c]) trackRunTile(grid[r][c].value);
        }
      }

      renderBoard({ fullRebuild: true });
      updateScoreUI(0);
      updateStatsUI();
      updateActionButtonsUI();
      renderVaultUI();
      updateMessageUI();
      return true;
    } catch {
      return false;
    }
  }

  // ==========================================================================
  // Event Listeners
  // ==========================================================================
  function bindEvents() {
    window.addEventListener("keydown", (event) => {
      if (event.ctrlKey || event.altKey || event.metaKey) return;

      if (event.code === "Escape" && isDrawerOpen) {
        event.preventDefault();
        closeDrawer();
        return;
      }

      const tag = event.target?.tagName;
      if (tag === "SELECT" || tag === "INPUT" || tag === "TEXTAREA") return;

      const keyMap = {
        ArrowUp: "up",
        KeyW: "up",
        ArrowRight: "right",
        KeyD: "right",
        ArrowDown: "down",
        KeyS: "down",
        ArrowLeft: "left",
        KeyA: "left",
      };

      const direction = keyMap[event.code];
      if (direction) {
        event.preventDefault();
        stopAutoPlay();
        move(direction);
        return;
      }

      if (event.code === "KeyZ" || event.code === "KeyU") {
        event.preventDefault();
        undoMove();
      } else if (event.code === "KeyR") {
        event.preventDefault();
        startNewGame(true);
      } else if (event.code === "KeyT") {
        event.preventDefault();
        cycleTheme();
      } else if (event.code === "KeyL") {
        event.preventDefault();
        toggleMode();
      } else if (event.code === "KeyH") {
        event.preventDefault();
        showHint();
      } else if (event.code === "KeyP") {
        event.preventDefault();
        toggleAutoPlay();
      } else if (event.code === "KeyX") {
        event.preventDefault();
        useShufflePowerUp();
      } else if (event.code === "KeyC") {
        event.preventDefault();
        useZapPowerUp();
      } else if (event.code === "KeyB") {
        event.preventDefault();
        toggleDrawer("badges");
      } else if (event.code === "KeyO") {
        event.preventDefault();
        toggleDrawer("studio");
      } else if (event.code === "KeyG") {
        event.preventDefault();
        toggleDrawer("stats");
      } else if (event.code === "Slash" && event.shiftKey) {
        event.preventDefault();
        toggleDrawer("guide");
      } else if (event.code === "KeyM") {
        event.preventDefault();
        soundEnabled = !soundEnabled;
        updateSoundUI();
        saveSettings();
      }
    });

    // Side Tabs Rail & Drawer Navigation
    sideTabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        toggleDrawer(btn.dataset.drawerTab);
      });
    });

    drawerPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        openDrawer(pill.dataset.drawerTab);
      });
    });

    closeDrawerBtn.addEventListener("click", closeDrawer);
    drawerScrim.addEventListener("click", closeDrawer);

    achFilterChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        currentAchFilter = chip.dataset.achFilter || "all";
        renderDrawerContents();
      });
    });

    // Front Stage & Studio Controls
    modeBtn.addEventListener("click", toggleMode);

    fxBtn.addEventListener("click", () => {
      fxEnabled = !fxEnabled;
      updateFxUI();
      saveSettings();
      showToast(fxEnabled ? "✨ Celebration particles enabled" : "✨ Celebration particles off");
    });

    gameModeSelect.addEventListener("change", (e) => {
      switchContext(e.target.value, gridSize);
      e.target.blur();
    });

    themeSelect.addEventListener("change", (e) => {
      applyTheme(e.target.value);
      e.target.blur();
    });

    sizeSelect.addEventListener("change", (e) => {
      switchContext(gameMode, Number(e.target.value));
      e.target.blur();
    });

    skinSelect.addEventListener("change", (e) => {
      applySkin(e.target.value);
      e.target.blur();
    });

    backdropSelect.addEventListener("change", (e) => {
      applyBackdrop(e.target.value);
      e.target.blur();
    });

    shapeSelect.addEventListener("change", (e) => {
      applyShape(e.target.value);
      e.target.blur();
    });

    speedSelect.addEventListener("change", (e) => {
      applySpeed(e.target.value);
      e.target.blur();
    });

    restartBtn.addEventListener("click", () => startNewGame(true));
    tryAgainBtn.addEventListener("click", () => startNewGame(true));
    undoBtn.addEventListener("click", undoMove);
    overlayUndoBtn.addEventListener("click", undoMove);
    hintBtn.addEventListener("click", showHint);
    shuffleBtn.addEventListener("click", useShufflePowerUp);
    zapBtn.addEventListener("click", useZapPowerUp);
    aiBtn.addEventListener("click", toggleAutoPlay);

    soundBtn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      updateSoundUI();
      saveSettings();
    });

    keepPlayingBtn.addEventListener("click", () => {
      keepPlaying = true;
      saveState();
      updateMessageUI();
    });

    nextTipBtn.addEventListener("click", () => {
      tipIndex = (tipIndex + 1) % STRATEGY_TIPS.length;
      renderTip();
    });

    exportDataBtn.addEventListener("click", exportBackupJSON);
    importDataBtn.addEventListener("click", () => importFileInput.click());
    importFileInput.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (file) importBackupJSON(file);
      e.target.value = "";
    });

    resetDataBtn.addEventListener("click", () => {
      if (window.confirm("Reset all lifetime analytics, match history, and achievements?")) {
        analytics = createDefaultAnalytics();
        saveAnalytics();
        badgeNotifyDot.hidden = true;
        updateAchievementSummaryUI();
        renderDrawerContents();
        showToast("🗑 Lifetime analytics reset.");
      }
    });

    // Touch / Swipe Gesture Support
    let touchStartX = 0;
    let touchStartY = 0;

    gameContainer.addEventListener(
      "touchstart",
      (event) => {
        if (event.touches.length > 1) return;
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
      },
      { passive: true }
    );

    gameContainer.addEventListener(
      "touchend",
      (event) => {
        if (event.changedTouches.length === 0) return;
        const dx = event.changedTouches[0].clientX - touchStartX;
        const dy = event.changedTouches[0].clientY - touchStartY;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        if (Math.max(absDx, absDy) > 28) {
          stopAutoPlay();
          if (absDx > absDy) {
            move(dx > 0 ? "right" : "left");
          } else {
            move(dy > 0 ? "down" : "up");
          }
        }
      },
      { passive: true }
    );
  }

  init();
})();
