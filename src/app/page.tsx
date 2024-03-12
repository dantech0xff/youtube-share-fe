'use client'

import { useEffect, useState } from 'react'
import Login from './components/Login'
import Videos from './components/Videos'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [userInfoState, setUserInfoState] = useState<{
    email: string
    user_id: string
  } | null>(null)

  const handleLogout = () => {
    console.log('Logout')
    localStorage.removeItem('access_token')
    localStorage.removeItem('email')
    localStorage.removeItem('user_id')
    setUserInfoState(null)
  }
  const handleChangePassword = () => {
    // Direct to change-password route
    // You can use the history object to navigate to the change-password route
    window.location.href = '/change-password'
  }
  const handleShareVideo = () => {
    window.location.href = '/share-video'
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    const accessToken = localStorage.getItem('access_token')
    if (accessToken && accessToken.length > 0) {
      setUserInfoState({
        email: localStorage.getItem('email') || '',
        user_id: localStorage.getItem('user_id') || ''
      })
    } else {
      setUserInfoState(null)
    }
  }, [])

  return (
    <div className='m-100'>
      {userInfoState == null ? (
        <div>
          <Login
            onLogin={(params) => {
              console.log(params)
              const { access_token, email, user_id } = params
              console.log(`onLogin from Main Page ${access_token} ${email} ${user_id}`)
              localStorage.setItem('access_token', access_token)
              localStorage.setItem('email', email)
              localStorage.setItem('user_id', user_id)
              setUserInfoState({ email, user_id })
            }}
          />
        </div>
      ) : (
        <>
          <div>
            {userInfoState ? (
              <>
                <Card className='w-[420px]'>
                  <CardHeader>
                    <CardTitle>User's Information</CardTitle>
                    <CardDescription>Thanks for using our amazing Youtube Share Service.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <p>ID: {userInfoState.user_id}</p>
                      <p>Email: {userInfoState.email}</p>
                      <div className='flex justify-end'>
                        <Button
                          className='mt-4 mr-4'
                          size='default'
                          onClick={() => {
                            handleShareVideo()
                          }}
                        >
                          Share Video
                        </Button>
                        <Button
                          className='mt-4 mr-4'
                          variant='secondary'
                          size='default'
                          onClick={() => {
                            handleChangePassword()
                          }}
                        >
                          Change Password
                        </Button>

                        <Button
                          className='mt-4'
                          variant='destructive'
                          size='default'
                          onClick={() => {
                            handleLogout()
                          }}
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : null}
            <Videos user_id='' />
          </div>
        </>
      )}
    </div>
  )
}
