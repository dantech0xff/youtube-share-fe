import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card } from '@/components/ui/card'

export default function Videos({ user_id }: { user_id: string }) {
  const requestUserId = user_id
  const [videoList, setVideoList] = useState<
    {
      id: string
      views: number
      user_id: string
      url: string
      create_at: string
      title: string
      description: string
      email: string
    }[]
  >([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let pathRequest = `${process.env.NEXT_PUBLIC_SERVER_URL}/videos`
        if (requestUserId && requestUserId.length > 0) {
          pathRequest = `${process.env.NEXT_PUBLIC_SERVER_URL}/videos/user/${user_id}`
        }
        const response = await axios.get(pathRequest, {
          params: {
            startIndex: 0,
            limit: 10
          }
        })

        console.log(response.data)
        const videos = response.data.data.videos
        const nextIndex = response.data.data.nextIndex
        const total = response.data.data.total
        setVideoList((prevVideoList) => {
          const ret = [...prevVideoList, ...videos]
          const uniqueVideos = Array.from(new Set(ret.map((video) => video.id))).map((id) => {
            return ret.find((video) => video.id === id)
          })
          return uniqueVideos
        })
      } catch (error) {
        console.error('Error fetching videos:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='p-5'>
      <h1>Youtube Share Urls Videos Section</h1>
      {videoList && videoList.length > 0 ? 'Video Count: ' + videoList.length : 'Loading...'}

      <div className='pt-2'>
        {videoList.map((video) => {
          return (
            <div key={video.id} className='pt-2'>
              <Card className='p-2'>
                <div className='flex justify-start'>
                  <a href={'/users/' + video.user_id}> Uploaded by: {video.email}</a>
                </div>
                <h2 className='font-bold'>Title: {video.title}</h2>

                <p>Description: {video.description}</p>
                <p>URL: {video.url}</p>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}
