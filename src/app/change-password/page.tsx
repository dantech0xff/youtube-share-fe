'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Page() {
  const [email, setEmail] = useState('')
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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
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
        <h1 className='p-4'>Youtube Share Urls Change Password</h1>
        <div className='flex items-center space-x-2 m-2'> </div>

        <Input className='mb-2' type='email' placeholder='Email' value={email} onChange={handleEmailChange} />
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
          placeholder='Password'
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
        <Input
          className='mb-2'
          type='password'
          placeholder='Confirm Password'
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
