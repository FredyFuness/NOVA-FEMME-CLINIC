import unittest
from datetime import datetime
from unittest.mock import patch
from urllib.parse import urlparse, parse_qs

from pydantic import ValidationError
from main import AppointmentRequest, CLINIC_TIMEZONE, request_appointment


class AppointmentTests(unittest.TestCase):
    def setUp(self):
        clock = patch('main.clinic_now', return_value=datetime(2026, 10, 13, 8, 0, tzinfo=CLINIC_TIMEZONE))
        clock.start()
        self.addCleanup(clock.stop)

    def request(self, **changes):
        return AppointmentRequest(**{'name': ' Paciente Prueba ', 'preferred_date': '2026-10-14', 'preferred_time': '08:00', **changes})

    def test_valid_message_and_trimmed_name(self):
        result = request_appointment(self.request())
        message = parse_qs(urlparse(result['whatsappUrl']).query)['text'][0]
        self.assertIn('Nombre: Paciente Prueba\n', message)
        self.assertIn('14/10/2026', message)
        self.assertIn('pendiente de confirmación', message)

    def test_closed_days_past_dates_and_invalid_dates(self):
        for value in ['2026-10-12', '2026-10-18', '2026-10-19', '2026-02-30']:
            with self.subTest(value=value), self.assertRaises(ValidationError):
                self.request(preferred_date=value)

    def test_hours_and_past_today(self):
        for value in ['06:59', '09:01', '23:00', '08:00:01', '08:00+00:00', '25:00']:
            with self.subTest(value=value), self.assertRaises(ValidationError):
                self.request(preferred_time=value)
        for value in ['07:59', '08:00']:
            with self.subTest(value=value), self.assertRaises(ValidationError):
                self.request(preferred_date='2026-10-13', preferred_time=value)
        self.request(preferred_date='2026-10-13', preferred_time='08:01')

    def test_open_days_and_boundaries(self):
        for day in ['2026-10-14', '2026-10-15', '2026-10-16', '2026-10-17', '2026-10-20']:
            for hour in ['07:00', '09:00']:
                self.request(preferred_date=day, preferred_time=hour)

    def test_blank_short_long_names_and_missing_schedule(self):
        for name in ['   ', ' A ', 'A' * 81]:
            with self.subTest(name=name), self.assertRaises(ValidationError):
                self.request(name=name)
        with self.assertRaises(ValidationError):
            AppointmentRequest(name='Paciente Prueba')


if __name__ == '__main__':
    unittest.main()
