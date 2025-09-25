"use client";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    title: "Ultra-precision CNC Mill, like no other",
    subtitle: "Fits into existing production lines",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1400&h=800&fit=crop",
    cta: "Precision X1 Inline",
    link: "/products",
  },
  {
    id: 2,
    title: "Advanced Automation System",
    subtitle: "Seamless integration with AI control",
    // Use a short, muted loop video placed in public/videos/hero.mp4
    video: "/videos/hero.mp4",
    cta: "RoboAssembly AI",
    link: "/products",
  },
  {
    id: 3,
    title: "Heavy-duty Press Technology",
    subtitle: "Maximum force, minimum footprint",
    image:
      "https://images.unsplash.com/photo-1565515152842-59e9ad86f5a3?w=1400&h=800&fit=crop",
    cta: "FlexForm 500T",
    link: "/products",
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="relative h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0">
              {slide.video ? (
                <video
                  key={slide.video}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster={slide.image || undefined}
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-6xl mx-auto px-6 text-white">
                <div className="max-w-2xl">
                  <h1 className="text-4xl md:text-6xl font-light mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-gray-200">
                    {slide.subtitle}
                  </p>
                  <a
                    href={slide.link}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 hover:shadow-lg"
                  >
                    {slide.cta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300"
      >
        <ChevronLeft className="text-white" size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300"
      >
        <ChevronRight className="text-white" size={24} />
      </button>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
