import BlogPreview from '@/components/BlogPreview'
import Contributor from '@/components/Contributor'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Image from 'next/image'
import OthersBlog from '@/components/OthersBlog'
import Link from 'next/link'

export default function Home () {
  return (
    <div className='bg-slate-50'>
      <MaxWidthWrapper className='flex w-full'>
        <div className='md:w-8/12 md:border-r md:border-gray-200'>
          <BlogPreview />
          <BlogPreview />
          <BlogPreview />
          <BlogPreview />
          <BlogPreview />
        </div>
        <div className='hidden md:block py-8 px-8'>
          <div className='mb-10'>
            <h3 className='font-semibold mb-8'>Others Blog</h3>
            <div className=' flex flex-col gap-6'>
              <OthersBlog />
              <OthersBlog />
              <OthersBlog />
            </div>
          </div>
          <div className='mb-10'>
            <h3 className='font-semibold mb-4'>Contributors</h3>
            <div className='flex flex-col gap-5 mb-2'>
              <Contributor />
              <Contributor />
              <Contributor />
              <Contributor />
            </div>
            <Link href={'/users'} className='text-green-600 text-sm'>
              see other contributors...
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
