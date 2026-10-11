import { clinic } from "./clinic";
import Icon from "./Icon";

function ExternalLink({ href, children, className = "" }) {
  if (!href) return null;
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export default function App() {
  const contactUrl = `https://wa.me/${clinic.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent("Hola, quisiera solicitar una cita en NOVA FEMME CLINIC.\nNombre: \nFecha preferida: \nHora preferida: \nEntiendo que la cita queda pendiente de disponibilidad y confirmación de la clínica.")}`;
  const alternateUrl = clinic.whatsappNumber ? `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent("Hola, quisiera coordinar con la doctora una cita fuera del horario regular de martes a sábado, de 7:00 a 9:00 a. m. ¿Podrían ayudarme a consultar otra opción? Entiendo que está sujeta a disponibilidad y confirmación.")}` : "";

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="NOVA FEMME CLINIC, inicio"><img className="brand-logo" src="/logo-horizontal.png" alt={clinic.clinicName} /></a>
        <nav className="nav" aria-label="Navegación principal">
          <a href="#perfil">La doctora</a><a href="#servicios">Servicios</a><a href="#ubicacion">Ubicación</a>
          <a className="nav-cta" href="#citas">Solicitar cita <span aria-hidden="true"><Icon name="arrow" /></span></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> Ginecología · NOVA FEMME CLINIC</span>
            <h1>Un espacio para cuidar <em>tu salud femenina.</em></h1>
            <p>Tu salud merece atención y tus preguntas, un espacio. Aquí puedes conversar con la doctora sobre tu bienestar, con un trato cercano y respetuoso.</p>
            <div className="hero-actions"><a className="button button-primary" href="#citas">Solicitar una cita <span><Icon name="arrow" /></span></a><a className="text-link" href="#perfil">Conocer a la doctora <Icon name="down" /></a></div>
            <div className="hero-note"><span aria-hidden="true"><Icon name="flower" /></span> Solicita tu cita por WhatsApp y espera la confirmación de la clínica.</div>
          </div>
          <div className="hero-art" aria-label="Ilustración abstracta de bienestar femenino">
            <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
            <div className="art-circle"><img className="art-logo" src="/logo-mark.png" alt="" /><span className="art-caption">Bienestar<br />en cada etapa</span></div>
            <div className="art-leaf leaf-one" /><div className="art-leaf leaf-two" />
            <div className="art-stamp">NOVA<br /><b><Icon name="flower" /></b> FEMME</div>
            <div className="art-card"><span><Icon name="flower" /></span><div>Atención para mujeres<br /><b>con respeto y calidez.</b></div></div>
          </div>
          <div className="hero-bottom"><span>GINECOLOGÍA · NOVA FEMME CLINIC</span><span className="scroll-line" /><a href="#perfil">Conoce más <Icon name="down" /></a></div>
        </section>

        <section className="trust-strip" aria-label="Enfoque de atención">
          <span><b>01</b> Trato cercano y respetuoso</span><span><b>02</b> Un espacio para tus preguntas</span><span><b>03</b> Citas por WhatsApp</span>
        </section>
        <section className="intro-band"><p>Cuidarte también empieza por sentirte cómoda para preguntar.</p><span aria-hidden="true"><Icon name="flower" /></span></section>

        <section className="profile section-wrap" id="perfil">
          <div className="section-kicker">01 <span>·</span> PERFIL PROFESIONAL</div>
          <div className="profile-grid">
            <div className="profile-portrait"><img className="portrait-photo" src="/doctora.jpg" alt={`${clinic.doctorName}, ${clinic.specialty}`} width="1184" height="1328" loading="lazy" /><div className="portrait-tag">Atención<br /><strong>con empatía</strong></div></div>
            <div className="profile-copy"><span className="eyebrow">Conoce a tu doctora</span><h2>{clinic.doctorName}<br /><em>{clinic.specialty}</em></h2><p className="profile-lead">{clinic.bio}</p>
              <div className="profile-details"><div><span className="detail-icon"><Icon name="flower" /></span><div><b>Formación adicional</b><ul className="profile-list">{clinic.training.map((item) => <li key={item}>{item}</li>)}</ul></div></div><div><span className="detail-icon"><Icon name="flower" /></span><p><b>Experiencia</b><br />{clinic.experience}</p></div><div><span className="detail-icon"><Icon name="location" /></span><p><b>Consulta</b><br /><ExternalLink href={clinic.locationUrl} className="inline-link">{clinic.location}</ExternalLink></p></div></div>
              <a className="text-link link-accent" href="#citas">Solicitar una consulta <Icon name="arrow" /></a>
            </div>
          </div>
        </section>

        <section className="care-section" id="servicios"><div className="section-wrap">
          <div className="section-kicker">02 <span>·</span> SERVICIOS</div>
          <div className="care-heading"><div><span className="eyebrow">Pensando en tu bienestar</span><h2>Atención personalizada<br /><em>para cada consulta.</em></h2></div><p>Cada consulta es una oportunidad para hablar de lo que necesitas. Conoce las opciones de atención y da el siguiente paso a tu ritmo.</p></div>
          <div className="service-list">{clinic.services.map((service, index) => <article className="service-card" key={service.name}><span className="service-number">0{index + 1}</span><h3>{service.name}</h3><p>{service.description}</p><a className="service-link" href={index === 2 ? "#contacto" : "#citas"}>{index === 2 ? "Consultar con la clínica" : "Solicitar una consulta"} <span aria-hidden="true"><Icon name="arrow" /></span></a></article>)}</div>
          <p className="service-note">La información de esta página es general y no sustituye una valoración médica profesional.</p>
        </div></section>

        <section className="booking section-wrap" id="citas">
          <div className="section-kicker">03 <span>·</span> CITA</div>
          <div className="booking-grid"><div className="booking-copy"><span className="eyebrow">Da el primer paso</span><h2>Tu bienestar<br />merece <em>un espacio.</em></h2><p>Escríbenos por WhatsApp con tu nombre y el día y hora que prefieres. La clínica revisará su disponibilidad y te confirmará la cita.</p>
            <ol className="booking-steps" aria-label="Cómo solicitar tu cita"><li><b>Escríbenos por WhatsApp</b><span>Abre el mensaje preparado con el botón de esta página.</span></li><li><b>Indica tu preferencia</b><span>Completa tu nombre, fecha y hora preferidas antes de enviar.</span></li><li><b>Espera la confirmación</b><span>La clínica revisará la disponibilidad y responderá para confirmar tu cita.</span></li></ol>
            <div className="booking-contact"><span className="contact-icon"><Icon name="clock" /></span><div><b>Horario de atención</b><span>{clinic.hours}</span></div></div>
            <div className="booking-contact" id="ubicacion"><span className="contact-icon"><Icon name="location" /></span><div><b>Ubicación</b><ExternalLink href={clinic.locationUrl} className="inline-link">Ver clínica en Google Maps</ExternalLink></div></div>
            <div className="booking-contact" id="contacto"><span className="contact-icon"><Icon name="phone" /></span><div><b>¿Prefieres hablar con la clínica?</b><a className="inline-link" href={`tel:${clinic.phoneNumber}`}>{clinic.phoneNumber}</a></div></div>
            <div className="booking-contact"><span className="contact-icon"><Icon name="facebook" /></span><div><b>Facebook</b><ExternalLink href={clinic.facebookUrl} className="inline-link">Visitar perfil de NOVA FEMME CLINIC</ExternalLink></div></div>
            <div className="booking-contact"><span className="contact-icon" aria-hidden="true"><Icon name="instagram" /></span><div><b>Instagram</b><ExternalLink href={clinic.instagramUrl} className="inline-link">@novafemmeclinic_ginecologia</ExternalLink></div></div>
          </div>
          <div className="booking-form">
            <div className="form-title"><span>Solicita tu cita</span><span className="form-step">POR WHATSAPP</span></div>
            <p className="form-intro">Cuéntanos qué día y hora prefieres. La clínica revisará la disponibilidad directamente contigo.</p>
            <ExternalLink className="button button-primary button-full" href={contactUrl}>Solicitar cita por WhatsApp <Icon name="arrow" /></ExternalLink>
            <p className="form-foot">Enviar el mensaje no aparta un horario. Tu cita queda confirmada cuando recibas la respuesta de la clínica.</p>
            <p className="privacy-note">Esta página no recoge ni guarda datos de pacientes. Al continuar, usarás WhatsApp y su política de privacidad. Comparte solo los datos necesarios para tu cita, sin síntomas ni diagnósticos.</p>
          </div></div>
        </section>
        <section className="alternate-booking section-wrap" id="otro-horario" aria-labelledby="alternate-title">
          <div className="section-kicker">04 · COORDINACIÓN PERSONALIZADA</div>
          <h2 id="alternate-title">¿Necesitas otro horario?</h2>
          <p>Sabemos que no siempre es fácil encontrar un momento. Si el horario de martes a sábado, de 7:00 a 9:00 a. m., no se ajusta a tu día, escribe para consultar otra opción con la doctora.</p>
          <ExternalLink href={alternateUrl} className="button button-primary">Consultar otro horario por WhatsApp <Icon name="arrow" /></ExternalLink>
          <a href={`tel:${clinic.phoneNumber}`} className="inline-link alternate-phone">Llamar a la clínica</a>
          <p className="schedule-help">El nuevo horario depende de la disponibilidad de la doctora y requiere confirmación. Comparte solo los datos necesarios para coordinar.</p>
        </section>
      </main>

      <footer className="footer"><div className="footer-main"><a className="brand brand-footer" href="#inicio"><img className="footer-logo" src="/logo-mark.png" alt="" /><span>{clinic.clinicName}</span></a><p>Ginecología y bienestar de la mujer.</p><a className="footer-cta" href="#citas">Solicitar cita <Icon name="arrow" /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {clinic.clinicName}</span><span>Información general. No brinda atención de emergencia.</span></div></footer>
    </>
  );
}
