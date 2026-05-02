import { useEffect, useState } from 'react'
import './App.css'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts'

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [responseLog, setResponseLog] = useState<{ method: string; status: number; body: unknown } | null>(null)

  const [formTitle, setFormTitle] = useState('')
  const [formBody, setFormBody] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)

  async function apiFetch(method: string, path: string, body?: unknown) {
    const res = await fetch(`${API_URL}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    })
    const data = method !== 'DELETE' ? await res.json() : null
    setResponseLog({ method, status: res.status, body: data ?? { deleted: true } })
    return res
  }

  async function loadPosts() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setPosts((await res.json()).slice(0, 10))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadPosts() }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!formTitle.trim() || !formBody.trim()) return
    const res = await apiFetch('POST', '', { userId: 1, title: formTitle, body: formBody })
    if (!res.ok) return
    setFormTitle('')
    setFormBody('')
    await loadPosts()
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault()
    if (!editingId || !formTitle.trim() || !formBody.trim()) return
    const post = posts.find(p => p.id === editingId)
    if (!post) return
    const res = await apiFetch('PUT', `/${post.id}`, { ...post, title: formTitle, body: formBody })
    if (!res.ok) return
    setEditingId(null)
    setFormTitle('')
    setFormBody('')
    await loadPosts()
  }

  async function handleDelete(post: Post) {
    await apiFetch('DELETE', `/${post.id}`)
    await loadPosts()
  }

  function startEdit(post: Post) {
    setEditingId(post.id)
    setFormTitle(post.title)
    setFormBody(post.body)
  }

  function cancelEdit() {
    setEditingId(null)
    setFormTitle('')
    setFormBody('')
  }

  if (loading) return <div className="status">Loading...</div>
  if (error) return <div className="status error">Error: {error}</div>

  return (
    <div className="app">
      <h1>Posts</h1>
      <p className="subtitle">API: {API_URL}</p>

      <form className="post-form" onSubmit={editingId ? handleUpdate : handleCreate}>
        <input placeholder="Title" value={formTitle} onChange={e => setFormTitle(e.target.value)} />
        <textarea placeholder="Body" value={formBody} onChange={e => setFormBody(e.target.value)} />
        <div className="form-actions">
          <button type="submit">{editingId ? 'PUT (Update)' : 'POST (Create)'}</button>
          {editingId && <button type="button" className="btn-cancel" onClick={cancelEdit}>Cancel</button>}
        </div>
      </form>

      {responseLog && (
        <div className="response-log">
          <strong>{responseLog.method}</strong> &rarr; {responseLog.status}
          <pre>{JSON.stringify(responseLog.body, null, 2)}</pre>
        </div>
      )}

      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <div className="post-actions">
              <button className="btn-edit" onClick={() => startEdit(post)}>PUT</button>
              <button className="btn-delete" onClick={() => handleDelete(post)}>DELETE</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
