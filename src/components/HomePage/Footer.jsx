import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Brand + blurb */}
          <div>
            <img src="/logo.png" alt="Company Logo" className="h-10 w-auto mb-6" />
            <p className="text-gray-300 leading-relaxed">
              Leading manufacturer of precision pharmaceutical equipment. Quality, innovation,
              and reliability in every machine we deliver.
            </p>
            <div className="flex items-center space-x-4 mt-6 text-gray-400">
              <a href="#" aria-label="Facebook" className="hover:text-white transition-colors">{/* social */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z"/></svg>
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.28 4.28 0 0 0 1.88-2.36 8.6 8.6 0 0 1-2.71 1.04 4.27 4.27 0 0 0-7.27 3.9 12.12 12.12 0 0 1-8.8-4.46 4.26 4.26 0 0 0 1.32 5.7c-.66-.02-1.28-.2-1.82-.5v.05a4.27 4.27 0 0 0 3.43 4.19c-.31.08-.64.12-.97.12-.24 0-.48-.02-.71-.07a4.28 4.28 0 0 0 3.99 2.97A8.57 8.57 0 0 1 2 19.54 12.09 12.09 0 0 0 8.56 21.5c7.26 0 11.23-6.01 11.23-11.22 0-.17 0-.35-.01-.52A8.03 8.03 0 0 0 22.46 6Z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3A2.94 2.94 0 0 1 22 6v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h13ZM8.34 18v-7.39H5.73V18h2.61Zm-1.3-8.41a1.5 1.5 0 1 0 .02-3 1.5 1.5 0 0 0-.02 3ZM18.27 18v-4.13c0-2.21-1.18-3.24-2.75-3.24a2.4 2.4 0 0 0-2.17 1.19h-.05v-1.02h-2.5V18h2.6v-3.82c0-1 .18-1.96 1.43-1.96 1.24 0 1.26 1.15 1.26 2.02V18h2.18Z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/products" className="hover:text-white transition-colors">Our Machines</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Our Solutions */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Solutions</h4>
            <ul className="space-y-3 text-gray-300">
              <li>Mixing Equipment</li>
              <li>Processing Systems</li>
              <li>Filtration Units</li>
              <li>Custom Solutions</li>
              <li>Installation & Support</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  Industrial Area Phase-2
                  <br />Ahmedabad, Gujarat 380015
                  <br />India
                </div>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-gray-400 mr-3" />
                +91 98765 43210
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                info@nikulpharma.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-400">
          © 2025 Nikul Pharma Equipment. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
