import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const PROJECTS = [
  {
    title: 'KidStyle E-Commerce',
    description: 'Full-stack premium children\'s fashion platform with MongoDB, JWT auth, cart & wishlist.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    gradient: 'from-blue-500 to-violet-500',
    github: 'https://github.com/bhoidhirendra07',
    live: '#',
  },
  {
    title: 'Portfolio Website',
    description: 'Responsive personal portfolio built with MERN stack, featuring smooth animations and dark mode.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Node.js'],
    gradient: 'from-violet-500 to-pink-500',
    github: 'https://github.com/bhoidhirendra07',
    live: '#',
  },
  {
    title: 'Blog Application',
    description: 'Full-stack blog platform with rich text editor, user auth, and comment system.',
    tech: ['React', 'Appwrite', 'Redux', 'TailwindCSS'],
    gradient: 'from-emerald-500 to-teal-500',
    github: 'https://github.com/bhoidhirendra07',
    live: '#',
  },
];

export default function Projects() {
  const { theme } = useTheme();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    const elements = sectionRef.current?.querySelectorAll('.fade-in-section');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 fade-in-section">
          <h2 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Featured Projects
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }} />
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map(({ title, description, tech, gradient, github, live }, index) => (
            <div
              key={title}
              className={`rounded-xl overflow-hidden shadow-md fade-in-section
                transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
                ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Card Image */}
              <div className={`h-44 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {title}
                </h3>
                <p className={`text-sm mb-4 leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tech.map((t) => (
                    <span
                      key={t}
                      className={`text-xs px-2.5 py-1 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={live}
                    className="flex items-center gap-1.5 text-sm text-blue-500 hover:text-violet-500 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15,3 21,3 21,9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </a>
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-blue-500 hover:text-violet-500 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
