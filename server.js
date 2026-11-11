const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT) || 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const THEME_WALLPAPER_MAP = [
  { theme: "classic", themeName: "Classic Warm", wallpaper: "Warm Spiral Doodles" },
  { theme: "emerald", themeName: "Forest Emerald", wallpaper: "Green Doodle Grove" },
  { theme: "ocean", themeName: "Ocean Blue", wallpaper: "Abyssal Wave Currents" },
  { theme: "cyberpunk", themeName: "Cyberpunk Neon", wallpaper: "Synthwave Cyber Grid" },
  { theme: "sunset", themeName: "Crimson Sunset", wallpaper: "Solar Horizon Embers" },
  { theme: "royal", themeName: "Royal Amethyst", wallpaper: "Celestial Constellations" },
  { theme: "sakura", themeName: "Sakura Blossom", wallpaper: "Sakura Petal Drift" },
  { theme: "nordic", themeName: "Nordic Frost", wallpaper: "Aurora Borealis & Frost" },
  { theme: "coffee", themeName: "Mocha Espresso", wallpaper: "Café Roast Doodles" },
  { theme: "monochrome", themeName: "Minimalist Ink", wallpaper: "Sumi Ink Geometry" },
];

const server = http.createServer((req, res) => {
  const urlPath = (req.url || "/").split("?")[0];

  if (urlPath === "/api/wallpapers") {
    res.writeHead(200, { "Content-Type": MIME_TYPES[".json"] });
    res.end(
      JSON.stringify({
        version: "2.4.0",
        status: "ok",
        pairings: THEME_WALLPAPER_MAP,
      })
    );
    return;
  }

  let filePath;
  if (urlPath === "/vendor/angular.min.js") {
    filePath = path.join(ROOT, "node_modules", "angular", "angular.min.js");
  } else {
    const safeRel = path.normalize(urlPath === "/" ? "index.html" : urlPath).replace(/^(\.\.(\/|\\|$))+/, "");
    filePath = path.join(ROOT, safeRel);
  }

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(err.code === "ENOENT" ? 404 : 500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(err.code === "ENOENT" ? "404 Not Found" : "500 Internal Server Error");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`2048 Curated Studio Server (v2.4.0) running at http://localhost:${PORT}`);
});
