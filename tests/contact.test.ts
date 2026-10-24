import assert from 'node:assert/strict';
import test from 'node:test';
import { readdir, readFile } from 'node:fs/promises';
import { decodeEmail, emailUri, encodeEmail } from '../src/contact.ts';

test('protected email preserves plus addressing and Unicode', () => {
  for (const [value, uri] of [
    ['booking+press@example.com', 'mailto:booking%2Bpress@example.com'],
    ['příjemce@example.cz', 'mailto:p%C5%99%C3%ADjemce@example.cz'],
    ['a%40b?subject=x&body=y@example.com', 'mailto:a%2540b%3Fsubject%3Dx%26body%3Dy@example.com'],
  ]) {
    assert.equal(decodeEmail(encodeEmail(value)), value);
    assert.equal(emailUri(value), uri);
  }
});

test('email URI restores every encoded @', () => {
  assert.equal(emailUri('a@b@example.com'), 'mailto:a@b@example.com');
});

test('malformed or injected contacts are rejected', () => {
  assert.throws(() => decodeEmail('%%%'));
  for (const value of ['not-email', 'a@example.com\r\nBcc:other@example.com', 'a@b@example.com']) {
    assert.throws(() => decodeEmail(encodeEmail(value)));
  }
});

test('built pages and scripts do not expose contacts before activation', async () => {
  const dist = new URL('../dist/', import.meta.url);
  const files = (await readdir(dist, { recursive: true })).filter((file) =>
    /\.(html|js|json|xml)$/.test(file),
  );
  const artifacts = await Promise.all(
    files.map(async (file) => ({
      file,
      text: await readFile(new URL(file.replaceAll('\\', '/'), dist), 'utf8'),
    })),
  );
  const emails = new Set(
    artifacts.flatMap(({ file, text }) =>
      file.endsWith('.html')
        ? [...text.matchAll(/data-contact-value="([^"]+)"/g)].map((match) => decodeEmail(match[1]))
        : [],
    ),
  );
  assert(emails.size > 0, 'Build must contain protected contacts');
  for (const { file, text } of artifacts) {
    for (const email of emails) {
      assert(
        !text.includes(email) && !text.includes(encodeURIComponent(email)),
        `${file}: raw email exposed`,
      );
    }
    if (file.endsWith('.html'))
      assert(!/href=["'](?:mailto|tel):/i.test(text), `${file}: initial contact URI exposed`);
  }
});
