import React from 'react'
import { Helmet } from 'react-helmet-async'
import AboutUsPage from '@/components/AboutUsPage'

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us - Nikul Pharma Equipment | 20+ Years of Excellence</title>
        <meta name="description" content="Learn about Nikul Pharma Equipment - Leading manufacturer of pharmaceutical processing equipment with 20+ years of experience. ISO & GMP certified facility." />
        <meta name="keywords" content="about nikul pharma, pharmaceutical equipment manufacturer, ISO certified, GMP facility, pharma machinery company" />
        <link rel="canonical" href="https://nikulpharmaequipments.com/about" />
        
        <meta property="og:title" content="About Us - Nikul Pharma Equipment" />
        <meta property="og:description" content="20+ years of excellence in pharmaceutical equipment manufacturing. ISO & GMP certified." />
        <meta property="og:url" content="https://nikulpharmaequipments.com/about" />
        <meta property="og:type" content="website" />
      </Helmet>
      <AboutUsPage />
    </>
  )
}