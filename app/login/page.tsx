import { useToast } from '@/components/ui/use-toast'
import { login } from './actions'
import { redirect } from 'next/navigation'

export default function Login () {
  return (
    <div className='flex justify-center items-center bg-white h-[80vh] text-white'>
      <div className='bg-primary md:p-20 p-5 rounded-lg'>
        <form
          className='flex flex-col w-full'
          method='POST'
          action={async formData => {
            'use server'
            await login(formData)
            redirect('/contributors')
          }}
        >
          <h2 className='text-title-large text-white mb-[25px] font-bold'>
            Masuk
          </h2>
          <div className='mb-[27px]'>
            <label
              htmlFor='username'
              className='block text-white mb-[15px] text-lg'
            >
              Username
            </label>
            <input
              type='text'
              name='username'
              className='p-3 w-full bg-transparent border border-filled-color rounded-md text-filled-color focus:text-mainBg focus:border-mainBg focus:outline-none'
            ></input>
          </div>
          <div className='mb-[15px] relative'>
            <label
              htmlFor='password'
              className='block text-white mb-[15px] text-lg'
            >
              Password
            </label>
            <input
              type={'password'}
              name='password'
              className='p-3 pr-[50px] w-full bg-transparent border border-filled-color rounded-md text-filled-color focus:text-mainBg focus:border-mainBg focus:outline-none peer'
            ></input>
          </div>
          <button
            type='submit'
            className={`w-full bg-primary rounded-md py-2.5 my-2 text-mainBg text-lg font-reguler border border-white focus:outline-none focus:bg-mainBg focus:text-primary hover:bg-mainBg hover:text-primary
            }`}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
