import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const Navbar = () => {
  const session = cookies().get('admin')
  return (
    <nav className='sticky z-[50] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper className='flex h-14 items-center justify-between border-b border-zinc-200'>
        <Link href={'/'} className='flex z-[40] font-semibold'>
          write <span className='text-green-600'>spot</span>
        </Link>
        <div className='h-full flex items-center space-x-4'>
          {session ? (
            <>
              <Link
                href={'/contributors'}
                className={buttonVariants({
                  size: 'sm',
                  variant: 'ghost'
                })}
              >
                Contributors
              </Link>
              <form
                action={async () => {
                  'use server'
                  await logout()
                  redirect('/')
                }}
              >
                <button
                  type='submit'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                    className: 'bg-red-500 text-white'
                  })}
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <Link
              href={'/login'}
              className={buttonVariants({
                size: 'sm'
              })}
            >
              Login
            </Link>
          )}
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

function logout () {
  cookies().set('admin', '', { expires: new Date(0) })
}

export default Navbar
