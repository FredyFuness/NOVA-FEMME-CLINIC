// Íconos vectoriales locales: no dependen de fuentes ni del sistema operativo.
export default function Icon({ name = "flower", size = "1em" }) {
  const shapes = {
    arrow: <path d="M5 19 19 5M5 5h14v14" />,
    down: <path d="M12 4v16m-7-7 7 7 7-7" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    location: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    phone: <path d="m7 3 3 5-3 3a16 16 0 0 0 6 6l3-3 5 3v3a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1Z" />,
    facebook: <path d="M14 21v-8h3l.5-4H14V7c0-1 .5-2 2-2h2V2h-3c-3 0-5 2-5 5v2H7v4h3v8" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></>,
    flower: <>{Array.from({ length: 8 }, (_, i) => <ellipse key={i} cx="12" cy="6.5" rx="2" ry="4" transform={`rotate(${i * 45} 12 12)`} fill="currentColor" stroke="none" />)}<circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" /></>,
  };
  return <svg className={`icon icon-${name}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{shapes[name] || shapes.flower}</svg>;
}
