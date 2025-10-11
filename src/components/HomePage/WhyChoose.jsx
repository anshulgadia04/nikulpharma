import { Award, Users, Globe, Wrench } from "lucide-react";

export function WhyChoose() {
  const items = [
    {
      icon: <Award className="w-7 h-7" />,
      title: "ISO Certified Quality",
      desc:
        "All equipment manufactured under ISO 9001:2015 quality management systems",
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Expert Engineering",
      desc:
        "25+ years of experience in pharmaceutical equipment design and manufacturing",
    },
    {
      icon: <Globe className="w-7 h-7" />,
      title: "Global Reach",
      desc:
        "Serving clients across 30+ countries with reliable equipment solutions",
    },
    {
      icon: <Wrench className="w-7 h-7" />,
      title: "Complete Support",
      desc:
        "From design consultation to installation and after‑sales support",
    },
  ];

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = -((y - rect.height / 2) / rect.height) * 12;
    const ry = ((x - rect.width / 2) / rect.width) * 12;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    const glow = card.querySelector('[data-glow]');
    if (glow) glow.style.opacity = '1';
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    const glow = card.querySelector('[data-glow]');
    if (glow) glow.style.opacity = '0';
  };

  return (
    <section className="py-20 bg-gray-50">
      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">Why Choose Nikul Pharma?</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, idx) => (
            <div
              key={idx}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-[transform,box-shadow] duration-300 will-change-transform"
              style={{ transformStyle: 'preserve-3d', animation: 'slideUpFade 700ms ease forwards', animationDelay: `${idx * 120}ms`, opacity: 0 }}
            >
              <div className="absolute inset-0 rounded-3xl pointer-events-none" data-glow style={{ boxShadow: '0 0 0 0 rgba(37,99,235,0.35)', opacity: 0, transition: 'opacity 300ms' }} />
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center mb-5" style={{ transform: 'translateZ(38px)' }}>
                {it.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-3" style={{ transform: 'translateZ(26px)' }}>
                {it.title}
              </h3>
              <p className="text-gray-600 text-center text-sm leading-relaxed" style={{ transform: 'translateZ(18px)' }}>
                {it.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
