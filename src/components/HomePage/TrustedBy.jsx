import { useState, useRef } from 'react';

export function TrustedBy() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const companies = [
    { name: 'SUN PHARMA', logo: 'sun-pharma.png' },
    { name: 'Premia Food Additives', logo: 'premia-food.png' },
    { name: 'Aquatics Complete Water Solutions', logo: 'aquatics.png' },
    { name: 'DIKRA BULK DRUG PVT. LTD.', logo: 'dikra.png' },
    { name: 'ORACITY Life Sciences LLP', logo: 'oracity.png' },
    { name: 'Watson', logo: 'watson.png' },
    { name: 'SAMRUDDHI Organic Farm', logo: 'samruddhi.png' },
    { name: 'VAMSI LABS LTD', logo: 'vamsi-labs.png' },
    { name: 'DECRO Pharma Pvt. Ltd.', logo: 'decro.png' },
    { name: 'S & C', logo: 's-c.png' },
    { name: 'Pushpam Foods & Beverages', logo: 'pushpam.png' },
    { name: 'Cropthetics Nutrition', logo: 'cropthetics.png' },
    { name: 'IMECO', logo: 'imeco.png' },
    { name: 'T A MAJEED\'S FAIR PHARMA', logo: 'fair-pharma.png' },
    { name: 'Amoli Organics Pvt. Ltd.', logo: 'amoli.png' },
    { name: 'EXIDE INDUSTRIES LIMITED', logo: 'exide.png' },
    { name: 'ROTOMARK INNOVATIONS', logo: 'rotomark.png' },
    { name: 'CYBERNETIK TECHNOLOGIES', logo: 'cybernetik.png' },
    { name: 'Liva PHARMACEUTICALS LTD', logo: 'liva.png' },
    { name: 'Nisha Herbal', logo: 'nisha-herbal.png' },
    { name: 'DEEPAK FERTILISERS', logo: 'deepak.png' },
    { name: 'J.P.CHEMICALS & PHARMA', logo: 'jp-chemicals.png' },
    { name: 'UNIPOWER TECHNOLOGIES', logo: 'unipower.png' },
    { name: 'TANK TECH DEPOT', logo: 'tank-tech.png' },
    { name: 'Shree Venkatesh International', logo: 'shree-venkatesh.png' },
    { name: 'Orbit CHEM PHARMACEUTICALS', logo: 'orbit.png' },
    { name: 'T.WALKER\'S', logo: 't-walkers.png' },
    { name: 'CRUST & CRUMB', logo: 'crust-crumb.png' },
    { name: 'FISHA BIOGENICS', logo: 'fisha.png' },
    { name: 'OSCAR REMEDIES PVT.LTD', logo: 'oscar.png' },
    { name: 'GeM Government e Marketplace', logo: 'gem.png' },
    { name: 'GAILLARD Cosmetics Pvt. Ltd.', logo: 'gaillard.png' },
    { name: 'Amul', logo: 'amul.png' },
    { name: 'NILSSON', logo: 'nilsson.png' },
    { name: 'Allied Natural Product', logo: 'allied.png' },
    { name: 'Ramcides CropScience Pvt.Ltd.', logo: 'ramcides.png' },
    { name: 'Mathabhanga Detergents & Chemicals', logo: 'mathabhanga.png' },
    { name: 'M R', logo: 'mr.png' },
    { name: 'NSC National Scientific Co. Ltd.', logo: 'nsc.png' },
    { name: 'UMC™ UNITED MUD-CHEM', logo: 'umc.png' },
    { name: 'SHREYA POWER CONTROLS', logo: 'shreya-power.png' },
    { name: 'INSTITUTE OF CHEMICAL TECHNOLOGY', logo: 'ict.png' },
  ];

  const trackRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
    trackRef.current.style.cursor = 'grabbing';
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsPaused(false);
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsPaused(false);
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    trackRef.current.scrollLeft += e.deltaY;
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gray-50">
      {/* Background Image with soft overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/home page background .jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="absolute inset-0 bg-white/65"></div>
      </div>
      <style>{`
        @keyframes marqueeRTL {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track { 
          width: 200%; 
          display: flex; 
          animation: marqueeRTL 40s linear infinite; 
          cursor: grab;
          user-select: none;
        }
        .marquee-track.paused {
          animation-play-state: paused;
        }
        .marquee-track:active {
          cursor: grabbing;
        }
        .marquee-container {
          overflow-x: auto;
          overflow-y: hidden;
          position: relative;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .marquee-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">Trusted by Industry Leaders</h2>
          <p className="text-gray-600 mt-2">Companies worldwide trust our equipment for their critical manufacturing processes</p>
        </div>

        <div className="relative rounded-3xl bg-white/60 p-6 border border-gray-100">
          <div 
            className="marquee-container"
            ref={trackRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onWheel={handleWheel}
          >
            <div className={`marquee-track ${isPaused ? 'paused' : ''}`}>
            {companies.map((company, idx) => (
              <div key={idx} className="w-80 flex-shrink-0 px-4">
                <div className="h-full bg-white rounded-3xl border border-gray-100 shadow-sm p-6 text-center flex flex-col items-center justify-center">
                  <div className="mx-auto w-32 h-32 rounded-2xl bg-white flex items-center justify-center mb-4 p-3">
                    <img
                      src={`/images/logos/${company.logo}`}
                      alt={company.name}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-bold flex items-center justify-center text-sm hidden">
                      {company.name.split(' ').map(word => word[0]).join('').substring(0, 3)}
                    </div>
                  </div>
                  <div className="text-gray-700 font-medium text-sm leading-tight">{company.name}</div>
                </div>
              </div>
            ))}
            {companies.map((company, idx) => (
              <div key={`duplicate-${idx}`} className="w-64 flex-shrink-0 px-4">
                <div className="h-full bg-white rounded-3xl border border-gray-100 shadow-sm p-6 text-center flex flex-col items-center justify-center">
                  <div className="mx-auto w-32 h-32 rounded-2xl bg-white flex items-center justify-center mb-4 p-3">
                    <img
                      src={`/images/logos/${company.logo}`}
                      alt={company.name}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-bold flex items-center justify-center text-sm hidden">
                      {company.name.split(' ').map(word => word[0]).join('').substring(0, 3)}
                    </div>
                  </div>
                  <div className="text-gray-700 font-medium text-sm leading-tight">{company.name}</div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
