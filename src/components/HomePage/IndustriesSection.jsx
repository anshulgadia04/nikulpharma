import React, { useCallback } from 'react';
import { ArrowRight } from 'lucide-react';

// --- Custom SVG Icon Components ---
// All attributes are now correctly formatted for JSX (e.g., className, strokeWidth).
const PillBottleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 11h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4"/><path d="M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7"/><rect width="16" height="5" x="4" y="2" rx="1"/>
  </svg>
);

const TestTubeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2"/><path d="M8.5 2h7"/><path d="M14.5 16h-5"/>
  </svg>
);

// CORRECTED: Replaced 'class' with 'className' and kebab-case with camelCase.
const Bio = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"/><path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"/><path d="M5 21h14"/>
 </svg>
);

const MilkIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8 2h8"/><path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2"/><path d="M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0"/>
  </svg>
);

export function IndustriesSection() {
  const industries = [
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
      icon: <Bio className="text-pink-600" />,
      description: "Specialized systems for biotech research and production facilities",
      bgImage: "https://images.unsplash.com/photo-1641903202531-bfa6bf0c6419?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmlvdGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Food & Beverages",
      icon: <MilkIcon className="text-orange-600" />,
      description: "Hygienic equipment for food and beverage production.",
      bgImage: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    const shine = card.querySelector(".shine");
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateY = ((x - midX) / midX) * 10;
    const rotateX = -((y - midY) / midY) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    if (shine) {
      shine.style.left = `${x}px`;
      shine.style.top = `${y}px`;
    }
  }, []);

  const handleMouseLeave = useCallback((e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/images/home page background .jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1E73BE]/10 text-[#1E73BE] rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-[#1E73BE] rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold">Industries We Serve</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-[#1E73BE] to-[#0D4A8A] bg-clip-text text-transparent">
              Industries We Serve
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Delivering precision pharmaceutical equipment solutions across diverse industries with unmatched expertise and reliability
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((item, index) => (
            <div
              key={item.title}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="group relative bg-white rounded-3xl border border-gray-200 p-8 text-center hover:shadow-2xl transition-all duration-500 h-full flex flex-col will-change-transform overflow-hidden hover:scale-105"
              style={{ 
                transformStyle: 'preserve-3d',
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 w-full h-full transition-opacity duration-500 opacity-0 group-hover:opacity-100 rounded-3xl overflow-hidden"
                style={{
                  backgroundImage: `url(${item.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/20"></div>
              </div>
              
              {/* Shine Effect */}
              <div 
                className="shine absolute transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                style={{
                  width: '300px', height: '300px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)',
                  transform: 'translate(-50%, -50%)', pointerEvents: 'none'
                }}
              ></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full items-center">
                {/* Default State */}
                <div className="transition-all duration-500 group-hover:opacity-0 group-hover:scale-95 flex flex-col items-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#1E73BE]/10 to-[#0D4A8A]/10 rounded-2xl shadow-lg flex items-center justify-center mb-6 border border-[#1E73BE]/20">
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
                <div className="absolute top-0  flex flex-col items-center w-full transition-all duration-500 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-white/90 text-center mb-6 text-sm">
                    {item.description}
                  </p>
                  <a
                    href="/products"
                    className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    aria-label={`Learn more about ${item.title}`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Our Impact in Numbers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-[#1E73BE] mb-2">25+</div>
                <div className="text-gray-600 font-medium">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-[#0D4A8A] mb-2">500+</div>
                <div className="text-gray-600 font-medium">Machines Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-[#09243c] mb-2">30+</div>
                <div className="text-gray-600 font-medium">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-[#0D2240] mb-2">99%</div>
                <div className="text-gray-600 font-medium">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}