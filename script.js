(() => {
  const STORAGE_PREFIX = "custom2048_";
  const STORAGE_KEY_SETTINGS = `${STORAGE_PREFIX}settings`;
  const MAX_UNDO_HISTORY = 25;
  const THEMES = ["classic", "ocean", "cyberpunk", "emerald", "sunset", "royal"];
  const SPEEDS = {
    fast: 65,
    normal: 110,
    relaxed: 175,
  };

  // DOM Elements
  const rootHtml = document.documentElement;
  const gridContainer = document.getElementById("grid-container");
  const tileContainer = document.getElementById("tile-container");
  const gridBadge = document.getElementById("grid-badge");
  const scoreElement = document.getElementById("score");
  const scoreAdditionElement = document.getElementById("score-addition");
  const bestScoreElement = document.getElementById("best-score");
  const gameMessage = document.getElementById("game-message");
  const messageText = document.getElementById("message-text");
  const messageSub = document.getElementById("message-sub");

  const modeBtn = document.getElementById("mode-btn");
  const themeSelect = document.getElementById("theme-select");
  const sizeSelect = document.getElementById("size-select");
  const speedSelect = document.getElementById("speed-select");
  const aiBtn = document.getElementById("ai-btn");
  const soundBtn = document.getElementById("sound-btn");
  const hintBtn = document.getElementById("hint-btn");
  const restartBtn = document.getElementById("restart-btn");
  const undoBtn = document.getElementById("undo-btn");
  const keepPlayingBtn = document.getElementById("keep-playing-btn");
  const tryAgainBtn = document.getElementById("try-again-btn");
  const gameContainer = document.getElementById("game-container");

  const statMovesEl = document.getElementById("stat-moves");
  const statTimeEl = document.getElementById("stat-time");
  const statMaxTileEl = document.getElementById("stat-max-tile");
  const hintBanner = document.getElementById("hint-banner");
  const hintText = document.getElementById("hint-text");

  // Settings & Game State
  let gridSize = 4;
  let currentTheme = "classic";
  let currentMode = "light"; // "light" or "dark"
  let currentSpeed = "normal";
  let soundEnabled = true;

  let grid = [];
  let score = 0;
  let bestScore = 0;
  let moveCount = 0;
  let elapsedSeconds = 0;
  let won = false;
  let keepPlaying = false;
  let over = false;
  let nextTileId = 1;
  let undoStack = [];

  let cleanupTimer = null;
  let gameClockTimer = null;
  let aiInterval = null;
  let hintHideTimer = null;
  let audioCtx = null;

  // ==========================================================================
  // Web Audio Synthesizer (Zero External Assets)
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
        osc.frequency.setValueAtTime(170, now);
        osc.frequency.exponentialRampToValueAtTime(115, now + 0.055);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === "merge") {
        const power = Math.min(Math.log2(mergeValue), 12);
        const baseFreq = 220 + power * 45;
        osc.type = "triangle";
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.35, now + 0.11);
        gain.gain.setValueAtTime(0.11, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.125);
      } else if (type === "win") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.09);
        osc.frequency.setValueAtTime(783.99, now + 0.18);
        osc.frequency.setValueAtTime(1046.5, now + 0.27);
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.46);
      }
    } catch {
      // Ignore audio errors on restricted devices
    }
  }

  // ==========================================================================
  // Initialization & Settings
  // ==========================================================================
  function init() {
    loadSettings();
    applyTheme(currentTheme);
    applyMode(currentMode);
    applySpeed(currentSpeed);
    applyGridSizeDOM(gridSize);
    updateSoundUI();

    bestScore = getBestScoreForSize(gridSize);
    bestScoreElement.textContent = bestScore;

    if (!loadSavedState(gridSize)) {
      startNewGame();
    } else {
      startClock();
    }

    bindEvents();
  }

  function loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (!raw) return;
      const parsed = JSON.parse(raw);

      // Migrate legacy "dark" theme setting into mode="dark"
      if (parsed.theme === "dark") {
        currentTheme = "classic";
        currentMode = "dark";
      } else if (parsed.theme && THEMES.includes(parsed.theme)) {
        currentTheme = parsed.theme;
      }

      if (parsed.mode === "dark" || parsed.mode === "light") {
        currentMode = parsed.mode;
      }
      if ([3, 4, 5, 6].includes(Number(parsed.gridSize))) {
        gridSize = Number(parsed.gridSize);
      }
      if (parsed.speed && SPEEDS[parsed.speed]) {
        currentSpeed = parsed.speed;
      }
      if (typeof parsed.soundEnabled === "boolean") {
        soundEnabled = parsed.soundEnabled;
      }
    } catch {
      // Use defaults
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem(
        STORAGE_KEY_SETTINGS,
        JSON.stringify({
          theme: currentTheme,
          mode: currentMode,
          gridSize,
          speed: currentSpeed,
          soundEnabled,
        })
      );
    } catch {
      // Ignore storage errors
    }
  }

  function applyTheme(theme) {
    currentTheme = THEMES.includes(theme) ? theme : "classic";
    rootHtml.setAttribute("data-theme", currentTheme);
    themeSelect.value = currentTheme;
    saveSettings();
  }

  function cycleTheme() {
    const idx = THEMES.indexOf(currentTheme);
    const next = THEMES[(idx + 1) % THEMES.length];
    applyTheme(next);
  }

  function applyMode(mode) {
    currentMode = mode === "dark" ? "dark" : "light";
    rootHtml.setAttribute("data-mode", currentMode);
    // When in dark mode, the button says "Light Mode"; when in light mode, it says "Dark Mode"
    modeBtn.textContent = currentMode === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
    saveSettings();
  }

  function toggleMode() {
    applyMode(currentMode === "dark" ? "light" : "dark");
  }

  function applySpeed(speedKey) {
    currentSpeed = SPEEDS[speedKey] ? speedKey : "normal";
    const ms = SPEEDS[currentSpeed];
    rootHtml.style.setProperty("--slide-duration", `${ms}ms`);
    speedSelect.value = currentSpeed;
    saveSettings();
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

  function changeGridSize(newSize) {
    stopAutoPlay();
    gridSize = Number(newSize);
    saveSettings();
    applyGridSizeDOM(gridSize);

    bestScore = getBestScoreForSize(gridSize);
    bestScoreElement.textContent = bestScore;

    if (!loadSavedState(gridSize)) {
      startNewGame();
    }
  }

  function getBestScoreKey(size) {
    return `${STORAGE_PREFIX}best_${size}`;
  }

  function getStateKey(size) {
    return `${STORAGE_PREFIX}state_${size}`;
  }

  function getBestScoreForSize(size) {
    return Number(localStorage.getItem(getBestScoreKey(size))) || 0;
  }

  // ==========================================================================
  // Core Board & Move Engine
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

  function startNewGame() {
    stopAutoPlay();
    clearCleanupTimer();
    hideHintBanner();

    grid = createEmptyGrid(gridSize);
    score = 0;
    moveCount = 0;
    elapsedSeconds = 0;
    won = false;
    keepPlaying = false;
    over = false;
    undoStack = [];

    addRandomTile();
    addRandomTile();

    startClock();
    saveState();
    renderBoard({ fullRebuild: true });
    updateScoreUI(0);
    updateStatsUI();
    updateMessageUI();
    updateUndoButtonUI();
  }

  function addRandomTile() {
    const emptyCells = [];
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (!grid[r][c]) {
          emptyCells.push({ r, c });
        }
      }
    }

    if (emptyCells.length === 0) return null;

    const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const value = Math.random() < 0.9 ? 2 : 4;
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

  function move(direction) {
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

    const snapshot = {
      grid: cloneGridState(grid),
      score,
      moveCount,
      won,
      keepPlaying,
      over,
    };

    prepareTiles();

    const traversals = buildTraversals(vector);
    let moved = false;
    let scoreDelta = 0;
    let highestMerge = 0;
    let justWon = false;

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
          if (mergedValue > highestMerge) highestMerge = mergedValue;

          if (mergedValue === 2048 && !won) {
            won = true;
            justWon = true;
          }
          moved = true;
        } else {
          if (positions.farthest.r !== r || positions.farthest.c !== c) {
            grid[r][c] = null;
            grid[positions.farthest.r][positions.farthest.c] = tile;
            tile.row = positions.farthest.r;
            tile.col = positions.farthest.c;
            moved = true;
          }
        }
      });
    });

    if (!moved) return false;

    moveCount++;
    hideHintBanner();

    undoStack.push(snapshot);
    if (undoStack.length > MAX_UNDO_HISTORY) {
      undoStack.shift();
    }

    if (score > bestScore) {
      bestScore = score;
      localStorage.setItem(getBestScoreKey(gridSize), String(bestScore));
    }

    if (justWon) {
      playSound("win");
    } else if (highestMerge > 0) {
      playSound("merge", highestMerge);
    } else {
      playSound("move");
    }

    addRandomTile();

    if (!movesAvailable()) {
      over = true;
      stopAutoPlay();
    }

    saveState();
    renderBoard({ fullRebuild: false });
    updateScoreUI(scoreDelta);
    updateStatsUI();
    updateMessageUI();
    updateUndoButtonUI();
    return true;
  }

  function undoMove() {
    if (undoStack.length === 0) return;
    stopAutoPlay();
    clearCleanupTimer();

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
    won = lastState.won;
    keepPlaying = lastState.keepPlaying;
    over = lastState.over;

    saveState();
    renderBoard({ fullRebuild: true });
    updateScoreUI(0);
    updateStatsUI();
    updateMessageUI();
    updateUndoButtonUI();
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

    return {
      farthest: previous,
      next: current,
    };
  }

  function withinBounds(cell) {
    return (
      cell.r >= 0 &&
      cell.r < gridSize &&
      cell.c >= 0 &&
      cell.c < gridSize
    );
  }

  function movesAvailable() {
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const tile = grid[r][c];
        if (!tile) return true;
        if (c < gridSize - 1 && grid[r][c + 1] && grid[r][c + 1].value === tile.value) {
          return true;
        }
        if (r < gridSize - 1 && grid[r + 1][c] && grid[r + 1][c].value === tile.value) {
          return true;
        }
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
        if (grid[r][c] && grid[r][c].value > max) {
          max = grid[r][c].value;
        }
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
      let line = [];
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
        else if (direction === "down") clone[size - 1 - j] = newLine[j];
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

    return (
      emptyCount * 42 +
      mergeGain * 1.4 +
      smoothness * 8 +
      monotonicity * 2.5 +
      cornerBonus
    );
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
    if (isGameTerminated()) return;
    const bestDir = computeBestDirection();
    if (!bestDir) return;

    const labels = {
      up: "⬆️ Up",
      right: "➡️ Right",
      down: "⬇️ Down",
      left: "⬅️ Left",
    };

    hintText.textContent = labels[bestDir];
    hintBanner.hidden = false;

    if (hintHideTimer) clearTimeout(hintHideTimer);
    hintHideTimer = setTimeout(() => {
      hideHintBanner();
    }, 2800);
  }

  function hideHintBanner() {
    hintBanner.hidden = true;
  }

  function toggleAutoPlay() {
    if (aiInterval) {
      stopAutoPlay();
    } else {
      if (isGameTerminated()) return;
      aiBtn.classList.add("active");
      aiBtn.setAttribute("aria-pressed", "true");
      aiBtn.textContent = "⏹ Stop AI";
      aiInterval = setInterval(() => {
        if (isGameTerminated()) {
          stopAutoPlay();
          return;
        }
        const dir = computeBestDirection();
        if (dir) {
          move(dir);
        } else {
          stopAutoPlay();
        }
      }, 175);
    }
  }

  function stopAutoPlay() {
    if (aiInterval) {
      clearInterval(aiInterval);
      aiInterval = null;
    }
    aiBtn.classList.remove("active");
    aiBtn.setAttribute("aria-pressed", "false");
    aiBtn.textContent = "🤖 Auto-Play";
  }

  // ==========================================================================
  // Game Clock & Live Stats
  // ==========================================================================
  function startClock() {
    if (gameClockTimer) clearInterval(gameClockTimer);
    gameClockTimer = setInterval(() => {
      if (!isGameTerminated() && moveCount > 0) {
        elapsedSeconds++;
        updateStatsUI();
      }
    }, 1000);
  }

  function formatTime(totalSec) {
    const mins = String(Math.floor(totalSec / 60)).padStart(2, "0");
    const secs = String(totalSec % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  }

  function updateStatsUI() {
    statMovesEl.textContent = moveCount;
    statTimeEl.textContent = formatTime(elapsedSeconds);
    statMaxTileEl.textContent = getMaxTileValue();
  }

  function updateSoundUI() {
    soundBtn.classList.toggle("active", soundEnabled);
    soundBtn.setAttribute("aria-pressed", String(soundEnabled));
    soundBtn.textContent = soundEnabled ? "🔊 Sound" : "🔇 Muted";
  }

  // ==========================================================================
  // DOM Rendering & Smooth Transitions
  // ==========================================================================
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
      inner.textContent = tile.value;
      el.appendChild(inner);
      tileContainer.appendChild(el);
    } else {
      const inner = el.querySelector(".tile-inner");
      if (inner.textContent !== String(tile.value)) {
        inner.textContent = tile.value;
      }
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
    if (won && !keepPlaying) {
      gameMessage.classList.add("game-won");
      messageText.textContent = "You win!";
      messageSub.textContent = `Reached 2048 in ${moveCount} moves (${formatTime(elapsedSeconds)})`;
    } else if (over) {
      gameMessage.classList.add("game-over");
      messageText.textContent = "Game over!";
      messageSub.textContent = `Final Score: ${score} · Max Tile: ${getMaxTileValue()}`;
    }
  }

  function updateUndoButtonUI() {
    undoBtn.disabled = undoStack.length === 0;
  }

  // ==========================================================================
  // Persistence per Grid Size
  // ==========================================================================
  function saveState() {
    try {
      const state = {
        grid: cloneGridState(grid),
        score,
        moveCount,
        elapsedSeconds,
        won,
        keepPlaying,
        over,
        nextTileId,
        undoStack,
      };
      localStorage.setItem(getStateKey(gridSize), JSON.stringify(state));
    } catch {
      // Ignore quota errors
    }
  }

  function loadSavedState(size) {
    try {
      const raw = localStorage.getItem(getStateKey(size));
      if (!raw) return false;
      const saved = JSON.parse(raw);
      if (!saved || !Array.isArray(saved.grid) || saved.grid.length !== size) {
        return false;
      }

      grid = saved.grid;
      score = Number(saved.score) || 0;
      moveCount = Number(saved.moveCount) || 0;
      elapsedSeconds = Number(saved.elapsedSeconds) || 0;
      won = Boolean(saved.won);
      keepPlaying = Boolean(saved.keepPlaying);
      over = Boolean(saved.over);
      nextTileId = Number(saved.nextTileId) || 100;
      undoStack = Array.isArray(saved.undoStack) ? saved.undoStack : [];

      renderBoard({ fullRebuild: true });
      updateScoreUI(0);
      updateStatsUI();
      updateMessageUI();
      updateUndoButtonUI();
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
      if (event.target.tagName === "SELECT") return;

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
        startNewGame();
      } else if (event.code === "KeyT") {
        event.preventDefault();
        cycleTheme();
      } else if (event.code === "KeyL" || event.code === "KeyB") {
        event.preventDefault();
        toggleMode();
      } else if (event.code === "KeyH") {
        event.preventDefault();
        showHint();
      } else if (event.code === "KeyP") {
        event.preventDefault();
        toggleAutoPlay();
      } else if (event.code === "KeyM") {
        event.preventDefault();
        soundEnabled = !soundEnabled;
        updateSoundUI();
        saveSettings();
      }
    });

    modeBtn.addEventListener("click", toggleMode);

    themeSelect.addEventListener("change", (e) => {
      applyTheme(e.target.value);
      e.target.blur();
    });

    sizeSelect.addEventListener("change", (e) => {
      changeGridSize(Number(e.target.value));
      e.target.blur();
    });

    speedSelect.addEventListener("change", (e) => {
      applySpeed(e.target.value);
      e.target.blur();
    });

    aiBtn.addEventListener("click", toggleAutoPlay);
    hintBtn.addEventListener("click", showHint);

    soundBtn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      updateSoundUI();
      saveSettings();
    });

    restartBtn.addEventListener("click", startNewGame);
    tryAgainBtn.addEventListener("click", startNewGame);
    undoBtn.addEventListener("click", undoMove);

    keepPlayingBtn.addEventListener("click", () => {
      keepPlaying = true;
      saveState();
      updateMessageUI();
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
