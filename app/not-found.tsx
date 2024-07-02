import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound () {
  return (
    <MaxWidthWrapper className='flex flex-col justify-center items-center min-h-[calc(100vh-8.5rem-1px)] gap-4'>
      <h2 className='text-4xl font-semibold'>
        <span className='text-5xl font-bold'>Oops!!!</span> Not Found
      </h2>
      <p className='text-xl'>Could not find requested resource</p>
      <Link
        href='/'
        className={buttonVariants({
          size: 'sm'
        })}
      >
        Return Home
      </Link>
    </MaxWidthWrapper>
  )
}
