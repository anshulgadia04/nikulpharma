import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBlog } from '@/utils/api'

export default function BlogDetailPage() {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!slug) return
    getBlog(slug)
      .then(data => setBlog(data))
      .catch(err => setError(err.message || 'Failed to load blog'))
      .finally(() => setLoading(false))
  }, [slug])

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-20 sm:pt-24 lg:pt-32 pb-10 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <Link to="/resources/blog" className="text-sm text-gray-600 hover:text-gray-900">← Back to Blog</Link>
          {loading ? (
            <h1 className="text-4xl md:text-5xl font-light mt-4">Loading...</h1>
          ) : error ? (
            <h1 className="text-4xl md:text-5xl font-light mt-4 text-red-600">{error}</h1>
          ) : (
            <h1 className="text-5xl md:text-6xl font-light mt-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">{blog?.title}</h1>
          )}
        </div>
      </section>

      {!loading && !error && blog && (
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-6">
            {blog.excerpt && (
              <p className="text-lg text-gray-700 mb-6">{blog.excerpt}</p>
            )}
            <article className="prose max-w-none">
              {/* Render content as HTML; ensure server sanitizes or content is trusted */}
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </article>
          </div>
        </section>
      )}
    </div>
  )
}
