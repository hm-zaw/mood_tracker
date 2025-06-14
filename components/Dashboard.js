'use client'
import Loading from './Loading'
import Login from './Login'
import Calendar from './Calendar'
import React, { useEffect, useState } from 'react'
import { Fugaz_One } from 'next/font/google'
import { Open_Sans } from 'next/font/google'
import { useAuth } from '@/context/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'

export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth() 
  const [data, setData] = useState(null)
  const now = new Date();
  
  function countValues() {
    let total_number_of_days = 0
    let sum_moods = 0
    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let days_mood = data[year][month][day]
          total_number_of_days++
          sum_moods += days_mood
        }
      }
    }
    return { num_days: total_number_of_days, average_mood: sum_moods / total_number_of_days }
  }
  
  const statuses = {
    ...countValues(),
    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
  }

  async function handleSetMood(mood){
    // update the current state
    // update the global state
    // update the firebase
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    try {
      const newData = { ...userDataObj }
      if(!newData?.[year]) {
        newData[year] = {}
      }
      if(!newData?.[year]?.[month]) {
        newData[year][month] = {}
      }
      newData[year][month][day] = mood
      setData(newData)
      setUserDataObj(newData)
      const docRef = doc(db, 'users', currentUser.uid)
      const res = await setDoc(docRef, {
        [year]: {
          [month]: {
            [day]: mood
          }
        }
      }, { merge: true })
      console.log("result for setDoc", res)
    } catch (error) {
      console.log("Failed to set data", error.message)
    }
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

  useEffect(() => {
    if(!currentUser || !userDataObj) {
      return 
    }
    setData(userDataObj)
  }, [currentUser, userDataObj])

  if(loading){
    return <Loading />
  }

  if (!currentUser) {
    return <Login />
  }

  console.log("The final data is", data)


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
            <button onClick={() => {
              const currentMoodValue = moodIndex + 1;
              handleSetMood(currentMoodValue)
            }} key={moodIndex} className={`purple_shadow hover:bg-indigo-50 duration-200 p-4 rounded-lg flex flex-col items-center gap-1 sm:gap-2 ${
                isLast ? 'col-span-3 sm:col-span-1 md:col-span-1' : ''
              }`}
            >
              <p className='text-4xl sm:text-5xl md:text-6xl'>{moods[mood]}</p>
              <p className='font-fugaz text-indigo-600'>{mood}</p>
            </button>
          );
        })}
      </div>
      <Calendar completeData={data} handleSetMood={handleSetMood} />
    </div>
  )
}
