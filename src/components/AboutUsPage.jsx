import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import heroBg from "../../imges/category/Screenshot 2025-09-26 144329.png";

const easeOutCubic = [0.33, 1, 0.68, 1];

// Variants
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

// --- New Milestones Data ---
const milestones = [
  {
    year: "1995",
    title: "Foundation",
    description:
      "NIKUL Pharma was established with a vision to revolutionize pharmaceutical manufacturing through precision engineering.",
  },
  {
    year: "2003",
    title: "First Innovation",
    description:
      "Launched our breakthrough tablet compression technology, setting new industry standards for efficiency and precision.",
  },
  {
    year: "2010",
    title: "Global Expansion",
    description:
      "Expanded operations internationally, bringing cutting-edge pharmaceutical machinery to markets across three continents.",
  },
  {
    year: "2018",
    title: "Industry 4.0",
    description:
      "Pioneered smart manufacturing solutions with IoT integration and predictive maintenance capabilities.",
  },
  {
    year: "2023",
    title: "AI Integration",
    description:
      "Introduced AI-powered quality inspection systems, revolutionizing pharmaceutical production quality control.",
  },
];

export default function AboutUsPage() {
  return (
    <div className="text-slate-900">
      {/* Spacer for fixed header height */}
      <div className="h-16 sm:h-20 lg:h-24" />

      {/* Hero */}
      <header className="relative">
        <div
          className="absolute inset-0 rounded-b-[3rem] overflow-hidden"
          aria-hidden
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/40 rounded-b-[3rem]" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 lg:pt-56 pb-32 sm:pb-40 lg:pb-48 text-center text-white">
          <motion.h1
            variants={heroTitleVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            About NIKUL PHARMA
          </motion.h1>
          <motion.p
            variants={heroSubVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
            className="mx-auto max-w-3xl mt-3 sm:mt-4 text-base sm:text-lg text-slate-100"
          >
            Pioneering pharmaceutical manufacturing excellence through innovative technology and unwavering commitment to quality.
          </motion.p>
        </div>
      </header>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12" aria-labelledby="mission-vision">
        <h2 id="mission-vision" className="sr-only">
          Mission and Vision
        </h2>
        <div className="grid md:grid-cols-2 gap-16">
            <motion.article
              variants={cardVariant(0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-15%" }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(13,34,64,0.15)",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-white border border-[#E6EEF6] rounded-[12px] shadow-[0_6px_16px_rgba(13,34,64,0.08)] p-6 transition-all duration-300 hover:border-[#1E73BE]/20 cursor-pointer"
              aria-labelledby="mission-title"
            >
            <h3
              id="mission-title"
              className="text-2xl font-bold mb-3"
            >
              Our Mission
            </h3>
            <ul
              className="list-disc pl-6 text-slate-700"
            >
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
              viewport={{ once: false, margin: "-15%" }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(13,34,64,0.15)",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-white border border-[#E6EEF6] rounded-[12px] shadow-[0_6px_16px_rgba(13,34,64,0.08)] p-6 transition-all duration-300 hover:border-[#1E73BE]/20 cursor-pointer"
              aria-labelledby="vision-title"
            >
            <h3
              id="vision-title"
              className="text-2xl font-bold mb-3"
            >
              Our Vision
            </h3>
            <ul
              className="list-disc pl-6 text-slate-700"
            >
              <li>Become the world's most trusted name in pharmaceutical engineering.</li>
              <li>Set and continuously raise the benchmarks for innovation, quality, and safety.</li>
              <li>Pioneer breakthrough technologies that transform pharmaceutical manufacturing.</li>
              <li>Enable faster, more affordable, and life-saving medicines to reach patients worldwide.</li>
              <li>Advance eco-friendly practices to safeguard health and the environment.</li>
              <li>Drive sustainability and long-term growth through responsible operations.</li>
            </ul>
          </motion.article>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12" aria-labelledby="story-heading">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-8">
            <h2
              id="story-heading"
              className="text-4xl font-bold"
            >
              Our Story
            </h2>
            <p
              className="mx-auto mt-3 max-w-3xl text-slate-700"
            >
              Founded with a passion for innovation and a commitment to excellence, NIKUL PHARMA has grown from a small startup to a trusted partner for pharmaceutical companies worldwide.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              variants={storyImageVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-10%" }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 12px 24px rgba(13,34,64,0.12)",
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="rounded-[12px] border border-dashed border-slate-300 min-h-[260px] flex items-center justify-center bg-[#EEF6FF] text-slate-600 font-semibold transition-all duration-300 hover:border-[#1E73BE]/40 cursor-pointer"
              role="img"
              aria-label="Company Story image"
            >
              Company Story image
            </motion.div>
            <motion.div
              variants={storyTextVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-10%" }}
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
          <h2
            id="values-heading"
            className="text-4xl font-bold text-center"
          >
            Our Values
          </h2>
          <motion.div
            variants={valuesContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-10%" }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {/* Innovation */}
            <motion.div
              variants={valueItem}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(13,34,64,0.15)",
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="bg-white border border-[#E6EEF6] rounded-[12px] shadow-[0_6px_16px_rgba(13,34,64,0.08)] p-6 text-center transition-all duration-300 hover:border-[#1E73BE]/20 cursor-pointer group"
            >
              <div className="mx-auto mb-3 inline-flex items-center justify-center rounded-full bg-[#EEF6FF] p-4 group-hover:bg-[#1E73BE]/10 transition-colors duration-300">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M9 18h6M10 22h4" stroke="#1E73BE" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M12 2a7 7 0 0 0-4 12c.6.6 1 1.3 1 2h6c0-.7.4-1.4 1-2A7 7 0 0 0 12 2Z" stroke="#1E73BE" strokeWidth="1.6" />
                </svg>
              </div>
              <h3 className="text-sm font-bold mb-1">
                Innovation
              </h3>
              <p className="text-slate-600 text-sm">
                We push boundaries to engineer better outcomes.
              </p>
            </motion.div>
            {/* Quality */}
            <motion.div
              variants={valueItem}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(13,34,64,0.15)",
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="bg-white border border-[#E6EEF6] rounded-[12px] shadow-[0_6px_16px_rgba(13,34,64,0.08)] p-6 text-center transition-all duration-300 hover:border-[#1E73BE]/20 cursor-pointer group"
            >
              <div className="mx-auto mb-3 inline-flex items-center justify-center rounded-full bg-[#EEF6FF] p-4 group-hover:bg-[#1E73BE]/10 transition-colors duration-300">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.8 6.5 20.2l1-6.2L3 9.6l6.2-.9L12 3Z" stroke="#1E73BE" strokeWidth="1.6" />
                </svg>
              </div>
              <h3 className="text-sm font-bold mb-1">
                Quality
              </h3>
              <p className="text-slate-600 text-sm">
                Every detail is audited to meet strict standards.
              </p>
            </motion.div>
            {/* Trust */}
            <motion.div
              variants={valueItem}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(13,34,64,0.15)",
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="bg-white border border-[#E6EEF6] rounded-[12px] shadow-[0_6px_16px_rgba(13,34,64,0.08)] p-6 text-center transition-all duration-300 hover:border-[#1E73BE]/20 cursor-pointer group"
            >
              <div className="mx-auto mb-3 inline-flex items-center justify-center rounded-full bg-[#EEF6FF] p-4 group-hover:bg-[#1E73BE]/10 transition-colors duration-300">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 12l4-4m14 4-4-4M7 8l5 5a3 3 0 0 0 4 0l1-1" stroke="#1E73BE" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M2 12a5 5 0 0 0 5 5h1m14-5a5 5 0 0 1-5 5h-1" stroke="#1E73BE" strokeWidth="1.6" />
                </svg>
              </div>
              <h3 className="text-sm font-bold mb-1">
                Trust
              </h3>
              <p className="text-slate-600 text-sm">
                Built on transparency, reliability, and support.
              </p>
            </motion.div>
            {/* Excellence */}
            <motion.div
              variants={valueItem}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(13,34,64,0.15)",
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="bg-white border border-[#E6EEF6] rounded-[12px] shadow-[0_6px_16px_rgba(13,34,64,0.08)] p-6 text-center transition-all duration-300 hover:border-[#1E73BE]/20 cursor-pointer group"
            >
              <div className="mx-auto mb-3 inline-flex items-center justify-center rounded-full bg-[#EEF6FF] p-4 group-hover:bg-[#1E73BE]/10 transition-colors duration-300">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M8 21h8M10 17h4M12 3v6a4 4 0 0 0 4 4h1a4 4 0 0 0 4-4V6h-4M12 3v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V6h4" stroke="#1E73BE" strokeWidth="1.6" />
                </svg>
              </div>
              <h3 className="text-sm font-bold mb-1">
                Excellence
              </h3>
              <p className="text-slate-600 text-sm">
                We hold ourselves to world-class outcomes.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ✅ Our Journey Section with Fixed Hover */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Our <span className="text-[#1E73BE]">Journey</span>
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              A timeline of innovation, growth, and technological breakthroughs that have shaped the pharmaceutical manufacturing industry.
            </p>
          </motion.div>

          <div className="relative">
            {/* Animated Timeline Line */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#1E73BE] origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              viewport={{ once: false }}
              style={{ height: "100%" }}
            />
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#EEF6FF] h-full"></div>

            {milestones.map((milestone, index) => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: false, margin: "-20%" });

              return (
                <motion.div
                  key={milestone.year}
                  ref={ref}
                  className={`relative flex items-center mb-16 ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                    <motion.div
                      whileHover={{
                        y: -6,
                        scale: 1.02,
                        boxShadow: "0 16px 32px rgba(13,34,64,0.15)",
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className={`p-8 bg-white shadow-[0_6px_16px_rgba(13,34,64,0.08)] rounded-[12px] border border-[#E6EEF6] ${
                        index % 2 === 0 ? "ml-auto" : "mr-auto"
                      } transition-all duration-300 hover:border-[#1E73BE]/40 cursor-pointer`}
                    >
                      <motion.div
                        className="text-2xl font-bold text-[#1E73BE] mb-2"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                      >
                        {milestone.year}
                      </motion.div>
                      <motion.h3
                        className="text-xl font-bold text-gray-900 mb-3"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.4, delay: index * 0.2 + 0.4 }}
                      >
                        {milestone.title}
                      </motion.h3>
                      <motion.p
                        className="text-slate-600 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.4, delay: index * 0.2 + 0.5 }}
                      >
                        {milestone.description}
                      </motion.p>
                    </motion.div>
                  </div>

                  {/* Marker */}
                  <motion.div
                    className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#1E73BE] rounded-full border-4 border-white shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.2 + 0.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{
                      scale: 1.2,
                      boxShadow: "0 0 20px rgba(30, 115, 190, 0.5)",
                    }}
                  />

                  {/* Ripple */}
                  <motion.div
                    className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#1E73BE] rounded-full opacity-30"
                    initial={{ scale: 1 }}
                    animate={
                      isInView
                        ? { scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      delay: index * 0.2 + 0.7,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
