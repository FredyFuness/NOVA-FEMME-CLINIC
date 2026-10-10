# NOVA FEMME CLINIC

Sitio web estático en español para NOVA FEMME CLINIC, con una estructura médica clásica, contenido para salud de la mujer y vías directas para solicitar cita.

## Contenido

- Perfil profesional de la doctora y servicios.
- Horario de atención: martes a sábado, de 7:00 a. m. a 9:00 a. m.
- Ubicación en Google Maps y perfil de Facebook.
- Solicitud de cita por WhatsApp y llamada telefónica.
- Botones separados para reservas de 30 y 60 minutos en Google Calendar.
- Diseño adaptable a celular y computadora.

## Pendiente antes de publicar

Completa en `js/site-config.js` la información profesional de la doctora, su formación y los servicios que ofrece. Agrega los enlaces públicos de reserva en `googleBookingUrls[30]` y `googleBookingUrls[60]` cuando existan.

El horario, ubicación compartida, Facebook y teléfono de citas ya están configurados. El número de WhatsApp se guarda como código de país y dígitos (El Salvador: `50373044567`).

No publiques campos de ejemplo. No agregues testimonios, credenciales, estadísticas ni servicios sin verificar.

## Google Calendar

Google Calendar necesita una duración por agenda. Crea dos agendas para la cuenta de la doctora: una de 30 minutos y otra de 60 minutos, ambas disponibles de martes a sábado entre las 7:00 a. m. y las 9:00 a. m. Coloca sus enlaces públicos en `googleBookingUrls[30]` y `googleBookingUrls[60]`; así aparecerán los botones para reservar. Revisa el nombre y la foto de perfil que se mostrarán en la página pública antes de compartir los enlaces.

Mientras se agregan los enlaces, las pacientes pueden pedir cita por WhatsApp o llamar al número configurado.

## Ejecutar localmente

Abre `index.html` en un navegador. El sitio no requiere dependencias ni compilación.

## Publicar con GitHub Pages

Después de completar y verificar los datos de la doctora, ve a **Settings → Pages** en el repositorio y selecciona la rama `main` con la carpeta `/ (root)`. GitHub mostrará la dirección pública cuando termine la publicación.
