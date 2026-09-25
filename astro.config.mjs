// @ts-check
import { defineConfig } from 'astro/config';

// The deploy workflow passes --site and --base from the GitHub Pages settings,
// so moving to the custom domain (wethegods.cz) needs no code change.
export default defineConfig({
  site: 'https://majkey25.github.io',
  compressHTML: true,
  build: { inlineStylesheets: 'always' },
});
