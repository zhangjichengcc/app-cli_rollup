import type { RollupOptions } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkg = require("./package.json");

const plugins: RollupOptions["plugins"] = [
  nodeResolve(),
  commonjs(),
  typescript(),
  alias({
    entries: [{ find: "@", replacement: path.resolve(__dirname, "./src") }],
  }),
];

const config: RollupOptions = {
  input: "src/main.ts",
  output: [
    {
      file: pkg.main,
      format: "es",
      exports: "auto",
      banner: "#!/usr/bin/env node",
    },
    {
      file: pkg.module,
      format: "cjs",
      exports: "auto",
      banner: "#!/usr/bin/env node",
    },
  ],
  plugins,
};

export default config;
