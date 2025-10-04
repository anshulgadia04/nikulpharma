export function TrustedBy() {
  const companies = [
    { abbr: 'SP', name: 'SUN PHARMA' },
    { abbr: 'PF', name: 'Premia Food Additives' },
    { abbr: 'AQ', name: 'Aquatics Complete Water Solutions' },
    { abbr: 'DK', name: 'DIKRA BULK DRUG PVT. LTD.' },
    { abbr: 'OC', name: 'ORACITY Life Sciences LLP' },
    { abbr: 'WT', name: 'Watson' },
    { abbr: 'SO', name: 'SAMRUDDHI Organic Farm' },
    { abbr: 'VL', name: 'VAMSI LABS LTD' },
    { abbr: 'DC', name: 'DECRO Pharma Pvt. Ltd.' },
    { abbr: 'SC', name: 'S & C' },
    { abbr: 'PF', name: 'Pushpam Foods & Beverages' },
    { abbr: 'CN', name: 'Cropthetics Nutrition' },
    { abbr: 'IM', name: 'IMECO' },
    { abbr: 'FP', name: 'T A MAJEED\'S FAIR PHARMA' },
    { abbr: 'AO', name: 'Amoli Organics Pvt. Ltd.' },
    { abbr: 'EI', name: 'EXIDE INDUSTRIES LIMITED' },
    { abbr: 'RI', name: 'ROTOMARK INNOVATIONS' },
    { abbr: 'CT', name: 'CYBERNETIK TECHNOLOGIES' },
    { abbr: 'LP', name: 'Liva PHARMACEUTICALS LTD' },
    { abbr: 'NH', name: 'Nisha Herbal' },
    { abbr: 'DF', name: 'DEEPAK FERTILISERS' },
    { abbr: 'JP', name: 'J.P.CHEMICALS & PHARMA' },
    { abbr: 'UT', name: 'UNIPOWER TECHNOLOGIES' },
    { abbr: 'TT', name: 'TANK TECH DEPOT' },
    { abbr: 'SV', name: 'Shree Venkatesh International' },
    { abbr: 'OC', name: 'Orbit CHEM PHARMACEUTICALS' },
    { abbr: 'TW', name: 'T.WALKER\'S' },
    { abbr: 'CC', name: 'CRUST & CRUMB' },
    { abbr: 'FB', name: 'FISHA BIOGENICS' },
    { abbr: 'OR', name: 'OSCAR REMEDIES PVT.LTD' },
    { abbr: 'GM', name: 'GeM Government e Marketplace' },
    { abbr: 'GC', name: 'GAILLARD Cosmetics Pvt. Ltd.' },
    { abbr: 'AM', name: 'Amul' },
    { abbr: 'NS', name: 'NILSSON' },
    { abbr: 'AN', name: 'Allied Natural Product' },
    { abbr: 'RC', name: 'Ramcides CropScience Pvt.Ltd.' },
    { abbr: 'MD', name: 'Mathabhanga Detergents & Chemicals' },
    { abbr: 'MR', name: 'M R' },
    { abbr: 'NSC', name: 'NSC National Scientific Co. Ltd.' },
    { abbr: 'UMC', name: 'UMC™ UNITED MUD-CHEM' },
    { abbr: 'ML', name: 'Mahalaxmi Rubtech Limited' },
    { abbr: 'SPC', name: 'SHREYA POWER CONTROLS' },
    { abbr: 'ICT', name: 'INSTITUTE OF CHEMICAL TECHNOLOGY' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <style>{`
        @keyframes marqueeRTL {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
        .marquee-track { width: 200%; display: flex; animation: marqueeRTL 60s linear infinite; }
      `}</style>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">Trusted by Industry Leaders</h2>
          <p className="text-gray-600 mt-2">Companies worldwide trust our equipment for their critical manufacturing processes</p>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-white/60 p-6 border border-gray-100">
          <div className="marquee-track">
            {companies.map((c, idx) => (
              <div key={idx} className="w-64 flex-shrink-0 px-4">
                <div className="h-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
                  <div className="mx-auto w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-bold flex items-center justify-center mb-4">
                    {c.abbr}
                  </div>
                  <div className="text-gray-700 font-medium">{c.name}</div>
                </div>
              </div>
            ))}
            {companies.map((c, idx) => (
              <div key={`duplicate-${idx}`} className="w-64 flex-shrink-0 px-4">
                <div className="h-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
                  <div className="mx-auto w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-bold flex items-center justify-center mb-4">
                    {c.abbr}
                  </div>
                  <div className="text-gray-700 font-medium">{c.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
