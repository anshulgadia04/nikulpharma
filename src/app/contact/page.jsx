import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle, MessageCircle, Clock, Users, Loader2, Shield, Award, Globe, Headphones, Building2, Zap } from 'lucide-react';
import apiService from '@/utils/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    product: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    // Check if product is passed via URL params
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('product');
    if (product) {
      setFormData(prev => ({
        ...prev,
        product: product,
        subject: `Inquiry about ${product}`,
        message: `Hi, I'm interested in learning more about the ${product}. Could you please provide more details about pricing, specifications, and availability?`
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const inquiryData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        subject: formData.subject,
        message: formData.message,
        product: formData.product,
        inquiry_type: 'general',
        source: 'contact_page',
        // Add additional tracking fields
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        page_url: window.location.href
      };

      await apiService.submitInquiry(inquiryData);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
    
    // Reset form after 3 seconds if successful
    if (submitted) {
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          phone: '',
          subject: '',
          message: '',
          product: ''
        });
      }, 3000);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      value: "sales@nikulpharmaequipments.com",
      description: "Get detailed quotes and technical information",
      action: "mailto: sales@nikulpharmaequipments.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      value: "+91 8048048071",
      description: "Mon-Fri 9AM-6PM IST",
      action: "tel:+918048048071"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      value: "Mumbai, India",
      description: "Schedule a factory visit",
      action: "#"
    }
  ];

  const trustIndicators = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "ISO 9001:2015 Certified",
      description: "Quality assured manufacturing"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "25+ Years Experience",
      description: "Proven track record in pharma"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Presence",
      description: "Serving 50+ countries worldwide"
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round-the-clock technical assistance"
    }
  ];

  const responseTime = {
    urgent: "Within 2 hours",
    normal: "Within 24 hours", 
    low: "Within 48 hours"
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Sent!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your inquiry. We'll get back to you within {responseTime[formData.urgency]}.
          </p>
          <a href="/" className="inline-block bg-gradient-to-r from-gray-900 to-gray-700 text-white px-6 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Contact Us - Nikul Pharma Equipment | Get in Touch</title>
        <meta name="description" content="Contact Nikul Pharma Equipment for pharmaceutical processing equipment inquiries. Call +91-08048048071 or email sales@nikulpharmaequipments.com for expert assistance." />
        <meta name="keywords" content="contact nikul pharma, pharma equipment inquiry, pharmaceutical machinery contact, equipment sales" />
        <link rel="canonical" href="https://nikulpharmaequipments.com/contact" />
        
        <meta property="og:title" content="Contact Us - Nikul Pharma Equipment" />
        <meta property="og:description" content="Get in touch with us for pharmaceutical equipment inquiries. Expert support available." />
        <meta property="og:url" content="https://nikulpharmaequipments.com/contact" />
        <meta property="og:type" content="website" />
      </Helmet>
      
      {/* Navigation is provided by shared Layout */}

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 lg:pt-32 pb-16 bg-gradient-to-br from-[#1E73BE]/5 via-white to-[#0D4A8A]/5 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#1E73BE] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#0D4A8A] rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative">
          <a href="/" className="inline-flex items-center text-[#1E73BE] hover:text-[#0D4A8A] transition-colors mb-8 group">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </a>
          
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#1E73BE]/10 text-[#1E73BE] rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-[#1E73BE] rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">Get Expert Consultation</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#1E73BE] to-[#0D4A8A] bg-clip-text text-transparent">
                Let's Build
              </span>
              <br />
              <span className="text-gray-900">Your Success</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Connect with our pharmaceutical equipment experts for personalized solutions, 
              technical consultation, and custom engineering services.
            </p>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-3 group-hover:shadow-xl transition-all duration-300">
                    <div className="text-[#1E73BE] group-hover:scale-110 transition-transform">
                      {indicator.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{indicator.title}</h3>
                  <p className="text-xs text-gray-600">{indicator.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-[#1E73BE]/10 text-[#1E73BE] rounded-full px-4 py-2 mb-4">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm font-semibold">Quick Inquiry</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a message</h2>
                <p className="text-gray-600">Get personalized quotes and technical consultation from our experts.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E73BE] focus:ring-2 focus:ring-[#1E73BE]/20 transition-all duration-300 bg-gray-50/50"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E73BE] focus:ring-2 focus:ring-[#1E73BE]/20 transition-all duration-300 bg-gray-50/50"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E73BE] focus:ring-2 focus:ring-[#1E73BE]/20 transition-all duration-300 bg-gray-50/50"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E73BE] focus:ring-2 focus:ring-[#1E73BE]/20 transition-all duration-300 bg-gray-50/50"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E73BE] focus:ring-2 focus:ring-[#1E73BE]/20 transition-all duration-300 bg-gray-50/50"
                    placeholder="Enter your company name"
                  />
                </div>

                {formData.product && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product of Interest</label>
                    <input
                      type="text"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-300 bg-gray-50"
                      readOnly
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E73BE] focus:ring-2 focus:ring-[#1E73BE]/20 transition-all duration-300 bg-gray-50/50"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#1E73BE] focus:ring-2 focus:ring-[#1E73BE]/20 transition-all duration-300 resize-none bg-gray-50/50"
                    placeholder="Tell us about your project and requirements..."
                  />
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                      <div className="text-red-600 text-sm font-medium">{submitError}</div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#1E73BE] to-[#0D4A8A] text-white py-4 px-6 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                  <Clock className="w-4 h-4 mr-2 text-[#1E73BE]" />
                  <span>Expected response time: <strong>within 24 hours</strong></span>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className="lg:pl-8">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-[#0D4A8A]/10 text-[#0D4A8A] rounded-full px-4 py-2 mb-4">
                  <Building2 className="w-4 h-4" />
                  <span className="text-sm font-semibold">Contact Information</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Get in touch</h2>
                <p className="text-sm sm:text-base text-gray-600">Multiple ways to reach our expert team for your pharmaceutical equipment needs.</p>
              </div>
              
              <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                {contactInfo.map((info, index) => (
                  <a 
                    key={index} 
                    href={info.action}
                    className="flex items-start space-x-4 group cursor-pointer p-4 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-[#1E73BE] to-[#0D4A8A] rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#1E73BE] transition-colors">{info.title}</h3>
                      <p className="text-gray-900 font-semibold mb-1">{info.value}</p>
                      <p className="text-gray-500 text-sm">{info.description}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* <div className="bg-gradient-to-br from-[#1E73BE]/5 to-[#0D4A8A]/5 p-8 rounded-3xl border border-[#1E73BE]/10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1E73BE] to-[#0D4A8A] rounded-2xl flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Expert Support Team</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Our pharmaceutical equipment experts are standing by to help you find the perfect solution for your manufacturing needs.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    <span>Free consultation and detailed quotes</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    <span>Custom engineering solutions</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    <span>Technical specifications and support</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    <span>Installation and training services</span>
                  </div>
                </div>
              </div> */}
              <div className="bg-gradient-to-br from-[#1E73BE]/5 to-[#0D4A8A]/5 p-8 rounded-3xl border border-[#1E73BE]/10">
  <h3 className="text-xl font-bold text-gray-900 mb-4">Our Exact Location</h3>

  <p className="text-gray-700 mb-4">
    <strong>Latitude:</strong> 19.4581116° N<br />
    <strong>Longitude:</strong> 72.8828698° E
  </p>

  {/* Map Container */}
  <div className="w-full h-64 rounded-xl overflow-hidden border border-gray-300 shadow-md">
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d60192.78566138618!2d72.8035126!3d19.4534496!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a9739c183b91%3A0xa4a5aa7a3108eed3!2sNikul%20pharma%20equipment!5e0!3m2!1sen!2sin!4v1766771750278!5m2!1sen!2sin" 
      width="100%" 
      height="100%" 
      style={{ border: 0 }} 
      allowFullScreen="" 
      loading="lazy" 
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>

  <a
    href="https://maps.app.goo.gl/5vjN77GNPXN3K87q6"
    target="_blank"
    className="mt-4 inline-block px-6 py-3 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-all"
  >
    Open Full Map
  </a>
</div>



            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#1E73BE]/10 text-[#1E73BE] rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">Quick Answers</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get quick answers to common questions about our pharmaceutical equipment and services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#1E73BE] rounded-lg flex items-center justify-center mr-3">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                What's your typical lead time?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Standard pharmaceutical machines: <strong>8-12 weeks</strong>. Custom engineering solutions: 
                <strong>12-16 weeks</strong> depending on complexity and specifications.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#0D4A8A] rounded-lg flex items-center justify-center mr-3">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                Do you offer financing options?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, we provide <strong>flexible financing and leasing options</strong> to help pharmaceutical companies 
                get the equipment they need without upfront capital investment.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#1E73BE] rounded-lg flex items-center justify-center mr-3">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                What warranty do you provide?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                All pharmaceutical equipment comes with a <strong>2-year comprehensive warranty</strong> 
                plus ongoing technical support and maintenance services.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-[#0D4A8A] rounded-lg flex items-center justify-center mr-3">
                  <Award className="w-4 h-4 text-white" />
                </div>
                Can you customize machines?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Absolutely! We specialize in <strong>custom engineering solutions</strong> tailored to your 
                specific pharmaceutical manufacturing requirements and regulatory standards.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Still have questions? Our experts are here to help.</p>
            <a 
              href="#contact-form" 
              className="inline-flex items-center bg-gradient-to-r from-[#1E73BE] to-[#0D4A8A] text-white px-8 py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Ask Our Experts
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
