import { CircleUser, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { Blog } from '@/types/blog'

const BlogPreview = async ({ id, user_id, title, body }: Blog) => {
  const comments = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}/posts/${id}/comments?access-token=${process.env.NEXT_PUBLIC_TOKEN}`
  ).then(res => res.json())

  return (
    <div className='py-8 border-b border-gray-200'>
      <Link href={`/post/${id}`} className='cursor-pointer'>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center'>
            <CircleUser className='h-5 w-5 text-gray-400 mr-2' />
            <p className='text-sm text-green-600'>{user_id}</p>
          </div>
          <h2 className='font-bold text-2xl'>{title}</h2>
          <p className='text-gray-400'>{body.slice(0, 100)}...</p>
          <div className='flex items-center'>
            <MessageCircle className='h-5 w-5 text-green-600' />
            <p className='text-gray-400 ml-2'>{comments.length}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default BlogPreview
