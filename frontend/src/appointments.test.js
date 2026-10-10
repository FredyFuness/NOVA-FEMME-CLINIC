import test from 'node:test';
import assert from 'node:assert/strict';
import { appointmentError, appointmentWhatsAppUrl, clinicClock } from './appointments.js';
import { clinic } from './clinic.js';

const schedule = { weekdays: [2, 3, 4, 5, 6], startTime: '07:00', endTime: '09:00', timezone: 'America/El_Salvador' };
const now = new Date('2026-10-13T14:00:00Z');
const error = (date, time = '08:00', name = 'Paciente') => appointmentError(name, date, time, schedule, now);

test('valid hours and dates, including opening and closing', () => {
  for (const date of ['2026-10-14', '2026-10-17', '2026-10-20']) {
    for (const time of ['07:00', '08:00', '09:00']) assert.equal(error(date, time), '');
  }
});
test('rejects closed days, past dates, hours outside schedule and blank names', () => {
  for (const date of ['2026-10-12', '2026-10-18', '2026-10-19', '2026-02-30']) assert.ok(error(date));
  for (const time of ['06:59', '09:01', '25:00', '08:99']) assert.ok(error('2026-10-14', time));
  assert.ok(error('2026-10-14', '08:00', '  '));
  assert.ok(error('', ''));
});
test('checks same-day times in El Salvador and timezone date boundaries', () => {
  assert.ok(error('2026-10-13', '08:00'));
  assert.equal(error('2026-10-13', '08:01'), '');
  assert.equal(clinicClock(schedule.timezone, new Date('2026-10-14T03:00:00Z')).date, '2026-10-13');
});
test('generates a WhatsApp request locally with encoded patient data', () => {
  const url = new URL(appointmentWhatsAppUrl('  María & Ana + #  ', '2026-10-14', '08:00', { ...clinic, whatsappNumber: '+503 7304 4567' }, now));
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/50373044567');
  assert.equal(url.searchParams.get('text'), 'Hola, quisiera solicitar una cita.\nNombre: María & Ana + #\nFecha preferida: 14/10/2026\nHora preferida: 08:00\nEntiendo que la cita queda pendiente de confirmación.');
});
test('does not create links for invalid appointments or missing WhatsApp', () => {
  assert.throws(() => appointmentWhatsAppUrl('Paciente', '2026-10-19', '08:00', clinic, now));
  assert.throws(() => appointmentWhatsAppUrl('Paciente', '2026-10-14', '08:00', { ...clinic, whatsappNumber: '' }, now), /WhatsApp no está configurado/);
});
