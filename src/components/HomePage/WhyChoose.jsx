import React, { useCallback } from "react";
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

  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = -((y - rect.height / 2) / rect.height) * 12;
    const ry = ((x - rect.width / 2) / rect.width) * 12;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    const glow = card.querySelector('[data-glow]');
    if (glow) glow.style.opacity = '1';
  }, []);

  const handleMouseLeave = useCallback((e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    const glow = card.querySelector('[data-glow]');
    if (glow) glow.style.opacity = '0';
  }, []);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-blue-50/30"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1E73BE]/10 text-[#1E73BE] rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-[#1E73BE] rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold">Why Choose Us</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Why Choose <span className="bg-gradient-to-r from-[#1E73BE] to-[#0D4A8A] bg-clip-text text-transparent">Nikul Pharma</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We combine decades of expertise with cutting-edge technology to deliver pharmaceutical equipment solutions that exceed expectations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((it, idx) => (
            <div
              key={idx}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="group relative bg-white rounded-3xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 will-change-transform hover:scale-105"
              style={{ 
                transformStyle: 'preserve-3d', 
                animation: `fadeInUp 0.8s ease forwards`, 
                animationDelay: `${idx * 150}ms`, 
                opacity: 0 
              }}
            >
              {/* Glow Effect */}
              <div 
                className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                data-glow 
                style={{ 
                  boxShadow: '0 0 40px rgba(37,99,235,0.3)', 
                  background: 'linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(59,130,246,0.1) 100%)'
                }} 
              />
              
              {/* Icon */}
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#1E73BE] to-[#0D4A8A] text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {it.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 text-center mb-4 group-hover:text-[#1E73BE] transition-colors duration-300">
                  {it.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {it.desc}
                </p>
                
                {/* Hover Indicator */}
                <div className="mt-6 flex justify-center">
                  <div className="w-8 h-1 bg-gradient-to-r from-[#1E73BE] to-[#0D4A8A] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-[#1E73BE] to-[#0D4A8A] rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join hundreds of pharmaceutical companies who trust Nikul Pharma for their equipment needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/products"
                  className="inline-flex items-center justify-center bg-white text-[#1E73BE] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
                  aria-label="View our products"
                >
                  View Our Products
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-colors duration-300 border border-white/30"
                  aria-label="Get in touch with us"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
