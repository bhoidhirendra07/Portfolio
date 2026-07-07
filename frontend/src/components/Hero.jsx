import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const TYPING_TEXTS = [
  'Full-Stack Developer',
  'Creative Problem Solver',
  'Digital Innovation Expert',
  'User Experience Advocate',
];

function useTypingEffect(texts, speed = 80) {
  const [displayed, setDisplayed] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    let delay = speed;

    if (isDeleting) {
      delay = speed / 2;
    }
    if (!isDeleting && charIndex === current.length) {
      delay = 2000;
    } else if (isDeleting && charIndex === 0) {
      delay = 500;
    }

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex === current.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      } else {
        setCharIndex((prev) => isDeleting ? prev - 1 : prev + 1);
        setDisplayed(current.substring(0, isDeleting ? charIndex - 1 : charIndex + 1));
      }
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
  const { theme } = useTheme();
  const typedText = useTypingEffect(TYPING_TEXTS);
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 200);
    }
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: theme === 'dark'
          ? 'linear-gradient(135deg, #1f2937 0%, #3730a3 50%, #7c3aed 100%)'
          : 'linear-gradient(135deg, #3246a3 0%, #660fbd 100%)',
      }}
    >
      {/* Floating background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full opacity-20 blur-[60px] animate-float"
          style={{
            width: '20rem', height: '20rem',
            background: '#8b5cf6',
            top: '-10rem', right: '-10rem',
          }}
        />
        <div
          className="absolute rounded-full opacity-20 blur-[60px] animate-float-delayed"
          style={{
            width: '20rem', height: '20rem',
            background: '#3b82f6',
            bottom: '-10rem', left: '-10rem',
          }}
        />
      </div>

      {/* Hero Content */}
      <div
        ref={contentRef}
        className="text-center z-10 max-w-4xl mx-auto px-4"
        style={{
          opacity: 0,
          transform: 'translateY(2rem)',
          transition: 'all 0.8s ease-out',
        }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
          Hi, I&apos;m{' '}
          <span className="gradient-text">Dhirendra Bhoi</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-white/90 min-h-[2rem]">
          {typedText}
          <span className="inline-block w-0.5 h-6 bg-white/80 ml-1 align-middle animate-pulse" />
        </p>

        <p className="text-lg mb-12 max-w-xl mx-auto text-white/80 leading-relaxed">
          I create beautiful, functional, and user-centered digital experiences that make a difference.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => scrollToSection('projects')}
            className="px-8 py-3 rounded-lg font-semibold text-white cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-xl"
            style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }}
          >
            View My Work
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-8 py-3 rounded-lg font-semibold text-white cursor-pointer transition-all duration-150
              border-2 border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white/50"
          >
            Get In Touch
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4">
          {/* GitHub */}
          <a
            href="https://github.com/bhoidhirendra07"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 text-white/80
              hover:bg-white/20 hover:text-white hover:scale-110 transition-all duration-150 backdrop-blur-md"
            aria-label="GitHub"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/bhoi-dhirendra-475708300/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 text-white/80
              hover:bg-white/20 hover:text-white hover:scale-110 transition-all duration-150 backdrop-blur-md"
            aria-label="LinkedIn"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          {/* Email */}
          <a
            href="mailto:dhirendrabhoi40@gmail.com"
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 text-white/80
              hover:bg-white/20 hover:text-white hover:scale-110 transition-all duration-150 backdrop-blur-md"
            aria-label="Email"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 text-white/70 hover:text-white animate-bounce-y cursor-pointer transition-colors"
        style={{ transform: 'translateX(-50%)' }}
        aria-label="Scroll down"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6,9 12,15 18,9" />
        </svg>
      </button>
    </section>
  );
}
