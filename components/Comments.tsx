import { Comment } from '@/types/comment'
import { CircleUser, MessageCircle } from 'lucide-react'

const Comments = ({ id, post_id, name, email, body }: Comment) => {
  return (
    <div className='py-4 border-b border-gray-200'>
      <div className='cursor-pointer'>
        <div className='flex flex-col'>
          <div className='flex items-center'>
            <CircleUser className='h-5 w-5 text-gray-400 mr-2' />
            <p className='text-green-600'>{name}</p>
          </div>
          <h2 className='text-gray-400 text-sm'>{email}</h2>
          <p className='text-gray-400'>{body}</p>
        </div>
      </div>
    </div>
  )
}

export default Comments
