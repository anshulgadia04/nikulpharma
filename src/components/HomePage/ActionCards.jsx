import { ArrowRight, Users, BookOpen, MessageSquare } from "lucide-react";

export function ActionCards() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Our Partners */}
          <div
            className="relative rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
            style={{
              backgroundImage: "url(/imges/category/our_partners.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative p-8">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-6">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Partners</h3>
              <p className="text-gray-100 mb-6 leading-relaxed">
                Find authorized channel partners and distributors in your region for local support and service.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center text-white font-medium group"
              >
                Find Partners
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={16}
                />
              </a>
            </div>
          </div>

          {/* Product Catalogue */}
          <div
            className="relative rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
            style={{
              backgroundImage: "url(imges/category/catalogues.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative p-8">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Product Catalogue</h3>
              <p className="text-gray-100 mb-6 leading-relaxed">
                Browse our complete range of precision machinery and request detailed specifications.
              </p>
              <a
                href="/products"
                className="inline-flex items-center text-white font-medium group"
              >
                View Catalogue
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={16}
                />
              </a>
            </div>
          </div>

          {/* Request for Quote */}
          <div
            className="relative rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
            style={{
              backgroundImage: "url(imges/category/quote.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative p-8">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-6">
                <MessageSquare className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Request for Quote</h3>
              <p className="text-gray-100 mb-6 leading-relaxed">
                Get personalized quotes from our global team of precision engineering experts.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center text-white font-medium group"
              >
                Get Quote
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={16}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
