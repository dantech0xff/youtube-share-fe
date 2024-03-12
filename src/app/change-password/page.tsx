'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Page() {
  const [email, setEmail] = useState(localStorage.getItem('email') || '')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const handleChangePassword = async () => {
    const respose = await axios.post(
      '/users/change-password',
      {
        old_password: password,
        new_password: newPassword,
        confirm_new_password: confirmNewPassword
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
    )
    console.log(respose)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
  }
  const handleConfirmNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(e.target.value)
  }
  useEffect(() => {}, [])
  return (
    <>
      <div className='p-4'>
        <Button size={'lg'} variant={'outline'} onClick={() => {}}>
          Home
        </Button>
        <div className='flex items-center space-x-2 m-2'> </div>
        <h2 className='pb-4'>Your Email: {email}</h2>
        <Input
          className='mb-2'
          type='password'
          placeholder='Password'
          value={password}
          onChange={handlePasswordChange}
        />
        <Input
          className='mb-2'
          type='password'
          placeholder='New Password'
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
        <Input
          className='mb-2'
          type='password'
          placeholder='Confirm New Password'
          value={confirmNewPassword}
          onChange={handleConfirmNewPasswordChange}
        />
        <Button size={'lg'} variant={'default'} onClick={handleChangePassword}>
          Change Password
        </Button>
      </div>
    </>
  )
}
