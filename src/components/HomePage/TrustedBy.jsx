export function TrustedBy() {
  const companies = [
    { abbr: 'Te', name: 'TechPharma' },
    { abbr: 'Bi', name: 'BioCorp' },
    { abbr: 'Ch', name: 'ChemLab' },
    { abbr: 'Me', name: 'MediFlow' },
    { abbr: 'Ph', name: 'PharmaPlus' },
    { abbr: 'Bi', name: 'BioTech Solutions' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <style>{`
        @keyframes marqueeLTR {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .marquee-track { width: 200%; display: flex; animation: marqueeLTR 25s linear infinite; }
      `}</style>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">Trusted by Industry Leaders</h2>
          <p className="text-gray-600 mt-2">Companies worldwide trust our equipment for their critical manufacturing processes</p>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-white/60 p-6 border border-gray-100">
          <div className="marquee-track">
            {[...companies, ...companies].map((c, idx) => (
              <div key={idx} className="w-64 flex-shrink-0 px-4">
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
