'use client' // Error components must be Client Components

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error ({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <MaxWidthWrapper className='flex flex-col justify-center items-center min-h-[calc(100vh-8.5rem-1px)] gap-4'>
      <h2 className='text-4xl font-semibold'>Something went wrong!</h2>
      <Button
        className='bg-transparent text-black border gray-400 hover:bg-gray-100 hover:border-green-500'
        size='sm'
        onClick={
          // Reset the entire app state
          () => location.reload()
        }
      >
        Try Again
      </Button>
      <p className='text-lg font-semibold'>or</p>
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
