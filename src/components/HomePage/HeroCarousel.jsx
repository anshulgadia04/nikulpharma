// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Play, ArrowRight, Award, Users, Globe } from "lucide-react";

// const heroSlides = [
//   {
//     id: 1,
//     title: "Precision Pharmaceutical Equipment",
//     subtitle: "Advanced manufacturing solutions for the pharmaceutical industry",
//     description: "Leading manufacturer of precision pharmaceutical equipment with 25+ years of expertise in drug manufacturing technology.",
//     video: "/videos/hero.mp4",
//     cta: "Explore Our Machines",
//     secondaryCta: "Watch Demo",
//     link: "/products",
//     stats: [
//       { label: "Years Experience", value: "25+", icon: Award },
//       { label: "Countries Served", value: "30+", icon: Globe },
//       { label: "Machines Delivered", value: "500+", icon: Users },
//     ]
//   },
// ];

// // Animation variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       duration: 0.5,
//       staggerChildren: 0.2,
//       delayChildren: 0.3,
//     },
//   },
// };

// const headingVariants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: [0.25, 1, 0.5, 1],
//     },
//   },
// };

// const subtitleVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.7,
//       ease: [0.25, 1, 0.5, 1],
//     },
//   },
// };

// const descriptionVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: [0.25, 1, 0.5, 1],
//     },
//   },
// };

// const statsVariants = {
//   hidden: { opacity: 0, scale: 0.8 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       duration: 0.6,
//       ease: [0.25, 1, 0.5, 1],
//     },
//   },
// };

// const buttonVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.5,
//       ease: [0.25, 1, 0.5, 1],
//     },
//   },
// };

// export function HeroCarousel() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [videoError, setVideoError] = useState(false);

//   return (
//     <section className="relative w-full" style={{ height: '100vh' }}>
//       <div className="relative w-full h-full">
//         {heroSlides.map((slide, index) => (
//           <div
//             key={slide.id}
//             className={`absolute inset-0 transition-opacity duration-1000 pt-16 rounded-b-[50px] overflow-hidden ${
//               index === currentSlide ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             {/* Background Video/Image */}
//             <div className="absolute inset-0">
//               {slide.video && !videoError ? (
//                 <video
//                   key={slide.video}
//                   className="w-full h-full object-cover"
//                   autoPlay
//                   loop
//                   muted
//                   playsInline
//                   preload="auto"
//                   onError={() => setVideoError(true)}
//                 >
//                   <source src={slide.video} type="video/mp4" />
//                 </video>
//               ) : (
//                 <div className="w-full h-full bg-gradient-to-br from-[#1E73BE] to-[#0D4A8A] flex items-center justify-center">
//                   <div className="text-white text-center">
//                     <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
//                     <p className="text-xl">{slide.subtitle}</p>
//                   </div>
//                 </div>
//               )}
//               {/* Professional gradient overlay */}
//               <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
//             </div>

//             {/* Content */}
//             <div className="relative z-10 h-full flex items-center">
//               <div className="max-w-7xl mx-auto px-6 text-white">
//                 <motion.div 
//                   className="max-w-4xl"
//                   initial="hidden"
//                   animate="visible"
//                   variants={containerVariants}
//                   key={slide.id}
//                 >

//                   {/* Main heading */}
//                   <motion.h1 
//                     className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
//                     variants={headingVariants}
//                   >
//                     <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                       {slide.title}
//                     </span>
//                   </motion.h1>
                  
//                   {/* Subtitle */}
//                   <motion.p 
//                     className="text-xl md:text-2xl mb-4 text-gray-200 font-light"
//                     variants={subtitleVariants}
//                   >
//                     {slide.subtitle}
//                   </motion.p>
                  
//                   {/* Description */}
//                   <motion.p 
//                     className="text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed"
//                     variants={descriptionVariants}
//                   >
//                     {slide.description}
//                   </motion.p>

//                   {/* Stats */}
//                   <motion.div 
//                     className="flex flex-wrap gap-8 mb-8"
//                     variants={containerVariants}
//                   >
//                     {slide.stats.map((stat, idx) => {
//                       const IconComponent = stat.icon;
//                       return (
//                         <motion.div 
//                           key={idx} 
//                           className="flex items-center gap-3"
//                           variants={statsVariants}
//                           whileHover={{ scale: 1.05 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
//                             <IconComponent className="w-6 h-6 text-white" />
//                           </div>
//                           <div>
//                             <div className="text-3xl font-bold text-white">{stat.value}</div>
//                             <div className="text-sm text-gray-300">{stat.label}</div>
//                           </div>
//                         </motion.div>
//                       );
//                     })}
//                   </motion.div>

//                   {/* CTA Buttons */}
//                   <motion.div 
//                     className="flex flex-col sm:flex-row gap-4"
//                     variants={containerVariants}
//                   >
//                     <motion.a
//                       href={slide.link}
//                       className="group inline-flex items-center justify-center bg-[#1E73BE] hover:bg-[#0D4A8A] text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105"
//                       variants={buttonVariants}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       {slide.cta}
//                       <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                     </motion.a>
//                     <motion.button 
//                       className="group inline-flex items-center justify-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 border border-white/20 hover:border-white/40"
//                       aria-label={`${slide.secondaryCta} - ${slide.title}`}
//                       variants={buttonVariants}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       <Play className="mr-2 w-5 h-5" />
//                       {slide.secondaryCta}
//                     </motion.button>
//                   </motion.div>
//                 </motion.div>
//               </div>
//             </div>

//             {/* Scroll indicator */}
//             <motion.div 
//               className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 1.5 }}
//             >
//               <div className="flex flex-col items-center gap-2">
//                 <span className="text-sm text-gray-300">Scroll to explore</span>
//                 <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
//                   <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }


import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Globe } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    title: "Precision Pharmaceutical Equipment",
    subtitle:
      "Advanced manufacturing solutions for the pharmaceutical industry",
    description:
      "Leading manufacturer of precision pharmaceutical equipment with 25+ years of expertise in drug manufacturing technology.",
    image: "/images/home.avif", // <-- Add your image here
    cta: "Explore Our Machines",
    link: "/products",
    stats: [
      { label: "Years Experience", value: "25+", icon: Award },
      { label: "Countries Served", value: "30+", icon: Globe },
      { label: "Machines Delivered", value: "500+", icon: Users },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
  },
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
  },
};

const statsVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  },
};

export function HeroCarousel() {
  const [currentSlide] = useState(0);

  return (
    <section className="relative w-full" style={{ height: "100vh" }}>
      <div className="relative w-full h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 pt-14 lg:pt-16 rounded-b-[50px] overflow-hidden ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image} // <--- Your image path here
                alt="Background"
                className="w-full h-full object-cover"
                

              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                <motion.div
                  className="max-w-4xl"
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  key={slide.id}
                >
                  {/* Heading */}
                  <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
                    variants={headingVariants}
                  >
                    <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {slide.title}
                    </span>
                  </motion.h1>

                  {/* Subtitle */}
                  <motion.p
                    className="text-base sm:text-lg md:text-xl lg:text-2xl mb-3 sm:mb-4 text-gray-200 font-light"
                    variants={subtitleVariants}
                  >
                    {slide.subtitle}
                  </motion.p>

                  {/* Description */}
                  <motion.p
                    className="text-sm sm:text-base lg:text-lg text-gray-300 mb-6 sm:mb-8 max-w-2xl leading-relaxed"
                    variants={descriptionVariants}
                  >
                    {slide.description}
                  </motion.p>

                  {/* Stats */}
                  <motion.div
                    className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8"
                    variants={containerVariants}
                  >
                    {slide.stats.map((stat, idx) => {
                      const IconComponent = stat.icon;
                      return (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-2 sm:gap-3"
                          variants={statsVariants}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                              {stat.value}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-300">
                              {stat.label}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>

                  {/* Buttons (Watch Demo Removed) */}
                  <motion.div
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                    variants={containerVariants}
                  >
                    <motion.a
                      href={slide.link}
                      className="group inline-flex items-center justify-center bg-[#1E73BE] hover:bg-[#0D4A8A] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105"
                      variants={buttonVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {slide.cta}
                      <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                  </motion.div>
                </motion.div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
