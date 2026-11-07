const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "release-assets");
const OUT_FILE = path.join(OUT_DIR, "2048-standalone.html");

fs.mkdirSync(OUT_DIR, { recursive: true });

let html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const css = fs.readFileSync(path.join(ROOT, "style.css"), "utf8");
const wallpaperJs = fs.readFileSync(path.join(ROOT, "wallpaper.js"), "utf8");
const scriptJs = fs.readFileSync(path.join(ROOT, "script.js"), "utf8");

// Inline CSS safely using function replacer so '$' sequences are preserved verbatim
html = html.replace('<link rel="stylesheet" href="style.css" />', () => `<style>\n${css}\n</style>`);

// Inline local AngularJS bundle if installed via npm so standalone HTML works 100% offline
const localAngularPath = path.join(ROOT, "node_modules", "angular", "angular.min.js");
if (fs.existsSync(localAngularPath)) {
  const angularJs = fs.readFileSync(localAngularPath, "utf8").replace(/<\/script>/gi, "<\\/script>");
  html = html.replace(
    '<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.8.3/angular.min.js"></script>',
    () => `<script>\n${angularJs}\n</script>`
  );
}

html = html.replace('<script src="wallpaper.js"></script>', () => `<script>\n${wallpaperJs}\n</script>`);
html = html.replace('<script src="script.js"></script>', () => `<script>\n${scriptJs}\n</script>`);

fs.writeFileSync(OUT_FILE, html, "utf8");
console.log(`Built standalone single-file app: ${OUT_FILE} (${Buffer.byteLength(html, "utf8")} bytes)`);
