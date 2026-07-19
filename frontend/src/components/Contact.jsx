import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import toast from 'react-hot-toast';

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const SOCIAL_LINKS = [
  {
    label: 'Email', href: 'mailto:dhirendrabhoi40@gmail.com',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  },
  {
    label: 'GitHub', href: 'https://github.com/bhoidhirendra07',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>,
  },
  {
    label: 'LinkedIn', href: 'https://www.linkedin.com/in/bhoi-dhirendra-475708300/',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>,
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [form, setForm] = useState({ from_name: '', from_email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    sectionRef.current?.querySelectorAll('.fade-in-section, .fade-in-left, .fade-in-right').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.from_name.trim()) e.from_name = 'Name is required';
    if (!form.from_email.trim()) e.from_email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.from_email)) e.from_email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, { publicKey: EMAILJS_PUBLIC_KEY });
      axios.post('/api/contact', { name: form.from_name, email: form.from_email, message: form.message }).catch(() => {});
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ from_name: '', from_email: '', message: '' });
      setErrors({});
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = (field) =>
    `w-full px-4 py-3 rounded-xl border text-sm outline-none bg-white text-[#1A1A2E] placeholder-[#ABABBB]
     transition-colors duration-150
     ${errors[field]
       ? 'border-red-400 focus:border-red-400'
       : 'border-[#D9D9D9] focus:border-[#7C22D4]'}`;

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-[#1A1A2E]">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14 fade-in-section">
          <p className="text-xs font-semibold text-[#C4B5FD] tracking-widest uppercase mb-2">Say Hello</p>
          <h2 className="text-3xl font-black text-white mb-3">Get In Touch</h2>
          <div className="w-10 h-0.5 bg-[#7C22D4] rounded-full" />
          <p className="mt-4 text-[15px] text-[#9CA3AF] max-w-md">
            Let's discuss your next project or just say hello!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left — info + links */}
          <div className="fade-in-left space-y-8">
            <div>
              <h3 className="text-3xl font-black text-white mb-3">Let's Connect</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">
                I'm always open to new opportunities and interesting conversations.
                Whether it's a project idea or just a hello — I'd love to hear from you.
              </p>
            </div>

            {/* Contact info rows */}
            <div className="space-y-3">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a key={label} href={href}
                  target={label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/8 bg-white/4
                    hover:bg-white/8 hover:border-[#7C22D4]/40 transition-all duration-200 group">
                  <div className="w-10 h-10 rounded-lg bg-white/8 flex items-center justify-center
                    text-[#9CA3AF] group-hover:text-[#7C22D4] group-hover:bg-[#7C22D4]/12
                    transition-all duration-200 shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#6B7280] mb-0.5">{label}</p>
                    <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                      {label === 'Email' ? 'dhirendrabhoi40@gmail.com'
                        : label === 'GitHub' ? 'github.com/bhoidhirendra07'
                        : 'linkedin.com/in/bhoi-dhirendra'}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} noValidate
            className="fade-in-right bg-[#F5F5F5] rounded-2xl p-7 space-y-4">
            <div>
              <input id="from_name" type="text" name="from_name" value={form.from_name} onChange={handleChange} required autoComplete='off'
                placeholder="Your Name" className={inputCls('from_name')} />
              {errors.from_name && <p className="text-red-500 text-xs mt-1">{errors.from_name}</p>}
            </div>
            <div>
              <input id="from_email" type="email" name="from_email" value={form.from_email} onChange={handleChange} required autoComplete='off'
                placeholder="Your Email" className={inputCls('from_email')} />
              {errors.from_email && <p className="text-red-500 text-xs mt-1">{errors.from_email}</p>}
            </div>
            <div>
              <textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange} required autoComplete='off'
                placeholder="Your Message" className={`${inputCls('message')} resize-none`} />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white btn-primary disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Sending…
                </span>
              ) : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
