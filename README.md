# NOVA FEMME CLINIC

Sitio web estático para presentar la clínica de ginecología y ayudar a solicitar citas.

## Contenido

- Perfil profesional de la doctora y ubicación.
- Sección editable para servicios disponibles.
- Formulario breve que prepara un mensaje de WhatsApp con nombre y horario preferido.
- Botón opcional a la página pública de reservas de Google Calendar.
- Diseño adaptable a celular y computadora.

## Datos por completar antes de publicar

Edita `js/site-config.js` con información confirmada por la doctora:

- Nombre profesional y formación.
- Ubicación y horario de consulta.
- Número de WhatsApp en formato internacional, solo dígitos (por ejemplo, `50370000000`).
- Servicios que realmente ofrece.
- Enlace de su página de reservas, si usará Google Calendar.

La página no debe publicarse con los campos de ejemplo. No agregues testimonios, credenciales, estadísticas ni servicios sin verificación.

## Google Calendar

La doctora puede crear una agenda de citas desde Google Calendar y compartir su enlace de reserva. Al colocar ese enlace en `googleBookingUrl`, aparecerá el botón “Ver horarios en Google Calendar”. Las personas reservarán una hora disponible y la cita se agregará al calendario. El enlace de reservas es público; revisa el nombre y la foto de perfil que muestra la cuenta antes de compartirlo.

Mientras el enlace no esté configurado, las personas pueden pedir una cita por WhatsApp. La doctora confirma la disponibilidad y agrega la cita a su calendario.

## Ejecutar localmente

Abre `index.html` en un navegador. El sitio no requiere dependencias ni compilación.

## Publicar con GitHub Pages

Después de completar los datos de la doctora, ve a **Settings → Pages** en el repositorio y selecciona la rama `main` con la carpeta `/ (root)`. GitHub mostrará la dirección pública cuando termine la publicación.
