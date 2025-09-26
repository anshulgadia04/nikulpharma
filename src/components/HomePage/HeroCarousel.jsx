"use client";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    title: "Advanced Automation System",
    subtitle: "Seamless integration with AI control",
    // single muted loop video placed in public/videos/hero.mp4
    video: "/videos/hero.mp4",
    cta: "Explore Machines",
    link: "/products",
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

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

      {/* Carousel controls and dots removed for single video */}
    </section>
  );
}
