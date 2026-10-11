# NOVA FEMME CLINIC

Página estática React + Vite para presentar la clínica y solicitar citas por WhatsApp, sin mostrar disponibilidad ni enlazar calendarios. Funciona sin API, servidor Python ni base de datos. No se ha publicado.

## Desarrollo local (PowerShell)

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

Vite muestra la dirección local. No necesitas iniciar el backend.

## Información pública

Edita `frontend/src/clinic.js`: perfil profesional, servicios, teléfono, WhatsApp, ubicación, y horarios de atención. Contiene la configuración pública trasladada desde el backend; la información profesional pendiente debe completarse con datos verificados antes de publicar.

Todo lo incluido en ese archivo será visible para visitantes. No agregues contraseñas, tokens, claves privadas ni información de pacientes. Cambiar `backend/.env` ya no modifica la página.

## Solicitudes de cita

El botón abre WhatsApp con un mensaje preparado. La paciente completa su nombre, fecha y hora preferidas y lo envía. La clínica consulta su agenda privada y confirma manualmente al responder. Enviar el mensaje no aparta un horario.

La página no muestra espacios disponibles, no consulta calendarios y no registra reservas. La sección «Coordinar otro horario» permite consultar una excepción. No incluyas síntomas, diagnósticos ni información clínica.


Las funciones y pruebas del formulario anterior se conservan como referencia; no participan en el flujo activo.

## Seguridad y costo

Publica exclusivamente `frontend/dist` en Cloudflare Pages Free usando su subdominio gratuito `*.pages.dev`. No necesitas comprar dominio, activar Workers, bases de datos ni automatización de WhatsApp. Los planes gratuitos tienen límites y sus condiciones pueden cambiar.

`frontend/public/_headers` configura CSP, protección contra incrustación, restricciones de permisos, HSTS y otras cabeceras para Cloudflare Pages. La vista previa local de Vite no aplica estas cabeceras; verifícalas en la URL publicada. El sitio no recoge datos de pacientes ni almacena claves de Google. Activa verificación en dos pasos en Google y el alojamiento, y mantén dependencias actualizadas. Ninguna web puede garantizar ausencia absoluta de vulnerabilidades.

## Verificar y compilar

Desde `frontend`:

```powershell
npm.cmd test
npm.cmd run build
npm.cmd run preview
```

La compilación genera `frontend/dist/`. La vista previa sirve esa carpeta localmente; no publica el sitio.

### Pruebas end-to-end (Playwright)

`npm.cmd run test:e2e` verifica el flujo actual en escritorio y móvil: contenido, imágenes, errores de JavaScript, ancho de la página, mensaje de WhatsApp, teléfono y ausencia de formularios y enlaces de calendario. Requiere Chromium de Playwright (`npx.cmd playwright install chromium`). No envía mensajes reales.

## Publicación futura en alojamiento estático

Esta preparación no publica nada. Para un despliegue sin costo, usa **Cloudflare Pages Free**, con un subdominio `*.pages.dev`. No compres un dominio ni actives planes, complementos o pruebas de pago. El sitio funciona solo con archivos estáticos: no necesita Functions, Workers, bases de datos ni API de WhatsApp. Configuración para conectar el repositorio:

- Directorio raíz: `frontend`
- Comando de compilación: `npm run build`
- Directorio de salida: `dist`
- Variables de API: ninguna; no usa `VITE_API_URL`.

También puede alojarse únicamente el contenido de `frontend/dist/`. No subas `backend/`, archivos `.env` ni `node_modules` al sitio público.

Para carga directa, crea un proyecto de Pages con **Direct Upload** y sube la carpeta `frontend/dist`, incluyendo `_headers`. No uses el servidor de desarrollo ni `npm run preview` como alojamiento público. La dirección `pages.dev` se asigna al publicar y no requiere registrar un dominio.

Referencias oficiales: [configuración de compilación](https://developers.cloudflare.com/pages/configuration/build-configuration/), [precios de recursos estáticos](https://developers.cloudflare.com/pages/functions/pricing/) y [límites gratuitos](https://developers.cloudflare.com/pages/platform/limits/). El plan Free permite hasta 20 000 archivos, con un máximo de 25 MiB por archivo; este sitio está muy por debajo. No es una garantía sobre cambios futuros en las condiciones del proveedor.

Después de publicar, comprueba HTTPS, cabeceras de seguridad, imagen de la doctora y apertura de WhatsApp desde un teléfono. Mantén el proyecto en Free y no habilites servicios de pago.

Antes de publicar: completar el perfil profesional, comprobar los datos de contacto, probar en móvil y definir la URL pública. Después se podrá crear el sitemap con esa URL y registrar el sitio en Google Search Console y en el Perfil de Empresa. No hay una URL pública configurada todavía.

## Backend anterior

`backend/` se conserva como referencia y para una posible ampliación futura. No se usa en el sitio estático ni necesita desplegarse. Sus pruebas independientes siguen disponibles, pero la configuración activa de la página está en `frontend/src/clinic.js`.
