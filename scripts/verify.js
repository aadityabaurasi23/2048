const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const wallpaperJs = fs.readFileSync(path.join(ROOT, "wallpaper.js"), "utf8");
const scriptJs = fs.readFileSync(path.join(ROOT, "script.js"), "utf8");

// 1. Syntax-check JS files using Node's V8 VM compiler
new vm.Script(wallpaperJs, { filename: "wallpaper.js" });
new vm.Script(scriptJs, { filename: "script.js" });

// 2. Verify all static getElementById references exist in index.html
const htmlIds = new Set([...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1]));
// Exclude dynamic fallback IDs injected at runtime inside mountFallbackWallpaperUI
const dynamicFallbackIds = new Set(["fb-sync-btn", "fb-anim-btn", "fb-ripple-btn", "fb-speed-range"]);

for (const [name, src] of [
  ["wallpaper.js", wallpaperJs],
  ["script.js", scriptJs],
]) {
  const refs = [...src.matchAll(/getElementById\("([^"]+)"\)/g)].map((m) => m[1]);
  const missing = refs.filter((id) => !htmlIds.has(id) && !dynamicFallbackIds.has(id));
  if (missing.length > 0) {
    console.error(`Missing DOM IDs in ${name}: ${missing.join(", ")}`);
    process.exit(1);
  }
}

// 3. Verify required asset tags for standalone bundling
const requiredTags = [
  '<link rel="stylesheet" href="style.css" />',
  '<script src="wallpaper.js"></script>',
  '<script src="script.js"></script>',
];
for (const tag of requiredTags) {
  if (!html.includes(tag)) {
    console.error(`Missing expected tag in index.html: ${tag}`);
    process.exit(1);
  }
}

console.log("Verification passed: JS syntax valid & all DOM IDs / asset tags matched.");
