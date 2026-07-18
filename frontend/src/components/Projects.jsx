import { useEffect, useRef } from 'react';

const JS_PROJECTS = [
   {
    title: 'VLC Clone',
    overview: 'A browser-based video player inspired by VLC. Supports local file playback, custom play/pause controls, a draggable seek bar, volume control, and fullscreen mode — all built with vanilla JS.',
    image: null,
    github: 'https://github.com/bhoidhirendra07/VLC-clone',
    live: '#',
  },
  {
    title: 'CalcMaster',
    overview: 'A fully functional browser calculator supporting all basic arithmetic operations, keyboard shortcuts, and live expression evaluation. Designed with a dark UI and smooth key-press animations.',
    image: null,
    github: 'https://github.com/bhoidhirendra07/CalcMaster',
    live: '#',
  },
  {
    title: 'Typing Speed Checker',
    overview: 'Real-time typing speed test that measures Words Per Minute (WPM) and accuracy. Highlights each character as you type — green for correct, red for errors — with a countdown timer and result summary.',
    image: null,
    github: 'https://github.com/bhoidhirendra07/Typing-Speed-Checker',
    live: '#',
  },
 
  {
    title: 'Lottery Game',
    overview: 'An interactive lottery game where players pick numbers and see an animated random draw. Tracks winning rounds, shows instant win/loss feedback, and keeps a session score on the side.',
    image: null,
    github: 'https://github.com/bhoidhirendra07/Lottery-Game',
    live: '#',
  },
];

const OTHER_PROJECTS = [
  {
    title: 'KidStyle E-Commerce',
    overview: "A full-stack premium children's fashion store built with the MERN stack. Features JWT-based authentication, product catalog with filters, add-to-cart and wishlist functionality, order tracking, and an admin panel for product management.",
    image: null,
    github: 'https://github.com/bhoidhirendra07/Kids-online-store',
    live: '#',
  },
  {
    title: 'Quality Enhancer',
    overview: 'A web tool that allows users to upload an image and receive an upscaled, enhanced version. Supports multiple enhancement modes (sharpen, denoise, upscale) with a before/after comparison slider.',
    image: null,
    github: 'https://github.com/bhoidhirendra07/quality_enhancer',
    live: '#',
  },
  {
    title: 'Portfolio Website',
    overview: 'This portfolio — built with React, Vite, and Tailwind CSS on the frontend and Node.js + Express on the backend. Features scroll-driven animations, a contact form integrated with EmailJS, and a responsive design across all screen sizes.',
    image: null,
    github: 'https://github.com/bhoidhirendra07/Portfolio',
    live: '#',
  },
  {
    title: 'Cloudy Weather App',
    overview: 'A premium weather dashboard powered by the OpenWeatherMap API. Shows current conditions, a 5-day forecast, hourly temperature chart, humidity/wind/UV metrics, and an animated arc-based sunrise/sunset visualisation.',
    image: null,
    github: 'https://github.com/bhoidhirendra07/Weather-App',
    live: '#',
  },
];

/* Placeholder colour per initial letter */
const PLACEHOLDER_COLOURS = {
  C: '#7C22D4', T: '#2563EB', V: '#059669', L: '#D97706',
  K: '#7C22D4', Q: '#2563EB', P: '#7C22D4',
};

function placeholder(title) {
  return PLACEHOLDER_COLOURS[title.charAt(0)] ?? '#7C22D4';
}

/* ── Unified project card (same look for JS & Full-Stack) ── */
const GH_ICON = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
const EXT_ICON = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15,3 21,3 21,9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

function ProjectCard({ title, overview, image, github, live, index }) {
  const color = placeholder(title);
  return (
    <div
      className="bg-white rounded-2xl border border-[#D9D9D9] overflow-hidden fade-in-section card-hover flex flex-col"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Image / placeholder */}
      <div className="relative h-36 overflow-hidden bg-[#F3F3F3] shrink-0">
        {image
          ? <img src={image} alt={title} className="w-full h-full object-cover" />
          : (
            <div className="w-full h-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${color}18, ${color}06)` }}>
              <span className="text-5xl font-black select-none" style={{ color: `${color}28` }}>
                {title.charAt(0)}
              </span>
            </div>
          )
        }
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: color }} />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-[#1A1A2E] text-sm mb-1.5 leading-snug">{title}</h3>
        <p className="text-xs text-[#6B6B80] leading-relaxed flex-1 mb-3">{overview}</p>
        <div className="flex gap-4 pt-3 border-t border-[#F0F0F0]">
          <a href={live} className="link-underline flex items-center gap-1 text-xs font-semibold">
            {EXT_ICON} Live
          </a>
          <a href={github} target="_blank" rel="noopener noreferrer"
            className="link-underline flex items-center gap-1 text-xs font-semibold">
            {GH_ICON} Code
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    sectionRef.current?.querySelectorAll('.fade-in-section').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-[#EBEBEB]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14 fade-in-section">
          <p className="text-xs font-semibold text-[#7C22D4] tracking-widest uppercase mb-2">My Work</p>
          <h2 className="text-3xl font-black text-[#1A1A2E] mb-3">Featured Projects</h2>
          <div className="w-10 h-0.5 bg-[#7C22D4] rounded-full" />
          <p className="mt-4 text-[15px] text-[#6B6B80]">
            A showcase across JavaScript fundamentals and full-stack development.
          </p>
        </div>

        {/* JavaScript Projects */}
        <div className="mb-14">
          <h3 className="text-sm font-bold text-[#1A1A2E] mb-5 flex items-center gap-2 uppercase tracking-wider">
            <span className="w-5 h-5 rounded bg-[#7C22D4] text-white text-[10px] font-black flex items-center justify-center">JS</span>
            JavaScript Projects
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {JS_PROJECTS.map((p, i) => <ProjectCard key={p.title} {...p} index={i} />)}
          </div>
        </div>

        {/* Full Stack & Other Projects */}
        <div>
          <h3 className="text-sm font-bold text-[#1A1A2E] mb-5 flex items-center gap-2 uppercase tracking-wider">
            <span className="w-5 h-5 rounded bg-[#2563EB] text-white text-[10px] font-black flex items-center justify-center">FS</span>
            Full Stack &amp; Other Projects
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {OTHER_PROJECTS.map((p, i) => <ProjectCard key={p.title} {...p} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
