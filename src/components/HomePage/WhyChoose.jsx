import React, { useCallback, useMemo, useState } from "react";
import { Award, Users, Globe, Wrench, ArrowRight, Sparkles } from "lucide-react";

// Feature Card Component
const FeatureCard = React.memo(({ item, index, onMouseMove, onMouseLeave }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeaveLocal = useCallback((e) => {
    setIsHovered(false);
    onMouseLeave(e);
  }, [onMouseLeave]);

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeaveLocal}
      className="group relative bg-white rounded-3xl border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
      style={{ 
        transformStyle: 'preserve-3d', 
        animation: `fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards`, 
        animationDelay: `${index * 150}ms`, 
        opacity: 0,
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease'
      }}
    >
      {/* Glow Effect */}
      <div 
        className={`absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        data-glow 
        style={{ 
          boxShadow: '0 0 50px rgba(30,115,190,0.4)', 
          background: 'linear-gradient(135deg, rgba(30,115,190,0.15) 0%, rgba(13,74,138,0.15) 100%)'
        }} 
      />

      {/* Animated Background Pattern */}
      <div className={`absolute inset-0 rounded-3xl overflow-hidden transition-opacity duration-500 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E73BE]/5 to-[#0D4A8A]/5"></div>
      </div>
      
      {/* Icon */}
      <div className="relative z-10">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#1E73BE] to-[#0D4A8A] text-white flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
          {item.icon}
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 text-center mb-4 group-hover:text-[#1E73BE] transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-gray-600 text-center leading-relaxed text-sm">
          {item.desc}
        </p>
        
        {/* Hover Indicator */}
        <div className="mt-6 flex justify-center">
          <div className={`h-1 bg-gradient-to-r from-[#1E73BE] to-[#0D4A8A] rounded-full transition-all duration-500 ${
            isHovered ? 'w-12 opacity-100' : 'w-8 opacity-0'
          }`}></div>
        </div>
      </div>
    </div>
  );
});

export function WhyChoose() {
  const items = useMemo(() => [
    {
      id: 'iso-quality',
      icon: <Award className="w-7 h-7" />,
      title: "ISO Certified Quality",
      desc: "All equipment manufactured under ISO 9001:2015 quality management systems",
    },
    {
      id: 'expert-engineering',
      icon: <Users className="w-7 h-7" />,
      title: "Expert Engineering",
      desc: "25+ years of experience in pharmaceutical equipment design and manufacturing",
    },
    {
      id: 'global-reach',
      icon: <Globe className="w-7 h-7" />,
      title: "Global Reach",
      desc: "Serving clients across 30+ countries with reliable equipment solutions",
    },
    {
      id: 'complete-support',
      icon: <Wrench className="w-7 h-7" />,
      title: "Complete Support",
      desc: "From design consultation to installation and after-sales support",
    },
  ], []);

  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = -((y - rect.height / 2) / rect.height) * 10;
    const ry = ((x - rect.width / 2) / rect.width) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
  }, []);

  const handleMouseLeave = useCallback((e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  }, []);

  return (
    <>
      <style>{`
        @keyframes slideUpFade {
          from { 
            opacity: 0; 
            transform: translateY(24px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 8s ease infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        /* GPU acceleration */
        .group {
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>

      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white to-purple-50/30"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-blue-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(30,115,190,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(30,115,190,0.5) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16" style={{ animation: 'slideUpFade 0.8s ease-out both' }}>
            <div className="inline-flex items-center gap-2 bg-[#1E73BE]/10 text-[#1E73BE] rounded-full px-4 py-2 mb-6 backdrop-blur-sm border border-[#1E73BE]/20">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-semibold">Why Choose Us</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-[#1E73BE] via-[#0D4A8A] to-[#1E73BE] bg-clip-text text-transparent animate-gradient">Nikul Pharma</span>?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We combine decades of expertise with cutting-edge technology to deliver pharmaceutical equipment solutions that exceed expectations
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {items.map((item, idx) => (
              <FeatureCard
                key={item.id}
                item={item}
                index={idx}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-20 text-center" style={{ animation: 'fadeInUp 0.8s ease-out both', animationDelay: '0.6s' }}>
            <div className="bg-gradient-to-r from-[#1E73BE] via-[#0D4A8A] to-[#1E73BE] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl animate-gradient">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/30 rounded-full blur-3xl"></div>
              </div>

              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-semibold">Get Started Today</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join hundreds of pharmaceutical companies who trust Nikul Pharma for their equipment needs
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/products"
                    className="group inline-flex items-center justify-center gap-2 bg-white text-[#1E73BE] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    aria-label="View our products"
                  >
                    View Our Products
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 hover:scale-105 hover:shadow-xl"
                    aria-label="Get in touch with us"
                  >
                    Get in Touch
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
