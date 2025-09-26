import React from "react";
import { motion } from "framer-motion";

const easeOutCubic = [0.33, 1, 0.68, 1];

// Variants
const navVariant = {
  hidden: { y: -40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: easeOutCubic } },
};

const heroTitleVariant = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.7, ease: easeOutCubic } },
};
const heroSubVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: easeOutCubic, delay: 0.2 } },
};

const cardVariant = (delay = 0) => ({
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: easeOutCubic, delay } },
});

const storyImageVariant = {
  hidden: { scale: 1.1, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.7, ease: easeOutCubic } },
};
const storyTextVariant = {
  hidden: { x: 50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: easeOutCubic, delay: 0.2 } },
};

const valuesContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const valueItem = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: easeOutCubic } },
};

const timelineItem = (delay = 0) => ({
  hidden: { x: -40, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: easeOutCubic, delay } },
});
const circleBounce = (delay = 0) => ({
  hidden: { scale: 0.8 },
  visible: { scale: [0.8, 1.1, 1], transition: { duration: 0.4, ease: easeOutCubic, delay } },
});

const footerVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: easeOutCubic } },
};

export default function AboutUsPage() {
  return (
    <div style={{ fontFamily: "Poppins, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, sans-serif" }} className="text-slate-900">
      {/* Navbar */}
      <motion.nav
        variants={navVariant}
        initial="hidden"
        animate="visible"
        className="sticky top-0 z-50 h-16 bg-white border-b border-slate-200"
        aria-label="Primary"
      >
        <div className="mx-auto max-w-6xl h-full flex items-center justify-between px-4">
          <a href="#" className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E73BE] rounded" aria-label="NIKUL PHARMA Home">
            <span aria-hidden className="inline-flex items-center justify-center w-7 h-7 rounded-full" style={{ backgroundColor: "#1E73BE" }}>
              <span className="text-white text-sm font-semibold">N</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            {[
              { label: "Home", active: false },
              { label: "Our Machine", active: false },
              { label: "About Us", active: true },
              { label: "Contact Us", active: false },
            ].map((item) => (
              <a
                key={item.label}
                href="#"
                className={`relative text-sm transition-colors ease-out ${item.active ? "text-[#0D2240] font-semibold" : "text-slate-600 hover:text-[#0D2240]"} focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E73BE] rounded`}
                aria-current={item.active ? "page" : undefined}
              >
                {item.label}
                <span
                  aria-hidden
                  className={`absolute left-0 -bottom-1 h-0.5 bg-[#0D2240] transition-all ${item.active ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <header className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#EEF6FF] to-white" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 pt-24 pb-12 text-center">
          <motion.h1
            variants={heroTitleVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight"
          >
            About NIKUL PHARMA
          </motion.h1>
          <motion.p
            variants={heroSubVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="mx-auto max-w-3xl mt-4 text-lg text-slate-600"
          >
            Pioneering pharmaceutical manufacturing excellence through innovative technology and unwavering commitment to quality.
          </motion.p>
        </div>
      </header>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-6xl px-4 py-12" aria-labelledby="mission-vision">
        <h2 id="mission-vision" className="sr-only">Mission and Vision</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.article
            variants={cardVariant(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            className="bg-white border border-[#E6EEF6] rounded-[12px] shadow-[0_6px_16px_rgba(13,34,64,0.08)] p-6 transition-transform duration-200 hover:-translate-y-1.5"
            aria-labelledby="mission-title"
          >
            <h3 id="mission-title" className="text-2xl font-bold mb-3">Our Mission</h3>
            <ul className="list-disc pl-6 text-slate-700">
              <li>Empower pharmaceutical companies to scale safely and efficiently.</li>
              <li>Deliver cutting-edge manufacturing solutions that elevate quality.</li>
              <li>Ensure patient safety through rigorous standards and validation.</li>
              <li>Enable consistent, high-yield production with minimal downtime.</li>
            </ul>
          </motion.article>
          <motion.article
            variants={cardVariant(0.4)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            className="bg-white border border-[#E6EEF6] rounded-[12px] shadow-[0_6px_16px_rgba(13,34,64,0.08)] p-6 transition-transform duration-200 hover:-translate-y-1.5"
            aria-labelledby="vision-title"
          >
            <h3 id="vision-title" className="text-2xl font-bold mb-3">Our Vision</h3>
            <p className="text-slate-700">
              To be the global leader in pharmaceutical engineering—setting industry standards, advancing research, and delivering life‑saving medications with precision and care.
            </p>
          </motion.article>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12" aria-labelledby="story-heading">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-8">
            <h2 id="story-heading" className="text-4xl font-bold">Our Story</h2>
            <p className="mx-auto mt-3 max-w-3xl text-slate-700">
              Founded with a passion for innovation and a commitment to excellence, NIKUL PHARMA has grown from a small startup to a trusted partner for pharmaceutical companies worldwide.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              variants={storyImageVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              className="rounded-[12px] border border-dashed border-slate-300 min-h-[260px] flex items-center justify-center bg-[#EEF6FF] text-slate-600 font-semibold"
              role="img"
              aria-label="Company Story image"
            >
              Company Story image
            </motion.div>
            <motion.div
              variants={storyTextVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              className="text-slate-700"
            >
              <p className="mb-3">
                From our earliest days, our team of engineers and scientists has focused on building systems that combine reliability with elegance. We invest in deep research, meticulous testing, and continuous improvement to ensure every solution exceeds expectations.
              </p>
              <p>
                Today, with manufacturing facilities and partners across the globe, we collaborate closely with pharmaceutical leaders to deliver improved medications faster, with uncompromising quality—ultimately helping to save lives.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-12" aria-labelledby="values-heading">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="values-heading" className="text-4xl font-bold text-center">Our Values</h2>
          <motion.div
            variants={valuesContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {/* Innovation */}
            <motion.div variants={valueItem} className="bg-white border border-[#E6EEF6] rounded-[12px] shadow-[0_6px_16px_rgba(13,34,64,0.08)] p-6 text-center transition-transform duration-200 hover:-translate-y-1">
              <div className="mx-auto mb-3 inline-flex items-center justify-center rounded-full bg-[#EEF6FF] p-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M9 18h6M10 22h4" stroke="#1E73BE" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M12 2a7 7 0 0 0-4 12c.6.6 1 1.3 1 2h6c0-.7.4-1.4 1-2A7 7 0 0 0 12 2Z" stroke="#1E73BE" strokeWidth="1.6" />
                </svg>
              </div>
              <h3 className="text-sm font-bold mb-1">Innovation</h3>
              <p className="text-slate-600 text-sm">We push boundaries to engineer better outcomes.</p>
            </motion.div>
            {/* Quality */}
            <motion.div variants={valueItem} className="bg-white border border-[#E6EEF6] rounded-[12px] shadow-[0_6px_16px_rgba(13,34,64,0.08)] p-6 text-center transition-transform duration-200 hover:-translate-y-1">
              <div className="mx-auto mb-3 inline-flex items-center justify-center rounded-full bg-[#EEF6FF] p-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.8 6.5 20.2l1-6.2L3 9.6l6.2-.9L12 3Z" stroke="#1E73BE" strokeWidth="1.6" />
                </svg>
              </div>
              <h3 className="text-sm font-bold mb-1">Quality</h3>
              <p className="text-slate-600 text-sm">Every detail is audited to meet strict standards.</p>
            </motion.div>
            {/* Trust */}
            <motion.div variants={valueItem} className="bg-white border border-[#E6EEF6] rounded-[12px] shadow-[0_6px_16px_rgba(13,34,64,0.08)] p-6 text-center transition-transform duration-200 hover:-translate-y-1">
              <div className="mx-auto mb-3 inline-flex items-center justify-center rounded-full bg-[#EEF6FF] p-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 12l4-4m14 4-4-4M7 8l5 5a3 3 0 0 0 4 0l1-1" stroke="#1E73BE" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M2 12a5 5 0 0 0 5 5h1m14-5a5 5 0 0 1-5 5h-1" stroke="#1E73BE" strokeWidth="1.6" />
                </svg>
              </div>
              <h3 className="text-sm font-bold mb-1">Trust</h3>
              <p className="text-slate-600 text-sm">Built on transparency, reliability, and support.</p>
            </motion.div>
            {/* Excellence */}
            <motion.div variants={valueItem} className="bg-white border border-[#E6EEF6] rounded-[12px] shadow-[0_6px_16px_rgba(13,34,64,0.08)] p-6 text-center transition-transform duration-200 hover:-translate-y-1">
              <div className="mx-auto mb-3 inline-flex items-center justify-center rounded-full bg-[#EEF6FF] p-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M8 21h8M10 17h4M12 3v6a4 4 0 0 0 4 4h1a4 4 0 0 0 4-4V6h-4M12 3v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V6h4" stroke="#1E73BE" strokeWidth="1.6" />
                </svg>
              </div>
              <h3 className="text-sm font-bold mb-1">Excellence</h3>
              <p className="text-slate-600 text-sm">We hold ourselves to world-class outcomes.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12" aria-labelledby="journey-heading">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="journey-heading" className="text-4xl font-bold text-center">Our Journey</h2>
          <div className="mt-8 border-l-2 border-slate-200 pl-5">
            {/* 2018 */}
            <motion.div variants={timelineItem(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="mb-6 flex items-start gap-4">
              <motion.div variants={circleBounce(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="w-9 h-9 rounded-full bg-[#1E73BE] text-white font-bold flex items-center justify-center shadow-[0_6px_16px_rgba(13,34,64,0.08)]" aria-hidden>18</motion.div>
              <div>
                <h3 className="font-semibold text-[#0D2240]">2018 — International Expansion</h3>
                <p className="text-slate-600">Expanded operations to serve pharmaceutical companies globally.</p>
              </div>
            </motion.div>
            {/* 2020 */}
            <motion.div variants={timelineItem(0.5)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="mb-6 flex items-start gap-4">
              <motion.div variants={circleBounce(0.5)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="w-9 h-9 rounded-full bg-[#1E73BE] text-white font-bold flex items-center justify-center shadow-[0_6px_16px_rgba(13,34,64,0.08)]" aria-hidden>20</motion.div>
              <div>
                <h3 className="font-semibold text-[#0D2240]">2020 — ANFD Lab Model</h3>
                <p className="text-slate-600">Introduced the industry-leading ANFD Lab Model for research facilities.</p>
              </div>
            </motion.div>
            {/* 2025 */}
            <motion.div variants={timelineItem(0.8)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="mb-6 flex items-start gap-4">
              <motion.div variants={circleBounce(0.8)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="w-9 h-9 rounded-full bg-[#1E73BE] text-white font-bold flex items-center justify-center shadow-[0_6px_16px_rgba(13,34,64,0.08)]" aria-hidden>25</motion.div>
              <div>
                <h3 className="font-semibold text-[#0D2240]">2025 — Continued Growth</h3>
                <p className="text-slate-600">Leading the industry with cutting-edge pharmaceutical manufacturing solutions.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer variants={footerVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-[#0D2240] text-white py-6 text-center" role="contentinfo">
        <div className="mx-auto max-w-6xl px-4">
          <small>© 2025 NIKUL PHARMA. All rights reserved.</small>
        </div>
      </motion.footer>
    </div>
  );
}



