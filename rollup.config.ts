import type { RollupOptions } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
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
  // ! babel 不生效，待处理
  babel({
    babelHelpers: "bundled",
    exclude: ["node_modules/**"],

    presets: [
      [
        "@babel/env",
        "@babel/preset-typescript",
        {
          // "modules": false ，否则 Babel 会在 Rollup 有机会做处理之前，将我们的模块转成 CommonJS ，导致 Rollup 的一些处理失败。
          modules: false,
        },
      ],
    ],
  }),
];

const config: RollupOptions = {
  input: "src/main.ts",
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
