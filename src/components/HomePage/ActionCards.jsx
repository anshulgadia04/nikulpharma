import { ArrowRight, Users, BookOpen, MessageSquare, Shield, Award, Clock, CheckCircle } from "lucide-react";
import { CardBody, CardContainer, CardItem, useCardRotation } from "../ui/3d-card";
import { useNavigate } from "react-router-dom";

// Component to keep icon flat while card rotates
function FlatIcon({ children, className }) {
  const rotation = useCardRotation();
  
  return (
    <div 
      className={className}
      style={{
        transform: `rotateX(${-rotation.x}deg) rotateY(${-rotation.y}deg)`,
        transformStyle: "preserve-3d"
      }}
    >
      {children}
    </div>
  );
}

export function ActionCards() {
  const navigate = useNavigate();
  
  const handleCardClick = (link) => {
    navigate(link);
  };

  const cards = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Global Partners",
      description: "Find authorized channel partners and distributors in your region for local support and service.",
      link: "/contact",
      cta: "Find Partners",
      gradient: "from-[#1E73BE] to-[#0D4A8A]",
      bgImage: "url(/imges/category/our_partners.png)",
      stats: "50+ Partners",
      features: ["Local Support", "Expert Service", "Quick Response"]
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Product Catalogue",
      description: "Browse our complete range of precision machinery and request detailed specifications.",
      link: "/products",
      cta: "View Catalogue",
      gradient: "from-[#0D4A8A] to-[#09243c]",
      bgImage: "url(/imges/category/catalogues.png)",
      stats: "50+ Machines",
      features: ["Detailed Specs", "Technical Data", "3D Models"]
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Get Quote",
      description: "Get personalized quotes from our global team of precision engineering experts.",
      link: "/contact",
      cta: "Request Quote",
      gradient: "from-[#09243c] to-[#0D2240]",
      bgImage: "url(/imges/category/quote.png)",
      stats: "24h Response",
      features: ["Custom Solutions", "Expert Consultation", "Fast Delivery"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1E73BE]/10 text-[#1E73BE] rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-[#1E73BE] rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold">How We Can Help You</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Our <span className="bg-gradient-to-r from-[#1E73BE] to-[#0D4A8A] bg-clip-text text-transparent">Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive pharmaceutical equipment solutions designed to meet your manufacturing needs with precision and reliability
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, index) => (
            <CardContainer key={index} className="h-full" containerClassName="py-0">
              <CardBody 
                className="relative group/card w-full h-auto md:h-[500px] rounded-lg md:rounded-2xl p-6 md:p-8 border border-white/20 overflow-hidden shadow-lg md:shadow-2xl md:hover:shadow-3xl transition-all duration-300 md:duration-500 cursor-pointer touch-manipulation md:hover:-translate-y-1"
                style={{
                  backgroundImage: card.bgImage,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onClick={() => handleCardClick(card.link)}
              >
                {/* Gradient Overlay */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-90 md:opacity-85 md:group-hover/card:opacity-90 transition-opacity duration-300 md:duration-500`}
                />
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Icon and Stats */}
                  <CardItem translateZ="30" className="flex items-center justify-between mb-8 md:mb-10">
                    <FlatIcon className="w-16 h-16 md:w-20 md:h-20 bg-white/25 backdrop-blur-md rounded-xl md:rounded-2xl flex items-center justify-center text-white md:group-hover/card:scale-110 transition-all duration-300 md:duration-500 shadow-md md:shadow-lg">
                      {card.icon}
                    </FlatIcon>
                    <div className="text-right ml-3">
                      <div className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">{card.stats}</div>
                      <div className="text-sm text-white/90 font-medium">Available</div>
                    </div>
                  </CardItem>

                  {/* Content */}
                  <div className="flex-1 mt-3 md:mt-4">
                    <CardItem
                      translateZ="40"
                      className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 md:group-hover/card:text-white transition-colors duration-300 md:duration-500 drop-shadow-lg"
                    >
                      {card.title}
                    </CardItem>
                    <CardItem
                      translateZ="50"
                      as="p"
                      className="text-gray-100 mb-5 md:mb-6 leading-relaxed text-sm md:text-base drop-shadow-md"
                    >
                      {card.description}
                    </CardItem>
                    
                    {/* Features */}
                    <CardItem translateZ="60" className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                      {card.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 md:gap-3 text-white md:group-hover/card:text-white transition-colors duration-200 md:duration-300">
                          <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-300 md:group-hover/card:text-green-200 transition-colors duration-200 md:duration-300" />
                          <span className="text-xs md:text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </CardItem>
                  </div>

                  {/* CTA */}
                  <CardItem translateZ="70" className="mt-auto">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleCardClick(card.link); }}
                      className="group/btn inline-flex items-center justify-center w-full bg-white/25 backdrop-blur-md hover:bg-white/35 text-white px-5 py-3 md:px-6 md:py-4 rounded-lg md:rounded-xl font-semibold transition-all duration-300 md:duration-500 border border-white/40 hover:border-white/60 cursor-pointer shadow-md md:shadow-lg md:hover:shadow-xl md:transform md:hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/60"
                      aria-label={`${card.cta} - ${card.title}`}
                    >
                      <span className="text-sm md:text-base">{card.cta}</span>
                      <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 md:group-hover/btn:translate-x-2 transition-transform duration-300 md:duration-500" />
                    </button>
                  </CardItem>

                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>

      </div>
    </section>
  );
}