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
      provider: fontProviders.fontsource(),
      name: 'Instrument Serif',
      cssVariable: '--font-display',
      weights: [400],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
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
