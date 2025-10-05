export const productCategories = [
  {
    id: 'mixing-blending-kneading',
    name: 'Mixing, Blending & Kneading Technique',
    description: 'Industrial mixers, blenders and kneaders for powders, granules and pastes',
    icon: 'RotateCcw',
    color: 'from-orange-600 to-orange-700'
  },
  {
    id: 'drying-vacuumize-technique',
    name: 'Drying & Vacuumize Technique',
    description: 'FBDs, tray dryers, vacuum dryers and specialized drying systems',
    icon: 'Sun',
    color: 'from-amber-500 to-amber-600'
  },
  {
    id: 'milling-size-reduction',
    name: 'Milling, Size Reduction & Grading',
    description: 'Equipment for milling, pulverising, mixing, shredding and chopping.',
    icon: 'Target',
    color: 'from-teal-500 to-teal-600'
  },
  {
    id: 'tablet-presses-technique',
    name: 'Tablet Presses Technique',
    description: 'High-performance tablet presses, inspection belts, and metal detectors.',
    icon: 'Pill',
    color: 'from-blue-600 to-blue-700'
  },
  {
    id: 'injection-sterilizing-technique',
    name: 'Injection & Sterilizing',
    description: 'Equipment for sterile water, steam generation, and sterilization processes.',
    icon: 'Shield',
    color: 'from-purple-600 to-purple-700'
  },
  {
    id: 'ointment-cream-paste-technique',
    name: 'Ointment, Cream & Paste',
    description: 'Complete plants and filling machines for semi-solid products.',
    icon: 'Package',
    color: 'from-rose-500 to-rose-600'
  },
  {
    id: 'reaction-filtration-technique',
    name: 'Reaction & Filtration',
    description: 'Vessels and equipment for chemical reactions and solid-liquid separation.',
    icon: 'Microscope',
    color: 'from-lime-500 to-lime-600'
  },
  {
    id: 'liquid-dosage-technique',
    name: 'Liquid Dosage & Filtration',
    description: 'A range of filters and housings for liquid processing and filtration.',
    icon: 'Target',
    color: 'from-cyan-500 to-cyan-600'
  }
];

export const products = [
  // Existing Products...
  {
    id: 1,
    slug: 'single-punch-tablet-press',
    name: 'Single Punch Tablet Press',
    category: 'tablet-presses',
    subcategory: 'Single Station',
    pdf: '/pdfs/single-punch-tablet-press.pdf',
    image: '/images/659799c8d44bdff7d747d4f5.jpg',
    description: 'High-precision single punch tablet press for laboratory and small-scale production',
    features: ['Precise weight control', 'Easy tool changeover', 'Digital pressure monitoring', 'GMP compliant design'],
    applications: ['R&D laboratories', 'Small batch production', 'Tablet development', 'Quality testing'],
    specs: {
      'Production capacity': 'Up to 10,000 tablets/hour',
      'Max tablet diameter': '25mm',
      'Max tablet thickness': '12mm',
      'Pressure range': '0-50 kN',
      'Power': '2.2 kW',
      'Dimensions': '800x600x1200 mm'
    },
    accuracy: '±2% weight variation',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE', 'FDA approved']
  },
  {
    id: 21,
    slug: 'high-shear-mixer-granulator-rmg',
    name: 'High-Shear Mixer Granulator (RMG)',
    category: 'mixing-blending-kneading',
    subcategory: 'Wet Granulation',
    pdf: '/pdfs/high-shear-mixer-granulator.pdf',
    image: '/images/rmg-industrial-unit.jpg',
    description: 'High-shear wet granulation system with cylindrical bowl, impeller and chopper. Jacketed bowl for heating/cooling. Capacities 5–750 L.',
    features: ['SS304/316L contact parts', 'Pneumatic lid lifting', 'Easy dismantle and cleaning', 'PTFE/Silicone gaskets'],
    applications: ['Wet granulation', 'Tablet formulation', 'Binder addition', 'R&D and production'],
    specs: {
      'Capacity': '5–750 L',
      'Finish': '0.3 RA (inside/outside)',
      'Utilities': 'Pneumatics pre-tubed'
    },
    accuracy: '±3% granule size',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 22,
    slug: 'ribbon-mixers-blender',
    name: 'Ribbon Mixers Blender',
    category: 'mixing-blending-kneading',
    subcategory: 'Powder Mixing',
    pdf: '/pdfs/ribbon-mixer.pdf',
    image: '/images/ribbon-blender-industrial.jpg',
    description: 'U-shaped horizontal blender with inner and outer helical ribbons for efficient dry powder mixing. Capacities 10 kg to 5000 kg.',
    features: ['Gentle, uniform blending', 'Paddle for center discharge', 'Easy cleaning and maintenance'],
    applications: ['Pharma powders', 'Cosmetics', 'Food ingredients', 'Chemicals'],
    specs: {
      'Capacity': '10 kg – 5000 kg',
      'Drive': 'Helical ribbon agitator'
    },
    accuracy: '±5% blend uniformity',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 23,
    slug: 'paddle-mixer-blender',
    name: 'Paddle Mixer Blender',
    category: 'mixing-blending-kneading',
    subcategory: 'Powder Mixing',
    pdf: '/pdfs/paddle-mixer.pdf',
    image: '/images/paddle-vacuum-mixer-comber-termomix.jpg',
    description: 'Paddle type mixer for homogeneous mixing of powders with liquids. Single or double shaft with inner/outer paddles. Speed up to 60 RPM.',
    features: ['Even liquid addition and coating', 'Minimal heat generation', 'Center discharge'],
    applications: ['Granulation mixing', 'Cosmetic paste', 'Food and chemical mixing'],
    specs: {
      'Capacity': '50 kg – 4000 kg',
      'Speed': 'Up to 60 RPM'
    },
    accuracy: '±5% mix homogeneity',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 24,
    slug: 'sigma-mixer-kneader-extruder',
    name: 'Sigma Mixer Kneader And Extruder',
    category: 'mixing-blending-kneading',
    subcategory: 'Kneading',
    pdf: '/pdfs/sigma-mixer-kneader-extruder.pdf',
    image: '/images/65943286c513bfbb196b3156.jpg',
    description: 'Counter-rotating kneading blades with one or two extrusion screws for heavy-duty mixing of sticky/tacky materials.',
    features: ['Low mixing time', 'Eliminates manual scraping', 'Variable extrusion speed'],
    applications: ['High viscosity pastes', 'Ointments', 'Adhesives', 'Detergent cakes'],
    specs: {
      'Capacity': '10 L – 2500 L',
      'Blades': 'Counter-rotating Z blades'
    },
    accuracy: '±5% batch consistency',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 25,
    slug: 'octagonal-blender',
    name: 'Octagonal Blender',
    category: 'mixing-blending-kneading',
    subcategory: 'Blending',
    pdf: '/pdfs/octagonal-blender.pdf',
    image: '/images/65979a71a97d1d04a216b007.jpg',
    description: 'Low speed octagonal shell blender for gentle mixing of large batches with dust-free transfer options.',
    features: ['Capacity 25 L to 25000 L', 'Pneumatic valves for dust-free transfer', 'Level sensor auto cut-off'],
    applications: ['Granule blending', 'Lubrication mixing', 'Bulk blending'],
    specs: {
      'Capacity': '25 – 25000 L'
    },
    accuracy: '±3% blend uniformity',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 26,
    slug: 'double-cone-blender',
    name: 'Double Cone Blender',
    category: 'mixing-blending-kneading',
    subcategory: 'Blending',
    pdf: '/pdfs/double-cone-blender.pdf',
    image: '/images/double-cone-blender-machine.webp',
    description: 'Classic double cone vessel for intimate dry blending of free-flowing solids with automated discharge.',
    features: ['Capacity 25 L to 2500 L', 'Uniform mixing via rotating cone'],
    applications: ['Dry powder blending', 'Food and cosmetic powders'],
    specs: {
      'Capacity': '25 – 2500 L'
    },
    accuracy: '±5% blend uniformity',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 27,
    slug: 'conta-bin-container-tumbler-blender',
    name: 'Conta Bin-Container Tumbler Blender',
    category: 'mixing-blending-kneading',
    subcategory: 'IBC Blending',
    pdf: '/pdfs/conta-bin-tumbler-blender.pdf',
    image: '/images/65943286c513bfbb196b3156.jpg',
    description: 'Single step dust-free transfer and IBC bin blending system with interchangeable bins and contained operation.',
    features: ['Interchangeable IBC bins', 'Closed contained transfer', 'Dust-free connection'],
    applications: ['Granules blending', 'Tablet press feeding'],
    specs: {
      'Capacity': '50 – 2000 L'
    },
    accuracy: '±3% blend uniformity',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 28,
    slug: 'continuous-mixer',
    name: 'Continuous Mixer',
    category: 'mixing-blending-kneading',
    subcategory: 'Continuous Mixing',
    pdf: '/pdfs/continuous-mixer.pdf',
    image: '/images/6556f3e704265117dad1c1b7.jpg',
    description: 'Ingredients are introduced and mixed as they pass through; continuous discharge provides consistent homogeneity.',
    features: ['Lower vessel size for same output', 'Reduced segregation risk', 'Lower running costs'],
    applications: ['Food production', 'Chemical manufacturing', 'Pharma continuous lines'],
    specs: {
      'Capacity': '25 kg – 2000 kg'
    },
    accuracy: '±2% output consistency',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 29,
    slug: 'v-shape-blender',
    name: 'V Shape Blender',
    category: 'mixing-blending-kneading',
    subcategory: 'Blending',
    pdf: '/pdfs/v-shape-blender.pdf',
    image: '/images/v-blender-equipment.jpg',
    description: 'Twin shell V-cone blender for precise blending and lubrication with option for intensifier bar.',
    features: ['Rigid drive with reduction gearbox', 'Butterfly valve and manhole'],
    applications: ['Pharmaceuticals', 'Food and nutraceuticals'],
    specs: {
      'Capacity': '25 – 3000 L'
    },
    accuracy: '±3% blend uniformity',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 30,
    slug: 'mass-mixer',
    name: 'Mass Mixer',
    category: 'mixing-blending-kneading',
    subcategory: 'Wet/Dry Mixing',
    pdf: '/pdfs/mass-mixer.pdf',
    image: '/images/659799c8d44bdff7d747d4f5.jpg',
    description: 'Tilting pan mass mixer with rigid structure for uniform mixing of dry and wet materials.',
    features: ['Capacities 5–1000 L', 'Self-adjusting sealing', 'Paddle agitator for center discharge'],
    applications: ['Pharma powders', 'Food and herbals', 'Agro chemicals'],
    specs: {
      'Capacity': '5 – 1000 L'
    },
    accuracy: '±5% mix homogeneity',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 31,
    slug: 'planetary-mixers',
    name: 'Planetary Mixers',
    category: 'mixing-blending-kneading',
    subcategory: 'Ointment/Cream Mixing',
    pdf: '/pdfs/planetary-mixer.pdf',
    image: '/images/planetary-mixer-high-viscosity.webp',
    description: 'Planetary action mixer for products of different viscosities and densities with vacuum mixing option.',
    features: ['Mix under vacuum', 'Motorized/Hydraulic bowl lift', 'Teflon scrapers'],
    applications: ['Ointments', 'Creams', 'Lotions', 'Toothpaste', 'Resins'],
    specs: {
      'Capacity': '3 – 2500 L'
    },
    accuracy: '±2% product uniformity',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 32,
    slug: 'conical-screw-mixer',
    name: 'Conical Screw Mixer',
    category: 'mixing-blending-kneading',
    subcategory: 'Powder/Paste Mixing',
    pdf: '/pdfs/conical-screw-mixer.pdf',
    image: '/images/65943286c513bfbb196b3156.jpg',
    description: 'Conical mixer with high-speed rotor for liquid addition or de-lumping providing excellent dispersion and coating.',
    features: ['Gentle mixing of powders, pastes and liquids', 'Spray nozzle/intensifier', 'Heating and cooling possible'],
    applications: ['Segregative powders', 'Pastes and liquids', 'Moisture addition granulation'],
    specs: {
      'Capacity': '50 kg – 1000 kg'
    },
    accuracy: '±3% blend uniformity',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  // Drying & Vacuumize Technique
  {
    id: 33,
    slug: 'fluid-bed-dryer-fbd',
    name: 'Fluid Bed Dryer (FBD) – cGMP',
    category: 'drying-vacuumize-technique',
    subcategory: 'Fluid Bed Drying',
    pdf: '/pdfs/fluid-bed-dryer.pdf',
    image: '/images/fbd-fluid-bed-dryer.png',
    description: 'Fluidized bed dryer for rapid moisture removal of powders and granules using fluidization over a perforated bed with optional internal heat exchanger.',
    features: ['Excellent gas–particle contact', 'High mass transfer and drying rates', 'Lower initial and running costs', 'Reduced drying contact time', 'Stable, easy control', 'Capacity 5 kg–1000 kg'],
    applications: ['Powder drying', 'Granule drying', 'Moisture reduction'],
    specs: {
      'Capacity': '5 kg – 1000 kg',
      'Operation': 'Continuous/Batch fluidization'
    },
    accuracy: '±2% final moisture',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 34,
    slug: 'tray-dryer-cgmp',
    name: 'Tray Dryer (cGMP Model)',
    category: 'drying-vacuumize-technique',
    subcategory: 'Convection Drying',
    pdf: '/pdfs/tray-dryer-cgmp.pdf',
    image: '/images/659799c8d44bdff7d747d4f5.jpg',
    description: 'Hot air tray dryer for dehydrating sticky materials, precipitates and pastes with balanced propeller fan and U-type heaters.',
    features: ['Capacity 6–192 trays', 'Well balanced propeller fan', 'U-type tubular heaters', 'Steam heated option with finned radiators', 'Control panel with interlocks'],
    applications: ['API drying', 'Granules and crystals', 'Agricultural products'],
    specs: {
      'Capacity': '6 – 192 trays',
      'Heating media': 'Electric/Steam/Hot water'
    },
    accuracy: '±2% moisture content',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 35,
    slug: 'rotocone-vacuum-dryer-rcvd',
    name: 'Rotocone Vacuum Dryer (RCVD)',
    category: 'drying-vacuumize-technique',
    subcategory: 'Vacuum Drying',
    pdf: '/pdfs/rotocone-vacuum-dryer.pdf',
    image: '/images/rcvd-rotary-cone-vacuum-dryer.webp',
    description: 'Low temperature vacuum drying for easily oxidized, toxic or sensitive materials with total solvent recovery; delivers lump-free powdered output.',
    features: ['Reduces drying time', 'N2 pulse jet dust filter', 'Quick openable discharge valve', 'cGMP with safety railings', '100–5000 L gross capacity'],
    applications: ['Crystalline powders', 'Amorphous powders prone to lumps', 'Solvent recovery'],
    specs: {
      'Capacity': '100 – 5000 L',
      'Operation': 'Low temperature vacuum'
    },
    accuracy: '±1% final moisture',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 36,
    slug: 'paddle-vacuum-mixer-dryer',
    name: 'Paddle Vacuum Mixer Dryer (cGMP)',
    category: 'drying-vacuumize-technique',
    subcategory: 'Vacuum Mixing & Drying',
    pdf: '/pdfs/paddle-vacuum-mixer-dryer.pdf',
    image: '/images/paddle-vacuum-mixer-comber-termomix.jpg',
    description: 'Continuous rotation of ribbon/paddle enables uniform mixing and drying at low temperature with solvent recovery and high vacuum operation.',
    features: ['Dust-free operation', 'Fast and homogeneous mixing & drying', 'Maintains vacuum during process', 'Low final moisture at low temperature', 'Capacity 100–1000 L'],
    applications: ['Crystalline materials', 'Pesticides and food industry', 'Heat-sensitive products'],
    specs: {
      'Capacity': '100 – 1000 L',
      'Vacuum': 'High vacuum operation'
    },
    accuracy: '±2% moisture uniformity',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 37,
    slug: 'vacuum-shelf-tray-dryer',
    name: 'Vacuum Shelf Tray Dryer (cGMP)',
    category: 'drying-vacuumize-technique',
    subcategory: 'Vacuum Tray Drying',
    pdf: '/pdfs/vacuum-shelf-tray-dryer.pdf',
    image: '/images/65979a71a97d1d04a216b007.jpg',
    description: 'Tray dryer working under vacuum with condenser and receiver for solvent recovery to dry heat-sensitive materials at low temperature.',
    features: ['Vacuumized shelves', 'Closed system with condenser and receiver', 'Very low final moisture', 'Safety relief and overload protection', 'Capacity 6–96 trays'],
    applications: ['Hygroscopic materials', 'Toxic materials', 'Heat-sensitive products'],
    specs: {
      'Capacity': '6 – 96 trays',
      'Heating media': 'Steam/Hot water/Thermic fluid'
    },
    accuracy: '±1% final moisture',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 38,
    slug: 'agitated-vacuum-dryer',
    name: 'Agitated Vacuum Dryer (cGMP)',
    category: 'drying-vacuumize-technique',
    subcategory: 'Agitated Vacuum Drying',
    pdf: '/pdfs/agitated-vacuum-dryer.pdf',
    image: '/images/avd-cosmodry-system.jpg',
    description: 'Top-loading, bottom-unloading agitated chamber for efficient removal of volatiles at lower boiling point under vacuum; easy charging/discharging.',
    features: ['Capacity 5–5000 L', 'Leak-proof front opening door', 'Cyclonic trap prevents fine dust carryover', 'Condenser and collection tank protect vacuum pump'],
    applications: ['Plastics', 'Ceramics', 'Specialty chemicals'],
    specs: {
      'Capacity': '5 – 5000 L'
    },
    accuracy: '±2% moisture content',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 39,
    slug: 'agitated-nutsche-filter-dryer-anfd',
    name: 'Agitated Nutsche Filter Dryer (ANFD) – cGMP',
    category: 'drying-vacuumize-technique',
    subcategory: 'Filter Drying',
    pdf: '/pdfs/anfd.pdf',
    image: '/images/anfd-main-equipment.jpg',
    description: 'Combined filtration and drying in the same vessel using permeable layer/filter medium under vacuum or pressure; ideal for high solid content slurries.',
    features: ['Height-adjustable agitator', 'Efficient separation under vacuum/pressure', 'Capacity 5–5000 L'],
    applications: ['Cake washing and filtration', 'Drying of filtered solids'],
    specs: {
      'Capacity': '5 – 5000 L'
    },
    accuracy: '±2% dryness',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 40,
    slug: 'infrared-dryer-ir',
    name: 'Infrared Dryer (IR Dryer) – cGMP',
    category: 'drying-vacuumize-technique',
    subcategory: 'Infrared Drying',
    pdf: '/pdfs/infrared-dryer.pdf',
    image: '/images/659799c8d44bdff7d747d4f5.jpg',
    description: 'Umbrella-type IR dryer that directs infrared waves to the material for rapid heating; compact, zonable and efficient.',
    features: ['High electrical-to-IR efficiency', 'High heat transfer rate', 'Quick start/stop', 'Zoning for uniform heating', 'Works in open/outdoor heating'],
    applications: ['Open/outdoor IR heating', 'Fast drying of targeted zones'],
    specs: {
      'Capacity': 'Process dependent',
      'Design': 'Umbrella IR emitter'
    },
    accuracy: '±3% temperature control',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  // Milling, Size Reduction & Grading Technique
  {
    id: 41,
    slug: 'cone-mill-cgmp',
    name: 'Cone Mill (cGMP Model)',
    category: 'milling-size-reduction',
    subcategory: 'Milling',
    pdf: '/pdfs/cone-mill.pdf',
    image: '/images/65979a71a97d1d04a216b007.jpg',
    description: 'Cone milling is one of the most common methods of milling in the pharmaceutical, food, chemical and associated industries. They are typically used for size reduction and deagglomeration or delumping of powders & granules. Generally used for reducing material to a particle size as low as 180μm (80 mesh) a cone mill produces less dust & heat than alternative forms of milling.',
    features: ['Low dust & heat generation', 'Size reduction down to 180μm', 'Ideal for deagglomeration', 'cGMP compliant design'],
    applications: ['Pharmaceuticals', 'Food Industry', 'Chemicals', 'Powder Delumping'],
    specs: {
      'Particle Size': 'Down to 180μm (80 mesh)',
      'Operation': 'Low dust, low heat',
      'Capacity': '50 - 500 kg/hr',
      'Power': '3-7.5 kW',
    },
    accuracy: '±5% particle size distribution',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 42,
    slug: 'multi-mill-cgmp',
    name: 'Multi Mill (cGMP Model)',
    category: 'milling-size-reduction',
    subcategory: 'Milling',
    pdf: '/pdfs/multi-mill.pdf',
    image: '/images/multi-mill-equipment.png',
    description: 'Multi Mill is a self contained portable unit useful for high speed granulating, pulverising, mixing, shredding and chopping of wide range of wet and dry materials without special attachments. Desired output of product depends on wide range of model selection which varies through direct driven, belt driven, perforated screen size & motor HP.',
    features: ['Portable self-contained unit', 'High-speed operation', 'Handles wet and dry materials', 'Variable output via screen/motor selection'],
    applications: ['Granulating', 'Pulverising', 'Food Industries', 'R&D Purpose', 'Pharmacy Colleges'],
    specs: {
      'Rotor Speed': '720 / 1440 / 2880 RPM',
      'Screen Type': 'Perforated, Wiremesh',
      'Motor HP': '1 - 7.5 HP',
      'Mounting': 'Portable with castor wheels',
    },
    accuracy: 'Variable based on setup',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 43,
    slug: 'vibro-shifter-cgmp',
    name: 'Vibro Shifter (cGMP Model)',
    category: 'milling-size-reduction',
    subcategory: 'Sifting & Grading',
    pdf: '/pdfs/vibro-shifter.pdf',
    image: '/images/vibro-sifter-equipment.png',
    description: 'Vibro Sifter is a revolving vibrational sifting system designed to provide sorting, scale and scoring procedures for all applications in the medicinal, chemical, food and cement industries. When you need separation, scalping, and grading during processing, then this is the total equipment you require. It is used to separate mass composition of solids, liquid from solid and grading the material as per particles size.',
    features: ['Vibrational sifting system', 'Multi-purpose: sorting, scaling, grading', 'Separates solids and liquids', 'Material grading by particle size'],
    applications: ['Medicinal Powders', 'Chemical Processing', 'Food & Beverage', 'Cement Industries'],
    specs: {
      'Deck Diameter': '12" to 72"',
      'Deck Levels': 'Single or multiple decks',
      'Material': 'SS 316L Contact Parts',
      'Motor': 'Vibratory, Flameproof option',
    },
    accuracy: 'High separation efficiency',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 44,
    slug: 'ultrasonic-generator',
    name: 'Ultrasonic Generator',
    category: 'milling-size-reduction',
    subcategory: 'Ultrasonic Technology',
    pdf: '/pdfs/ultrasonic-generator.pdf',
    image: '/images/65943286c513bfbb196b3156.jpg',
    description: 'The electronic ultrasonic generator is a power supply, it transforms AC electrical energy from a power source such as a wall outlet, to electrical energy appropriate for energizing a transducer at an ultrasonic frequency. In other words, the ultrasonic generator sends high-voltage electrical pulses to the transducer.',
    features: ['Transforms AC to ultrasonic frequency energy', 'Powers ultrasonic transducers', 'Sends high-voltage electrical pulses', 'Frequency detection via impedance analyzer'],
    applications: ['Energizing transducers', 'Ultrasonic sifting', 'Specialized industrial processes', 'Cleaning systems'],
    specs: {
      'Frequency': '20-40 kHz',
      'Output Power': '500 - 3000 W',
      'Voltage': '220V AC, 50Hz',
      'Control': 'Digital with auto-tuning',
    },
    accuracy: 'High frequency stability',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['CE']
  },
  {
    id: 45,
    slug: 'comminuting-mill-cgmp',
    name: 'Comminuting Mill (cGMP Model)',
    category: 'milling-size-reduction',
    subcategory: 'Milling',
    pdf: '/pdfs/comminuting-mill.pdf',
    image: '/images/659799c8d44bdff7d747d4f5.jpg',
    description: 'Comminuting mill is used for the down sizing, milling, pulverization and dispersion of wet and dry products in pharmaceutical, chemical, food, cosmetics, fertilizers industry etc. The product is poured from the top through in feed hopper and material falls on the rotor blades beater assembly for milling or pulverization.',
    features: ['Fitted on castor wheels for easy mobility', 'Wide range of sieve of perforated and wire-mesh', 'Easy to change knife to impact forward/reverse', 'High speed for wet & dry material'],
    applications: ['Down Sizing', 'Milling', 'Pulverization', 'Dispersion'],
    specs: {
      'Application': 'Wet & Dry Milling',
      'Chamber': 'Reversible for forward/reverse impact',
      'Mobility': 'Castor wheels',
    },
    accuracy: 'Consistent particle size reduction',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['cGMP']
  },
  {
    id: 46,
    slug: 'oscillating-granulator-cgmp',
    name: 'Oscillating Granulator (cGMP Model)',
    category: 'milling-size-reduction',
    subcategory: 'Granulation',
    pdf: '/pdfs/oscillating-granulator.pdf',
    image: '/images/65979a71a97d1d04a216b007.jpg',
    description: 'Oscillating granulator is used for gentle homogenization, size reduction, grading and sieving of dry, sensitive powders and granules in pharmaceutical, chemical and food industries. Oscillating Granulator has one rotor with five edges, which oscillate on horizontal axis at about 180 per minutes.',
    features: ['Uniformly granulation & fewer fines', 'Rotor oscillates at 180 strokes/minute', 'Easy to operate, move, clean', 'Zero dusting & maintenance free', 'Flame proof motor and Push Button Station'],
    applications: ['Gentle Homogenization', 'Size Reduction', 'Grading & Sieving', 'Sensitive Powders'],
    specs: {
      'Motion': 'Oscillating at 180 strokes/min',
      'Granulation': 'For wet & dry materials',
      'Safety': 'Limit switch and overload protection',
    },
    accuracy: 'Uniform granulation with fewer fines',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['cGMP']
  },
  {
    id: 47,
    slug: 'single-rotary-tablet-press',
    name: 'Single Rotary Tablet Press Machine',
    category: 'tablet-presses-technique',
    subcategory: 'Pressing',
    pdf: '/pdfs/single-rotary-tablet-press.pdf',
    image: '/images/6556f2b9e5241d558f065535.jpg',
    description: 'A tablet press or a pill press machine is a mechanical device that is used to manufacture tablets by compressing powder into the required size & weight. These machines can produce tablets of various sizes, shapes & weight, ranging from pharmaceuticals and nutraceuticals to industrial pellets and cosmetics.',
    features: ['Designed for small batch production', 'Main pressure and Pre-pressure can be adjusted', 'Physical properties of material affect compression'],
    applications: ['Pharmaceuticals', 'Food', 'Nutraceuticals', 'Industrial Pellets'],
    specs: {
      'Type': 'Single Rotary',
      'Batch Size': 'Small to medium',
      'Pressure': 'Adjustable Main and Pre-compression',
    },
    accuracy: 'Precise tablet weight and hardness',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['CE']
  },
  {
    id: 48,
    slug: 'double-rotary-tableting-machine',
    name: 'Double rotary tableting machine',
    category: 'tablet-presses-technique',
    subcategory: 'Pressing',
    pdf: '/pdfs/double-rotary-tableting-machine.pdf',
    image: '/images/6556f3e704265117dad1c1b7.jpg',
    description: 'The double-sided rotary tablet press machine is designed to facilitate this process. A double rotary tableting machine is designed to work efficiently, the machine compresses the tablets from both sides with high pressure. There is no machine operator can easily operate the Double Rotary tableting machine.',
    features: ['Double-sided compression for high output', 'Efficient, high-pressure operation', 'Easy to operate', 'Widely used in various sectors'],
    applications: ['Pharmaceutical', 'Herbal medicine', 'Food processing', 'Chemical'],
    specs: {
      'Type': 'Double Sided Rotary',
      'Output': 'High volume',
      'Operation': 'User-friendly',
    },
    accuracy: 'High consistency in tablet properties',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['CE']
  },
  {
    id: 49,
    slug: 'tablet-inspection-belt',
    name: 'Tablet Inspection Belt',
    category: 'tablet-presses-technique',
    subcategory: 'Inspection',
    pdf: '/pdfs/tablet-inspection-belt.pdf',
    image: '/images/65943286c513bfbb196b3156.jpg',
    description: 'Suitable for Visual Inspection of Tablets from both the sides. The output always depends upon tablet size and operator skill. The belt is driven by 0.5 HP AC motor controlled through AC variable frequency Drive. A small magnetic vibrator is provided for dosing of the tablets.',
    features: ['Visual inspection from both sides', 'SS 304 contact parts', 'Variable speed AC motor (0.5 HP)', 'Rejection chute for rejected tablets'],
    applications: ['Tablet Quality Control', 'Post-compression Inspection', 'Batch verification'],
    specs: {
      'Inspection': 'Manual, two-sided',
      'Drive': '0.5 HP AC motor with VFD',
      'Construction': 'Stainless Steel 304',
    },
    accuracy: 'Dependent on operator skill',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['CE']
  },
  {
    id: 50,
    slug: 'tablet-capsule-metal-detector',
    name: 'Tablet Capsule Metal Detector',
    category: 'tablet-presses-technique',
    subcategory: 'Quality Control',
    pdf: '/pdfs/tablet-capsule-metal-detector.pdf',
    image: '/images/659799c8d44bdff7d747d4f5.jpg',
    description: 'Pharmaceutical metal detector systems facilitate quality control by monitoring for the presence of metal contamination in tablets and capsules. These devices can detect all metal types, including ferrous, non-ferrous and stainless-steel.',
    features: ['Very High throughput rate', 'Superior detection capability', 'Built Ruggedly', 'Modern, Rugged User-Friendly interface'],
    applications: ['Final product quality control', 'Detecting metal contaminants', 'Food and pharmaceutical safety'],
    specs: {
      'Detection': 'Ferrous, Non-ferrous, Stainless-steel',
      'Throughput': 'High',
      'Interface': 'User-Friendly',
    },
    accuracy: 'Superior detection sensitivity',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['CE']
  },
  {
    id: 51,
    slug: 'multi-column-distillation-plant',
    name: 'Multi-column Distillation Plant',
    category: 'injection-sterilizing-technique',
    subcategory: 'Distillation',
    pdf: '/pdfs/multi-column-distillation-plant.pdf',
    image: '/images/659799c8d44bdff7d747d4f5.jpg', // Placeholder image
    description: 'A distillation plant based on FINN AQUA design, consisting of specially designed columns that make optimum use of interstage heat exchange (Multi-Effect distillation method) to produce pyrogen-free sterile water for injection.',
    features: ['Design is cGMP', 'All contact parts AISI 316 & non-contact parts AISI 304', 'Insulation with stainless steel sheet AISI 304', 'Electro polished from inside & outside', 'PLC based system for automated operation'],
    applications: ['Water for Injection (WFI)', 'Sterile water production', 'Pharmaceutical manufacturing'],
    specs: {
      'Design': 'FINN AQUA / Multi-Effect',
      'Contact Material': 'AISI 316',
      'Non-Contact Material': 'AISI 304',
      'Control System': 'PLC based automation'
    },
    accuracy: 'Pyrogen-free WFI specification',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['cGMP']
  },
  {
    id: 52,
    slug: 'dry-heat-sterilizer',
    name: 'Dry Heat Sterilizer',
    category: 'injection-sterilizing-technique',
    subcategory: 'Sterilization',
    pdf: '/pdfs/dry-heat-sterilizer.pdf',
    image: '/images/6556f3e704265117dad1c1b7.jpg', // Placeholder image
    description: 'Dry heat sterilization is accomplished by the conduction of heat. Heat is absorbed by the exterior of an item and then passed inward through the item until the predetermined target temperature is attained. Dry heat kills microorganisms by oxidizing molecules.',
    features: ['Design is cGMP', 'All contact parts AISI 316 & non-contact parts AISI 304', 'The sterilizer is supplied with pressure module with HEPA Filter', 'Equipped with sanitary fittings and silicone gasket', 'The doors are provided with vertical latch arrangement for proper locking'],
    applications: ['Sterilization of glassware', 'Sterilization of instruments', 'Depyrogenation'],
    specs: {
      'Contact Material': 'AISI 316',
      'Non-Contact Material': 'AISI 304',
      'Filtration': 'HEPA Filter',
      'Door Locking': 'Vertical latch arrangement'
    },
    accuracy: 'Precise temperature control',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['cGMP']
  },
  {
    id: 53,
    slug: 'pressure-and-filling-vessels',
    name: 'Pressure & Filling Vessels',
    category: 'injection-sterilizing-technique',
    subcategory: 'Vessels',
    pdf: '/pdfs/pressure-filling-vessels.pdf',
    image: '/images/65943286c513bfbb196b3156.jpg', // Placeholder image
    description: 'Pressure vessels are used to transfer the product to the membrane filter under Nitrogen pressure. While Sterile filling vessels are used to collect the filtered sterile solution. They work on pneumatic pressure to transfer the solution. The filling vessels are part of sterile solution filling lines.',
    features: ['Design is cGMP', 'All contact parts AISI 316 & non-contact parts AISI 304', 'Insulation with stainless steel sheet AISI 304', 'Electro polished from inside and outside'],
    applications: ['Sterile solution transfer', 'Filtration processes', 'Sterile filling lines'],
    specs: {
      'Contact Material': 'AISI 316',
      'Non-Contact Material': 'AISI 304',
      'Operation': 'Pneumatic pressure',
      'Finish': 'Electro polished'
    },
    accuracy: 'High pressure integrity',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['cGMP']
  },
  {
    id: 54,
    slug: 'pure-steam-generator',
    name: 'Pure Steam Generator',
    category: 'injection-sterilizing-technique',
    subcategory: 'Steam Generation',
    pdf: '/pdfs/pure-steam-generator.pdf',
    image: '/images/65979a71a97d1d04a216b007.jpg', // Placeholder image
    description: 'Any cGMP pharma company, it is a recommended to use Pure Steam in place of filtered plant steam. The clean steam is used for in-situ sterilization of vessels, Piping Distribution systems, reactors etc. It is very important that the steam should be free from all contamination like particulate matter, organics and biological loads like Pyrogen, which is unavoidable in the case of plant / factory steam.',
    features: ['Design is cGMP', 'All contact parts AISI 316 & non-contact parts AISI 304', 'Available capacities from 125 kg to 500 kg/hr', 'Radiation calculation', 'All insulation is cGMP and of superior quality', 'Available in both vertical and horizontal configurations', 'PLC based controls'],
    applications: ['In-situ sterilization', 'Vessel sterilization', 'Piping system sterilization'],
    specs: {
      'Capacity': '125 kg to 500 kg/hr',
      'Contact Material': 'AISI 316',
      'Non-Contact Material': 'AISI 304',
      'Configuration': 'Vertical and Horizontal'
    },
    accuracy: 'Pyrogen-free pure steam',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['cGMP']
  },
  {
    id: 55,
    slug: 'ointment-cream-paste-gel-manufacturing-plant',
    name: 'Ointment/Cream/Paste Gel Manufacturing Plant',
    category: 'ointment-cream-paste-technique',
    subcategory: 'Manufacturing Plant',
    pdf: '/pdfs/ointment-manufacturing-plant.pdf',
    image: '/images/6556f2b9e5241d558f065535.jpg', // Placeholder image
    description: 'Fully automatic and semi-automatic semi-solid manufacturing plants ideal for the pharmaceutical and cosmetic industry for the production of Ointment, Cream, Lotions, Gel, Tooth Paste & emulsions & homogenization. Available model 50 Liter to 5000 Liter working capacity.',
    features: ['Pre determined water phase vessel', 'Pre determined wax phase vessel', 'Pre determined oil, wax, and petroleum jelly phase vessel', 'Vacuum Homogenizer Mixer Vessel', 'Storage vessel', 'Control panel', 'Product piping & Working pumps'],
    applications: ['Ointment Production', 'Cream Manufacturing', 'Lotion Production', 'Gel & Toothpaste Production', 'Homogenization'],
    specs: {
      'Capacity': '50 L to 5000 L',
      'Operation': 'Fully/Semi-automatic',
      'Water Phase Vessel': 'Included',
      'Wax Phase Vessel': 'Included'
    },
    accuracy: 'High batch consistency',
    price: 'Contact for pricing',
    availability: 'Custom build',
    certifications: ['cGMP']
  },
  {
    id: 56,
    slug: 'tube-filling-and-sealing-machine',
    name: 'Tube Filling and Sealing Machine',
    category: 'ointment-cream-paste-technique',
    subcategory: 'Filling & Sealing',
    pdf: '/pdfs/tube-filling-sealing-machine.pdf',
    image: '/images/659799c8d44bdff7d747d4f5.jpg', // Placeholder image
    description: 'Designed for untouched and single machine process tube filling and sealing for ointments, paste, and other viscous products into a plastic tube. The tube fillers are a reliable and accurate filler system that offers clean filling of the tubes to their correct levels.',
    features: ['Design is cGMP', 'All contact parts AISI 316 & non-contact parts AISI 304', 'Specially designed no tube no fill Mechanism', 'Tube changeover from one tube size to another'],
    applications: ['Ointment Filling', 'Paste Filling', 'Viscous Product Filling', 'Cosmetic Creams'],
    specs: {
      'Contact Material': 'AISI 316',
      'Non-Contact Material': 'AISI 304',
      'Filling Mechanism': 'No Tube, No Fill',
      'Tube Settling': 'Bottom-up filling'
    },
    accuracy: '±1% filling accuracy',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['cGMP']
  },
  {
    id: 57,
    slug: 'liquid-filling-machine',
    name: 'Liquid Filling Machine',
    category: 'ointment-cream-paste-technique',
    subcategory: 'Liquid Filling',
    pdf: '/pdfs/liquid-filling-machine.pdf',
    image: '/images/6556f3e704265117dad1c1b7.jpg', // Placeholder image
    description: 'Machines employed for filling of liquids or powders into bottles are called bottle filling machines. It is used to package syrups, milk, water, glycerin, juices, wine, liquor, and shampoo, lotions, liquid soaps, lubricant oil, motor oil, essential oils, cleaning chemicals, and coatings.',
    features: ['This machine is used to package syrups, milk, water, glycerin, etc.', 'Variable 50-5000 filling that can be adjusted', 'Provides the amount of time required for filling different sized containers'],
    applications: ['Syrup Packaging', 'Water & Juice Bottling', 'Shampoo & Lotion Filling', 'Oil Packaging'],
    specs: {
      'Filling Range': '50 - 5000 (unit not specified)',
      'Control': 'Variable time setting',
      'Application': 'Liquids & powders into bottles'
    },
    accuracy: 'Adjustable fill time',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['CE']
  },
  {
    id: 58,
    slug: 'reaction-vessel',
    name: 'Reaction Vessel',
    category: 'reaction-filtration-technique',
    subcategory: 'Reaction',
    pdf: '/pdfs/reaction-vessel.pdf',
    image: '/images/reactor-20l-stainless-steel.webp', // Placeholder image
    description: 'Reaction vessels are the heart of a chemical plant where the chemical changes and wide variety of operations like gas-liquid dispersion, liquid-liquid dispersion, solid suspension, hydrolysis, hydration, reduction, oxidation, hydrogenation etc. at a pressure up to 30 kgs/cm² and at temperature ranging -30°c to +250°c.',
    features: ['Made of unreactive metal alloys with a high melting point such as stainless steel', 'Can be made of glass or ceramic', 'Withstands pressure up to 30 kgs/cm²', 'Temperature range from -30°c to +250°c'],
    applications: ['Chemical Reactions', 'Gas-liquid dispersion', 'Solid suspension', 'Oxidation & Hydrogenation'],
    specs: {
      'Pressure Rating': 'Up to 30 kgs/cm²',
      'Temperature Range': '-30°c to +250°c',
      'Material': 'Stainless Steel, Glass, Ceramic'
    },
    accuracy: 'High process control',
    price: 'Contact for pricing',
    availability: 'Custom build',
    certifications: ['CE']
  },
  {
    id: 59,
    slug: 'agitated-nutsche-filter-dryer-anfd-filtration',
    name: 'Agitated Nutsche Filter Dryer (ANFD)',
    category: 'reaction-filtration-technique',
    subcategory: 'Filtration & Drying',
    pdf: '/pdfs/anfd-filtration.pdf',
    image: '/images/anfd-industrial-unit.jpg', // Placeholder image
    description: 'A closed system for solid-liquid separation with features such as filtration, washing, re-slurrying and drying. The product can be washed thoroughly and economically with solvents. Toxic and hazardous materials can be processed safely.',
    features: ['Capacity - 10ltr to 5000 ltrs.', 'Ensures thorough washing and re-slurrying of the cake', 'The inert gas atmosphere can be maintained', 'Very high solvent recovery'],
    applications: ['Solid-liquid separation', 'API manufacturing', 'Chemical processing', 'Hazardous material processing'],
    specs: {
      'Capacity': '10 L to 5000 L',
      'Operation': 'Filtration, Washing, Drying',
      'Atmosphere': 'Inert gas maintainable'
    },
    accuracy: 'Very high solvent recovery',
    price: 'Contact for pricing',
    availability: 'Custom build',
    certifications: ['cGMP']
  },
  {
    id: 60,
    slug: 'centrifuge-machine',
    name: 'Centrifuge',
    category: 'reaction-filtration-technique',
    subcategory: 'Separation',
    pdf: '/pdfs/centrifuge.pdf',
    image: '/images/centrifuge-animation.gif', // Placeholder image
    description: 'A device that uses its centrifugal force and separates all the components present in a given solution according to their size, shape and density of the particles. This separates the fluids of various densities from its solid form. Capacity from 12" to 48", 60".',
    features: ['Separates components by size, shape, and density', 'Separates fluids from solids', 'The object which is less dense can be moved and friendly displaced to the centre of the container', 'As per cGMP Model'],
    applications: ['Solid-liquid separation', 'Component separation', 'Laboratory & Industrial use'],
    specs: {
      'Capacity': '12" to 60"',
      'Material': 'Contact parts AISI 316, Non-contact parts AISI 304',
      'Model': 'cGMP'
    },
    accuracy: 'Dependent on process',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['cGMP']
  },
  {
    id: 61,
    slug: 'zero-hold-up-filter-press',
    name: 'Zero Hold Up Filter Press',
    category: 'reaction-filtration-technique',
    subcategory: 'Filtration',
    pdf: '/pdfs/zero-hold-up-filter-press.pdf',
    image: '/images/659799c8d44bdff7d747d4f5.jpg', // Placeholder image
    description: 'This is most efficient for getting crystal clear filtration quality for high value liquids. The press has the cake filter aid and solids encased which conveniently allows the filtration of the entire batch and leaves the filter press with no hold over in the apparatus.',
    features: ['Material of construction AISI 316 & non-contact parts AISI 304', 'Complete filtration process without hold up of unfiltered liquid', 'Particle retention from 10 micron up to 1 micron size', 'Flame proof motors and electricals available'],
    applications: ['Pharmaceutical', 'Chemical', 'Beverage', 'Other industries'],
    specs: {
      'Material': 'AISI 316 & AISI 304',
      'Hold Up': 'Zero hold up of unfiltered liquid',
      'Retention': '10 to 1 micron',
      'Safety': 'Flame proof options available'
    },
    accuracy: 'Crystal clear filtration',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['cGMP']
  },
  {
    id: 62,
    slug: 'multiple-cartridge-filter',
    name: 'Multiple Cartridge Filter',
    category: 'liquid-dosage-technique',
    subcategory: 'Filter Housing',
    pdf: '/pdfs/multiple-cartridge-filter.pdf',
    image: '/images/65979a71a97d1d04a216b007.jpg', // Placeholder image
    description: 'A casing around filter Cartridges or Bags. Filter Housings are available in different sizes and styles. The design of Filter Housing is dependent on the following factors: Flow Rate, Operating Pressure.',
    features: ['Houses multiple filter cartridges or bags', 'Available in various sizes and styles', 'Designed for specific flow rates and pressures'],
    applications: ['Liquid filtration', 'Particulate removal', 'Process fluid clarification'],
    specs: { 'Type': 'Cartridge/Bag Housing', 'Configuration': 'Multiple Element' },
    accuracy: 'Dependent on filter element',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['CE']
  },
  {
    id: 63,
    slug: 'bag-filter-housing',
    name: 'Bag Filter Housing',
    category: 'liquid-dosage-technique',
    subcategory: 'Filter Housing',
    pdf: '/pdfs/bag-filter-housing.pdf',
    image: '/images/6556f2b9e5241d558f065535.jpg', // Placeholder image
    description: 'Used in a variety of applications where the filter is to be designed for high flow rate and high dirt holding capacity. They are particularly useful for applications where there is high suspended solid load in the fluid.',
    features: ['High flow rate design', 'High dirt holding capacity', 'Ideal for high suspended solid loads'],
    applications: ['High-solid load filtration', 'Bulk liquid processing', 'Pre-filtration'],
    specs: { 'Type': 'Bag Housing', 'Capacity': 'High Dirt Holding' },
    accuracy: 'Dependent on filter bag',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['CE']
  },
  {
    id: 64,
    slug: 'vent-filter-housing',
    name: 'Vent Filter Housing',
    category: 'liquid-dosage-technique',
    subcategory: 'Filter Housing',
    pdf: '/pdfs/vent-filter-housing.pdf',
    image: '/images/659799c8d44bdff7d747d4f5.jpg', // Placeholder image
    description: 'Used on the top of the storage tank in order to prevent the liquid from various microbial and other particular contaminants. Vent Filter are designed as per customer’s requirement and are provided with and without jacket as per requirement.',
    features: ['Prevents microbial contamination', 'Mounts on storage tanks', 'Custom designs available', 'Jacketed options available'],
    applications: ['Tank venting', 'Sterile air filtration', 'Protecting stored liquids'],
    specs: { 'Application': 'Tank Vent', 'Jacket': 'Optional' },
    accuracy: 'High microbial retention',
    price: 'Contact for pricing',
    availability: 'Custom build',
    certifications: ['cGMP']
  },
  {
    id: 65,
    slug: 'magnetic-filter',
    name: 'Magnetic Filter',
    category: 'liquid-dosage-technique',
    subcategory: 'Specialty Filter',
    pdf: '/pdfs/magnetic-filter.pdf',
    image: '/images/6556f3e704265117dad1c1b7.jpg', // Placeholder image
    description: 'A filter designed to remove fine ferrous contamination from liquid process lines. It uses high-intensity magnets to capture metal particles.',
    features: ['Removes ferrous contamination', 'High-intensity magnets', 'Easy to clean'],
    applications: ['Food processing', 'Chemical lines', 'Protecting downstream equipment'],
    specs: { 'Type': 'Magnetic Separation', 'Contaminant': 'Ferrous Metals' },
    accuracy: 'High magnetic field strength',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['CE']
  },
  {
    id: 66,
    slug: 'basket-filter',
    name: 'Basket Filter',
    category: 'liquid-dosage-technique',
    subcategory: 'Strainer',
    pdf: '/pdfs/basket-filter.pdf',
    image: '/images/65943286c513bfbb196b3156.jpg', // Placeholder image
    description: 'A basket filter is suitable for coarse filtration or with low contamination. The dirt collects in the basket-like screen insert that can be easily removed during cleaning. The filter element can also be adapted for the finest metallic chips.',
    features: ['Suitable for coarse filtration', 'Removable basket-like screen insert', 'Easy to clean', 'Can be adapted for metallic chips'],
    applications: ['Coarse filtration', 'Debris removal', 'Protecting pumps and meters'],
    specs: { 'Type': 'Basket Strainer', 'Cleaning': 'Removable Insert' },
    accuracy: 'Dependent on screen mesh size',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['CE']
  },
  {
    id: 67,
    slug: 'module-filter',
    name: 'Module Filter',
    category: 'liquid-dosage-technique',
    subcategory: 'Filter Housing',
    pdf: '/pdfs/module-filter.pdf',
    image: '/images/65979a71a97d1d04a216b007.jpg', // Placeholder image
    description: 'A casing around filter Cartridges or Bags or Basket. Filter Housings are available in different sizes and styles. The design of Filter Housing is dependent on the following factors: Flow Rate, Operating Pressure.',
    features: ['Houses filter cartridges, bags, or baskets', 'Variety of sizes and styles', 'Designed for specific operational parameters'],
    applications: ['Modular filtration systems', 'Scalable liquid processing', 'Pharmaceutical filtration'],
    specs: { 'Type': 'Module/Cartridge Housing' },
    accuracy: 'Dependent on filter module',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['cGMP']
  },
  {
    id: 68,
    slug: 'duplex-filter',
    name: 'Duplex Filter',
    category: 'liquid-dosage-technique',
    subcategory: 'Strainer',
    pdf: '/pdfs/duplex-filter.pdf',
    image: '/images/6556f2b9e5241d558f065535.jpg', // Placeholder image
    description: 'A type of filter built into a fuel, oil or water piping system and it is used to remove large particles of dirt and debris. The duplex strainer system usually consists of two separate strainer baskets housings.',
    features: ['Allows for continuous operation', 'Removes large particles of dirt and debris', 'Two separate strainer baskets', 'Switch between filters without stopping flow'],
    applications: ['Fuel lines', 'Oil piping systems', 'Continuous water filtration', 'Critical processes'],
    specs: { 'Type': 'Duplex Strainer', 'Baskets': 'Two, separate' },
    accuracy: 'Coarse particle removal',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['CE']
  },
  {
    id: 69,
    slug: 'membrane-filter-holder',
    name: 'Membrane Filter Holder',
    category: 'liquid-dosage-technique',
    subcategory: 'Filter Holder',
    pdf: '/pdfs/membrane-filter-holder.pdf',
    image: '/images/659799c8d44bdff7d747d4f5.jpg', // Placeholder image
    description: 'This filtration apparatus are with fritted glass support that is recommended for routine filtration of corrosive liquids and removal of particles from LC solvents.',
    features: ['Fritted glass support', 'Ideal for corrosive liquids', 'Removes particles from LC solvents', 'Funnel-style design'],
    applications: ['Laboratory filtration', 'LC solvent preparation', 'Corrosive liquid filtration'],
    specs: { 'Type': 'Membrane Funnel', 'Support': 'Fritted Glass' },
    accuracy: 'Dependent on membrane pore size',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['CE']
  },
  {
    id: 70,
    slug: 'conical-filter',
    name: 'Conical Filter',
    category: 'liquid-dosage-technique',
    subcategory: 'Strainer',
    pdf: '/pdfs/conical-filter.pdf',
    image: '/images/6556f3e704265117dad1c1b7.jpg', // Placeholder image
    description: 'Are used to catch and filter any type of debris from a waste stream. A variety of mesh screens are available to remove micron-sized particulates as well as larger, 1/4” sized particles. The cone filter has been used successfully in many applications such as pumping from wells and sump pumps.',
    features: ['Catches and filters debris', 'Variety of mesh screens available', 'Removes micron to 1/4" particles', 'Cone-shaped for efficient flow'],
    applications: ['Waste stream filtration', 'Pump protection', 'Well and sump pump intake'],
    specs: { 'Type': 'Cone Strainer', 'Particle Size': 'Micron to 1/4"' },
    accuracy: 'Dependent on mesh screen',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['CE']
  },
  {
    id: 71,
    slug: 'leaf-filter',
    name: 'Leaf Filter',
    category: 'liquid-dosage-technique',
    subcategory: 'Specialty Filter',
    pdf: '/pdfs/leaf-filter.pdf',
    image: '/images/65943286c513bfbb196b3156.jpg', // Placeholder image
    description: 'Sometimes called tank filters, they consists of flat filtering elements (leaves) supported in a shell. The leaves are circular, arc-sided, or rectangular, and they have filtering surface on both faces.',
    features: ['Consists of flat filtering elements (leaves)', 'Leaves supported in a shell', 'Filtering surface on both faces of leaves', 'Various leaf shapes available'],
    applications: ['High-solid filtration', 'Polishing filters', 'Catalyst recovery'],
    specs: { 'Type': 'Pressure Leaf Filter', 'Elements': 'Flat leaves' },
    accuracy: 'High surface area filtration',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['CE']
  }
];

export function getProductBySlug(slug) {
  return products.find(p => p.slug === slug);
}