'use client'
import { useEffect } from 'react'
import appSocketClient from './AppSocketClient'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

export default function WrapperComponent({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  useEffect(() => {
    appSocketClient.registerNewNotificationHandler((data) => {
      console.log('New Notification:', data)
      toast(`${data.content}`, {
        description: `Video created at: ${new Date(data.create_at).toLocaleString()} \n ${data.video.url.slice(
          0,
          20
        )}...`,
        duration: 10000,
        action: {
          label: 'Read',
          onClick: () => {
            appSocketClient.markAsRead(data._id)
          }
        }
      })
    })
    return () => {
      appSocketClient.disconnect()
    }
  }, [])
  return (
    <div>
      <div>{children}</div>
      <Toaster />
    </div>
  )
}

/*
test2@gmail.com
test1@test.global
123123
*/
