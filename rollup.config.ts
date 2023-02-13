import type { RollupOptions } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkg = require("./package.json");

const plugins: RollupOptions["plugins"] = [
  alias({
    entries: [{ find: "@", replacement: path.resolve(__dirname, "./src") }],
  }),
  nodeResolve(),
  commonjs(),
  typescript({
    declarationDir: "./declare",
  }),
];

const config: RollupOptions = {
  input: "src/main.ts",
  external: Object.keys(pkg.dependencies),
  output: [
    {
      file: pkg.main,
      format: "es",
      exports: "auto",
    },
    {
      file: pkg.module,
      format: "cjs",
      exports: "auto",
    },
  ],
  plugins,
};

export default config;
