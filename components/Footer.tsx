import MaxWidthWrapper from './MaxWidthWrapper'

const Footer = () => {
  return (
    <footer className='h-20 bg-white relative'>
      <MaxWidthWrapper>
        <div className='border-t border-gray-200' />
        <div className='h-full flex flex-col md:flex-row justify-center items-center'>
          <div className='text-center pb-2 md:pb-0'>
            <p className='text-sm text-muted-foreground'>
              &copy; {new Date().getFullYear()} WriteSpot. All rights reserved.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer
