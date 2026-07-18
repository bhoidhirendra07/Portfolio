import { useState, useEffect } from 'react';
import { useScrollActive } from '../hooks/useScrollActive';

const NAV_LINKS = [
  { id: 'home',      label: 'Home' },
  { id: 'about',     label: 'About' },
  { id: 'skills',    label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'projects',  label: 'Projects' },
  { id: 'contact',   label: 'Contact' },
];
const SECTION_IDS = NAV_LINKS.map((l) => l.id);

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' });
}

export default function Navbar() {
  const activeSection = useScrollActive(SECTION_IDS);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? 'bg-[#EBEBEB]/95 backdrop-blur-sm shadow-sm border-b border-[#D9D9D9]' : 'bg-transparent'}`}>
      <div className="max-w-5xl mx-auto px-5 flex items-center justify-between h-16">
        {/* Stylish D·B monogram logo */}
        <button onClick={() => scrollToSection('home')} className="cursor-pointer group" aria-label="Home">
          <span className="flex items-center gap-0 select-none">
            <span
              className="font-black text-[20px] leading-none tracking-tight text-[#7C22D4]
                group-hover:text-[#7C22D4] transition-colors duration-200"
              style={{ fontFamily: "'Montserrat', sans-serif"}}>
              D
            </span>
            <span className="text-[#7C22D4] font-black text-[18px] leading-none"></span>
            <span
              className="font-black text-[20px] leading-none tracking-tight text-[#7C22D4]
                group-hover:text-[#7C22D4] transition-colors duration-200"
              style={{ fontFamily: "'Montserrat', sans-serif"}}>
              B
            </span>
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ id, label }) => (
            <button key={id} onClick={() => scrollToSection(id)} cursor-pointer
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 cursor-pointer
                ${activeSection === id
                  ? 'text-[#7C22D4] bg-[#7C22D4]/8'
                  : 'text-[#6B6B80] hover:text-[#1A1A2E] hover:bg-black/5'}`}>
              {label}
              {activeSection === id && (
                <span className="block mx-auto mt-0.5 h-0.5 w-4 rounded-full bg-[#7C22D4]" />
              )}
            </button>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button id="mobile-menu-toggle" onClick={() => setMobileOpen((p) => !p)}
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-black/5 cursor-pointer transition-colors" aria-label="Menu">
          <span className={`block w-5 h-0.5 bg-[#1A1A2E] transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[#1A1A2E] transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[#1A1A2E] transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#EBEBEB] border-t border-[#D9D9D9] px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map(({ id, label }) => (
            <button key={id} onClick={() => { scrollToSection(id); setMobileOpen(false); }}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer
                ${activeSection === id ? 'text-[#7C22D4] bg-[#7C22D4]/8 font-semibold' : 'text-[#6B6B80] hover:bg-black/5'}`}>
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
