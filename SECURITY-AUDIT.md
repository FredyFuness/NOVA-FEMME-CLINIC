# Auditoría de seguridad previa al despliegue

Fecha: 11 de octubre de 2026. Alcance: checkout local, historial Git disponible (41 commits), frontend React/Vite, archivos públicos, compilación `frontend/dist`, dependencias npm y revisión estática del backend de referencia. No se ha auditado un servidor público: el sitio aún no está desplegado.

## Resultado

No se identificaron vulnerabilidades críticas o altas en el flujo estático revisado. Esto describe los resultados de las comprobaciones realizadas, no garantiza ausencia de vulnerabilidades ni sustituye una prueba de penetración independiente.

| Área | Evidencia y resultado |
| --- | --- |
| Datos de pacientes | Sin formularios, API, cookies propias ni almacenamiento local o de sesión en el flujo probado. El mensaje se completa fuera del sitio, en WhatsApp. |
| Inyección de código | Sin `dangerouslySetInnerHTML`, `innerHTML`, `eval`, `new Function` o `document.write` en `src`. React renderiza texto. No se procesa contenido de URL o datos externos para generar HTML. |
| Conexiones | Sin `fetch`, WebSocket, servicios de calendario ni scripts de terceros en el código activo. Google Fonts sí carga estilos y fuentes externas. |
| Enlaces | Enlaces de configuración estática; mensaje codificado con `encodeURIComponent`; WhatsApp por HTTPS. Enlaces en otra pestaña con `noopener noreferrer`. Teléfono y navegación interna comprobados. No hay redirecciones controladas por parámetros de visitantes. |
| Secretos | Búsqueda de patrones comunes de claves privadas, AWS, Google, GitHub y OpenAI sin coincidencias en archivos rastreados ni en 41 commits. No se encontró historial de `.env`, `backend/.env`, `frontend/.env` o `frontend/.env.local`. Esta búsqueda no detecta cualquier formato de contraseña o secreto. No se muestran valores del `.env` local. |
| Dependencias | `npm audit --json`: 0 alertas conocidas; resumen de 118 dependencias, incluyendo desarrollo. No equivale a revisar manualmente cada dependencia ni detecta vulnerabilidades desconocidas. |
| Publicación | `dist` contiene HTML, CSS, JavaScript compilado, imágenes y `_headers`. Sin backend, `.env`, `.git`, base de datos o mapas de código fuente. |
| Imágenes | Sin marcadores EXIF/XMP ni el marcador GPS buscado en los recursos revisados. Los nombres, la foto y la ubicación son información pública intencional. No se realizó análisis forense exhaustivo de archivos. |
| CSP | Cabecera restrictiva: scripts locales, sin scripts inline ni eval; conexiones, formularios, objetos e iframes bloqueados; estilos/fuentes externos limitados a Google Fonts. Prueba de navegador sobre archivos reales de `dist` con cabeceras simuladas: la app carga, un script inline no ejecuta y una conexión externa queda bloqueada. |
| Otras cabeceras | `nosniff`, `DENY`, política sin referencia, permisos de cámara/micrófono/geolocalización/pagos desactivados y HSTS configurados. Aplicación real pendiente de comprobar en el alojamiento. |
| Interfaz | Pruebas de escritorio y móvil para contenido, imágenes, ancho, enlaces de WhatsApp, teléfono y ausencia de calendario/formularios. |

## Ajustes y comprobaciones reproducibles

Se añadió `frontend/e2e/security.spec.js` para verificar la compilación con CSP en escritorio y móvil. Las pruebas usan un origen HTTPS simulado y sirven los archivos locales con las cabeceras de `_headers`; no prueban TLS ni configuración de Cloudflare. `pretest:e2e` genera una compilación nueva antes de ejecutar las pruebas. El ejemplo de variables de entorno ya no sugiere conectar el backend anterior.

Desde `frontend`:

```powershell
npm.cmd audit --json
npm.cmd test
npm.cmd run test:e2e
```

## Riesgos y límites pendientes

1. **Agenda externa anterior:** la persona responsable confirmó en esta conversación que la eliminó. La integración y su configuración se retiraron del proyecto. No se realizó una comprobación externa independiente.
2. **Alojamiento y cuentas:** falta verificar HTTPS, cabeceras efectivas, accesos, verificación en dos pasos y configuración de producción. Publicar únicamente `frontend/dist`, en Cloudflare Pages estático, sin ejecutar Vite ni el backend como servidor público.
3. **Información pública y spam:** teléfono, foto, formación, redes y ubicación pueden copiarse o usarse para suplantación o mensajes no deseados. Ocultar JavaScript o usar CSP no evita copiar información pública.
4. **Google Fonts y proveedores externos:** el navegador contacta Google para cargar fuentes. Al abrir enlaces de WhatsApp, Maps y redes, se aplican las políticas de esos proveedores. No se ha auditado su infraestructura ni comprobado que las cuentas de redes pertenezcan a la clínica.
5. **Cadena de suministro:** el lockfile incluye integridad de paquetes, pero npm audit no garantiza que todas las dependencias sean confiables. Mantener el lockfile, usar `npm ci` y revisar futuras actualizaciones. Los controles gratuitos y sus límites dependen del proveedor.
6. **Backend inactivo:** contiene endpoints públicos sin autenticación ni limitación de solicitudes y dependencias Python con rangos de versiones. No guarda citas, pero no está aprobado para producción. No se auditó su entorno Python con una base de vulnerabilidades ni se hicieron pruebas dinámicas de esa API. No debe desplegarse ni incluirse en los archivos públicos.
7. **Disponibilidad y confirmación:** WhatsApp requiere envío y respuesta humanos; no existe control automático de cruces, cancelaciones ni confirmaciones. La clínica debe consultar su agenda privada antes de confirmar.

## Referencias

- Cloudflare Pages: https://developers.cloudflare.com/pages/configuration/headers/ — `_headers` aplica a respuestas de archivos estáticos; no certifica que el alojamiento ya esté configurado.
- OWASP CSP: https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html — CSP es una defensa adicional, no un reemplazo de código seguro.

Conclusión de alcance: no se encontró un bloqueo de seguridad en la aplicación estática local bajo las comprobaciones descritas. El cierre de la auditoría de producción requiere la URL desplegada y revisar la agenda externa anterior y los accesos de las cuentas.
