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
    followed: boolean
  } | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
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

        <Videos user_id={user_id} />
      </div>
    </>
  )
}
