import { test, expect } from '@playwright/test';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const dist = resolve('dist');
const headers = Object.fromEntries(readFileSync(join(dist, '_headers'), 'utf8').split(/\r?\n/)
  .filter(line => line.startsWith('  ')).map(line => {
    const index = line.indexOf(':');
    return [line.slice(0, index).trim(), line.slice(index + 1).trim()];
  }));

test('compilación con CSP: funciona y bloquea scripts inline y conexiones', async ({ page }) => {
  // Simulate deployment headers on the real production files; no public hosting is involved.
  const files = new Map();
  for (const item of readdirSync(dist, { recursive: true, withFileTypes: true })) {
    if (!item.isFile()) continue;
    const parent = item.parentPath ?? item.path;
    const absolute = join(parent, item.name);
    const relative = absolute.slice(dist.length).replaceAll('\\', '/');
    files.set(relative, absolute);
  }
  const violations = [];
  await page.addInitScript(() => {
    window.auditViolations = [];
    document.addEventListener('securitypolicyviolation', event => window.auditViolations.push(event.effectiveDirective));
  });
  await page.route('https://audit.test/**', async route => {
    const path = new URL(route.request().url()).pathname;
    const file = files.get(path === '/' ? '/index.html' : path);
    if (!file || path === '/_headers') return route.fulfill({ status: 404, body: '' });
    const type = file.endsWith('.js') ? 'text/javascript' : file.endsWith('.css') ? 'text/css' : file.endsWith('.html') ? 'text/html' : file.endsWith('.jpg') ? 'image/jpeg' : 'image/png';
    await route.fulfill({ status: 200, headers: { ...headers, 'Content-Type': type }, body: readFileSync(file) });
  });
  await page.goto('https://audit.test/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Solicitar cita por WhatsApp', exact: true })).toBeAttached();
  violations.push(...await page.evaluate(() => window.auditViolations));
  expect(violations).toEqual([]);
  await page.evaluate(async () => {
    const script = document.createElement('script');
    script.textContent = 'window.auditInjected = true';
    document.head.append(script);
    try { await fetch('https://example.invalid/audit'); } catch { /* CSP must block */ }
  });
  await expect.poll(() => page.evaluate(() => window.auditViolations)).toEqual(expect.arrayContaining(['script-src-elem', 'connect-src']));
  expect(await page.evaluate(() => window.auditInjected)).toBeUndefined();
  expect(await page.context().cookies()).toEqual([]);
  expect(await page.evaluate(() => [localStorage.length, sessionStorage.length])).toEqual([0, 0]);
});
