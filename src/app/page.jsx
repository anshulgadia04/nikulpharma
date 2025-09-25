"use client";
import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { GlobalStyles } from "@/components/HomePage/GlobalStyles";
import { Navigation } from "@/components/HomePage/Navigation";
import { HeroCarousel } from "@/components/HomePage/HeroCarousel";
import { ActionCards } from "@/components/HomePage/ActionCards";
import { IndustriesSection } from "@/components/HomePage/IndustriesSection";
import { ProductsSection } from "@/components/HomePage/ProductsSection";
import { TrustedBy } from "@/components/HomePage/TrustedBy";
import { WhyChoose } from "@/components/HomePage/WhyChoose";
import { Footer } from "@/components/HomePage/Footer";

export default function HomePage() {
  const sectionsRef = useRef({});
  const isVisible = useIntersectionObserver(sectionsRef);

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen bg-white overflow-x-hidden">
        <HeroCarousel />
        <ActionCards />
        
        <IndustriesSection />
        
        <ProductsSection
          sectionRef={(el) => (sectionsRef.current.products = el)}
          isVisible={isVisible.products}
        />
        
        <TrustedBy />
        <WhyChoose />
        
        {/* Footer is provided by shared Layout */}
      </div>
    </>
  );
}
