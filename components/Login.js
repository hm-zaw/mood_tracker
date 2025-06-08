import React from 'react'
import Button from './Button'
import { Fugaz_One } from 'next/font/google'

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400']})

export default function Login() {
  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3 className={`font-fugaz text-4xl sm:text-5xl md:text-6xl`}> Login / Register </h3>
      <p> You're one step away! </p>
      <input className='w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 rounded-lg border border-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300' placeholder='Email' />
      <input className='w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 rounded-lg border border-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300' placeholder='Password' type='password'/>
      <div className='w-full max-w-[400px] mx-auto'>
        <Button text="Submit" full/>
      </div>
      <p> Don't have an account? <span className='text-indigo-600'> Sign Up </span></p>
    </div>
  )
}
