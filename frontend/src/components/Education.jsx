import { useEffect, useRef } from 'react';

const EDUCATION = [
  {
    level: 'College',
    institution: 'Silver Oak University',
    degree: 'Bachelor of Computer Applications (BCA)',
    period: '2023 – 2026',
    grade: 'CGPA: 8.40',
    location: 'Ahmedabad, Gujarat',
  },
  {
    level: 'Class IX – XII',
    institution: 'Vidhya Sagar High School',
    degree: 'Higher Secondary (Commerce)',
    period: '2019 – 2023',
    location: 'Ahmedabad, Gujarat',
  },
  {
    level: 'Class I – VIII',
    institution: 'Vidhya Sagar School',
    degree: 'Primary & Middle School',
    period: '2011 – 2019',
    location: 'Ahmedabad, Gujarat',
  },
];

export default function Education() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    sectionRef.current?.querySelectorAll('.fade-in-section, .scale-in-section').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="py-24 bg-[#F5F5F5]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14 fade-in-section">
          <p className="text-xs font-semibold text-[#7C22D4] tracking-widest uppercase mb-2">My Journey</p>
          <h2 className="text-3xl font-black text-[#1A1A2E] mb-3">Education</h2>
          <div className="w-10 h-0.5 bg-[#7C22D4] rounded-full" />
          <p className="mt-4 text-[15px] text-[#6B6B80]">
            My academic journey that shaped my technical foundation.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[22px] top-0 bottom-0 w-px bg-[#D9D9D9] hidden sm:block" />

          <div className="space-y-6">
            {EDUCATION.map(({ level, institution, degree, period, grade, location }, i) => (
              <div key={level}
                className="relative sm:pl-14 scale-in-section"
                style={{ transitionDelay: `${i * 120}ms` }}>

                {/* Dot */}
                <div className="absolute left-4 top-5 w-3.5 h-3.5 rounded-full bg-[#7C22D4] border-2 border-white shadow-sm hidden sm:block" />

                {/* Card — same hover as project cards */}
                <div className="bg-white rounded-2xl border border-[#D9D9D9] p-6 card-hover">
                  {/* Top accent line */}
                  <div className="h-0.5 w-10 bg-[#7C22D4] rounded-full mb-4" />

                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-xs font-semibold text-[#7C22D4] uppercase tracking-wider">{level}</span>
                      <h3 className="font-bold text-[#1A1A2E] text-lg leading-tight mt-0.5">{institution}</h3>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-right">
                      <span className="text-xs font-medium text-[#6B6B80] flex items-center gap-1">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        {period}
                      </span>
                      <span className="text-xs text-[#9CA3AF] flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                        </svg>
                        {location}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-[#6B6B80] mb-1">{degree}</p>
                  <p className="text-sm font-semibold text-[#7C22D4]">{grade}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
