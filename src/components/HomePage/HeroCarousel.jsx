import { useState } from "react";
import { Play, ArrowRight, Award, Users, Globe } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    title: "Precision Pharmaceutical Equipment",
    subtitle: "Advanced manufacturing solutions for the pharmaceutical industry",
    description: "Leading manufacturer of precision pharmaceutical equipment with 25+ years of expertise in drug manufacturing technology.",
    video: "/videos/hero.mp4",
    cta: "Explore Our Machines",
    secondaryCta: "Watch Demo",
    link: "/products",
    stats: [
      { label: "Years Experience", value: "25+", icon: Award },
      { label: "Countries Served", value: "30+", icon: Globe },
      { label: "Machines Delivered", value: "500+", icon: Users },
    ]
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="relative h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 mt-20 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Video/Image */}
            <div className="absolute inset-0">
              {slide.video && !videoError ? (
                <video
                  key={slide.video}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onError={() => setVideoError(true)}
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#1E73BE] to-[#0D4A8A] flex items-center justify-center">
                  <div className="text-white text-center">
                    <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                    <p className="text-xl">{slide.subtitle}</p>
                  </div>
                </div>
              )}
              {/* Professional gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-6 text-white">
                <div className="max-w-4xl">

                  {/* Main heading */}
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {slide.title}
                    </span>
                  </h1>
                  
                  {/* Subtitle */}
                  <p className="text-xl md:text-2xl mb-4 text-gray-200 font-light">
                    {slide.subtitle}
                  </p>
                  
                  {/* Description */}
                  <p className="text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed">
                    {slide.description}
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-8 mb-8">
                    {slide.stats.map((stat, idx) => {
                      const IconComponent = stat.icon;
                      return (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-white">{stat.value}</div>
                            <div className="text-sm text-gray-300">{stat.label}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={slide.link}
                      className="group inline-flex items-center justify-center bg-[#1E73BE] hover:bg-[#0D4A8A] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105"
                    >
                      {slide.cta}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <button 
                    className="group inline-flex items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 border border-white/20 hover:border-white/40"
                    aria-label={`${slide.secondaryCta} - ${slide.title}`}
                  >
                      <Play className="mr-2 w-5 h-5" />
                      {slide.secondaryCta}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white">
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-gray-300">Scroll to explore</span>
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
