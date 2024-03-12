'use client'
import Videos from '@/app/components/Videos'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Page({ params }: { params: { slug: string } }) {
  const user_id = params.slug
  const [userInfoState, setUserInfoState] = useState<{
    user_id: string
    email: string
    create_at: string
    followable: number
  } | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const followUserId = async (user_id: string) => {
    setIsProcessing(true)
    try {
      if (typeof window === 'undefined') return
      const accessToken = localStorage.getItem('access_token')
      console.log({
        accessToken,
        user_id
      })
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/follow`,
        {
          user_id
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      console.log(response.data)
      setUserInfoState({
        email: userInfoState?.email || '',
        user_id: userInfoState?.user_id || '',
        create_at: userInfoState?.create_at || '',
        followable: -1
      })
      setIsProcessing(false)
    } catch (error) {
      console.error('Error fetching user information:', error)
      setUserInfoState(null)
    }
  }
  const unfollowUserId = async (user_id: string) => {
    setIsProcessing(true)
    try {
      if (typeof window === 'undefined') return
      const accessToken = localStorage.getItem('access_token')
      console.log({
        accessToken,
        user_id
      })
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/unfollow`,
        {
          user_id
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      console.log(response.data)
      setUserInfoState({
        email: userInfoState?.email || '',
        user_id: userInfoState?.user_id || '',
        create_at: userInfoState?.create_at || '',
        followable: 1
      })
      setIsProcessing(false)
    } catch (error) {
      console.error('Error fetching user information:', error)
      setUserInfoState(null)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof window === 'undefined') return

        const accessToken = localStorage.getItem('access_token')
        console.log({
          accessToken,
          user_id
        })
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${user_id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        console.log(response.data)
        setUserInfoState(response.data.data)
      } catch (error) {
        console.error('Error fetching user information:', error)
        setUserInfoState(null)
      }
    }

    fetchData()
  }, [])
  return (
    <>
      <div>
        <Button
          className='m-2'
          size={'lg'}
          onClick={() => {
            window.location.replace('/')
          }}
        >
          Home
        </Button>
        <Card className='w-[420px] p-2 m-2'>
          {userInfoState != null ? (
            <>
              <div>
                <div>
                  <div>User's Information</div>
                  <div>Thanks for using our amazing Youtube Share Service.</div>
                </div>
                <div>
                  <div className='flex justify-normal'>
                    <div className='mr-2'>ID: {userInfoState?.user_id}</div>
                    {userInfoState?.followable == 1 ? (
                      <Button
                        variant={'default'}
                        onClick={() => {
                          followUserId(user_id)
                        }}
                      >
                        {isProcessing ? 'Processing...' : 'Follow'}
                      </Button>
                    ) : userInfoState?.followable == -1 ? (
                      <Button
                        variant={'secondary'}
                        onClick={() => {
                          unfollowUserId(user_id)
                        }}
                      >
                        {isProcessing ? 'Processing...' : 'Unfollow'}
                      </Button>
                    ) : null}
                  </div>
                  <div>Email: {userInfoState?.email}</div>
                  <div>Created At: {userInfoState?.create_at}</div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2>Your User Information is invalid!</h2>
              <Button>
                <a href={'/'}> Back To Home Page</a>
              </Button>
            </>
          )}
        </Card>

        <Videos user_id={user_id} />
      </div>
    </>
  )
}
