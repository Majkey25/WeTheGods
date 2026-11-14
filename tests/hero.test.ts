import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import { transform } from '@astrojs/compiler-rs';
import { ScriptTarget, transpileModule } from 'typescript';

const source = await readFile(new URL('../src/components/Hero.astro', import.meta.url), 'utf8');
const script = transform(source).scripts.find((script) => script.type === 'inline')?.code;
assert(script, 'Hero must contain its browser script');
const { outputText } = transpileModule(script, {
  compilerOptions: { target: ScriptTarget.ES2022 },
});

function setup({ reducedMotion = false, saveData = false } = {}) {
  const attributes = new Map<string, string>();
  const button = Object.assign(new EventTarget(), {
    hidden: true,
    dataset: { play: 'Play', pause: 'Pause' },
    setAttribute: (name: string, value: string) => attributes.set(name, value),
  });
  const video = Object.assign(new EventTarget(), {
    paused: true,
    preload: 'none',
    play() {
      this.paused = false;
      video.dispatchEvent(new Event('playing'));
      return Promise.resolve();
    },
    pause() {
      this.paused = true;
    },
  });
  const classes = new Set<string>();
  const hero = {
    querySelector: (selector: string) =>
      selector === 'video' ? video : selector === '.hero__toggle' ? button : null,
    classList: {
      add: (name: string) => classes.add(name),
      toggle: (name: string, active: boolean) =>
        active ? classes.add(name) : classes.delete(name),
    },
  };
  const document = Object.assign(new EventTarget(), {
    hidden: false,
    readyState: 'complete',
    querySelector: (selector: string) => (selector === '.hero' ? hero : null),
  });
  const reduced = Object.assign(new EventTarget(), { matches: reducedMotion });
  let intersection = (_entries: { isIntersecting: boolean }[]) => {};
  runInNewContext(outputText, {
    document,
    navigator: { connection: { saveData } },
    matchMedia: () => reduced,
    IntersectionObserver: class {
      constructor(callback: typeof intersection) {
        intersection = callback;
      }
      observe() {}
    },
  });
  return {
    document,
    reduced,
    video,
    button,
    classes,
    attributes,
    show: (visible: boolean) => intersection([{ isIntersecting: visible }]),
  };
}

test('hero waits for visibility and pauses without replacing its playing frame', () => {
  const state = setup();
  assert(state.video.paused);
  assert.equal(state.video.preload, 'none');
  state.show(true);
  assert(!state.video.paused);
  state.document.hidden = true;
  state.document.dispatchEvent(new Event('visibilitychange'));
  assert(state.video.paused);
  assert(state.classes.has('is-playing'));
  state.document.hidden = false;
  state.document.dispatchEvent(new Event('visibilitychange'));
  assert(!state.video.paused);
  state.show(false);
  assert(state.video.paused);
});

test('motion changes and tab visibility preserve the visitor pause choice', () => {
  const state = setup({ reducedMotion: true });
  state.show(true);
  assert(state.video.paused);
  assert(state.button.hidden);
  state.reduced.matches = false;
  state.reduced.dispatchEvent(new Event('change'));
  assert(!state.video.paused);
  assert(!state.button.hidden);
  state.button.dispatchEvent(new Event('click'));
  assert(state.video.paused);
  assert.equal(state.attributes.get('aria-label'), 'Play');
  state.reduced.matches = true;
  state.reduced.dispatchEvent(new Event('change'));
  state.reduced.matches = false;
  state.reduced.dispatchEvent(new Event('change'));
  state.document.dispatchEvent(new Event('visibilitychange'));
  state.show(true);
  assert(state.video.paused);
  state.button.dispatchEvent(new Event('click'));
  assert(!state.video.paused);
  assert.equal(state.attributes.get('aria-label'), 'Pause');
  const saved = setup({ saveData: true });
  saved.show(true);
  assert(saved.video.paused);
  assert(saved.button.hidden);
});
