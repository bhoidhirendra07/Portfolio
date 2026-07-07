import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const STATS = [
  { number: '10+', label: 'Projects Completed' },
  { number: '2+',  label: 'Years Experience' },
];

export default function About() {
  const { theme } = useTheme();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
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
      id="about"
      ref={sectionRef}
      className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-section">
          <h2 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            About Me
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }} />
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image Placeholder */}
          <div className="flex justify-center fade-in-section">
            <div
              className="w-72 h-72 rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105 cursor-default"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}
            >
              {/* Decorative inner pattern */}
              <div className="w-full h-full rounded-2xl flex items-center justify-center">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="fade-in-section">
            <h3 className={`text-2xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Passionate Developer
            </h3>
            <p className={`text-lg mb-5 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              With over two years of hands-on experience in web development,
              I build digital solutions that balance clean design with reliable, user-focused functionality.
            </p>
            <p className={`text-lg mb-8 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              I continuously follow the latest technologies and industry practices
              to create user experiences that consistently exceed expectations.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ number, label }) => (
                <div
                  key={label}
                  className={`p-5 rounded-xl text-center shadow-md transition-transform duration-150 hover:-translate-y-1
                    ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}
                >
                  <div className="text-3xl font-bold text-blue-500 mb-1">{number}</div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
