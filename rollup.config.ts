import type { RollupOptions } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const pkg = require("./package.json");

const plugins: RollupOptions["plugins"] = [
  nodeResolve(),
  commonjs(),
  typescript(),
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
