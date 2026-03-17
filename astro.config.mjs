// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://indextree.dev",

  integrations: [
      mdx(),
      sitemap({
          customPages: [
              "https://indextree.dev",
              "https://indextree.dev/ko/",
          ],
          changefreq: "monthly",
          priority: 0.7,
          lastmod: new Date(),
      }),
      svelte(),
  ],

  vite: {
      plugins: [tailwindcss()],
  },
});