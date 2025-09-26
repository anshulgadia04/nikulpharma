import React from 'react'

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                About Nikul Pharma Equipment
              </h1>
              <p className="mt-5 text-base sm:text-lg text-gray-600 leading-7">
                We design and deliver high‑precision machinery for pharmaceutical, chemical, and
                food industries. With a focus on reliability, safety, and performance, our
                equipment powers critical production lines across the globe.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6">
                <div>
                  <p className="text-2xl font-bold">10+ </p>
                  <p className="text-sm text-gray-500">Years Experience</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">150+ </p>
                  <p className="text-sm text-gray-500">Installations</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">20+ </p>
                  <p className="text-sm text-gray-500">Industries Served</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[5/3] w-full rounded-xl overflow-hidden ring-1 ring-gray-200">
                <a href="/" aria-label="Go to home">
                  <img
                    src="/logo.png"
                    alt="Nikul Pharma"
                    className="h-full w-full object-contain bg-white"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <h2 className="text-xl font-semibold">Our Mission</h2>
              <p className="mt-3 text-gray-600 leading-7">
                To empower manufacturers with robust, efficient, and compliant machinery that
                reduces downtime, improves yield, and ensures consistent quality.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Our Vision</h2>
              <p className="mt-3 text-gray-600 leading-7">
                To be the most trusted partner for end‑to‑end processing equipment, combining
                engineering excellence with responsive service and long‑term support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-2xl font-bold">Why Choose Us</h2>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <li className="rounded-lg border border-gray-200 p-6">
              <p className="font-semibold">GMP & regulatory focus</p>
              <p className="mt-2 text-sm text-gray-600">Designs aligned to industry standards and documentation.</p>
            </li>
            <li className="rounded-lg border border-gray-200 p-6">
              <p className="font-semibold">Precision & reliability</p>
              <p className="mt-2 text-sm text-gray-600">Built for continuous operation and consistent performance.</p>
            </li>
            <li className="rounded-lg border border-gray-200 p-6">
              <p className="font-semibold">End‑to‑end support</p>
              <p className="mt-2 text-sm text-gray-600">Installation, training, spares, and responsive service.</p>
            </li>
          </ul>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <h3 className="text-xl font-semibold">Ready to discuss your requirement?</h3>
          <p className="mt-3 text-gray-600">Get in touch and our team will guide you to the right solution.</p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center mt-6 px-5 py-3 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  )
}


