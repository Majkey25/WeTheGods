// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// The deploy workflow passes --site and --base from the GitHub Pages settings,
// so moving to the custom domain (wethegods.cz) needs no code change.
export default defineConfig({
  site: 'https://majkey25.github.io',
  compressHTML: true,
  build: { inlineStylesheets: 'always' },
  // YouTube thumbnails for videos added in the CMS without an uploaded image.
  image: { domains: ['i.ytimg.com'] },
  fonts: [
    {
      // Headings: a sturdy modern display face; the serif wordmark stays the only ornament.
      provider: fontProviders.fontshare(),
      name: 'Clash Display',
      cssVariable: '--font-display',
      weights: [500, 600],
      styles: ['normal'],
      fallbacks: ['Arial', 'sans-serif'],
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
