"use client";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { HeroCarousel } from "@/components/HomePage/HeroCarousel";
import { ActionCards } from "@/components/HomePage/ActionCards";
import { IndustriesSection } from "@/components/HomePage/IndustriesSection";
import { ProductsSection } from "@/components/HomePage/ProductsSection";
import { TrustedBy } from "@/components/HomePage/TrustedBy";
import { WhyChoose } from "@/components/HomePage/WhyChoose";

export default function HomePage() {
  const sectionsRef = useRef({});
  const isVisible = useIntersectionObserver(sectionsRef);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nikul Pharma Equipment",
    "url": "https://nikulpharmaequipments.com",
    "logo": "https://nikulpharmaequipments.com/images/logos/logo.png",
    "description": "Leading manufacturer of pharmaceutical processing equipment including mixers, blenders, dryers, and reactors. ISO & GMP certified.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-08048048071",
      "contactType": "Sales",
      "email": "sales@nikulpharmaequipments.com",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://www.instagram.com/nikul_pharma_equipment",
      "https://www.youtube.com/@nikulpharmaequipment"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Nikul Pharma Equipment - Pharmaceutical Processing Machinery | ISO & GMP Certified</title>
        <meta name="description" content="Leading manufacturer of pharmaceutical processing equipment including mixers, blenders, dryers, reactors, and granulation lines. ISO & GMP certified with 20+ years of experience." />
        <meta name="keywords" content="pharmaceutical equipment, industrial mixers, blenders, dryers, reactors, GMP certified, pharma machinery, granulation equipment, powder processing" />
        <link rel="canonical" href="https://nikulpharmaequipments.com" />
        
        <meta property="og:title" content="Nikul Pharma Equipment - Pharmaceutical Processing Machinery" />
        <meta property="og:description" content="Leading manufacturer of pharmaceutical processing equipment including mixers, blenders, dryers, and reactors. ISO & GMP certified." />
        <meta property="og:url" content="https://nikulpharmaequipments.com" />
        <meta property="og:image" content="https://nikulpharmaequipments.com/images/og-home.jpg" />
        
        <meta name="twitter:title" content="Nikul Pharma Equipment - Pharmaceutical Processing Machinery" />
        <meta name="twitter:description" content="Leading manufacturer of pharmaceutical processing equipment. ISO & GMP certified." />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <HeroCarousel />
      <ActionCards />
      
      <IndustriesSection />
      
      <ProductsSection
        sectionRef={(el) => (sectionsRef.current.products = el)}
        isVisible={isVisible.products}
      />
      
      <TrustedBy />
      <WhyChoose />
    </>
  );
}
