import { Blog } from '@/types/blog'

const OthersBlog = ({ id, user_id, title, body }: Blog) => {
  return (
    <div className='flex flex-col gap-1'>
      <p className='flex font-bold cursor-pointer'>{title}</p>
      <p className='flex text-sm font-semibold cursor-pointer text-green-600'>
        <span className='font-light mr-1 text-gray-400'>by</span> {id}
      </p>
    </div>
  )
}

export default OthersBlog
