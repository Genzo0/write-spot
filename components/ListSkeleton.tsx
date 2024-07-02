import { Skeleton } from './ui/skeleton'

const ListSkeleton = () => {
  return (
    <div className='py-8 border-b border-gray-200'>
      <div className='flex flex-col gap-2 w-full'>
        <div className='flex items-center'>
          <Skeleton className='h-4 w-[250px]'></Skeleton>
        </div>
        <h2 className='font-bold text-2xl'>
          <Skeleton className='h-6 w-[300px]'></Skeleton>
        </h2>
        <Skeleton className='h4 w-[300px]'></Skeleton>
        <div className='flex items-center'>
          <Skeleton className='h-4 w-[50px]'></Skeleton>
        </div>
      </div>
    </div>
  )
}

export default ListSkeleton
