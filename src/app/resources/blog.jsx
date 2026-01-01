import React, { useEffect, useState } from 'react'
import { getBlogs } from '@/utils/api'
import { Link } from 'react-router-dom'

export default function BlogPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getBlogs({ limit: 12 })
      .then(res => setItems(res.items || []))
      .catch(err => setError(err.message || 'Failed to load blogs'))
      .finally(() => setLoading(false))
  }, [])
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-20 sm:pt-24 lg:pt-32 pb-10 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-light mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Insights, updates, and knowledge from the Nikul Pharma team.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          {loading && (
            <div className="rounded-3xl border border-gray-100 p-8 text-gray-600">Loading...</div>
          )}
          {error && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-red-700">{error}</div>
          )}
          {!loading && !error && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((b) => (
                <Link
                  key={b._id}
                  to={`/resources/blog/${b.slug}`}
                  className="group bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-4">
                    <h3 className="text-gray-900 font-semibold line-clamp-2">{b.title}</h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">{b.excerpt || (b.content?.slice(0, 140) + '...')}</p>
                  </div>
                </Link>
              ))}
              {items.length === 0 && (
                <div className="rounded-3xl border border-gray-100 p-8 text-gray-600 col-span-full">No blogs yet.</div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}


