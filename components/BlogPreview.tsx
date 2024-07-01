import { CircleUser, MessageCircle } from 'lucide-react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'

const BlogPreview = () => {
  return (
    <div className='py-8 border-b border-gray-200'>
      <Link href={'/post/1'} className='cursor-pointer'>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center'>
            <CircleUser className='h-5 w-5 text-gray-400 mr-2' />
            <p className='text-sm text-green-600'>Derek Johnson</p>
          </div>
          <h2 className='font-bold text-2xl'>
            I'm Unemployed for Over Two Years (as a software engineer)
          </h2>
          <p className='text-gray-400'>
            In 2022, I worked on a contract as a software engineer at Apple.
            Apple dissolved our entire team right before the 2022 tech...
          </p>
          <div className='flex items-center'>
            <MessageCircle className='h-5 w-5 text-green-600' />
            <p className='text-gray-400 ml-2'>5</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default BlogPreview
