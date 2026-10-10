(() => {
  const cfg = window.CLINIC_SITE || {};
  const put = (selector, value) => document.querySelectorAll(selector).forEach((el) => { if (value) el.textContent = value; });
  put("[data-clinic]", cfg.clinicName);
  put("[data-doctor]", cfg.doctorName);
  put("[data-specialty]", cfg.specialty);
  put("[data-education]", cfg.education);
  put("[data-location]", cfg.location);
  put("[data-hours]", cfg.hours);
  document.title = `${cfg.doctorName || "Consulta médica"} | ${cfg.specialty || "Atención médica"}`;
  document.getElementById("year").textContent = new Date().getFullYear();

  const list = document.getElementById("service-list");
  (cfg.services || []).forEach((item, index) => {
    const row = document.createElement("article");
    row.className = "service-row";
    const number = document.createElement("span"); number.className = "service-number"; number.textContent = `0${index + 1}`;
    const title = document.createElement("h3"); title.textContent = item.name;
    const description = document.createElement("p"); description.textContent = item.description;
    const arrow = document.createElement("span"); arrow.className = "service-arrow"; arrow.setAttribute("aria-hidden", "true"); arrow.textContent = "↗";
    row.append(number, title, description, arrow); list.append(row);
  });

  const calendar = document.getElementById("calendar-booking");
  if (cfg.googleBookingUrl) { calendar.href = cfg.googleBookingUrl; calendar.hidden = false; calendar.target = "_blank"; calendar.rel = "noopener noreferrer"; }

  const form = document.getElementById("booking-form");
  const submitButton = form.querySelector('button[type="submit"]');
  if (!cfg.whatsappNumber) {
    submitButton.disabled = true;
    submitButton.title = "El número de WhatsApp se configurará antes de publicar el sitio.";
  }
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    if (!cfg.whatsappNumber) {
      document.getElementById("form-feedback").textContent = "La solicitud por WhatsApp estará disponible cuando se configure el número de consulta.";
      return;
    }
    const lines = ["Hola, quisiera solicitar una cita.", `Nombre: ${name}`];
    if (data.get("date")) lines.push(`Fecha preferida: ${data.get("date")}`);
    if (data.get("time")) lines.push(`Hora preferida: ${data.get("time")}`);
    lines.push("Entiendo que la cita queda pendiente de confirmación.");
    window.open(`https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
  });

  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  menu.addEventListener("click", () => { const open = menu.getAttribute("aria-expanded") !== "true"; menu.setAttribute("aria-expanded", String(open)); nav.classList.toggle("nav-open", open); });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => { menu.setAttribute("aria-expanded", "false"); nav.classList.remove("nav-open"); }));
})();
