import { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle, MessageCircle, Clock, Users } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    product: '',
    urgency: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
    try {
      const base = import.meta.env.VITE_API_BASE_URL;
      if (!base) {
        await new Promise(resolve => setTimeout(resolve, 600));
        setIsSubmitting(false);
        setSubmitted(true);
        return;
      }

      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        product: formData.product,
        urgency: formData.urgency,
      };

      const res = await fetch(`${base}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed');
      setIsSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      alert('Failed to submit. Please try again later.');
    }
    
    // Reset form after 3 seconds
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
        product: '',
        urgency: 'normal'
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "contact@industrialtech.com",
      description: "Send us an email anytime"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: "+1 (555) 123-4567",
      description: "Mon-Fri 8AM-6PM PST"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: "San Francisco, CA",
      description: "Visit our showroom"
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
      {/* Navigation is provided by shared Layout */}

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <a href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </a>
          <h1 className="text-5xl md:text-6xl font-light mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Let's Talk
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Ready to transform your manufacturing process? Our precision engineering experts are here to help.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-light mb-8 text-gray-900">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-300"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-300"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-300"
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

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-300"
                      placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <label className="block text sm font-medium text-gray-700 mb-2">Urgency</label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-300"
                    >
                      <option value="low">Low - Within 48 hours</option>
                      <option value="normal">Normal - Within 24 hours</option>
                      <option value="urgent">Urgent - Within 2 hours</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-300 resize-none"
                    placeholder="Tell us about your project and requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white py-4 px-6 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>

                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  Expected response time: {responseTime[formData.urgency]}
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className="lg:pl-8">
              <h2 className="text-3xl font-light mb-8 text-gray-900">Get in touch</h2>
              
              <div className="space-y-8 mb-12">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 group cursor-pointer">
                    <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                      <p className="text-gray-900 font-medium mb-1">{info.value}</p>
                      <p className="text-gray-500 text-sm">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-3xl">
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-gray-700 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Expert Support Team</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Our engineering experts are standing by to help you find the perfect solution for your manufacturing needs.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Free consultation and quotes
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Custom engineering solutions
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-light text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What's your typical lead time?</h3>
              <p className="text-gray-600">Standard machines: 8-12 weeks. Custom solutions: 12-16 weeks depending on complexity.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Do you offer financing options?</h3>
              <p className="text-gray-600">Yes, we provide flexible financing and leasing options to help you get the equipment you need.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What warranty do you provide?</h3>
              <p className="text-gray-600">All machines come with a 2-year comprehensive warranty plus ongoing support and maintenance.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Can you customize machines?</h3>
              <p className="text-gray-600">Absolutely. We specialize in custom engineering solutions tailored to your specific requirements.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
