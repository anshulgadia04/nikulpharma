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
];

export const products = [
  // Mixing, Blending & Kneading Technique (catalogue)
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
    id: 2,
    slug: 'rotary-tablet-press-10-station',
    name: 'Rotary Tablet Press 10 Station',
    category: 'tablet-presses',
    subcategory: 'Multi Station',
    pdf: '/pdfs/rotary-tablet-press-10.pdf',
    image: '/images/659799c8d44bdff7d747d4f5.jpg',
    description: 'Compact 10-station rotary tablet press for laboratory and small production',
    features: ['10-station design', 'Dual compression', 'Weight control', 'Laboratory grade'],
    applications: ['Laboratory use', 'Small batch production', 'R&D work', 'Pilot studies'],
    specs: {
      'Production capacity': 'Up to 50,000 tablets/hour',
      'Max tablet diameter': '25mm',
      'Max tablet thickness': '12mm',
      'Pressure range': '0-30 kN',
      'Power': '7.5 kW',
      'Dimensions': '1400x800x1000 mm'
    },
    accuracy: '±2.5% weight variation',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE', 'FDA approved']
  },
  {
    id: 3,
    slug: 'rotary-tablet-press-37-station',
    name: 'Rotary Tablet Press 37 Station',
    category: 'tablet-presses',
    subcategory: 'Multi Station',
    pdf: '/pdfs/rotary-tablet-press-37.pdf',
    image: '/images/65979a71a97d1d04a216b007.jpg',
    description: 'Medium-capacity 37-station rotary tablet press for efficient production',
    features: ['37-station design', 'Dual compression', 'Weight control', 'Dedusting system'],
    applications: ['Medium volume production', 'Commercial manufacturing', 'Standard tablets', 'Batch processing'],
    specs: {
      'Production capacity': 'Up to 200,000 tablets/hour',
      'Max tablet diameter': '25mm',
      'Max tablet thickness': '12mm',
      'Pressure range': '0-80 kN',
      'Power': '18 kW',
      'Dimensions': '2200x1600x1800 mm'
    },
    accuracy: '±1% weight variation',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE', 'FDA approved']
  },
  {
    id: 4,
    slug: 'rotary-tablet-press-55-station',
    name: 'Rotary Tablet Press 55 Station',
    category: 'tablet-presses',
    subcategory: 'Multi Station',
    pdf: '/pdfs/rotary-tablet-press-55.pdf',
    image: '/images/659799c8d44bdff7d747d4f5.jpg',
    description: 'High-capacity 55-station rotary tablet press for maximum production efficiency',
    features: ['55-station design', 'Dual compression', 'Automatic weight control', 'Dedusting system'],
    applications: ['High volume production', 'Commercial manufacturing', 'Standard tablets', 'Large batch processing'],
    specs: {
      'Production capacity': 'Up to 300,000 tablets/hour',
      'Max tablet diameter': '25mm',
      'Max tablet thickness': '12mm',
      'Pressure range': '0-100 kN',
      'Power': '22 kW',
      'Dimensions': '2500x1800x2000 mm'
    },
    accuracy: '±0.8% weight variation',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE', 'FDA approved']
  },

  // Granulation Equipment
  {
    id: 5,
    slug: 'high-shear-granulator',
    name: 'High Shear Granulator',
    category: 'granulation-equipment',
    subcategory: 'Wet Granulation',
    pdf: '/pdfs/high-shear-granulator.pdf',
    image: '/images/6556f2b9e5241d558f065535.jpg',
    description: 'High shear granulator for wet granulation processes',
    features: ['High shear mixing', 'Wet granulation', 'Variable speed', 'Temperature control'],
    applications: ['Wet granulation', 'API processing', 'Excipient blending', 'Particle enlargement'],
    specs: {
      'Capacity': '5-500 L',
      'Mixing speed': '100-2000 RPM',
      'Power': '5-50 kW',
      'Dimensions': '800x600x1200 mm'
    },
    accuracy: '±3% particle size',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 6,
    slug: 'fluid-bed-granulator',
    name: 'Fluid Bed Granulator',
    category: 'granulation-equipment',
    subcategory: 'Fluid Bed',
    pdf: '/pdfs/fluid-bed-granulator.pdf',
    image: '/images/6556f2b9e5241d558f065535.jpg',
    description: 'Fluid bed granulator for top-spray granulation and coating',
    features: ['Top-spray granulation', 'Fluid bed technology', 'Temperature control', 'Air flow control'],
    applications: ['Wet granulation', 'Coating applications', 'Particle enlargement', 'API processing'],
    specs: {
      'Capacity': '10-200 kg',
      'Air flow': '2000-8000 m³/h',
      'Temperature range': '20-100°C',
      'Power': '25 kW',
      'Dimensions': '1500x1200x2800 mm'
    },
    accuracy: '±2% particle size',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 7,
    slug: 'roller-compactor',
    name: 'Roller Compactor',
    category: 'granulation-equipment',
    subcategory: 'Dry Granulation',
    pdf: '/pdfs/roller-compactor.pdf',
    image: '/images/6556f3e704265117dad1c1b7.jpg',
    description: 'Dry granulation system using roller compaction technology',
    features: ['Dry granulation', 'Roller compaction', 'Milling system', 'Dust collection'],
    applications: ['Heat-sensitive materials', 'Moisture-sensitive products', 'Dry granulation', 'API processing'],
    specs: {
      'Capacity': '50-1000 kg/h',
      'Roller width': '100-500 mm',
      'Roller pressure': '0-50 kN/cm',
      'Power': '15-75 kW',
      'Dimensions': '2000x1500x2500 mm'
    },
    accuracy: '±5% particle size',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },

  // Coating Machines
  {
    id: 8,
    slug: 'pan-coating-machine',
    name: 'Pan Coating Machine',
    category: 'coating-machines',
    subcategory: 'Film Coating',
    pdf: '/pdfs/pan-coating-machine.pdf',
    image: '/images/65943286c513bfbb196b3156.jpg',
    description: 'Pan coating machine for film coating of pharmaceutical tablets',
    features: ['Film coating', 'Variable speed', 'Temperature control', 'Air flow control'],
    applications: ['Film coating', 'Enteric coating', 'Sustained release', 'Taste masking'],
    specs: {
      'Pan capacity': '25-300 kg',
      'Pan speed': '5-30 RPM',
      'Air flow': '1000-5000 m³/h',
      'Power': '15 kW',
      'Dimensions': '1500x1200x1600 mm'
    },
    accuracy: '±4% coating uniformity',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE', 'FDA approved']
  },
  {
    id: 9,
    slug: 'wurster-coating-machine',
    name: 'Wurster Coating Machine',
    category: 'coating-machines',
    subcategory: 'Film Coating',
    pdf: '/pdfs/wurster-coating-machine.pdf',
    image: '/images/65943286c513bfbb196b3156.jpg',
    description: 'Bottom-spray wurster coater for controlled release and taste masking',
    features: ['Bottom-spray design', 'Controlled release coating', 'Taste masking', 'Process control'],
    applications: ['Controlled release', 'Taste masking', 'Enteric coating', 'Sustained release'],
    specs: {
      'Capacity': '5-100 kg',
      'Air flow': '1000-4000 m³/h',
      'Temperature range': '30-80°C',
      'Power': '15 kW',
      'Dimensions': '1200x1000x2200 mm'
    },
    accuracy: '±3% coating uniformity',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE', 'FDA approved']
  },

  // Mixing Equipment
  {
    id: 10,
    slug: 'v-blender',
    name: 'V-Blender',
    category: 'mixing-equipment',
    subcategory: 'Powder Mixing',
    pdf: '/pdfs/v-blender.pdf',
    image: '/images/65979a71a97d1d04a216b007.jpg',
    description: 'V-blender for gentle powder mixing',
    features: ['V-shape design', 'Gentle mixing', 'Variable speed', 'Easy discharge'],
    applications: ['Gentle mixing', 'Heat-sensitive materials', 'API mixing', 'Excipient blending'],
    specs: {
      'Capacity': '5-1000 L',
      'Mixing speed': '5-30 RPM',
      'Power': '1-25 kW',
      'Dimensions': '800x600x1000 mm'
    },
    accuracy: '±5% blend uniformity',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 11,
    slug: 'ribbon-blender',
    name: 'Ribbon Blender',
    category: 'mixing-equipment',
    subcategory: 'Powder Mixing',
    pdf: '/pdfs/ribbon-blender.pdf',
    image: '/images/659799c8d44bdff7d747d4f5.jpg',
    description: 'Ribbon blender for homogeneous powder mixing',
    features: ['Ribbon mixing', 'Variable speed', 'Easy discharge', 'Easy cleaning'],
    applications: ['Powder mixing', 'Blend uniformity', 'API mixing', 'Excipient blending'],
    specs: {
      'Capacity': '10-5000 L',
      'Mixing speed': '10-50 RPM',
      'Power': '2-50 kW',
      'Dimensions': '1000x800x1200 mm'
    },
    accuracy: '±3% blend uniformity',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },

  // Drying Equipment
  {
    id: 12,
    slug: 'tray-dryer',
    name: 'Tray Dryer',
    category: 'drying-equipment',
    subcategory: 'Convection Drying',
    pdf: '/pdfs/tray-dryer.pdf',
    image: '/images/659799c8d44bdff7d747d4f5.jpg',
    description: 'Tray dryer for batch drying of pharmaceutical materials',
    features: ['Tray design', 'Hot air circulation', 'Temperature control', 'Easy loading'],
    applications: ['Batch drying', 'API drying', 'Excipient drying', 'Material processing'],
    specs: {
      'Capacity': '10-500 kg',
      'Temperature range': '40-120°C',
      'Tray area': '2-50 m²',
      'Power': '10-100 kW',
      'Dimensions': '1500x1200x2000 mm'
    },
    accuracy: '±2% moisture content',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 13,
    slug: 'spray-dryer',
    name: 'Spray Dryer',
    category: 'drying-equipment',
    subcategory: 'Spray Drying',
    pdf: '/pdfs/spray-dryer.pdf',
    image: '/images/6556f3e704265117dad1c1b7.jpg',
    description: 'Spray dryer for converting liquid solutions into dry powders',
    features: ['Spray drying', 'Temperature control', 'Particle size control', 'Collection system'],
    applications: ['Powder production', 'API drying', 'Excipient processing', 'Spray drying'],
    specs: {
      'Capacity': '10-500 kg/h',
      'Inlet temperature': '150-300°C',
      'Outlet temperature': '60-100°C',
      'Power': '30-150 kW',
      'Dimensions': '2000x1500x3000 mm'
    },
    accuracy: '±5% moisture content',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },

  // Size Reduction Equipment
  {
    id: 14,
    slug: 'hammer-mill',
    name: 'Hammer Mill',
    category: 'size-reduction',
    subcategory: 'Coarse Milling',
    pdf: '/pdfs/hammer-mill.pdf',
    image: '/images/6556f2b9e5241d558f065535.jpg',
    description: 'Hammer mill for coarse grinding of pharmaceutical materials',
    features: ['Hammer grinding', 'Coarse milling', 'High capacity', 'Easy maintenance'],
    applications: ['Coarse grinding', 'API processing', 'Excipient grinding', 'Material preparation'],
    specs: {
      'Capacity': '100-2000 kg/h',
      'Particle size': '100-2000 μm',
      'Speed': '1000-3000 RPM',
      'Power': '15-100 kW',
      'Dimensions': '1200x800x1500 mm'
    },
    accuracy: '±10% particle size',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },
  {
    id: 15,
    slug: 'jet-mill',
    name: 'Jet Mill',
    category: 'size-reduction',
    subcategory: 'Fine Milling',
    pdf: '/pdfs/jet-mill.pdf',
    image: '/images/659799c8d44bdff7d747d4f5.jpg',
    description: 'Jet mill for ultra-fine particle size reduction',
    features: ['Jet milling', 'Ultra-fine grinding', 'No moving parts', 'Temperature control'],
    applications: ['Ultra-fine grinding', 'API milling', 'Particle size reduction', 'Nanoparticles'],
    specs: {
      'Capacity': '10-500 kg/h',
      'Particle size': '1-50 μm',
      'Air pressure': '6-10 bar',
      'Power': '20-100 kW',
      'Dimensions': '1500x1000x2000 mm'
    },
    accuracy: '±2% particle size',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE']
  },

  // Quality Control Equipment
  {
    id: 16,
    slug: 'disintegration-tester',
    name: 'Disintegration Tester',
    category: 'quality-control',
    subcategory: 'Physical Testing',
    pdf: '/pdfs/disintegration-tester.pdf',
    image: '/images/6556f2b9e5241d558f065535.jpg',
    description: 'Automated disintegration tester for tablet quality assessment',
    features: ['Automated operation', 'Multiple stations', 'Temperature control', 'Digital timer'],
    applications: ['Tablet disintegration', 'Quality control', 'Batch testing', 'Release testing'],
    specs: {
      'Stations': '6-12',
      'Temperature range': '20-40°C',
      'Basket movement': '30 cycles/min',
      'Power': '200 W',
      'Dimensions': '400x300x500 mm'
    },
    accuracy: '±1% time measurement',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['CE', 'ISO 9001']
  },
  {
    id: 17,
    slug: 'dissolution-tester',
    name: 'Dissolution Tester',
    category: 'quality-control',
    subcategory: 'Physical Testing',
    pdf: '/pdfs/dissolution-tester.pdf',
    image: '/images/6556f3e704265117dad1c1b7.jpg',
    description: 'Automated dissolution tester for drug release testing',
    features: ['Automated sampling', 'UV detection', 'Temperature control', 'Data analysis'],
    applications: ['Drug release testing', 'Quality control', 'Batch release', 'Stability testing'],
    specs: {
      'Vessels': '6-12',
      'Temperature range': '25-40°C',
      'Paddle speed': '25-200 RPM',
      'Power': '500 W',
      'Dimensions': '600x500x800 mm'
    },
    accuracy: '±0.1% drug release',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['CE', 'ISO 9001', 'FDA approved']
  },

  // Packaging Equipment
  {
    id: 18,
    slug: 'capsule-filling-machine',
    name: 'Capsule Filling Machine',
    category: 'packaging-equipment',
    subcategory: 'Capsule Filling',
    pdf: '/pdfs/capsule-filling-machine.pdf',
    image: '/images/65943286c513bfbb196b3156.jpg',
    description: 'Automatic capsule filling machine for pharmaceutical capsules',
    features: ['Automatic filling', 'Capsule size adjustment', 'Weight control', 'Quality inspection'],
    applications: ['Capsule filling', 'Powder filling', 'Pellet filling', 'Multi-dose capsules'],
    specs: {
      'Filling capacity': 'Up to 200,000 capsules/hour',
      'Capsule sizes': '0-5',
      'Accuracy': '±2%',
      'Power': '8 kW',
      'Dimensions': '2500x1200x1800 mm'
    },
    accuracy: '±2% weight accuracy',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE', 'FDA approved']
  },
  {
    id: 19,
    slug: 'strip-packaging-machine',
    name: 'Strip Packaging Machine',
    category: 'packaging-equipment',
    subcategory: 'Strip Packaging',
    pdf: '/pdfs/strip-packaging-machine.pdf',
    image: '/images/659799c8d44bdff7d747d4f5.jpg',
    description: 'High-speed strip packaging machine for unit dose packaging',
    features: ['High-speed operation', 'Aluminum foil', 'Heat sealing', 'Quality control'],
    applications: ['Unit dose packaging', 'Tablet packaging', 'Capsule packaging', 'Consumer packaging'],
    specs: {
      'Production speed': 'Up to 500 strips/minute',
      'Strip size': '10x20 to 30x40 mm',
      'Power': '12 kW',
      'Dimensions': '2500x1200x1600 mm'
    },
    accuracy: '±0.5% positioning',
    price: 'Contact for pricing',
    availability: 'In stock',
    certifications: ['GMP', 'CE', 'FDA approved']
  },

  // Automation Systems
  {
    id: 20,
    slug: 'tablet-production-line',
    name: 'Complete Tablet Production Line',
    category: 'automation-systems',
    subcategory: 'Integrated Systems',
    pdf: '/pdfs/tablet-production-line.pdf',
    image: '/images/65979a71a97d1d04a216b007.jpg',
    description: 'Fully automated tablet production line with integrated quality control',
    features: ['Complete automation', 'Quality control integration', 'Data logging', 'Remote monitoring'],
    applications: ['Full-scale production', 'Automated manufacturing', 'Quality assurance', 'Process control'],
    specs: {
      'Production capacity': 'Up to 500,000 tablets/hour',
      'Automation level': '95%',
      'Quality control': 'Integrated',
      'Power': '100 kW',
      'Dimensions': '5000x3000x2500 mm'
    },
    accuracy: '±0.5% overall efficiency',
    price: 'Contact for pricing',
    availability: 'Custom build',
    certifications: ['GMP', 'CE', 'FDA approved']
  },
  {
    id: 21,
    slug: 'high-shear-mixer-granulator-rmg',
    name: 'High-Shear Mixer Granulator (RMG)',
    category: 'mixing-blending-kneading',
    subcategory: 'Wet Granulation',
    pdf: '/pdfs/high-shear-mixer-granulator.pdf',
    image: '/images/6556f2b9e5241d558f065535.jpg',
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
    image: '/images/659799c8d44bdff7d747d4f5.jpg',
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
    image: '/images/6556f3e704265117dad1c1b7.jpg',
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
    image: '/images/6556f2b9e5241d558f065535.jpg',
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
    image: '/images/65979a71a97d1d04a216b007.jpg',
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
    image: '/images/6556f2b9e5241d558f065535.jpg',
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
  }
  ,
  // Drying & Vacuumize Technique
  {
    id: 33,
    slug: 'fluid-bed-dryer-fbd',
    name: 'Fluid Bed Dryer (FBD) – cGMP',
    category: 'drying-vacuumize-technique',
    subcategory: 'Fluid Bed Drying',
    pdf: '/pdfs/fluid-bed-dryer.pdf',
    image: '/images/6556f2b9e5241d558f065535.jpg',
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
    image: '/images/65943286c513bfbb196b3156.jpg',
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
    image: '/images/6556f3e704265117dad1c1b7.jpg',
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
    image: '/images/6556f2b9e5241d558f065535.jpg',
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
    image: '/images/65943286c513bfbb196b3156.jpg',
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
  }
];

export function getProductBySlug(slug) {
  return products.find(p => p.slug === slug);
}