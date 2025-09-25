import { Mail, Phone, MapPin } from "lucide-react";

export function ContactSection({ sectionRef, isVisible }) {
  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 bg-gradient-to-br from-gray-900 to-gray-800 text-white"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-light text-center mb-16">
            Let's Build Together
          </h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <div className="text-gray-300">Email</div>
                  <div className="text-xl">contact@industrialtech.com</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <div className="text-gray-300">Phone</div>
                  <div className="text-xl">+1 (555) 123-4567</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <div className="text-gray-300">Location</div>
                  <div className="text-xl">San Francisco, CA</div>
                </div>
              </div>
            </div>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300"
              />
              <textarea
                placeholder="Tell us about your project"
                rows={5}
                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300 resize-none"
              />
              <button
                type="submit"
                className="w-full bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
