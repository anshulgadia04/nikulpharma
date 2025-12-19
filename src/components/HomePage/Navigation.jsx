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
              <span className="hover:text-blue-200 transition-colors duration-300">sales@nikulpharmaequipments.com</span>
            </div>
            <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="hover:text-blue-200 transition-colors duration-300">1234</span>
            </div>
          </div>

          {/* Separator */}
          <div className="h-4 w-px bg-white/30"></div>

          {/* Social Media Icons and Links */}
          <div className="flex items-center space-x-6">
            <a href="/ISO" className="hover:text-blue-200 hover:scale-105 transition-all duration-300 transform hover:-translate-y-0.5">
              ISO
            </a>
            <a href="/GMP" className="hover:text-blue-200 hover:scale-105 transition-all duration-300 transform hover:-translate-y-0.5">
              GMP
            </a>
            
            {/* Separator */}
            <div className="h-4 w-px bg-white/30"></div>
            
            <a href="#" className="hover:scale-110 hover:rotate-3 transition-all duration-300 transform hover:-translate-y-1" aria-label="Facebook">
              <svg className="w-5 h-5 hover:text-blue-200 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            
            <a href="https://www.instagram.com/nikul_pharma_equipment?igsh=bHRlYnRnamVocm90"
                target="_blank"
              rel="noopener noreferrer"
                  className="hover:scale-110 hover:rotate-3 transition-all duration-300 transform hover:-translate-y-1"
                      aria-label="Instagram"
            >
              <svg className="w-5 h-5 hover:text-pink-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07a6.52 6.52 0 0 1 2.192.415 4.4 4.4 0 0 1 1.601 1.04 4.4 4.4 0 0 1 1.04 1.601 6.52 6.52 0 0 1 .415 2.192c.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85a6.52 6.52 0 0 1-.415 2.192 4.4 4.4 0 0 1-1.04 1.601 4.4 4.4 0 0 1-1.601 1.04 6.52 6.52 0 0 1-2.192.415c-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07a6.52 6.52 0 0 1-2.192-.415 4.4 4.4 0 0 1-1.601-1.04 4.4 4.4 0 0 1-1.04-1.601 6.52 6.52 0 0 1-.415-2.192C2.175 15.784 2.163 15.404 2.163 12s.012-3.584.07-4.85a6.52 6.52 0 0 1 .415-2.192 4.4 4.4 0 0 1 1.04-1.601A4.4 4.4 0 0 1 5.29 2.648a6.52 6.52 0 0 1 2.192-.415C8.748 2.175 9.128 2.163 12 2.163m0-2.163C8.741 0 8.332.014 7.052.072 5.773.13 4.763.333 3.908.74a6.6 6.6 0 0 0-2.4 1.569A6.6 6.6 0 0 0 .74 4.908C.333 5.763.13 6.773.072 8.052.014 9.332 0 9.741 0 12s.014 2.668.072 3.948c.058 1.279.261 2.289.668 3.144a6.6 6.6 0 0 0 1.569 2.4 6.6 6.6 0 0 0 2.4 1.569c.855.407 1.865.61 3.144.668C9.332 23.986 9.741 24 12 24s2.668-.014 3.948-.072c1.279-.058 2.289-.261 3.144-.668a6.6 6.6 0 0 0 2.4-1.569 6.6 6.6 0 0 0 1.569-2.4c.407-.855.61-1.865.668-3.144.058-1.28.072-1.689.072-3.948s-.014-2.668-.072-3.948c-.058-1.279-.261-2.289-.668-3.144a6.6 6.6 0 0 0-1.569-2.4 6.6 6.6 0 0 0-2.4-1.569C18.237.333 17.227.13 15.948.072 14.668.014 14.259 0 12 0z" />
                  <path d="M12 5.838A6.162 6.162 0 0 0 5.838 12 6.162 6.162 0 0 0 12 18.162 6.162 6.162 0 0 0 18.162 12 6.162 6.162 0 0 0 12 5.838m0 10.162A3.999 3.999 0 1 1 12 7a3.999 3.999 0 0 1 0 8z" />
                  <circle cx="18.406" cy="5.594" r="1.44" />
              </svg>
            </a>

            <a 
  href="https://www.youtube.com/@nikulpharmaequipment" 
  target="_blank" 
  rel="noopener noreferrer"
  className="hover:scale-110 hover:rotate-3 transition-all duration-300 transform hover:-translate-y-1" 
  aria-label="YouTube"
>
  <svg 
    className="w-5 h-5 hover:text-blue-200 transition-colors duration-300" 
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
</a>

          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="fixed top-8 w-full z-40 bg-white/100 backdrop-blur-md border-b border-gray-100 shadow-lg rounded-b-[2rem]">
        <div className="max-w-8xl mx-auto px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center ml-8">
          <a href="/" aria-label="Go to home">
            <img
              src="/imges/logo2.png"
              alt="Company Logo"
              className="h-12 md:h-14 w-auto shrink-0 drop-shadow-sm"
            />
          </a>
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-8 relative text-sm md:text-[16px]">
          {/* Our Machines */}
          <a
            href="/products"
            className="group relative pb-0.5 text-gray-900 hover:text-gray-900 transition-colors duration-300"
          >
            Our Machines
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300" />
          </a>

          {/* Resources dropdown */}
          <div className="relative group">
            <a
              href="#"
              className="pb-0.5 text-gray-900 hover:text-gray-900 transition-colors duration-300 flex items-center"
              onClick={(e) => e.preventDefault()}
            >
              Resources
              <svg className="ml-1 w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 011.08 1.04l-4.24 4.25a.75.75 0 01-1.08 0l-4.25-4.25a.75.75 0 01.01-1.06z" clipRule="evenodd" />
              </svg>
            </a>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-100 py-2">
              <a href="/resources/blog" className="block px-4 py-2 text-gray-900 hover:bg-gray-50">Blog</a>
              <a href="/resources/videos" className="block px-4 py-2 text-gray-900 hover:bg-gray-50">Videos</a>
            </div>
          </div>

          {/* About */}
          <a
            href="/about"
            className="group relative pb-0.5 text-gray-900 hover:text-gray-900 transition-colors duration-300"
          >
            About Us
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300" />
          </a>

          {/* Contact */}
          <a
            href="/contact"
            className="group relative pb-0.5 text-gray-900 hover:text-gray-900 transition-colors duration-300"
          >
            Contact Us
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300" />
          </a>
        </div>

        {/* Button */}
        <a
          href="/contact"
          className="bg-[#09243c] text-white px-8 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 text-base md:text-lg flex items-center"
        >
          Get Quote
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
        </div>
      </nav>
    </>
  );
}