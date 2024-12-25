// @ts-check
import { defineConfig } from "astro/config";
import yaml from "@rollup/plugin-yaml";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        external: ["Generaldata"],
      },
    },
    resolve: {
      alias: {
        layouts: "/src/layouts",
      },
    },
    plugins: [yaml()],
  },
  integrations: [mdx()],
});
