import { useEffect, useState } from 'react'
import { adminListBlogs, createBlog, updateBlog, deleteBlog } from '@/utils/api'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', published: true })

  const load = () => {
    setLoading(true)
    adminListBlogs()
      .then(res => setBlogs(res.items || []))
      .catch(err => setError(err.message || 'Failed to load blogs'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const openCreate = () => {
    setEditing(null)
    setForm({ title: '', slug: '', excerpt: '', content: '', published: true })
    setModalOpen(true)
  }
  const openEdit = (b) => {
    setEditing(b)
    setForm({ title: b.title || '', slug: b.slug || '', excerpt: b.excerpt || '', content: b.content || '', published: !!b.published })
    setModalOpen(true)
  }
  const onSave = async () => {
    try {
      if (!form.title || !form.content) {
        alert('Title and content are required')
        return
      }
      if (editing) {
        await updateBlog(editing._id, form)
      } else {
        await createBlog(form)
      }
      setModalOpen(false)
      load()
    } catch (e) {
      alert(e.message || 'Failed to save')
    }
  }
  const onDelete = async (b) => {
    if (!confirm('Delete this blog?')) return
    try {
      await deleteBlog(b._id)
      load()
    } catch (e) {
      alert(e.message || 'Failed to delete')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Blogs</h2>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">
          <Plus size={18} /> New Blog
        </button>
      </div>

      {loading && <div className="rounded-lg border p-4">Loading...</div>}
      {error && <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}

      {!loading && !error && (
        <div className="overflow-x-auto bg-white rounded-lg border">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Slug</th>
                <th className="text-left p-3">Published</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map(b => (
                <tr key={b._id} className="border-t">
                  <td className="p-3">{b.title}</td>
                  <td className="p-3 text-gray-600">{b.slug}</td>
                  <td className="p-3">{b.published ? 'Yes' : 'No'}</td>
                  <td className="p-3 text-right">
                    <button onClick={() => openEdit(b)} className="inline-flex items-center gap-1 px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 mr-2">
                      <Edit size={16}/> Edit
                    </button>
                    <button onClick={() => onDelete(b)} className="inline-flex items-center gap-1 px-3 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700">
                      <Trash2 size={16}/> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr><td className="p-3 text-gray-600" colSpan={4}>No blogs yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">{editing ? 'Edit Blog' : 'New Blog'}</h3>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Title</label>
                <input className="w-full border rounded px-3 py-2" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Slug (optional)</label>
                <input className="w-full border rounded px-3 py-2" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Excerpt</label>
                <textarea className="w-full border rounded px-3 py-2" rows={2} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Content (HTML allowed)</label>
                <textarea className="w-full border rounded px-3 py-2 font-mono" rows={10} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
              </div>
              <div className="flex items-center gap-2">
                <input id="published" type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} />
                <label htmlFor="published" className="text-sm text-gray-700">Published</label>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200">Cancel</button>
              <button onClick={onSave} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
