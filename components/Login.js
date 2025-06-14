'use client'
import React, { useState } from 'react'
import Button from './Button'
import { Fugaz_One } from 'next/font/google'
import { useAuth } from '@/context/AuthContext'

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400']})

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const { signup, login } = useAuth()
  const [authenticating, setAuthenticating] = useState(false)

  async function handleSubmit() {
      if(!email || !password || password.length < 8){
        return
      }

      setAuthenticating(true)

      try {
        if(isRegister){
          console.log("Sign up a new user");
          await signup(email, password)
        } else {
          console.log('Loggin in existing user')
          await login(email, password)
        }
      } catch (error) {
        console.log(error.message)
      } finally {
        setAuthenticating(false)
      }
  }
  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3 className={`px-20 sm:px-28 md:px-32 font-fugaz text-4xl sm:text-5xl md:text-6xl text-center`}>{isRegister ? 'Register' : 'Login'} </h3>
      
      <input value={email} onChange={(e) => { setEmail(e.target.value) }}
        className='w-full max-w-[500px] mx-auto px-4 py-2 sm:py-3 rounded-lg border border-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300' 
        placeholder='Email' 
      />
      <input value={password} onChange={(e) => { setPassword(e.target.value) }}
        className='w-full max-w-[500px] mx-auto px-4 py-2 sm:py-3 rounded-lg border border-indigo-600 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300' 
        placeholder='Password' type='password'
      />
      <div className='w-full max-w-[500px] mx-auto'>
        <Button clickHandler={handleSubmit} text={authenticating ? 'Submitting' : "Submit"} full/>
      </div>
      <p> {isRegister ? "Already have an account?" : "Don't have an account?"}  
        <button onClick={() => setIsRegister(!isRegister)} className='text-indigo-600'> {isRegister ? 'Sign in' : 'Sign up'} </button>
      </p>
    </div>
  )
}
