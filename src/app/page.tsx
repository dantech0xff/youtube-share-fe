'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import Login from './components/Login'
import Videos from './components/Videos'

export default function Home() {
  const [authState, setAuthState] = useState('not_authorized')
  useEffect(() => {
    if (typeof window === 'undefined') return
    const accessToken = localStorage.getItem('access_token')
    if (accessToken && accessToken.length > 0) {
      setAuthState('authorized')
    } else {
      setAuthState('not_authorized')
    }
  })
  return (
    <div>
      {authState === 'not_authorized' ? (
        <div>
          <Login
            onLogin={(token) => {
              console.log(`onLogin from Main Page ${token}`)
            }}
          />
        </div>
      ) : (
        <div>
          <Videos />
        </div>
      )}
    </div>
  )
}
