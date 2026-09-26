import monogram from './assets/monogram.svg?raw';
import wordmark from './assets/wordmark.svg?raw';

const parse = (name: string, raw: string) => {
  const viewBox = /viewBox="([^"]+)"/.exec(raw)?.[1];
  const d = /\sd="([^"]+)"/.exec(raw)?.[1];
  if (!viewBox || !d) throw new Error(`Logo ${name} needs a viewBox and a single path`);
  const [, , w, h] = viewBox.split(/\s+/);
  // <use> places a symbol at 0,0 of the outer SVG, so the outer box must start there too.
  return { id: `wtg-${name}`, viewBox, box: `0 0 ${w} ${h}`, d };
};

/** Logo paths, rendered once as an SVG sprite and reused with <use>. */
export const logos = {
  mono: parse('mono', monogram),
  word: parse('word', wordmark),
};
