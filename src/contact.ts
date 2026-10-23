/** shortcut: deters basic harvesters only; use server verification if stronger protection is needed. */
export const encodeEmail = (value: string) => btoa(encodeURIComponent(value));

export function decodeEmail(encoded: string): string {
  const value = decodeURIComponent(atob(encoded));
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) throw new TypeError('Invalid email');
  return value;
}

export const emailUri = (value: string) =>
  `mailto:${encodeURIComponent(value).replace('%40', '@')}`;
