import BlogPreview from '@/components/BlogPreview'
import Contributor from '@/components/Contributor'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Image from 'next/image'
import OthersBlog from '@/components/OthersBlog'
import Link from 'next/link'
import { Suspense } from 'react'
import { Blog } from '@/types/blog'
import ListSkeleton from '@/components/ListSkeleton'
import { User } from '@/types/user'

export default async function Home () {
  const getBlogs = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_API}/posts`
    )
    if (!response.ok) {
      throw new Error('Failed to fetch blogs')
    } else {
      return await response.json()
    }
  }

  const data = await getBlogs()

  const getUsers = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/users`)
    return await data.json()
  }

  const users = await getUsers()

  return (
    <MaxWidthWrapper className='flex w-full'>
      <div className='min-w-7/12 md:border-r md:border-gray-200'>
        {data.map((blog: Blog) => (
          <Suspense key={blog.id} fallback={<ListSkeleton />}>
            <BlogPreview {...blog} />
          </Suspense>
        ))}
      </div>
      <div className='hidden md:block md:w-5/12 py-8 px-8'>
        <div className='mb-10'>
          <h3 className='font-semibold mb-8'>Others Blog</h3>
          <div className=' flex flex-col gap-6'>
            {data.slice(7, 10).map((blog: Blog) => (
              <OthersBlog key={blog.id} {...blog} />
            ))}
          </div>
        </div>
        <div className='mb-10'>
          <h3 className='font-semibold mb-4'>Contributors</h3>
          <div className='flex flex-col gap-5 mb-2'>
            {users.slice(0, 5).map((user: User) => (
              <Contributor key={user.id} {...user} />
            ))}
          </div>
          <Link href={'/contributors'} className='text-green-600 text-sm'>
            see other contributors...
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}
