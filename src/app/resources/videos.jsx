import React, { useEffect, useState } from 'react'

export default function VideosPage() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID
    const handle = import.meta.env.VITE_YOUTUBE_HANDLE
    const apiBase = import.meta.env.VITE_API_BASE_URL || ''
    let url = ''
    let serverUrl = ''
    if (channelId) {
      url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
      serverUrl = `${apiBase}/api/resources/videos?channelId=${encodeURIComponent(channelId)}`
    } else if (handle) {
      const user = (handle || '').replace(/^@/, '')
      url = `https://www.youtube.com/feeds/videos.xml?user=${user}`
      serverUrl = `${apiBase}/api/resources/videos?handle=${encodeURIComponent(handle)}`
    } else {
      setError('Missing channel configuration (set VITE_YOUTUBE_CHANNEL_ID or VITE_YOUTUBE_HANDLE).')
      setLoading(false)
      return
    }
    const fetchXml = async (u) => {
      try {
        const res = await fetch(u)
        if (!res.ok) throw new Error('Direct fetch blocked')
        return await res.text()
      } catch (_) {
        // Try server proxy to bypass CORS
        try {
          const resProxy = await fetch(serverUrl)
          if (!resProxy.ok) throw new Error('Server proxy failed')
          return await resProxy.text()
        } catch (e) {
          // As last resort, try public CORS proxy
          const proxy = `https://cors.isomorphic-git.org/${u}`
          const res2 = await fetch(proxy)
          if (!res2.ok) throw new Error('Failed to fetch')
          return await res2.text()
        }
      }
    }

    fetchXml(url)
      .then(xml => {
        const doc = new window.DOMParser().parseFromString(xml, 'application/xml')
        const atomNS = 'http://www.w3.org/2005/Atom'
        const ytNS = 'http://www.youtube.com/xml/schemas/2015'
        const mediaNS = 'http://search.yahoo.com/mrss/'

        const entriesEls = Array.from(doc.getElementsByTagNameNS(atomNS, 'entry'))
        const entries = entriesEls.map(entry => {
          const getTextNS = (ns, tag) => entry.getElementsByTagNameNS(ns, tag)[0]?.textContent || ''
          const videoId = getTextNS(ytNS, 'videoId')
          const linkEls = Array.from(entry.getElementsByTagNameNS(atomNS, 'link'))
          let href = ''
          for (const l of linkEls) {
            const rel = l.getAttribute('rel') || 'alternate'
            if (rel === 'alternate' && l.getAttribute('href')) {
              href = l.getAttribute('href')
              break
            }
          }
          if (!href && videoId) {
            href = `https://www.youtube.com/watch?v=${videoId}`
          }
          let thumb = ''
          const thumbEl = entry.getElementsByTagNameNS(mediaNS, 'thumbnail')[0]
          if (thumbEl) thumb = thumbEl.getAttribute('url') || ''
          if (!thumb) {
            const vid = videoId || (() => {
              try {
                const u = new URL(href)
                return u.searchParams.get('v') || ''
              } catch { return '' }
            })()
            if (vid) thumb = `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`
          }
          return {
            id: videoId || href,
            title: getTextNS(atomNS, 'title'),
            url: href,
            publishedAt: getTextNS(atomNS, 'published'),
            thumbnail: thumb,
          }
        })
        setVideos(entries.slice(0, 12))
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-20 sm:pt-24 lg:pt-32 pb-10 bg-gradient-to-br from-gray-50 via-white to-gray-100">
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
          {loading && (
            <div className="rounded-3xl border border-gray-100 p-8 text-gray-600">Loading videos...</div>
          )}
          {error && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-red-700">{error}</div>
          )}
          {!loading && !error && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map(v => (
                <a key={v.id || v.url} href={v.url} target="_blank" rel="noopener noreferrer" className="group bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-100 relative">
                    {v.thumbnail ? (
                      <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No thumbnail</div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-900 font-semibold line-clamp-2">{v.title}</h3>
                    {v.publishedAt && (
                      <p className="text-sm text-gray-500 mt-1">{new Date(v.publishedAt).toLocaleDateString()}</p>
                    )}
                  </div>
                </a>
              ))}
              {videos.length === 0 && (
                <div className="rounded-3xl border border-gray-100 p-8 text-gray-600 col-span-full">No videos found.</div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}


