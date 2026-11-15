const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
function matchPath(pattern, pathname) {
  const expected = pattern.split("/").filter(Boolean), actual = pathname.split("/").filter(Boolean);
  if (expected.length !== actual.length) return null;
  const params = {};
  for (let i = 0; i < expected.length; i += 1) {
    if (expected[i].startsWith(":")) {
      try { params[expected[i].slice(1)] = decodeURIComponent(actual[i]); } catch { return null; }
    } else if (expected[i] !== actual[i]) return null;
  }
  return params;
}
function fillParams(value, params) {
  if (typeof value === "string") return value.replace(/\{\{([\w-]+)\}\}/g, (_, key) => params[key] ?? "");
  if (Array.isArray(value)) return value.map((item) => fillParams(item, params));
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, fillParams(item, params)]));
  return value;
}
function createServer(routes) {
  if (!Array.isArray(routes)) throw new TypeError("Route configuration must be an array.");
  return http.createServer(async (req, res) => {
    const url = new URL(req.url || "/", \`http://\${req.headers.host || "127.0.0.1"}\`);
    const route = routes.find((item) => String(item.method || "GET").toUpperCase() === (req.method || "GET").toUpperCase() && matchPath(item.path, url.pathname) !== null);
    if (!route) {
      res.writeHead(404, { "content-type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ error: "No mock route matched", method: req.method, path: url.pathname }));
      return;
    }
    const params = matchPath(route.path, url.pathname);
    const delay = Math.max(0, Math.min(Number(route.delayMs) || 0, 10000));
    if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
    const status = Number.isInteger(route.status) && route.status >= 100 && route.status <= 599 ? route.status : 200;
    console.log(\`[\${new Date().toISOString()}] \${req.method} \${url.pathname} -> \${status}\`);
    res.writeHead(status, { "content-type": "application/json; charset=utf-8", "x-mockdock-route": route.path });
    res.end(JSON.stringify(fillParams(route.body ?? {}, params)));
  });
}
if (require.main === module) {
  const configFile = process.env.MOCKS_FILE || path.join(__dirname, "mocks.json");
  const routes = JSON.parse(fs.readFileSync(configFile, "utf8"));
  const port = Number(process.env.PORT) || 3000;
  createServer(routes).listen(port, "127.0.0.1", () => {
    console.log(\`MockDock listening at http://127.0.0.1:\${port}\`);
    console.log(\`Loaded \${routes.length} route(s) from \${configFile}\`);
  });
}
module.exports = { matchPath, createServer };