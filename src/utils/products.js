export const products = [
  {
    id: 1,
    slug: 'precision-cnc-mill-x1',
    name: 'Precision CNC Mill X1',
    category: 'CNC Machinery',
    pdf: '/pdfs/precision-cnc-mill-x1.pdf',
    image: '/images/659799c8d44bdff7d747d4f5.jpg',
    description: 'Ultra-high precision 5-axis CNC milling machine for aerospace and medical components',
    features: ['5-axis simultaneous machining', '0.001mm repeatability', 'Automatic tool changer', 'In-process measurement'],
    applications: ['Aerospace components', 'Medical implants', 'Precision prototypes', 'Complex geometries'],
    specs: {
      'Work envelope': '800x600x500mm',
      'Spindle speed': '40,000 RPM',
      'Tool capacity': '40 tools',
      'Power': '15kW',
    },
    accuracy: '±0.001mm',
  },
  {
    id: 2,
    slug: 'industrial-lathe-pro-2000',
    name: 'Industrial Lathe Pro 2000',
    category: 'Turning Equipment',
    pdf: '/pdfs/industrial-lathe-pro-2000.pdf',
    image: '/images/65979a71a97d1d04a216b007.jpg',
    description: 'Heavy-duty CNC lathe for high-volume precision turning operations',
    features: ['Twin-spindle design', 'Live tooling', 'Automatic bar feeder', 'Chip conveyor'],
    applications: ['Shaft manufacturing', 'Automotive parts', 'Hydraulic components', 'Industrial tooling'],
    specs: {
      'Max diameter': '320mm',
      'Max length': '1000mm',
      'Spindle speed': '5,000 RPM',
      'Power': '22kW',
    },
    accuracy: '±0.002mm',
  },
  {
    id: 3,
    slug: 'flexform-press-500t',
    name: 'FlexForm Press 500T',
    category: 'Forming Equipment',
    pdf: '/pdfs/flexform-press-500t.pdf',
    image: '/images/6556f2b9e5241d558f065535.jpg',
    description: 'High-force hydraulic press system for complex metal forming operations',
    features: ['500-ton capacity', 'Programmable stroke control', 'Multi-stage forming', 'Safety light curtains'],
    applications: ['Automotive panels', 'Appliance components', 'Structural parts', 'Deep drawing'],
    specs: {
      'Press force': '500 tons',
      'Bed size': '2000x1500mm',
      'Stroke': '800mm',
      'Speed': '15mm/s',
    },
    accuracy: '±0.1mm',
  },
  {
    id: 4,
    slug: 'roboassembly-ai-station',
    name: 'RoboAssembly AI Station',
    category: 'Automation',
    pdf: '/pdfs/roboassembly-ai-station.pdf',
    image: '/images/6556f3e704265117dad1c1b7.jpg',
    description: 'AI-powered robotic assembly station with integrated quality control',
    features: ['6-axis robot arm', 'Vision inspection', 'Force feedback', 'Machine learning optimization'],
    applications: ['Electronics assembly', 'Automotive parts', 'Consumer goods', 'Small components'],
    specs: {
      'Reach': '1400mm',
      'Payload': '10kg',
      'Repeatability': '±0.02mm',
      'Cycle time': '15 seconds',
    },
    accuracy: '±0.05mm',
  },
  {
    id: 5,
    slug: 'surfacemaster-grinder',
    name: 'SurfaceMaster Grinder',
    category: 'Finishing Equipment',
    pdf: '/pdfs/surfacemaster-grinder.pdf',
    image: '/images/65943286c513bfbb196b3156.jpg',
    description: 'Precision surface grinding machine for ultra-smooth finishes',
    features: ['Automatic compensation', 'Coolant system', 'Magnetic chuck', 'Touch probe'],
    applications: ['Tool & die', 'Precision gauges', 'Optical components', 'Mold surfaces'],
    specs: {
      'Table size': '600x300mm',
      'Wheel speed': '2000 RPM',
      'Feed rate': '0.1-20 m/min',
      'Surface finish': 'Ra 0.1μm',
    },
    accuracy: '±0.0005mm',
  },
  {
    id: 6,
    slug: 'qualityvision-inspector',
    name: 'QualityVision Inspector',
    category: 'Quality Control',
    pdf: '/pdfs/qualityvision-inspector.pdf',
    image: '/images/659799c8d44bdff7d747d4f5.jpg',
    description: 'Advanced 3D optical measurement and inspection system',
    features: ['3D laser scanning', 'Automated reporting', 'Statistical analysis', 'CAD comparison'],
    applications: ['Dimensional inspection', 'Surface analysis', 'Reverse engineering', 'Production monitoring'],
    specs: {
      'Measurement volume': '500x400x300mm',
      'Point spacing': '0.01mm',
      'Scan speed': '100,000 points/sec',
      'Accuracy': '±1μm',
    },
    accuracy: '±0.001mm',
  },
]

export function getProductBySlug(slug) {
  return products.find(p => p.slug === slug)
}

export function getProductById(id) {
  return products.find(p => p.id === Number(id))
}


