export function Navigation() {
  return (
    <>
      {/* Top Utility Bar */}
      <div className="fixed top-0 w-full z-50 bg-gradient-to-r from-[#1E73BE] to-[#0D4A8A] text-white text-sm">
        <div className="max-w-8xl mx-auto px-10 py-2 flex items-center justify-between">
          {/* Contact Information */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="hover:text-blue-200 transition-colors duration-300">info@nikulpharma.com</span>
            </div>
            <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="hover:text-blue-200 transition-colors duration-300">+91 9876543210</span>
            </div>
          </div>

          {/* Separator */}
          <div className="h-4 w-px bg-white/30"></div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <a href="/career" className="hover:text-blue-200 hover:scale-105 transition-all duration-300 transform hover:-translate-y-0.5">
              Career
            </a>
            <a href="/sitemap" className="hover:text-blue-200 hover:scale-105 transition-all duration-300 transform hover:-translate-y-0.5">
              Sitemap
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:scale-110 hover:rotate-3 transition-all duration-300 transform hover:-translate-y-1">
              <svg className="w-5 h-5 hover:text-blue-200 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="hover:scale-110 hover:rotate-3 transition-all duration-300 transform hover:-translate-y-1">
              <svg className="w-5 h-5 hover:text-blue-200 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
            <a href="#" className="hover:scale-110 hover:rotate-3 transition-all duration-300 transform hover:-translate-y-1">
              <svg className="w-5 h-5 hover:text-blue-200 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="fixed top-8 w-full z-40 bg-white/50 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-8xl mx-auto px-10 py-0.5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center ml-8">
          <a href="/" aria-label="Go to home">
            <img
              src="imges/logo2.png"
              alt="Company Logo"
              className="h-10 md:h-11 w-auto shrink-0 drop-shadow-sm"
            />
          </a>
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-5 relative text-sm md:text-[16px]">
          {[
            { label: "Our Machines", href: "/products" },
            { label: "About Us", href: "/about" },
            { label: "Contact Us", href: "/contact" },
            { label: "Machine Info", href: "/machine-info" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative pb-0.5 text-gray-900 hover:text-gray-900 transition-colors duration-300"
            >
              {item.label}
              {/* Animated underline */}
              <span
                className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"
              />
            </a>
          ))}
        </div>

        {/* Button */}
        <a
          href="/contact"
          className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-4 py-1 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm md:text-[15px]"
        >
          Get Quote
        </a>
        </div>
      </nav>
    </>
  );
}
