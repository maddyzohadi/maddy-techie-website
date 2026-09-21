import { notFound } from 'next/navigation'
import BlogEditor from '@/components/admin/blog/BlogEditor'
import { getPostForAdmin } from '@/lib/blog/queries'

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPostForAdmin(id)
  if (!post) notFound()

  return <BlogEditor initialPost={post} />
}
