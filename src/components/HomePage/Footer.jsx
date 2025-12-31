import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="bg-[#0D2240] text-white rounded-t-[3rem]"
      role="contentinfo"
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div
              className="flex items-center gap-4 mb-6 sm:mb-8"
            >
              <a href="/" aria-label="Go to home">
                <img 
                  src="/imges\footerLogo2.png" 
                  alt="Nikul Pharma Logo" 
                  className="w-48 sm:w-56 lg:w-64 object-contain hover:scale-105 duration-200 cursor-pointer"
                />
              </a>
              
            </div>
            <p
              className="text-sm sm:text-base text-gray-300 mb-6 leading-relaxed"
            >
              Leading manufacturer of precision pharmaceutical equipment. Quality, innovation, and reliability in every machine we deliver.
            </p>
            <div
              className="flex gap-3 sm:gap-4"
            >
              {[
                { name: "Facebook", icon: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" },
                { name: "Twitter", icon: "M22.46 6c-.77.35-1.6.58-2.46.69a4.28 4.28 0 0 0 1.88-2.36 8.6 8.6 0 0 1-2.71 1.04 4.27 4.27 0 0 0-7.27 3.9 12.12 12.12 0 0 1-8.8-4.46 4.26 4.26 0 0 0 1.32 5.7c-.66-.02-1.28-.2-1.82-.5v.05a4.27 4.27 0 0 0 3.43 4.19c-.31.08-.64.12-.97.12-.24 0-.48-.02-.71-.07a4.28 4.28 0 0 0 3.99 2.97A8.57 8.57 0 0 1 2 19.54 12.09 12.09 0 0 0 8.56 21.5c7.26 0 11.23-6.01 11.23-11.22 0-.17 0-.35-.01-.52A8.03 8.03 0 0 0 22.46 6Z" },
                { name: "LinkedIn", icon: "M19 3A2.94 2.94 0 0 1 22 6v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h13ZM8.34 18v-7.39H5.73V18h2.61Zm-1.3-8.41a1.5 1.5 0 1 0 .02-3 1.5 1.5 0 0 0-.02 3ZM18.27 18v-4.13c0-2.21-1.18-3.24-2.75-3.24a2.4 2.4 0 0 0-2.17 1.19h-.05v-1.02h-2.5V18h2.6v-3.82c0-1 .18-1.96 1.43-1.96 1.24 0 1.26 1.15 1.26 2.02V18h2.18Z" }
              ].map((social, index) => (
                <a
                  key={social.name}
                  className="w-10 h-10 bg-gray-700 hover:bg-[#1E73BE] rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer group"
                  href="#"
                  aria-label={social.name}
                >
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-lg font-bold mb-6"
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Our Machines", href: "/products" },
                { label: "About Us", href: "/about" },
                { label: "Contact Us", href: "/contact" }
              ].map((link, index) => (
                <li key={link.label}>
                  <a
                    className="text-gray-300 hover:text-[#1E73BE] transition-all duration-300 cursor-pointer block"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Solutions */}
          <div>
            <h3
              className="text-lg font-bold mb-6"
            >
              Our Solutions
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Mixing Equipment", href: "#" },
                { label: "Processing Systems", href: "#" },
                { label: "Filtration Units", href: "#" },
                { label: "Custom Solutions", href: "#" },
                { label: "Installation & Support", href: "#" }
              ].map((solution, index) => (
                <li key={solution.label}>
                  <a
                    className="text-gray-300 hover:text-[#1E73BE] transition-all duration-300 cursor-pointer block"
                    href={solution.href}
                  >
                    {solution.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              className="text-lg font-bold mb-6"
            >
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-5 h-5 mt-1 text-[#1E73BE] flex-shrink-0"
                >
                  <MapPin className="w-5 h-5" />
                </div>
                <p className="text-gray-300">
                  Industrial Area Phase-2<br />
                  Ahmedabad, Gujarat 380015<br />
                  India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-5 h-5 text-[#1E73BE] flex-shrink-0"
                >
                  <Phone className="w-5 h-5" />
                </div>
                <a
                  className="text-gray-300 hover:text-[#1E73BE] transition-all duration-300"
                  href="tel:+918048048071"
                >
                  +91 8048048071
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-5 h-5 text-[#1E73BE] flex-shrink-0"
                >
                  <Mail className="w-5 h-5" />
                </div>
                <a
                  className="text-gray-300 hover:text-[#1E73BE] transition-all duration-300"
                  href="mailto:info@nikulpharma.com"
                >
                  sales@nikulpharmaequipments.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div
        className="border-t border-gray-700 py-4 sm:py-6"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm sm:text-base text-gray-400">
            © 2025 Nikul Pharma Equipment. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
