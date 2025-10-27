import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

// --- Custom SVG Icon Components ---
const PillBottleIcon = React.memo((props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 11h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4"/><path d="M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7"/><rect width="16" height="5" x="4" y="2" rx="1"/>
  </svg>
));

const TestTubeIcon = React.memo((props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2"/><path d="M8.5 2h7"/><path d="M14.5 16h-5"/>
  </svg>
));

const BioIcon = React.memo((props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"/><path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"/><path d="M5 21h14"/>
  </svg>
));

const MilkIcon = React.memo((props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8 2h8"/><path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2"/><path d="M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0"/>
  </svg>
));

// Animated Counter Component
const AnimatedCounter = React.memo(({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById(`counter-${end}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [end, isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const increment = end / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, isVisible]);

  return (
    <div id={`counter-${end}`} className="text-5xl font-bold mb-2">
      {count}{suffix}
    </div>
  );
});

// Industry Card Component
const IndustryCard = React.memo(({ item, index, onMouseMove, onMouseLeave }) => {
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
      className="group relative bg-white rounded-3xl border border-gray-200 p-8 text-center hover:shadow-2xl transition-all duration-500 h-full flex flex-col overflow-hidden cursor-pointer"
      style={{ 
        transformStyle: 'preserve-3d',
        animation: `fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s both`,
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease'
      }}
    >
      {/* Background Image with Lazy Loading */}
      <div 
        className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden transition-opacity duration-700 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${item.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
      </div>
      
      {/* Shine Effect */}
      <div 
        className={`shine absolute pointer-events-none transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(20px)'
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full items-center justify-center">
        {/* Default State */}
        <div className={`transition-all duration-500 flex flex-col items-center ${
          isHovered ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}>
          <div className="w-20 h-20 bg-gradient-to-br from-[#1E73BE]/10 to-[#0D4A8A]/10 rounded-2xl shadow-lg flex items-center justify-center mb-6 border border-[#1E73BE]/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            {item.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Hover State */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center px-6 transition-all duration-500 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}>
          <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
            {React.cloneElement(item.icon, { className: 'text-white w-12 h-12' })}
          </div>
          <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
            {item.title}
          </h3>
          <p className="text-white/95 text-center mb-6 text-sm leading-relaxed drop-shadow-md">
            {item.description}
          </p>
          <a
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-50"
            aria-label={`Learn more about ${item.title}`}
            onClick={(e) => e.stopPropagation()}
          >
            Learn More
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
});

export function IndustriesSection() {
  const industries = useMemo(() => [
    {
      title: "Pharmaceuticals",
      icon: <PillBottleIcon className="text-blue-600" />,
      description: "Precision equipment for drug manufacturing and processing.",
      bgImage: "https://images.unsplash.com/photo-1583604310111-9cd137d6ffe5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBoYXJtYWNldXRpY2FsfGVufDB8fDB8fHww",
    },
    {
      title: "Chemical Processing",
      icon: <TestTubeIcon className="text-green-600" />,
      description: "Specialized systems for chemical research and production.",
      bgImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlbWljYWx8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Biotechnology",
      icon: <BioIcon className="text-pink-600" />,
      description: "Specialized systems for biotech research and production facilities",
      bgImage: "https://images.unsplash.com/photo-1641903202531-bfa6bf0c6419?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlvdGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Food & Beverages",
      icon: <MilkIcon className="text-orange-600" />,
      description: "Hygienic equipment for food and beverage production.",
      bgImage: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop",
    },
  ], []);

  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    const shine = card.querySelector(".shine");
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateY = ((x - midX) / midX) * 8;
    const rotateX = -((y - midY) / midY) * 8;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    
    if (shine) {
      shine.style.left = `${x}px`;
      shine.style.top = `${y}px`;
    }
  }, []);

  const handleMouseLeave = useCallback((e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  }, []);

  const stats = useMemo(() => [
    { value: 25, suffix: '+', label: 'Years Experience', color: 'text-[#1E73BE]' },
    { value: 500, suffix: '+', label: 'Machines Delivered', color: 'text-[#0D4A8A]' },
    { value: 30, suffix: '+', label: 'Countries Served', color: 'text-[#09243c]' },
    { value: 99, suffix: '%', label: 'Customer Satisfaction', color: 'text-[#0D2240]' },
  ], []);

  return (
    <>
      <style>{`
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

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slide-in {
          animation: slideInFromLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
        }

        .animate-scale-in {
          animation: scaleIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* GPU acceleration for better performance */
        .group {
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>

      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/images/home page background .jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-purple-50/40" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 animate-slide-in">
            <div className="inline-flex items-center gap-2 bg-[#1E73BE]/10 text-[#1E73BE] rounded-full px-4 py-2 mb-6 backdrop-blur-sm border border-[#1E73BE]/20">
              <div className="w-2 h-2 bg-[#1E73BE] rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">Industries We Serve</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-[#1E73BE] via-[#0D4A8A] to-[#1E73BE] bg-clip-text text-transparent">
                Industries We Serve
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Delivering precision pharmaceutical equipment solutions across diverse industries with unmatched expertise and reliability
            </p>
          </div>

          {/* Industry Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {industries.map((item, index) => (
              <IndustryCard
                key={item.title}
                item={item}
                index={index}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 text-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Our Impact in Numbers</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                {stats.map((stat, index) => (
                  <div 
                    key={stat.label} 
                    className="text-center transform transition-all duration-300 hover:scale-110"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`${stat.color} transition-colors duration-300`}>
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-gray-600 font-medium text-sm sm:text-base">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
