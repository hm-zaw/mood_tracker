import React from 'react'
import { Fugaz_One } from 'next/font/google'
import { Open_Sans } from 'next/font/google'
import Calendar from './Calendar'

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400']})
const opensans = Open_Sans({ subsets: ["latin"], weight: ['400']})

export default function Dashboard() {
  const statuses = {
    num_days: 14,
    time_remaining: '13:14:26',
    date: (new Date()).toDateString()
  }

  const moods = {
  '&*@#$': '😠',
  'Sad': '😭',
  'Delulu': '😶',
  'Good': '😎',
  'Fall-in-love': '😍',
  'Depressed': '😟',
  'Tired': '😴',
  'Excited': '🤩',
  'Peaceful': '🧘',
  'Unhinged': '🫠',
};


  return (
    <div className='flex flex-col flex-1 gap-4 sm:gap-6 md:gap-8 max-w-[1350px] mx-10 sm:mx-auto md:mx-auto'>
      <div className='px-10 sm:px-14 md:px-20 py-3 grid grid-cols-3 sm:grid-cols-3 text-indigo-500 bg-indigo-50 rounded-lg gap-12 sm:gap-14 md:gap-20' >
        {
          Object.keys(statuses).map((status, statusIndex) => {
            return (
              <div key={statusIndex} className='flex flex-col gap-1 sm:gap-2'>
                <p className={`text-xs sm:text-sm font-medium uppercase truncate text-center`}> {status.replaceAll('_', ' ')} </p>
                <p className={`font-fugaz text-base sm:text-lg truncate text-center`} > {statuses[status]} </p>
              </div>
            )
          })
        }
      </div>
      <h4 className='text-4xl sm:text-5xl md:text-6xl text-center font-fugaz'>
        How do you <span className='text-gradient'> feel </span> today?
      </h4>
      <div className='grid grid-cols-3 sm:grid-cols-2 md:grid-cols-5 gap-4'> 
        {Object.keys(moods).map((mood, moodIndex) => {
          const isLast = moodIndex === Object.keys(moods).length - 1;
          return (
            <button key={moodIndex} className={`purple_shadow hover:bg-indigo-50 duration-200 p-4 rounded-lg flex flex-col items-center gap-1 sm:gap-2 ${
                isLast ? 'col-span-3 sm:col-span-1 md:col-span-1' : ''
              }`}
            >
              <p className='text-4xl sm:text-5xl md:text-6xl'>{moods[mood]}</p>
              <p className='font-fugaz text-indigo-600'>{mood}</p>
            </button>
          );
        })}
      </div>
      <Calendar />
    </div>
  )
}
