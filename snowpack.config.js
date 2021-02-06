/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  extends: "@snowpack/app-scripts-svelte",
  mount: {
    public: "/",
    src: "/dist",
  },
  plugins: [
    [
      "@snowpack/plugin-build-script",
      { cmd: "postcss", input: [".css"], output: [".css"] },
    ],
    "@snowpack/plugin-svelte",
    "@snowpack/plugin-dotenv",
    "@snowpack/plugin-typescript",
  ],
  packageOptions: {
    types: true,
    polyfillNode: true,
  },
  buildOptions: {
    clean: true,
  },
  optimize: {
    bundle: true,
    minify: true,
    treeshake: true,
    target: "es2020",
  },
};
