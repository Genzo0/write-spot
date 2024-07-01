import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

const Navbar = () => {
  return (
    <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper className='flex h-14 items-center justify-between border-b border-zinc-200'>
        <Link href={'/'} className='flex z-[40] font-semibold'>
          write <span className='text-green-600'>spot</span>
        </Link>
        <div className='h-full flex items-center space-x-4'>
          <Link
            href={'/contributors'}
            className={buttonVariants({
              size: 'sm',
              variant: 'ghost'
            })}
          >
            Contributors
          </Link>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
