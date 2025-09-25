import { useState, useEffect } from 'react';
import { ArrowLeft, Users, Award, Globe, Zap } from 'lucide-react';

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const values = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Precision Excellence",
      description: "Every component is engineered with uncompromising precision and attention to detail."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation Drive", 
      description: "Constantly pushing boundaries with cutting-edge technology and forward-thinking solutions."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer Focus",
      description: "Building lasting partnerships through dedicated support and customized solutions."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Impact",
      description: "Contributing to industrial advancement and sustainable manufacturing worldwide."
    }
  ];

  const timeline = [
    { year: "1990", event: "Company Founded", description: "Started with a vision to revolutionize precision manufacturing" },
    { year: "1995", event: "First CNC Innovation", description: "Introduced groundbreaking computer-controlled machining systems" },
    { year: "2000", event: "Global Expansion", description: "Opened manufacturing facilities across three continents" },
    { year: "2010", event: "AI Integration", description: "First to integrate AI-powered quality control systems" },
    { year: "2020", event: "Sustainability Focus", description: "Achieved carbon-neutral manufacturing processes" },
    { year: "2024", event: "Next Generation", description: "Launching the most advanced industrial automation platform" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation is provided by shared Layout */}

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <a href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </a>
          <h1 className="text-6xl md:text-7xl font-light mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Our Story
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl leading-relaxed">
            Three decades of relentless innovation, precision engineering, and commitment to industrial excellence.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-light mb-6 text-gray-900">Our Mission</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                To empower industries worldwide with precision manufacturing solutions that define the future of production.
              </p>
              <p className="text-lg text-gray-500 leading-relaxed">
                We believe that every component, every process, and every innovation should contribute to a more efficient, 
                sustainable, and advanced industrial landscape.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop" 
                  alt="Manufacturing facility"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-light text-center mb-16 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-light text-center mb-16 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Our Journey
          </h2>
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start group">
                <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full flex items-center justify-center text-white font-bold text-lg mr-8 group-hover:scale-110 transition-transform duration-300">
                  {item.year}
                </div>
                <div className="pt-4">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{item.event}</h3>
                  <p className="text-gray-600 text-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-ww-6xl mx-auto px-6">
          <h2 className="text-5xl font-light text-center mb-16">By the Numbers</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">30+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-gray-300">Global Clients</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">99.9%</div>
              <div className="text-gray-300">Precision Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-gray-300">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-light mb-6 text-gray-900">Ready to Work Together?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's discuss how our precision engineering can transform your manufacturing process.
          </p>
          <a href="/contact" className="inline-block bg-gradient-to-r from-gray-900 to-gray-700 text-white px-8 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300">
            Start a Conversation
          </a>
        </div>
      </section>
    </div>
  );
}
