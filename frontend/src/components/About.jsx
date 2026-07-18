import { useEffect, useRef, useState } from "react";

const STATS = [
  { number: "10+", label: "Projects Built" },
  { number: "3+",  label: "Years Coding" },
  { number: "100%",label: "Passion" },
];

function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const num = parseFloat(target);
        const steps = 36;
        let step = 0;
        const timer = setInterval(() => {
          step++;
          const eased = 1 - Math.pow(1 - step / steps, 3);
          setCount(Number.isInteger(num) ? Math.round(eased * num) : Math.round(eased * num * 10) / 10);
          if (step >= steps) clearInterval(timer);
        }, 1200 / steps);
      }
    }, { threshold: 0.5 });
    if (node) observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    sectionRef.current?.querySelectorAll(".fade-in-section, .fade-in-left, .fade-in-right, .scale-in-section").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-[#F5F5F5]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14 fade-in-section">
          <p className="text-xs font-semibold text-[#7C22D4] tracking-widest uppercase mb-2">Who I Am</p>
          <h2 className="text-3xl font-black text-[#1A1A2E] mb-3">About Me</h2>
          <div className="w-10 h-0.5 bg-[#7C22D4] rounded-full" />
        </div>

        <div className="grid md:grid-cols-5 gap-10 items-center">
          {/* Bio */}
          <div className="md:col-span-3 fade-in-left space-y-4">
            <h3 className="text-xl font-bold text-[#1A1A2E] leading-snug">
              Passionate Developer &amp; Problem Solver
            </h3>

            <p className="text-[15px] leading-relaxed text-[#4A4A5A]">
              I'm <strong className="text-[#1A1A2E] font-semibold">Dhirendra Bhoi</strong>, a MERN Stack Developer who
              enjoys building modern web applications that are both visually appealing and easy to use.
              I love solving problems through code and turning ideas into meaningful digital experiences.
            </p>

            <p className="text-[15px] leading-relaxed text-[#4A4A5A]">
              With experience in React.js, Node.js, Express.js, MongoDB, SQL, and modern frontend
              technologies like Tailwind CSS and Bootstrap, I focus on creating clean, scalable, and
              user-friendly applications while continuously improving my skills and exploring new technologies.
            </p>

            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 pt-1">
              {['Clean & Scalable Code', 'Modern UI/UX Focus', 'Full-Stack Expertise', 'Continuous Learner'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-[#4A4A5A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C22D4] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <div className="md:col-span-2 fade-in-right">
            <div className="bg-white rounded-2xl border border-[#D9D9D9] overflow-hidden">
              {STATS.map(({ number, label }, i) => {
                const num = number.replace(/[^0-9.]/g, "");
                const suf = number.replace(/[0-9.]/g, "");
                return (
                  <div key={label}
                    className={`scale-in-section px-6 py-5 flex items-center justify-between ${i < STATS.length - 1 ? 'border-b border-[#F0F0F0]' : ''}`}
                    style={{ transitionDelay: `${i * 80}ms` }}>
                    <div className="text-sm text-[#6B6B80] font-medium">{label}</div>
                    <div className="text-2xl font-black text-[#7C22D4] leading-none">
                      <Counter target={num} suffix={suf} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
