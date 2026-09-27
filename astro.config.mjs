// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// The deploy workflow passes --site and --base from the GitHub Pages settings,
// so moving to the custom domain (wethegods.cz) needs no code change.
export default defineConfig({
  site: 'https://majkey25.github.io',
  compressHTML: true,
  build: { inlineStylesheets: 'always' },
  fonts: [
    {
      // Headings: a high-contrast Didone, closest to the hairlines of the band's wordmark.
      provider: fontProviders.fontsource(),
      name: 'Bodoni Moda',
      cssVariable: '--font-display',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Didot', 'Georgia', 'serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Geist',
      cssVariable: '--font-body',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      // Menu, labels and buttons.
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
});
