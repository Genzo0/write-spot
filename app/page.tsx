import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Image from 'next/image'

export default function Home () {
  return (
    <div className='bg-slate-50'>
      <section>
        <MaxWidthWrapper className='pb-24 pt-10'>
          <div>Hello world</div>
        </MaxWidthWrapper>
      </section>
    </div>
  )
}
