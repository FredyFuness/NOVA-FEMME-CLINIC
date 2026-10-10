export function clinicClock(timezone, now = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(now).map(({ type, value }) => [type, value]));
  return { date: `${parts.year}-${parts.month}-${parts.day}`, time: `${parts.hour}:${parts.minute}` };
}

export function appointmentError(name, date, time, schedule, now = new Date()) {
  if (name.trim().length < 2 || name.trim().length > 80) return 'Escribe un nombre de entre 2 y 80 caracteres.';
  if (!date || !time) return 'Selecciona la fecha y la hora de tu cita.';
  const clock = clinicClock(schedule.timezone, now);
  const parsed = new Date(`${date}T12:00:00Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) return 'Selecciona una fecha válida.';
  if (date < clock.date) return 'Elige una fecha de hoy en adelante.';
  if (!schedule.weekdays.includes(parsed.getUTCDay())) return 'Las citas regulares son de martes a sábado. Para otro día, usa Coordinar otro horario.';
  if (!/^\d{2}:\d{2}$/.test(time) || time < schedule.startTime || time > schedule.endTime || Number(time.slice(3)) > 59) return 'El horario regular es de 7:00 a 9:00 a. m. Para otra hora, usa Coordinar otro horario.';
  if (date === clock.date && time <= clock.time) return 'Ese horario ya pasó. Elige una fecha y hora futuras.';
  return '';
}

export function appointmentWhatsAppUrl(name, date, time, clinic, now = new Date()) {
  const error = appointmentError(name, date, time, clinic.appointmentSchedule, now);
  if (error) throw new Error(error);
  const phone = clinic.whatsappNumber.replace(/\D/g, '');
  if (!phone) throw new Error('WhatsApp no está configurado. Llama a la clínica para solicitar tu cita.');
  const [year, month, day] = date.split('-');
  const message = [
    'Hola, quisiera solicitar una cita.',
    `Nombre: ${name.trim()}`,
    `Fecha preferida: ${day}/${month}/${year}`,
    `Hora preferida: ${time}`,
    'Entiendo que la cita queda pendiente de confirmación.',
  ].join('\n');
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
