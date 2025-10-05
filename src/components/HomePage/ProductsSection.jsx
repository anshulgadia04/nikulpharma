import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Selected 4 representative products from our machine catalog
const products = [
  {
    id: 21,
    slug: "high-shear-mixer-granulator-rmg",
    name: "High-Shear Mixer Granulator (RMG)",
    category: "Mixing, Blending & Kneading",
    image: "/images/rmg-industrial-unit.jpg",
    description: "High-shear wet granulation system with cylindrical bowl, impeller and chopper. Jacketed bowl for heating/cooling. Capacities 5–750 L.",
  },
  {
    id: 33,
    slug: "fluid-bed-dryer-fbd",
    name: "Fluid Bed Dryer (FBD) – cGMP",
    category: "Drying & Vacuumize Technique",
    image: "/images/fbd-fluid-bed-dryer.png",
    description: "Fluidized bed dryer for rapid moisture removal of powders and granules using fluidization over a perforated bed with optional internal heat exchanger.",
  },
  {
    id: 41,
    slug: "cone-mill-cgmp",
    name: "Cone Mill (cGMP Model)",
    category: "Milling, Size Reduction & Grading",
    image: "/images/65979a71a97d1d04a216b007.jpg",
    description: "Cone milling for size reduction and deagglomeration of powders & granules. Produces less dust & heat than alternative forms of milling.",
  },
  {
    id: 47,
    slug: "single-rotary-tablet-press",
    name: "Single Rotary Tablet Press Machine",
    category: "Tablet Presses Technique",
    image: "/images/6556f2b9e5241d558f065535.jpg",
    description: "Mechanical device for manufacturing tablets by compressing powder into required size & weight. Produces tablets of various sizes, shapes & weight.",
  },
];

export function ProductsSection({ sectionRef, isVisible }) {
  const navigate = useNavigate();

  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
  };

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
                onClick={() => handleProductClick(product.slug)}
                style={{
                  animationDelay: `${index * 200}ms`,
                }}
              >
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-2xl transition-all duration-700 hover:scale-105">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-95 transition-transform duration-700"
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
                    <button 
                      className="group/btn flex items-center text-gray-900 hover:text-gray-600 transition-colors duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product.slug);
                      }}
                    >
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
