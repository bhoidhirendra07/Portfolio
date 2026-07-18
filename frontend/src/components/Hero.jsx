import { useState, useEffect, useRef } from 'react';

const TYPING_TEXTS = ['MERN Stack Developer', 'Full-Stack Developer', 'Creative Problem Solver'];

function useTypingEffect(texts, speed = 80) {
  const [displayed, setDisplayed] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    let delay = isDeleting ? speed / 2 : speed;
    if (!isDeleting && charIndex === current.length) delay = 2000;
    else if (isDeleting && charIndex === 0) delay = 500;
    const timer = setTimeout(() => {
      if (!isDeleting && charIndex === current.length) setIsDeleting(true);
      else if (isDeleting && charIndex === 0) { setIsDeleting(false); setTextIndex((p) => (p + 1) % texts.length); }
      else { setCharIndex((p) => isDeleting ? p - 1 : p + 1); setDisplayed(current.substring(0, isDeleting ? charIndex - 1 : charIndex + 1)); }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, texts, speed]);

  return displayed;
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' });
}

export default function Hero() {
  const typedText = useTypingEffect(TYPING_TEXTS);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-[#EBEBEB]">
      <div className="text-center max-w-3xl mx-auto px-6 py-20"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>

        {/* Greeting */}
        <p className="text-sm font-medium text-[#7C22D4] tracking-widest uppercase mb-4">
          Hello, I'm
        </p>

        {/* Name */}
        <h1 className="text-6xl md:text-8xl font-black text-[#1A1A2E] leading-none tracking-tight mb-4">
          Dhirendra <br className="md:hidden" />
          <span className="text-[#7C22D4]">Bhoi</span>
        </h1>

        {/* Typed role */}
        <p className="text-xl md:text-2xl font-medium text-[#6B6B80] mb-6 h-8">
          {typedText}
          <span className="inline-block w-0.5 h-5 ml-0.5 align-middle bg-[#7C22D4] typing-cursor" />
        </p>

        {/* Bio */}
        <p className="text-base text-[#6B6B80] max-w-lg mx-auto leading-relaxed mb-10">
          I build modern web applications with clean design and smooth user experiences.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <button onClick={() => scrollToSection('projects')}
            className="btn-primary px-7 py-3 rounded-lg font-semibold text-sm cursor-pointer">
            View Projects
          </button>
          <button onClick={() => scrollToSection('contact')}
            className="btn-outline px-7 py-3 rounded-lg font-semibold text-sm cursor-pointer">
            Contact Me
          </button>
        </div>

        {/* Social icons */}
        <div className="flex justify-center gap-3">
          {[
            {
              label: 'GitHub', href: 'https://github.com/bhoidhirendra07',
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>,
            },
            {
              label: 'LinkedIn', href: 'https://www.linkedin.com/in/bhoi-dhirendra-475708300/',
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>,
            },
            {
              label: 'Email', href: 'mailto:dhirendrabhoi40@gmail.com',
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
            },
          ].map(({ label, href, icon }) => (
            <a key={label} href={href} target={label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer" aria-label={label} title={label}
              className="w-10 h-10 rounded-lg flex items-center justify-center social-btn">
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll arrow */}
      <button onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 animate-bounce-y cursor-pointer text-[#ABABBB] hover:text-[#7C22D4] transition-colors" aria-label="Scroll">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6,9 12,15 18,9" />
        </svg>
      </button>
    </section>
  );
}
