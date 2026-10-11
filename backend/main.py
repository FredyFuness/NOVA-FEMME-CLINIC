"""API pública para el sitio de NOVA FEMME CLINIC.

Las solicitudes de cita se convierten en un enlace de WhatsApp. No se guardan
datos personales ni información clínica en el servidor.
"""

import os
import re
from datetime import date, time, datetime, timezone, timedelta
from urllib.parse import quote

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator, model_validator

load_dotenv()

CLINIC_TIMEZONE = timezone(timedelta(hours=-6))
APPOINTMENT_DAYS = (1, 2, 3, 4, 5)  # Python: martes a sábado.
OPENING_TIME = time(7)
CLOSING_TIME = time(9)


def clinic_now() -> datetime:
    return datetime.now(CLINIC_TIMEZONE)


def setting(key: str, default: str = "") -> str:
    return os.getenv(key, default).strip()


def clinic_data() -> dict:
    return {
        "clinicName": setting("CLINIC_NAME", "NOVA FEMME CLINIC"),
        "doctorName": setting("DOCTOR_NAME", "Dra. Nombre Apellido"),
        "specialty": setting("DOCTOR_SPECIALTY", "Ginecología"),
        "education": setting("DOCTOR_EDUCATION", "Información profesional por agregar"),
        "bio": setting(
            "DOCTOR_BIO",
            "Conoce la formación, experiencia y enfoque profesional de la doctora.",
        ),
        "location": setting("CLINIC_LOCATION", "Consulta presencial"),
        "locationUrl": setting(
            "CLINIC_LOCATION_URL",
            "https://maps.app.goo.gl/6HxqBgd3qN18GPEb9",
        ),
        "hours": setting(
            "CLINIC_HOURS", "Martes a sábado, de 7:00 a. m. a 9:00 a. m."
        ),
        "whatsappNumber": re.sub(r"\D", "", setting("WHATSAPP_NUMBER", "50373044567")),
        "phoneNumber": setting("PHONE_NUMBER", "+50373044567"),
        "facebookUrl": setting(
            "FACEBOOK_URL",
            "https://www.facebook.com/profile.php?id=100094533859955",
        ),
        "appointmentSchedule": {
            "weekdays": [(day + 1) % 7 for day in APPOINTMENT_DAYS],
            "startTime": OPENING_TIME.strftime("%H:%M"),
            "endTime": CLOSING_TIME.strftime("%H:%M"),
            "timezone": "America/El_Salvador",
        },
        "services": [
            {
                "name": "Consulta ginecológica",
                "description": "Atención ginecológica para conversar sobre tus necesidades de salud femenina.",
            },
            {
                "name": "Consulta de seguimiento",
                "description": "Coordina con la doctora una consulta de seguimiento.",
            },
            {
                "name": "Información sobre servicios",
                "description": "Comunícate con la clínica para consultar los servicios disponibles.",
            },
        ],
    }


app = FastAPI(
    title="NOVA FEMME CLINIC API",
    description="Información pública y solicitudes de cita para la clínica.",
    version="1.0.0",
)

origins = [
    origin.strip()
    for origin in setting("CORS_ORIGINS", "http://localhost:5173").split(",")
    if origin.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


class AppointmentRequest(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    preferred_date: date
    preferred_time: time

    @field_validator("name", mode="before")
    @classmethod
    def trim_name(cls, value):
        return value.strip() if isinstance(value, str) else value

    @model_validator(mode="after")
    def validate_schedule(self):
        now = clinic_now()
        if self.preferred_date < now.date():
            raise ValueError("Elige una fecha de hoy en adelante.")
        if self.preferred_date.weekday() not in APPOINTMENT_DAYS:
            raise ValueError("Las citas regulares son de martes a sábado. Para otro día, usa la sección Coordinar otro horario.")
        chosen_time = self.preferred_time
        if chosen_time.tzinfo is not None or chosen_time.second or chosen_time.microsecond:
            raise ValueError("Selecciona una hora local en horas y minutos.")
        if not OPENING_TIME <= chosen_time <= CLOSING_TIME:
            raise ValueError("El horario regular es de 7:00 a 9:00 a. m. Para otra hora, usa la sección Coordinar otro horario.")
        if self.preferred_date == now.date() and chosen_time <= now.time().replace(tzinfo=None):
            raise ValueError("Ese horario ya pasó. Elige una fecha y hora futuras.")
        return self


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok"}


@app.get("/api/clinic")
def get_clinic() -> dict:
    return clinic_data()


@app.post("/api/appointments/request")
def request_appointment(request: AppointmentRequest) -> dict:
    clinic = clinic_data()
    phone = clinic["whatsappNumber"]
    if not phone:
        raise HTTPException(status_code=503, detail="WhatsApp no está configurado.")

    lines = ["Hola, quisiera solicitar una cita.", f"Nombre: {request.name.strip()}"]
    if request.preferred_date:
        lines.append(f"Fecha preferida: {request.preferred_date.strftime('%d/%m/%Y')}")
    if request.preferred_time:
        lines.append(f"Hora preferida: {request.preferred_time.strftime('%H:%M')}")
    lines.append("Entiendo que la cita queda pendiente de confirmación.")
    message = quote("\n".join(lines))
    return {"whatsappUrl": f"https://wa.me/{phone}?text={message}"}
