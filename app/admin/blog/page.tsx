import Link from 'next/link'
import { listAllPostsForAdmin } from '@/lib/blog/queries'
import type { PostStatus } from '@/lib/blog/types'

function StatusBadge({ status }: { status?: PostStatus }) {
  if (!status) {
    return <span style={{ fontSize: '11px', color: '#C0B8B2' }}>— none —</span>
  }

  const map: Record<PostStatus, { label: string; color: string; background: string }> = {
    draft: { label: 'Draft', color: '#8C7E74', background: 'rgba(17,17,17,0.06)' },
    in_review: { label: 'In Review', color: '#8B5E34', background: 'rgba(251,191,36,0.16)' },
    approved: { label: 'Approved', color: '#0F8A5F', background: 'rgba(52,211,153,0.14)' },
    published: { label: 'Published', color: '#0F8A5F', background: 'rgba(52,211,153,0.14)' },
  }

  const value = map[status]

  return (
    <span
      style={{
        fontSize: '11px', fontWeight: 600, padding: '2px 9px', borderRadius: '100px',
        background: value.background,
        color: value.color,
      }}
    >
      {value.label}
    </span>
  )
}

export default async function AdminBlogListPage() {
  const posts = await listAllPostsForAdmin()

  return (
    <div style={{ padding: '32px 40px', maxWidth: '1200px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: 700, color: '#111111' }}>Blog</h1>
          <p style={{ margin: 0, fontSize: '13.5px', color: '#8C7E74' }}>{posts.length} post{posts.length !== 1 ? 's' : ''} total</p>
        </div>
        <Link
          href="/admin/blog/new"
          style={{ padding: '9px 18px', borderRadius: '9px', fontSize: '13px', fontWeight: 600, background: '#ED5821', color: '#fff', textDecoration: 'none' }}
        >
          + New Post
        </Link>
      </div>

      <div style={{ background: '#FFFDF8', border: '0.5px solid rgba(17,17,17,0.09)', borderRadius: '14px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '760px' }}>
            <thead>
              <tr style={{ background: 'rgba(17,17,17,0.025)' }}>
                {['Title', 'Category', 'Author', 'EN', 'FA', ''].map((h) => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#8C7E74', letterSpacing: '0.06em', borderBottom: '0.5px solid rgba(17,17,17,0.07)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div style={{ padding: '56px 32px', textAlign: 'center' }}>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#625B55' }}>No posts yet.</p>
                      <p style={{ margin: '6px 0 0', fontSize: '13px', color: '#B0A89E' }}>Click <strong style={{ color: '#C43E22' }}>+ New Post</strong> to write your first one.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                posts.map(({ post, translations }) => {
                  const title = translations.en?.title || translations.fa?.title || <em style={{ color: '#B0A89E' }}>Untitled</em>
                  return (
                    <tr key={post.id} style={{ borderBottom: '0.5px solid rgba(17,17,17,0.05)' }}>
                      <td style={{ padding: '12px 16px', fontSize: '13.5px', color: '#111111', fontWeight: 500 }}>{title}</td>
                      <td style={{ padding: '12px 16px', fontSize: '12.5px', color: '#625B55' }}>{post.category_en || post.category_fa || '—'}</td>
                      <td style={{ padding: '12px 16px', fontSize: '12.5px', color: '#625B55' }}>{post.author || '—'}</td>
                      <td style={{ padding: '12px 16px' }}><StatusBadge status={translations.en?.status} /></td>
                      <td style={{ padding: '12px 16px' }}><StatusBadge status={translations.fa?.status} /></td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        <Link href={`/admin/blog/${post.id}`} style={{ fontSize: '12px', fontWeight: 500, color: '#C43E22', textDecoration: 'none' }}>
                          Edit →
                        </Link>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
