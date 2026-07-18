import { useEffect, useRef } from 'react';

const SKILL_GROUPS = [
  {
    label: 'Languages',
    items: [
      { name: 'HTML',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'C',          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
      { name: 'C++',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'Java',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'Python',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    ],
  },
  {
    label: 'Libraries & Frameworks',
    items: [
      { name: 'React',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Node.js',   logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express',   logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'EJS',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Tailwind',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Bootstrap', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
      { name: 'MongoDB',   logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    ],
  },
  {
    label: 'Developer Tools',
    items: [
      { name: 'Git',     logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    sectionRef.current?.querySelectorAll('.fade-in-section, .scale-in-section').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 bg-[#EBEBEB]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14 fade-in-section">
          <p className="text-xs font-semibold text-[#7C22D4] tracking-widest uppercase mb-2">What I Know</p>
          <h2 className="text-3xl font-black text-[#1A1A2E] mb-3">Technical Skills</h2>
          <div className="w-10 h-0.5 bg-[#7C22D4] rounded-full" />
          <p className="mt-4 text-[15px] text-[#6B6B80] max-w-md">
            Technologies and tools I use to build modern, scalable applications.
          </p>
        </div>

        <div className="space-y-6">
          {SKILL_GROUPS.map(({ label, items }, gi) => (
            <div key={label}
              className="bg-white rounded-2xl border border-[#D9D9D9] p-6 fade-in-section card-hover"
              style={{ transitionDelay: `${gi * 80}ms` }}>
              {/* Group label */}
              <h3 className="font-bold text-[#1A1A2E] text-base mb-5">{label}</h3>

              {/* Skills grid */}
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-3">
                {items.map(({ name, logo }, si) => (
                  <div key={name}
                    className="scale-in-section flex flex-col items-center gap-1.5 p-2.5 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] skill-chip cursor-default"
                    style={{ transitionDelay: `${(gi * 60) + (si * 30)}ms` }}>
                    <img src={logo} alt={name}
                      className="w-8 h-8 object-contain"
                      onError={(e) => { e.target.style.display = 'none'; }} />
                    <span className="text-xs font-medium text-[#6B6B80] text-center leading-tight">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
