import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import { authService } from '../services'

export default function Nav() {

  const [username, setUsername] = useState("")

  async function getUserName() {
    const res = await authService.username()
    return setUsername(res)
  }
  getUserName()

  return (
    <nav className='w-full flex justify-center items-center gap-4 bg-neutral-800' >
      <Avatar src="/broken-image.jpg" style={{ marginTop: 10 }} /> <p className='text-xl text-center text-neutral-600'>{username}</p>
    </nav>
  )
}
