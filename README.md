# NOVA FEMME CLINIC

Página estática React + Vite para presentar la clínica y solicitar citas por WhatsApp. Funciona sin API, servidor Python ni base de datos. No se ha publicado.

## Desarrollo local (PowerShell)

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

Vite muestra la dirección local. No necesitas iniciar el backend.

## Información pública

Edita `frontend/src/clinic.js`: perfil profesional, servicios, teléfono, WhatsApp, ubicación, horarios y enlaces públicos de Google Calendar. Contiene la configuración pública trasladada desde el backend; la información profesional pendiente debe completarse con datos verificados antes de publicar.

Todo lo incluido en ese archivo será visible para visitantes. No agregues contraseñas, tokens, claves privadas ni información de pacientes. Cambiar `backend/.env` ya no modifica la página.

## Solicitudes de cita

El formulario requiere nombre, fecha y hora. Valida martes a sábado, de 07:00 a 09:00 inclusive, según la hora de El Salvador. Rechaza nombres en blanco, fechas pasadas y horarios que ya pasaron hoy. El horario se configura en `appointmentSchedule`; si cambia, actualiza también `hours` y los textos del formulario y de coordinación.

El navegador prepara el mensaje y abre WhatsApp. La paciente debe enviarlo y la clínica debe confirmar disponibilidad. La página no envía mensajes automáticamente, no registra reservas ni comprueba cupos. Las validaciones son una ayuda en el navegador; la clínica debe revisar cada solicitud recibida.

La sección «Coordinar otro horario» abre un mensaje independiente para consultar una excepción con la doctora. No agregues campos de síntomas, diagnósticos ni otros datos clínicos.

Los botones de Google Calendar solo aparecen cuando `googleBookingUrls` tiene enlaces configurados. Sus horarios y disponibilidad se administran por separado en Google Calendar.

## Verificar y compilar

Desde `frontend`:

```powershell
npm.cmd test
npm.cmd run build
npm.cmd run preview
```

La compilación genera `frontend/dist/`. La vista previa sirve esa carpeta localmente; no publica el sitio.

## Publicación futura en alojamiento estático

Esta preparación no publica nada. Cuando se autorice la publicación, un alojamiento como Cloudflare Pages puede compilar el repositorio con estos valores:

- Directorio raíz: `frontend`
- Comando de compilación: `npm run build`
- Directorio de salida: `dist`
- Variables de API: ninguna; no usa `VITE_API_URL`.

También puede alojarse únicamente el contenido de `frontend/dist/`. No subas `backend/`, archivos `.env` ni `node_modules` al sitio público.

Antes de publicar: completar el perfil profesional, comprobar los datos de contacto, probar en móvil y definir la URL pública. Después se podrá crear el sitemap con esa URL y registrar el sitio en Google Search Console y en el Perfil de Empresa. No hay una URL pública configurada todavía.

## Backend anterior

`backend/` se conserva como referencia y para una posible ampliación futura. No se usa en el sitio estático ni necesita desplegarse. Sus pruebas independientes siguen disponibles, pero la configuración activa de la página está en `frontend/src/clinic.js`.
