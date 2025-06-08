import { Fugaz_One } from 'next/font/google'
import Button from './Button'
import React from 'react'
import Calendar from './Calendar'

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400']})

export default function Hero() {
  return (
    <div className={`px-5 py-10 sm:py-8 md:py-10 w-full mx-auto max-w-[1000px] flex flex-col gap-6 sm:gap-8`}>
      <h1 className={`${fugaz.className} text-5xl text-center sm:text-6xl md:text-7xl`}> <span className='text-gradient'> Moodoshii </span> helps you track your <span className='text-gradient'> daily </span> mood!</h1>
      <p className='text-sm text-center sm:text-lg md:text-xl'> Create your mood record and see how you feel on <span className='font-semibold'> every day of every year </span></p>
      <div className='grid grid-cols-2 gap-4 mx-auto w-fit'>
        <Button text="Sign Up"/>
        <Button text="Login" dark/>
      </div>
      <Calendar />
    </div>
  )
}
