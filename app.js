const http = require("node:http");
const path = require("node:path");

const port = Number(process.env.PASSENGER_PORT || process.env.PORT || 3000);
const host = process.env.HOST || "0.0.0.0";

const appDir = path.join(__dirname, "frontend");
process.chdir(appDir);

const next = require("next");
const app = next({ dev: false, hostname: host, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  http.createServer((req, res) => {
    handle(req, res);
  }).listen(port, host, () => {
    console.log(`Next server listening on http://${host}:${port}`);
  });
});
