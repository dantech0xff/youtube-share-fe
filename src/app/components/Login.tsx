import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import axios from 'axios'
import { useState } from 'react'
import dotenv from 'dotenv'

dotenv.config()
console.log(process.env.NEXT_PUBLIC_SERVER_URL)

export default function Login({ onLogin }: { onLogin: (accessToken: string) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [authUIState, setAuthUIState] = useState('login') // ['login', 'signup']

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    console.log(e.target.value)
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setPassword(e.target.value)
  }
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setConfirmPassword(e.target.value)
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`, {
        email,
        password
      })
      const responseJson = response.data
      const accessToken = responseJson.access_token
      onLogin(accessToken)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSignUp = () => {
    console.log('Sign Up')
  }

  return (
    <div className='p-4'>
      <h1 className='p-4'>Youtube Share Urls Login Section</h1>
      <div className='flex items-center space-x-2 m-2'>
        <RadioGroup
          defaultValue={authUIState === 'login' ? 'login' : authUIState === 'signup' ? 'signup' : 'login'}
          onValueChange={(value) => {
            if (value === 'login') setAuthUIState('login')
            if (value === 'signup') setAuthUIState('signup')
            console.log(value)
          }}
        >
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='login' id='r2' />
            <Label htmlFor='r2'>Login</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='signup' id='r3' />
            <Label htmlFor='r3'>SignUp</Label>
          </div>
        </RadioGroup>
      </div>

      <Input className='mb-2' type='email' placeholder='Email' value={email} onChange={handleEmailChange} />
      <Input className='mb-2' type='password' placeholder='Password' value={password} onChange={handlePasswordChange} />
      {authUIState === 'signup' ? (
        <Input
          className='mb-2'
          type='password'
          placeholder='Confirm Password'
          value={password}
          onChange={handleConfirmPasswordChange}
        />
      ) : null}
      <Button
        size={'lg'}
        variant={authUIState === 'signup' ? 'default' : 'secondary'}
        onClick={authUIState === 'signup' ? handleSignUp : handleLogin}
      >
        {authUIState === 'signup' ? 'Sign Up' : 'Login'}
      </Button>
    </div>
  )
}
