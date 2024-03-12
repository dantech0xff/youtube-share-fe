'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import axios, { Axios, AxiosError } from 'axios'
import { useState } from 'react'

export default function Page() {
  const [email, setEmail] = useState(typeof window !== 'undefined' ? localStorage.getItem('email') : '' || '')
  const [videoUrl, setVideoUrl] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorText, setErrorText] = useState('')

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value)
  }
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleSubmitShareVideo = async () => {
    try {
      if (typeof window === 'undefined') return
      setErrorText('')
      setIsProcessing(true)
      console.log('Submit Share Video')
      console.log(videoUrl, title, description)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/videos/share`,
        {
          url: videoUrl,
          title: title,
          description: description
        },
        {
          headers: {
            Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('access_token') : ''}`
          }
        }
      )
      setVideoUrl('')
      setTitle('')
      setDescription('')
      setErrorText('Video Shared Successfully!')
      console.log(response)
    } catch (error: any) {
      setErrorText(`Error: ${JSON.stringify(error.response)}`)
      console.log('Error:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <div className='p-4'>
        <Button
          size={'lg'}
          variant={'outline'}
          onClick={() => {
            window.location.href = '/'
          }}
        >
          Home
        </Button>

        <div className='flex items-center space-x-2 m-2'> </div>
        <a href={'/users/' + (typeof window !== 'undefined' ? localStorage.getItem('user_id') : '')} className='pb-4'>
          Your Email: {email}
        </a>
        <Input
          className='mb-2 mt-10'
          type='text'
          placeholder='Video URL'
          value={videoUrl}
          onChange={handleVideoUrlChange}
        />
        <Input
          className='mb-2'
          type='text'
          placeholder='Input your Video Title'
          value={title}
          onChange={handleTitleChange}
        />
        <Textarea
          className='mb-2'
          placeholder='Input your description here'
          value={description}
          onChange={(e) => {
            setDescription(e.target.value)
          }}
        />
        <Button size={'lg'} variant={'default'} onClick={handleSubmitShareVideo}>
          {isProcessing ? 'Processing...' : 'Share Video'}
        </Button>
        {errorText && <p className='text-red-500'>{errorText}</p>}
      </div>
    </>
  )
}
