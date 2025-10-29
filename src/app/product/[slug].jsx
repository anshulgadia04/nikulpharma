import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useInView, animate } from 'framer-motion';
import {
  ArrowLeft, Check, Phone, Mail, Settings, Zap as HighEfficiency, CheckSquare, Clock, Users, HardHat, Target, FlaskConical, Factory, HeartPulse, Microscope as ResearchIcon, Shield, Pill, Loader2
} from 'lucide-react';
import { useProduct } from '@/hooks/useProducts';
import { resolveProductImageUrl } from '@/utils/api';

// --- Animation Variants for Sections ---
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1], staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } },
};

// --- Animation Variants for Header with Delay ---
const headerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 1,
      delay: 0.3,
      ease: [0.25, 1, 0.5, 1],
      staggerChildren: 0.3,
      delayChildren: 0.5
    },
  },
};

const headerItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.25, 1, 0.5, 1]
    } 
  },
};

// --- Animated Counter for Stats ---
function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    if (inView) {
        const node = ref.current;
        const controls = animate(0, to, {
          duration: 2.5,
          ease: "easeOut",
          onUpdate(value) {
            if (node) {
               node.textContent = Math.round(value).toLocaleString();
            }
          },
        });
        return () => controls.stop();
    }
  }, [to, inView]);

  return <span ref={ref}>0</span>;
}

// --- Main Page Component ---
export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(slug);
  console.log(product)

  useEffect(() => {    
    window.scrollTo(0, 0);
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-red-600 mb-2">Error Loading Product</h2>
            <p className="text-red-700 mb-4">{error}</p>
            <button onClick={() => navigate('/products')} className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700">Product not found</h2>
            <p className="text-gray-500 mt-2">The product you are looking for does not exist.</p>
            <button onClick={() => navigate('/')} className="mt-6 px-6 py-2 bg-[#113153] text-white rounded-lg hover:bg-[#1f649d] transition-colors">
                Go Home
            </button>
        </div>
      </div>
    );
  }

  // --- Data Mapping ---
  const getSpecValue = (key, fallback) => {
    if (!product.specs) return fallback;
    const spec = Object.entries(product.specs).find(([k]) =>
      k.toLowerCase().includes(key.toLowerCase())
    );
    if (!spec) return fallback;
    const match = (spec[1] || "").toString().match(/[\d.]+/);
    return match ? parseFloat(match[0]) : fallback;
  };

  const stats = [
    { label: 'Efficiency', value: getSpecValue('Efficiency', 90), suffix: '%' },
    { label: 'Throughput', value: getSpecValue('capacity', 458), suffix: 'kg/h' },
    { label: 'Particle Size', value: getSpecValue('particle size', 9), suffix: 'μm' },
    { label: 'Operation', value: 24, suffix: '/7' },
  ];
  
  const featureCards = [
    { icon: Target, title: "Ultra-Precision", text: `Achieve particle sizes down to ${stats[2].value} microns with ±2% consistency.`, color: 'blue' },
    { icon: HighEfficiency, title: "High Efficiency", text: `Process up to ${stats[1].value}kg/hour with minimal energy consumption.`, color: 'orange' },
    { icon: CheckSquare, title: "GMP Compliant", text: "Full compliance with pharmaceutical manufacturing standards.", color: 'green' },
    { icon: Clock, title: "24/7 Operation", text: "Designed for continuous operation with minimal maintenance.", color: 'purple' },
    { icon: Shield, title: "Quality Assured", text: "ISO 9001 certified with comprehensive quality control.", color: 'red' },
    { icon: Users, title: "Expert Support", text: "Dedicated technical support and training programs.", color: 'indigo' },
  ];
  
  const applicationsData = [
    { icon: Pill, title: "Pharmaceuticals", desc: "Tablet formulations, API processing, and drug development.", points: ["Tablet Manufacturing", "API Processing", "Drug Development", "Quality Control"] },
    { icon: ResearchIcon, title: "Research & Development", desc: "Laboratory-scale grinding for research and testing.", points: ["Sample Preparation", "Research Studies", "Method Development", "Analytical Testing"] },
    { icon: Factory, title: "Manufacturing", desc: "Large-scale production grinding operations.", points: ["Bulk Processing", "Production Lines", "Quality Assurance", "Batch Processing"] },
    { icon: HeartPulse, title: "Healthcare", desc: "Medical device and healthcare product manufacturing.", points: ["Medical Devices", "Healthcare Products", "Surgical Instruments", "Diagnostic Tools"] },
  ];

  const featureCardStyles = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    red: { bg: 'bg-red-100', text: 'text-red-600' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600' },
  };

  return (
    <div className="bg-white">
      <div className="h-20" /> {/* Spacer */}
      
      {/* Header */}
      <motion.header 
        initial="hidden" 
        animate="visible" 
        variants={headerVariants}
        className="relative py-24 md:py-32 text-center bg-gray-800 text-white overflow-hidden rounded-b-[50px]"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${resolveProductImageUrl(product.image)})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
        <div className="relative max-w-4xl mx-auto px-6">
            <motion.h1 variants={headerItemVariants} className="text-5xl md:text-6xl font-bold mb-4">{product.name}</motion.h1>
            <motion.p variants={headerItemVariants} className="text-xl text-gray-300">{product.description}</motion.p>
        </div>
      </motion.header>

      {/* "How It Works" Section */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={sectionVariants}
        className="py-24"
      >
        <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
                <p className="text-gray-600 mt-3 max-w-3xl mx-auto">Our precision disc grinder utilizes advanced mechanical principles to deliver consistent, high-quality pharmaceutical grinding results.</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div variants={itemVariants}>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Precision Grinding Mechanism</h3>
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    <h4 className="font-bold text-gray-800 mb-3">Key Components:</h4>
                    <ul className="space-y-2">
                        {product.features.slice(0, 4).map((comp, i) => (
                            <li key={i} className="flex items-center text-gray-700">
                                <Check className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" /> {comp}
                            </li>
                        ))}
                    </ul>
                </motion.div>
                <motion.div variants={itemVariants} className="relative">
                    <div className="absolute -bottom-2 -right-2 px-4 py-1.5 text-sm font-semibold text-blue-600 bg-white rounded-lg shadow-md border border-blue-100 z-10">Precision Engineering</div>
                    <div className="aspect-square bg-white rounded-2xl shadow-xl border border-blue-100 p-4">
                        <img src={resolveProductImageUrl(product.image)} alt={product.name} className="w-full h-full object-contain" />
                    </div>
                </motion.div>
            </div>
        </div>
      </motion.section>
      
      {/* Key Features Section */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={sectionVariants}
        className="py-24 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900">Key Features</h2>
                <p className="text-gray-600 mt-2">Engineered for excellence with cutting-edge technology and precision manufacturing.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featureCards.map((card) => {
                    const styles = featureCardStyles[card.color];
                    return(
                        <motion.div key={card.title} variants={itemVariants} className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 text-center">
                            <div className={`w-16 h-16 ${styles.bg} ${styles.text} rounded-lg flex items-center justify-center mb-5 mx-auto`}>
                               <card.icon strokeWidth={1.5} className="w-8 h-8"/>
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg mb-2">{card.title}</h3>
                            <p className="text-gray-600 text-sm">{card.text}</p>
                        </motion.div>
                    );
                })}
            </div>
        </div>
      </motion.section>

      {/* Applications Section */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={sectionVariants}
        className="py-24"
      >
        <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900">Applications</h2>
                <p className="text-gray-600 mt-2">Serving diverse industries with precision grinding solutions.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {applicationsData.map((app) => (
                    <motion.div key={app.title} variants={itemVariants} className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 flex flex-col">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                          <app.icon strokeWidth={1.5}/>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 leading-tight">{app.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        {app.desc}
                      </p>
                      <ul className="space-y-2 text-sm mt-auto">
                        {app.points.map((point) => (
                          <li key={point} className="flex items-center text-gray-700">
                             <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                             {point}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                ))}
            </div>
        </div>
      </motion.section>

      {/* Specifications & Highlights Section */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={sectionVariants}
        className="py-24 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900">Specifications & Highlights</h2>
                <p className="text-gray-600 mt-2">Technical specifications and performance metrics.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                {stats.map(stat => (
                    <motion.div key={stat.label} variants={itemVariants} className="text-center bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                        <p className="text-5xl font-bold text-blue-600">
                            <Counter to={stat.value} />{stat.suffix}
                        </p>
                        <p className="text-gray-500 mt-2">{stat.label}</p>
                    </motion.div>
                ))}
            </div>
            <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12">
                <motion.div variants={itemVariants}>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Technical Specifications</h3>
                    <div className="space-y-4">
                        {product?.specs && Object.entries(product.specs).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center border-b border-gray-200 pb-4">
                                <span className="text-gray-600">{key}</span>
                                <span className="font-semibold text-gray-900 text-lg text-right">{value}</span>
                            </div>
                        ))}
                        {(!product?.specs || Object.keys(product.specs).length === 0) && (
                            <p className="text-gray-500 italic">No specifications available.</p>
                        )}
                    </div>
                </motion.div>
                <motion.div variants={itemVariants}>
                   <h3 className="text-2xl font-bold text-gray-800 mb-6">Key Highlights</h3>
                   <ul className="space-y-4">
                        {product?.features && product.features.length > 0 ? (
                            product.features.map((highlight, i) => (
                                <li key={i} className="flex items-start text-gray-700 leading-relaxed">
                                    <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-4 mt-1">
                                        <Check className="w-4 h-4"/> 
                                    </div>
                                    {highlight}
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-500 italic">No features available.</p>
                        )}
                    </ul>
                </motion.div>
            </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.5 }} variants={sectionVariants}
        className="py-24 bg-gradient-to-r from-blue-700 to-blue-900 text-white"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Manufacturing?</h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">Get a personalized quote and discover how our precision disc grinder can enhance your pharmaceutical process.</p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
                <a href="tel:+1234567890" className="inline-flex items-center justify-center px-8 py-3 border-2 border-white rounded-xl font-semibold hover:bg-white hover:text-blue-800 transition-all duration-300">
                    <Phone className="w-5 h-5 mr-2" /> Call Now
                </a>
                <a href="mailto:info@nikulpharma.com" className="inline-flex items-center justify-center px-8 py-3 border-2 border-white rounded-xl font-semibold hover:bg-white hover:text-blue-800 transition-all duration-300">
                    <Mail className="w-5 h-5 mr-2" /> Email Us
                </a>
            </div>
        </div>
      </motion.section>

    </div>
  );
}