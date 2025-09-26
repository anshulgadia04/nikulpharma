export function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/50 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" aria-label="Go to home">
            <img 
              src="/logo.png" 
              alt="Company Logo" 
              className="h-10 md:h-12 w-auto shrink-0 drop-shadow-sm"
            />
          </a>
        </div>
        <div className="hidden md:flex space-x-8">
          <a
            href="/products"
            className="text-gray-900 hover:text-gray-900 transition-colors duration-300"
          >
            Our Machines
          </a>
          <a
            href="/about"
            className="text-gray-900 hover:text-gray-900 transition-colors duration-300"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="text-gray-900 hover:text-gray-900 transition-colors duration-300"
          >
            Contact Us
          </a>
          <a
            href="/machine-info"
            className="text-gray-900 hover:text-gray-900 transition-colors duration-300"
          >
            Machine Info
          </a>
        </div>
        <a
          href="/contact"
          className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          Get Quote
        </a>
      </div>
    </nav>
  );
}
