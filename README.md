# NOVA FEMME CLINIC

Sitio web estático para presentar la clínica de ginecología y ayudar a solicitar citas.

## Contenido

- Perfil profesional de la doctora y ubicación.
- Sección editable para servicios disponibles.
- Formulario breve que prepara un mensaje de WhatsApp con nombre y horario preferido.
- Botones para reservar en las páginas públicas de Google Calendar para citas de 30 y 60 minutos.
- Diseño adaptable a celular y computadora.

## Datos por completar antes de publicar

Edita `js/site-config.js` con información confirmada por la doctora:

- Nombre profesional y formación.
- Nombre profesional y formación (por completar).
- Número de WhatsApp en formato internacional, solo dígitos. El número y teléfono de citas ya están configurados.
- Servicios que realmente ofrece.
- Enlaces de reserva de 30 y 60 minutos en `googleBookingUrls`.

La página no debe publicarse con los campos de ejemplo. No agregues testimonios, credenciales, estadísticas ni servicios sin verificación.

## Google Calendar

La doctora puede crear dos agendas de citas desde Google Calendar: una de 30 minutos y otra de 60 minutos, ambas con disponibilidad de martes a sábado de 7:00 a. m. a 9:00 a. m. Al colocar sus enlaces públicos en `googleBookingUrls[30]` y `googleBookingUrls[60]`, aparecerán los botones correspondientes y las pacientes podrán reservar un horario disponible. El enlace de reservas es público; revisa el nombre y la foto de perfil que muestra la cuenta antes de compartirlo.

Los enlaces de Google Calendar aún están pendientes. Mientras se agregan, las pacientes pueden solicitar su cita por WhatsApp o llamar al teléfono configurado. El sitio también enlaza la ubicación de Google Maps y el perfil de Facebook.

## Ejecutar localmente

Abre `index.html` en un navegador. El sitio no requiere dependencias ni compilación.

## Publicar con GitHub Pages

Después de completar los datos de la doctora, ve a **Settings → Pages** en el repositorio y selecciona la rama `main` con la carpeta `/ (root)`. GitHub mostrará la dirección pública cuando termine la publicación.
