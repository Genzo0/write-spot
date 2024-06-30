import Image from 'next/image'

const Contributor = () => {
  return (
    <div className='flex items-center gap-x-3'>
      <Image
        src={'/images/blank.png'}
        alt='blank'
        className='w-8 h-8 object-cover rounded-full'
        width={20}
        height={20}
      />
      <div className='flex flex-col cursor-pointer w-full'>
        <p className='text-green-600 font-semibold text-sm'>Kevin Nokia</p>
        <p className='text-gray-400 text-sm break-words'>
          sr_sinha_dhyaneshwar@kunze.example
        </p>
      </div>
    </div>
  )
}

export default Contributor
