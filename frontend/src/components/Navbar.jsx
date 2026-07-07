import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useScrollActive } from '../hooks/useScrollActive';

const NAV_LINKS = [
  { id: 'home',    label: 'Home' },
  { id: 'about',   label: 'About' },
  { id: 'skills',  label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' });
  }
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const activeSection = useScrollActive(SECTION_IDS);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300
        ${scrolled
          ? 'backdrop-blur-xl shadow-lg'
          : 'backdrop-blur-md'
        }
        ${theme === 'dark'
          ? 'bg-gray-900/80 border-gray-700'
          : 'bg-white/80 border-gray-200'
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/Logo.png" alt="Dhirendra Bhoi Logo" className="h-10 w-auto rounded-lg" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`relative font-medium text-sm transition-colors duration-150 cursor-pointer
                ${activeSection === id
                  ? 'text-blue-500'
                  : theme === 'dark'
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
            >
              {label}
              {activeSection === id && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
              )}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            id="theme-toggle"
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors duration-150 cursor-pointer
              ${theme === 'dark'
                ? 'text-yellow-400 hover:bg-gray-700'
                : 'text-gray-500 hover:bg-gray-100'
              }`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              /* Moon icon */
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              /* Sun icon */
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen((p) => !p)}
            className="md:hidden flex flex-col gap-1 p-2 cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            <span className={`block w-5 h-0.5 transition-all duration-200 ${theme === 'dark' ? 'bg-white' : 'bg-gray-800'}
              ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block w-5 h-0.5 transition-all duration-200 ${theme === 'dark' ? 'bg-white' : 'bg-gray-800'}
              ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 transition-all duration-200 ${theme === 'dark' ? 'bg-white' : 'bg-gray-800'}
              ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={`md:hidden border-t px-4 py-3 flex flex-col gap-2
          ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => { scrollToSection(id); setMobileOpen(false); }}
              className={`text-left py-2 px-3 rounded-lg font-medium text-sm transition-colors cursor-pointer
                ${activeSection === id
                  ? 'text-blue-500 bg-blue-500/10'
                  : theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
