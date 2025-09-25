import { ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Precision CNC Mill X1",
    category: "CNC Machinery",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop",
    description: "Ultra-precision manufacturing with 0.001mm accuracy",
  },
  {
    id: 2,
    name: "Industrial Lathe Pro",
    category: "Turning Equipment",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop",
    description: "Heavy-duty turning solutions for complex components",
  },
  {
    id: 3,
    name: "Automated Assembly Line",
    category: "Automation",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop",
    description: "Fully automated production with AI-driven quality control",
  },
  {
    id: 4,
    name: "Hydraulic Press System",
    category: "Forming Equipment",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop",
    description:
      "High-force forming capabilities for industrial applications",
  },
];

export function ProductsSection({ sectionRef, isVisible }) {
  return (
    <section id="products" ref={sectionRef} className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-light text-center mb-16 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Our Machines
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="group cursor-pointer"
                style={{
                  animationDelay: `${index * 200}ms`,
                }}
              >
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-2xl transition-all duration-700 hover:scale-105">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8">
                    <div className="text-sm text-gray-500 mb-2">
                      {product.category}
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {product.description}
                    </p>
                    <button className="group/btn flex items-center text-gray-900 hover:text-gray-600 transition-colors duration-300">
                      Learn More
                      <ArrowRight
                        className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300"
                        size={16}
                      />
                    </button>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
