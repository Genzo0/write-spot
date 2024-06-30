import { CircleUser, MessageCircle } from 'lucide-react'

const Comments = () => {
  return (
    <div className='py-4 border-b border-gray-200'>
      <div className='cursor-pointer'>
        <div className='flex flex-col'>
          <div className='flex items-center'>
            <CircleUser className='h-5 w-5 text-gray-400 mr-2' />
            <p className='text-green-600'>Derek Johnson</p>
          </div>
          <h2 className='text-gray-400 text-sm'>revenants@gamicalw.com</h2>
          <p className='text-gray-400'>
            In 2022, I worked on a contract as a software engineer at Apple.
            Apple dissolved our entire team right before the 2022 tech...
          </p>
        </div>
      </div>
    </div>
  )
}

export default Comments
