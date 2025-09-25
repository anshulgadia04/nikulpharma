import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, Cpu, Download } from 'lucide-react'
import { getProductBySlug } from '@/utils/products'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const p = getProductBySlug(slug)
    setProduct(p || null)
  }, [slug])

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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-24 pb-10 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <button onClick={() => navigate(-1)} className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="text-sm font-medium text-gray-600 mb-2">{product.category}</div>
              <h1 className="text-5xl md:text-6xl font-light bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">{product.name}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                  <Cpu className="w-4 h-4 mr-1" /> Accuracy: {product.accuracy}
                </span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <a href={product.pdf || '#'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-3 border border-gray-300 rounded-xl text-gray-900 hover:bg-white/60 bg-white shadow-sm">
                <Download className="w-4 h-4 mr-2" /> Download PDF
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
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Specifications</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="text-sm text-gray-500 mb-1">{k}</div>
                <div className="text-gray-900 font-medium">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Related Equipment</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[].map(() => null)}
            {/* Optional: could add related logic later */}
          </div>
        </div>
      </section>
    </div>
  )
}


