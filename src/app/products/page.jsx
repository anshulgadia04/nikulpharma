import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, ChevronDown, Settings, Cpu, Wrench, Zap, Layers, ArrowRight, MessageCircle } from 'lucide-react';
import { products as catalog } from '@/utils/products';

export default function ProductsPage() {
  const [selectedTask, setSelectedTask] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const tasks = [
    { id: 'all', name: 'All Tasks', icon: <Layers className="w-5 h-5" /> },
    { id: 'precision-cutting', name: 'Precision Cutting', icon: <Settings className="w-5 h-5" /> },
    { id: 'metal-forming', name: 'Metal Forming', icon: <Wrench className="w-5 h-5" /> },
    { id: 'surface-finishing', name: 'Surface Finishing', icon: <Zap className="w-5 h-5" /> },
    { id: 'automated-assembly', name: 'Automated Assembly', icon: <Cpu className="w-5 h-5" /> },
    { id: 'quality-control', name: 'Quality Control', icon: <Search className="w-5 h-5" /> },
    { id: 'heavy-pressing', name: 'Heavy Pressing', icon: <Layers className="w-5 h-5" /> }
  ];

  const products = [
    {
      id: 1,
      name: "Precision CNC Mill X1",
      category: "CNC Machinery",
      tasks: ['precision-cutting', 'surface-finishing'],
      accuracy: "±0.001mm",
      image: "/images/659799c8d44bdff7d747d4f5.jpg",
      description: "Ultra-high precision 5-axis CNC milling machine for aerospace and medical components",
      features: ["5-axis simultaneous machining", "0.001mm repeatability", "Automatic tool changer", "In-process measurement"],
      applications: ["Aerospace components", "Medical implants", "Precision prototypes", "Complex geometries"],
      specs: {
        "Work envelope": "800x600x500mm",
        "Spindle speed": "40,000 RPM",
        "Tool capacity": "40 tools",
        "Power": "15kW"
      }
    },
    {
      id: 2,
      name: "Industrial Lathe Pro 2000",
      category: "Turning Equipment",
      tasks: ['precision-cutting', 'surface-finishing'],
      accuracy: "±0.002mm",
      image: "/images/65979a71a97d1d04a216b007.jpg",
      description: "Heavy-duty CNC lathe for high-volume precision turning operations",
      features: ["Twin-spindle design", "Live tooling", "Automatic bar feeder", "Chip conveyor"],
      applications: ["Shaft manufacturing", "Automotive parts", "Hydraulic components", "Industrial tooling"],
      specs: {
        "Max diameter": "320mm",
        "Max length": "1000mm",
        "Spindle speed": "5,000 RPM",
        "Power": "22kW"
      }
    },
    {
      id: 3,
      name: "FlexForm Press 500T",
      category: "Forming Equipment",
      tasks: ['metal-forming', 'heavy-pressing'],
      accuracy: "±0.1mm",
      image: "/images/6556f2b9e5241d558f065535.jpg",
      description: "High-force hydraulic press system for complex metal forming operations",
      features: ["500-ton capacity", "Programmable stroke control", "Multi-stage forming", "Safety light curtains"],
      applications: ["Automotive panels", "Appliance components", "Structural parts", "Deep drawing"],
      specs: {
        "Press force": "500 tons",
        "Bed size": "2000x1500mm",
        "Stroke": "800mm",
        "Speed": "15mm/s"
      }
    },
    {
      id: 4,
      name: "RoboAssembly AI Station",
      category: "Automation",
      tasks: ['automated-assembly', 'quality-control'],
      accuracy: "±0.05mm",
      image: "/images/6556f3e704265117dad1c1b7.jpg",
      description: "AI-powered robotic assembly station with integrated quality control",
      features: ["6-axis robot arm", "Vision inspection", "Force feedback", "Machine learning optimization"],
      applications: ["Electronics assembly", "Automotive parts", "Consumer goods", "Small components"],
      specs: {
        "Reach": "1400mm",
        "Payload": "10kg",
        "Repeatability": "±0.02mm",
        "Cycle time": "15 seconds"
      }
    },
    {
      id: 5,
      name: "SurfaceMaster Grinder",
      category: "Finishing Equipment",
      tasks: ['surface-finishing', 'precision-cutting'],
      accuracy: "±0.0005mm",
      image: "/images/65943286c513bfbb196b3156.jpg",
      description: "Precision surface grinding machine for ultra-smooth finishes",
      features: ["Automatic compensation", "Coolant system", "Magnetic chuck", "Touch probe"],
      applications: ["Tool & die", "Precision gauges", "Optical components", "Mold surfaces"],
      specs: {
        "Table size": "600x300mm",
        "Wheel speed": "2000 RPM",
        "Feed rate": "0.1-20 m/min",
        "Surface finish": "Ra 0.1μm"
      }
    },
    {
      id: 6,
      name: "QualityVision Inspector",
      category: "Quality Control",    
      tasks: ['quality-control'],
      accuracy: "±0.001mm",
      image: "/images/659799c8d44bdff7d747d4f5.jpg",
      description: "Advanced 3D optical measurement and inspection system",
      features: ["3D laser scanning", "Automated reporting", "Statistical analysis", "CAD comparison"],
      applications: ["Dimensional inspection", "Surface analysis", "Reverse engineering", "Production monitoring"],
      specs: {
        "Measurement volume": "500x400x300mm",
        "Point spacing": "0.01mm",
        "Scan speed": "100,000 points/sec",
        "Accuracy": "±1μm"
      }
    }
  ].map(p => {
    const match = catalog.find(c => c.name === p.name)
    return match ? { ...p, slug: match.slug } : p
  });

  const categories = ['all', ...new Set(products.map(p => p.category))];

  // Map industry names from the homepage to product categories on this page
  const industryToCategory = {
    'Pharmaceuticals': 'Quality Control',
    'Biotechnology': 'Automation',
    'Chemical Processing': 'Forming Equipment',
    'Food & Beverages': 'Finishing Equipment'
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('category');
    if (raw) {
      const decoded = decodeURIComponent(raw);
      const mapped = industryToCategory[decoded] || decoded;
      if (categories.includes(mapped)) {
        setSelectedCategory(mapped);
      }
    }
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesTask = selectedTask === 'all' || product.tasks.includes(selectedTask);
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTask && matchesCategory && matchesSearch;
  });

  const handleSendQuery = (product) => {
    // This will redirect to contact page with product info
    window.location.href = `/contact?product=${encodeURIComponent(product.name)}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation is provided by shared Layout */}

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <a href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </a>
          <h1 className="text-5xl md:text-6xl font-light mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Find Your Perfect Machine
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mb-8">
            Select your manufacturing task below to discover the ideal precision machinery for your specific needs.
          </p>
        </div>
      </section>

      {/* Task Selection */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">What task do you need to accomplish?</h2>
          <div className="flex flex-wrap gap-3">
            {tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => setSelectedTask(task.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedTask === task.id
                    ? 'bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {task.icon}
                <span>{task.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search machines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 bg-white"
              />
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 bg-white"
              >
                <option value="all">All Categories</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="text-sm text-gray-600">
                {filteredProducts.length} machines found
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden bg-gray-50">
                  <Link to={`/product/${product.slug || ''}`}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-700"
                    />
                  </Link>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    <Link to={`/product/${product.slug || ''}`}>{product.name}</Link>
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{product.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-900 mb-2">Key Features:</div>
                    <div className="space-y-1">
                      {product.features.slice(0, 2).map((feature, index) => (
                        <div key={index} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-900 mb-2">Perfect for:</div>
                    <div className="flex flex-wrap gap-1">
                      {product.applications.slice(0, 2).map((app, index) => (
                        <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleSendQuery(product)}
                      className="flex-1 bg-gradient-to-r from-gray-900 to-gray-700 text-white py-3 px-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center text-sm font-medium"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Query
                    </button>
                    <a href={product.pdf || '#'} target="_blank" rel="noopener noreferrer" className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-300 text-sm font-medium">
                      PDF
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No machines found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-light mb-6">Can't Find What You Need?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Our engineers can design custom solutions for your specific manufacturing requirements.
          </p>
          <a href="/contact" className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold">
            Request Custom Solution
          </a>
        </div>
      </section>
    </div>
  );
}
