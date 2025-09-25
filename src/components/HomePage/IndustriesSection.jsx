export function IndustriesSection() {
  const industries = [
    {
      title: "Pharmaceuticals",
      emoji: "💊",
      description:
        "Precision equipment for drug manufacturing and pharmaceutical processing",
    },
    {
      title: "Biotechnology",
      emoji: "🧬",
      description:
        "Specialized systems for biotech research and production facilities",
    },
    {
      title: "Chemical Processing",
      emoji: "🧫",
      description:
        "Robust equipment for chemical manufacturing and processing applications",
    },
    {
      title: "Food & Beverages",
      emoji: "🥤",
      description:
        "Hygienic processing equipment for food and beverage production",
    },
  ];

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateY = ((x - midX) / midX) * 10; // left/right
    const rotateX = -((y - midY) / midY) * 10; // up/down
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    const emoji = card.querySelector('[data-layer="emoji"]');
    const title = card.querySelector('[data-layer="title"]');
    const desc = card.querySelector('[data-layer="desc"]');
    const btn = card.querySelector('[data-layer="btn"]');
    if (emoji) emoji.style.transform = 'translateZ(36px)';
    if (title) title.style.transform = 'translateZ(26px)';
    if (desc) desc.style.transform = 'translateZ(18px)';
    if (btn) btn.style.transform = 'translateZ(30px)';
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    const layers = card.querySelectorAll('[data-layer]');
    layers.forEach((el) => (el.style.transform = 'translateZ(0px)'));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block text-xs font-semibold tracking-widest uppercase text-gray-600 bg-gray-100 px-3 py-1 rounded-full mb-4">
            What we do
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Industries We Serve
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Delivering specialized equipment solutions across multiple industries with precision and
            reliability
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {industries.map((item) => (
            <div
              key={item.title}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center hover:shadow-2xl transition-transform duration-300 h-full flex flex-col will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="text-4xl mb-4" aria-hidden data-layer="emoji">
                {item.emoji}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3" data-layer="title">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6" data-layer="desc">
                {item.description}
              </p>
              <a
                href={`/products?category=${encodeURIComponent(item.title)}`}
                className="mt-auto inline-block bg-gradient-to-r from-gray-900 to-gray-700 text-white px-5 py-2.5 rounded-xl hover:shadow-md hover:scale-105 transition-transform duration-300 text-sm font-medium self-center"
                aria-label={`View machines for ${item.title}`}
                data-layer="btn"
              >
                View Machines
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
