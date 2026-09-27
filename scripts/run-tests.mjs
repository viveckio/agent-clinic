import { spawnSync } from "node:child_process";

const env = {
  ...process.env,
  DATABASE_URL: "file:./prisma/agentclinic-test.db",
  NODE_ENV: "test",
};

function run(args) {
  const result = spawnSync(process.execPath, args, { env, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

run(["node_modules/prisma/build/index.js", "migrate", "deploy"]);
run(["node_modules/tsx/dist/cli.mjs", "prisma/seed.ts"]);
run(["node_modules/vitest/vitest.mjs", "run"]);
