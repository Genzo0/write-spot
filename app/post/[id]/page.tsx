import BlogPreview from '@/components/BlogPreview'
import Comments from '@/components/Comments'
import Contributor from '@/components/Contributor'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import RelatedCard from '@/components/RelatedCard'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Blog } from '@/types/blog'
import { Comment } from '@/types/comment'
import Image from 'next/image'
import { FormEvent } from 'react'
import CommentSection from './CommentSection'

type Params = {
  id: string
}

const Page = async ({ params }: { params: Params }) => {
  const { id } = params

  const getUserBlogs = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/users/${id}/posts`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch user blogs')
    } else {
      return await response.json()
    }
  }

  const getBlog = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/posts/${id}`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch blog')
    } else {
      return await response.json()
    }
  }

  const blog = await getBlog()
  const userBlogs = await getUserBlogs()

  return (
    <>
      <MaxWidthWrapper className='flex flex-col justify-center items-center'>
        <div className='flex flex-col py-10 gap-3 mb-5'>
          <h2 className='font-extrabold md:text-5xl text-4xl'>{blog.title}</h2>
          <div className='flex items-center gap-x-3'>
            <Image
              src={'/images/blank.png'}
              alt='blank'
              className='w-8 h-8 object-cover rounded-full'
              width={20}
              height={20}
            />
            <div className='flex flex-col w-full'>
              <p className='text-green-600 font-semibold text-sm'>
                {blog.user_id}
              </p>
            </div>
          </div>
        </div>
        <div className='pb-10 gap-2 md:gap-5'>{blog.body}</div>
      </MaxWidthWrapper>

      <CommentSection id={id} />

      {userBlogs.length > 0 && (
        <div className='w-full text-black mt-5 md:mt-10 bg-white'>
          <MaxWidthWrapper className='py-10'>
            <p className='font-semibold pt-5 text-2xl text-green-600'>
              More from {blog.user_id}
            </p>
            <div className='my-5 grid grid-cols-1 gap-5'>
              {userBlogs.map((blog: Blog) => (
                <BlogPreview key={blog.id} {...blog} />
              ))}
            </div>
          </MaxWidthWrapper>
        </div>
      )}
    </>
  )
}

export default Page
