'use client'
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
    followed: boolean
  } | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token')
        const response = await axios.get(`/users`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          params: {
            user_id
          }
        })
        console.log(response.data)
        // setUserInfoState(response.data)
      } catch (error) {
        console.error('Error fetching user information:', error)
        // setUserInfoState(null)
      }
    }

    fetchData()
  }, [])
  return (
    <>
      <div>
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
                    {userInfoState?.followed ? (
                      <Button variant={'default'} onClick={() => {}}>
                        Follow
                      </Button>
                    ) : (
                      <Button variant={'secondary'} onClick={() => {}}>
                        Unfollow
                      </Button>
                    )}
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
      </div>
    </>
  )
}
