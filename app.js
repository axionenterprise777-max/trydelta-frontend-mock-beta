const { spawn } = require("node:child_process");

const port = process.env.PORT || process.env.PASSENGER_PORT || "3000";
const host = process.env.HOST || "0.0.0.0";

const args = [
  "run",
  "start",
  "--workspace",
  "frontend",
  "--",
  "--hostname",
  host,
  "--port",
  String(port),
];

const child = spawn("npm", args, {
  stdio: "inherit",
  env: process.env,
  shell: process.platform === "win32",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
