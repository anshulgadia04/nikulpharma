import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, Cpu, Download, Star, Package, Zap, Shield, Target, Microscope, Sun, RotateCcw, MessageCircle, Phone, Mail, Award, Clock, Users } from 'lucide-react'
import { getProductBySlug, productCategories } from '@/utils/products'

// Icon mapping for categories
const iconMap = {
  'Pill': Package,
  'Zap': Zap,
  'Shield': Shield,
  'RotateCcw': RotateCcw,
  'Sun': Sun,
  'Target': Target,
  'Microscope': Microscope,
  'Package': Package,
  'Cpu': Cpu
};

export default function ProductDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const p = getProductBySlug(slug)
    setProduct(p || null)
  }, [slug])

  const getCategoryIcon = (categoryId) => {
    const category = productCategories.find(cat => cat.id === categoryId);
    if (!category) return Package;
    const IconComponent = iconMap[category.icon] || Package;
    return IconComponent;
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <section className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <button onClick={() => navigate(-1)} className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-8">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <h1 className="text-4xl font-semibold text-gray-900">Product not found</h1>
            <p className="text-gray-600 mt-2">The product you are looking for does not exist.</p>
          </div>
        </section>
      </div>
    )
  }

  const category = productCategories.find(cat => cat.id === product.category);
  const IconComponent = getCategoryIcon(product.category);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-24 pb-10 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <button onClick={() => navigate(-1)} className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </button>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${category?.color || 'from-gray-500 to-gray-600'}`}>
                  <IconComponent className="w-4 h-4 mr-2" />
                  {category?.name || product.category}
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {product.subcategory}
                </span>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.availability === 'In stock' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {product.availability}
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-light bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">{product.name}</h1>
              <p className="text-xl text-gray-600 mb-6 max-w-3xl">{product.description}</p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center text-yellow-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-lg font-medium ml-1">4.8</span>
                  <span className="text-sm text-gray-500 ml-1">(24 reviews)</span>
                </div>
                <span className="inline-flex items-center text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                  <Target className="w-4 h-4 mr-1" /> Accuracy: {product.accuracy}
                </span>
                <span className="text-sm text-gray-600">
                  Price: <span className="font-medium text-gray-900">{product.price}</span>
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 flex flex-col gap-3">
              <a href={product.pdf || '#'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-xl text-gray-900 hover:bg-gray-50 bg-white shadow-sm transition-colors">
                <Download className="w-4 h-4 mr-2" /> Download Brochure
              </a>
              <a href={`/contact?product=${encodeURIComponent(product.name)}`} className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300">
                <MessageCircle className="w-4 h-4 mr-2" /> Get Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery + Summary */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
          <div className="aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow flex items-center justify-center">
            <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
          </div>

          <div className="bg-white rounded-3xl shadow p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-medium text-gray-900 mb-2">Key Features</div>
                <ul className="space-y-2">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-700">
                      <Check className="w-4 h-4 text-gray-700 mr-2 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 mb-2">Applications</div>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((a, i) => (
                    <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">{a}</span>
                  ))}
                </div>
              </div>
            </div>

            <a href={`/contact?product=${encodeURIComponent(product.name)}`} className="mt-8 inline-flex items-center justify-center w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white py-3 px-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm font-medium">
              Request Quote
            </a>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-semibold text-gray-900 mb-8">Technical Specifications</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
                <div className="text-sm text-gray-500 mb-2">{k}</div>
                <div className="text-gray-900 font-semibold text-lg">{v}</div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          {product.certifications && product.certifications.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-500" />
                Certifications & Compliance
              </h4>
              <div className="flex flex-wrap gap-3">
                {product.certifications.map((cert, index) => (
                  <span key={index} className="inline-flex items-center px-4 py-2 bg-green-50 text-green-800 rounded-full text-sm font-medium">
                    <Check className="w-4 h-4 mr-2" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features & Applications */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Key Features</h3>
              <div className="space-y-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Applications</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.applications.map((app, index) => (
                  <div key={index} className="bg-blue-50 text-blue-800 px-4 py-3 rounded-xl text-sm font-medium">
                    {app}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-semibold mb-4">Ready to Get Started?</h3>
          <p className="text-xl text-gray-300 mb-8">
            Contact our experts to discuss your requirements and get a personalized quote for this equipment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`/contact?product=${encodeURIComponent(product.name)}`} className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold">
              <MessageCircle className="w-5 h-5 mr-2" />
              Request Quote
            </a>
            <a href="tel:+1234567890" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold">
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}


