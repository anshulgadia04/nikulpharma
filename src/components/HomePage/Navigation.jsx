export function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/50 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" aria-label="Go to home">
            <img
              src="/logo.png"
              alt="Company Logo"
              className="h-10 md:h-12 w-auto shrink-0 drop-shadow-sm"
            />
          </a>
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-8 relative">
          {[
            { label: "Our Machines", href: "/products" },
            { label: "About Us", href: "/about" },
            { label: "Contact Us", href: "/contact" },
            { label: "Machine Info", href: "/machine-info" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative pb-2 text-gray-900 hover:text-gray-900 transition-colors duration-300"
            >
              {item.label}
              {/* Animated underline */}
              <span
                className="absolute left-0 bottom-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"
              />
            </a>
          ))}
        </div>

        {/* Button */}
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
