import { ArrowLeft, Wrench, Settings, List, Info } from 'lucide-react';

export default function MachineInfoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation is provided by shared Layout */}

      {/* Hero Section */}
      <section className="pt-24 pb-10 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <a href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </a>
          <h1 className="text-5xl md:text-6xl font-light mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Machine Information
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Explore detailed information to help you select, operate, and maintain our industrial machines.
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white rounded-3xl shadow-md p-8">
              <div className="flex items-center mb-4">
                <Info className="w-6 h-6 text-gray-700 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">General Specifications</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Our machines are designed for precision and reliability. Each model includes comprehensive specs for power, capacity, accuracy, and safety features.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-8">
              <div className="flex items-center mb-4">
                <Settings className="w-6 h-6 text-gray-700 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">Setup and Installation</h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Site preparation and foundation requirements</li>
                <li>Power and pneumatic connections</li>
                <li>Calibration and initial test runs</li>
                <li>Operator training and safety protocols</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-8">
              <div className="flex items-center mb-4">
                <Wrench className="w-6 h-6 text-gray-700 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">Maintenance and Care</h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Recommended service intervals</li>
                <li>Consumables and spare parts</li>
                <li>Diagnostics and troubleshooting</li>
                <li>Remote support and on-site service</li>
              </ul>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl p-6">
              <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
              <ul className="space-y-2 text-gray-200">
                <li><a href="/products" className="hover:text-white">Browse Our Machines</a></li>
                <li><a href="/contact" className="hover:text-white">Request a Quote</a></li>
                <li><a href="/about" className="hover:text-white">About Our Company</a></li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl shadow p-6">
              <div className="flex items-center mb-3">
                <List className="w-5 h-5 text-gray-700 mr-2" />
                <h4 className="font-semibold text-gray-900">Documentation</h4>
              </div>
              <p className="text-gray-600 text-sm">Datasheets, manuals, and compliance documents are available upon request.</p>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light mb-4 text-gray-900">Need Specific Machine Details?</h2>
          <p className="text-gray-600 mb-6">Contact our engineers with your application and performance requirements.</p>
          <a href="/contact" className="inline-block bg-gradient-to-r from-gray-900 to-gray-700 text-white px-8 py-4 rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300">
            Talk to an Expert
          </a>
        </div>
      </section>
    </div>
  );
}
