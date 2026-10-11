import { test, expect } from '@playwright/test';
import { clinic } from '../src/clinic.js';

test('página completa, imágenes y navegación sin errores', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page).toHaveTitle(/NOVA FEMME/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('tu salud femenina');
  await expect(page.getByRole('heading', { name: new RegExp(clinic.doctorName) })).toBeVisible();
  for (const service of clinic.services) {
    await expect(page.getByRole('heading', { name: service.name })).toBeAttached();
  }
  await page.locator('#citas').scrollIntoViewIfNeeded();
  await expect(page.getByRole('link', { name: 'Solicitar cita por WhatsApp', exact: true })).toBeVisible();
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(el => el.complete && el.naturalWidth > 0)).toBeTruthy();
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  expect(errors).toEqual([]);
});

test('solicitud por WhatsApp sin calendario ni recogida de datos', async ({ page }) => {
  await page.goto('/');
  const link = page.getByRole('link', { name: 'Solicitar cita por WhatsApp', exact: true });
  const url = new URL(await link.getAttribute('href'));
  expect(url.origin).toBe('https://wa.me');
  expect(url.pathname).toBe(`/${clinic.whatsappNumber}`);
  const message = url.searchParams.get('text');
  for (const text of ['Nombre:', 'Fecha preferida:', 'Hora preferida:', 'pendiente de disponibilidad y confirmación']) expect(message).toContain(text);
  await expect(page.locator('input, form, iframe')).toHaveCount(0);
  await expect(page.locator('a[href*="calendar.google"], a[href*="calendar.app.google"]')).toHaveCount(0);
  await expect(page.locator('#citas')).toContainText('Enviar el mensaje no aparta un horario');
  for (const external of await page.locator('a[target="_blank"]').all()) {
    await expect(external).toHaveAttribute('rel', /noopener/);
  }
});

test('contacto y coordinación de otro horario', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Llamar a la clínica' })).toHaveAttribute('href', `tel:${clinic.phoneNumber}`);
  const alternate = new URL(await page.getByRole('link', { name: /Consultar otro horario por WhatsApp/ }).getAttribute('href'));
  expect(alternate.pathname).toBe(`/${clinic.whatsappNumber}`);
  expect(alternate.searchParams.get('text')).toContain('sujeta a disponibilidad y confirmación');
});
