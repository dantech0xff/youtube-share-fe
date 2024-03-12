import { io } from 'socket.io-client'

class AppSocketClient {
  socket: any
  newNotificationHandler: (data: any) => void = () => {}
  getAccessToken(): string {
    if (typeof window === 'undefined') return ''
    return `Bearer ${localStorage.getItem('access_token')}`
  }

  connect() {
    if (this.socket) {
      this.socket.disconnect()
    }
    this.socket = io(process.env.NEXT_PUBLIC_SERVER_URL || '', {
      auth: {
        Authorization: `${this.getAccessToken()}`
      }
    })
    this.socket?.on('connect', () => {
      console.log(`Connected to socket ${this.socket.id}`)
    })
    this.socket?.on('disconnect', () => {
      console.log(`Disconnected from socket ${this.socket.id}`)
    })
    this.socket?.on('new-notification', (data: any) => {
      this.newNotificationHandler(data)
      this.socket?.emit('receive-notification', data._id)
    })
  }
  disconnect() {
    console.log('Disconnecting from socket')
    this.socket?.disconnect()
    this.socket = null
  }
  registerNewNotificationHandler(handler: (data: any) => void) {
    this.newNotificationHandler = handler
  }
  markAsRead(notificationId: string) {
    this.socket?.emit('read-notification', notificationId)
  }
}

const appSocketClient = new AppSocketClient()

export default appSocketClient
