import React from 'react'

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-24 pb-10 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-light mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Videos
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Product demos, walkthroughs, and customer stories.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-3xl border border-gray-100 p-8 text-gray-600">
            Coming soon: a library of helpful videos.
          </div>
        </div>
      </section>
    </div>
  )
}


