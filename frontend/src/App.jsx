import { useEffect, useState } from "react";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");

function ExternalLink({ href, children, className = "" }) {
  if (!href) return null;
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>;
}

export default function App() {
  const [clinic, setClinic] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/clinic`)
      .then((response) => {
        if (!response.ok) throw new Error("No fue posible cargar la información de la clínica.");
        return response.json();
      })
      .then(setClinic)
      .catch(() => setLoadError("No se pudo conectar con el backend. Inicia el servidor FastAPI para ver el sitio."));
  }, []);

  async function sendRequest(event) {
    event.preventDefault();
    setSending(true);
    setFormError("");
    try {
      const response = await fetch(`${API_URL}/api/appointments/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, preferred_date: date || null, preferred_time: time || null }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "No se pudo preparar la solicitud.");
      window.location.assign(data.whatsappUrl);
    } catch (error) {
      setFormError(error.message || "No se pudo enviar la solicitud. Intenta de nuevo.");
    } finally {
      setSending(false);
    }
  }

  if (loadError) return <main className="load-error"><span className="brand-mark">✳</span><h1>NOVA FEMME CLINIC</h1><p>{loadError}</p><code>cd backend && uvicorn main:app --reload</code></main>;
  if (!clinic) return <main className="load-error"><span className="loader" aria-label="Cargando" /><p>Cargando información de la clínica…</p></main>;

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="NOVA FEMME CLINIC, inicio"><span className="brand-mark">✳</span><span>{clinic.clinicName}</span></a>
        <nav className="nav" aria-label="Navegación principal">
          <a href="#perfil">La doctora</a><a href="#servicios">Servicios</a><a href="#ubicacion">Ubicación</a>
          <a className="nav-cta" href="#citas">Solicitar cita <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> Ginecología para la mujer</span>
            <h1>Un espacio para cuidar <em>tu salud femenina.</em></h1>
            <p>Atención ginecológica para mujeres, con un trato cercano y un espacio para conversar con confianza sobre tu bienestar.</p>
            <div className="hero-actions"><a className="button button-primary" href="#citas">Solicitar una cita <span>↗</span></a><a className="text-link" href="#perfil">Conocer a la doctora ↓</a></div>
            <div className="hero-note"><span>✳</span> Agenda por WhatsApp o consulta los horarios disponibles.</div>
          </div>
          <div className="hero-art" aria-label="Ilustración abstracta de bienestar femenino">
            <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
            <div className="art-circle"><span className="art-flower">✳</span><span className="art-caption">Bienestar<br />en cada etapa</span></div>
            <div className="art-leaf leaf-one" /><div className="art-leaf leaf-two" />
            <div className="art-stamp">NOVA<br /><b>✳</b> FEMME</div>
            <div className="art-card"><span>✳</span><div>Atención para mujeres<br /><b>con respeto y calidez.</b></div></div>
          </div>
          <div className="hero-bottom"><span>GINECOLOGÍA · NOVA FEMME CLINIC</span><span className="scroll-line" /><a href="#perfil">Conoce más ↓</a></div>
        </section>

        <section className="trust-strip" aria-label="Enfoque de atención">
          <span><b>01</b> Salud ginecológica</span><span><b>02</b> Atención para mujeres</span><span><b>03</b> Citas con horario definido</span>
        </section>
        <section className="intro-band"><p>Conoce a la doctora, explora la atención disponible y encuentra un horario para tu consulta.</p><span>✳</span></section>

        <section className="profile section-wrap" id="perfil">
          <div className="section-kicker">01 <span>·</span> PERFIL PROFESIONAL</div>
          <div className="profile-grid">
            <div className="profile-portrait"><div className="portrait-placeholder"><span>✳</span><b>FOTO PROFESIONAL<br />DE LA DOCTORA</b></div><div className="portrait-tag">Atención<br /><strong>con empatía</strong></div></div>
            <div className="profile-copy"><span className="eyebrow">Un poco sobre mí</span><h2>{clinic.doctorName}<br /><em>{clinic.specialty}</em></h2><p className="profile-lead">{clinic.bio}</p>
              <div className="profile-details"><div><span className="detail-icon">✳</span><p><b>Formación</b><br />{clinic.education}</p></div><div><span className="detail-icon">⌖</span><p><b>Consulta</b><br /><ExternalLink href={clinic.locationUrl} className="inline-link">{clinic.location}</ExternalLink></p></div></div>
              <a className="text-link link-accent" href="#citas">Solicitar una consulta ↗</a>
            </div>
          </div>
        </section>

        <section className="care-section" id="servicios"><div className="section-wrap">
          <div className="section-kicker">02 <span>·</span> SERVICIOS</div>
          <div className="care-heading"><div><span className="eyebrow">Salud de la mujer</span><h2>Atención ginecológica<br /><em>para cada consulta.</em></h2></div><p>Conoce las opciones de atención de NOVA FEMME CLINIC. Para más detalles, comunícate directamente con la clínica.</p></div>
          <div className="service-list">{clinic.services.map((service, index) => <article className="service-card" key={service.name}><span className="service-number">0{index + 1}</span><h3>{service.name}</h3><p>{service.description}</p><span className="service-arrow" aria-hidden="true">↗</span></article>)}</div>
          <p className="service-note">La información de esta página es general y no sustituye una valoración médica profesional.</p>
        </div></section>

        <section className="booking section-wrap" id="citas">
          <div className="section-kicker">03 <span>·</span> CITA</div>
          <div className="booking-grid"><div className="booking-copy"><span className="eyebrow">Agenda tu consulta</span><h2>Tu bienestar<br />merece <em>un espacio.</em></h2><p>Elige cómo prefieres solicitar tu cita. Puedes escribir por WhatsApp, llamar o reservar cuando estén disponibles los horarios en Google Calendar.</p>
            <div className="booking-contact"><span className="contact-icon">◷</span><div><b>Horario de atención</b><span>{clinic.hours}</span></div></div>
            <div className="booking-contact" id="ubicacion"><span className="contact-icon">⌖</span><div><b>Ubicación</b><ExternalLink href={clinic.locationUrl} className="inline-link">Ver clínica en Google Maps</ExternalLink></div></div>
            <div className="booking-contact"><span className="contact-icon">☎</span><div><b>Llamar para citas</b><a className="inline-link" href={`tel:${clinic.phoneNumber}`}>{clinic.phoneNumber}</a></div></div>
            <div className="booking-contact"><span className="contact-icon">f</span><div><b>Facebook</b><ExternalLink href={clinic.facebookUrl} className="inline-link">Visitar perfil de NOVA FEMME CLINIC</ExternalLink></div></div>
          </div>
          <form className="booking-form" onSubmit={sendRequest}>
            <div className="form-title"><span>Solicitud de cita</span><span className="form-step">01 / 01</span></div>
            <label htmlFor="patient-name">Tu nombre</label><input id="patient-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="¿Cómo te llamas?" required maxLength="80" />
            <div className="form-row"><div><label htmlFor="preferred-date">Fecha preferida</label><input id="preferred-date" value={date} onChange={(e) => setDate(e.target.value)} type="date" /></div><div><label htmlFor="preferred-time">Hora preferida</label><input id="preferred-time" value={time} onChange={(e) => setTime(e.target.value)} type="time" /></div></div>
            <p className="privacy-note">◉ No incluyas síntomas, diagnósticos ni información médica en este formulario.</p>
            {formError && <p className="form-error" role="alert">{formError}</p>}
            <button className="button button-primary button-full" type="submit" disabled={sending}>{sending ? "Preparando…" : "Continuar por WhatsApp ↗"}</button>
            <div className="calendar-options"><p>O elige la duración de tu cita:</p>{clinic.googleBookingUrls["30"] && <ExternalLink className="button button-calendar button-full" href={clinic.googleBookingUrls["30"]}>Cita de 30 minutos ↗</ExternalLink>}{clinic.googleBookingUrls["60"] && <ExternalLink className="button button-calendar button-full" href={clinic.googleBookingUrls["60"]}>Cita de 60 minutos ↗</ExternalLink>}</div>
            <p className="form-foot">La solicitud por WhatsApp queda pendiente de confirmación.</p>
          </form></div>
        </section>
      </main>

      <footer className="footer"><div className="footer-main"><a className="brand brand-footer" href="#inicio"><span className="brand-mark">✳</span><span>{clinic.clinicName}</span></a><p>Ginecología y bienestar de la mujer.</p><a className="footer-cta" href="#citas">Solicitar cita ↗</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {clinic.clinicName}</span><span>Información general. No brinda atención de emergencia.</span></div></footer>
    </>
  );
}
