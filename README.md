# NOVA FEMME CLINIC

Proyecto dividido en frontend React + Vite y backend FastAPI.

## Estructura

- `frontend/`: interfaz para pacientes; obtiene los datos de la clínica desde la API.
- `backend/`: API pública, configuración de la clínica y solicitud de cita por WhatsApp.

El backend no guarda solicitudes ni información clínica. Las reservas confirmadas se gestionan en Google Calendar a través de sus páginas públicas de reserva.

## Ejecutar en desarrollo

### Backend (PowerShell)

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
uvicorn main:app --reload
```

La API queda disponible en `http://localhost:8000`; su documentación interactiva está en `/docs`.

### Frontend

En otra terminal:

```powershell
cd frontend
npm install
npm run dev
```

Vite mostrará la URL local, normalmente `http://localhost:5173`.

## Configuración

Edita `backend/.env` para establecer el perfil profesional verificado, servicios y enlaces públicos de reserva `GOOGLE_BOOKING_URL_30` y `GOOGLE_BOOKING_URL_60`. Configura el origen del frontend en `CORS_ORIGINS` al desplegar. Nunca coloques credenciales privadas de Google en el frontend.

El formulario solo solicita nombre y horario preferido; la paciente continúa la solicitud en WhatsApp y la clínica confirma. No agregues campos para síntomas, diagnósticos u otros datos clínicos.
