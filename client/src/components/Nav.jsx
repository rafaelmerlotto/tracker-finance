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
    < >
      <Avatar className='w-1/2' style={{width: 30, height:30}} src="/broken-image.jpg"/>
       <p className='w-1/2 text-[18px] text-center text-neutral-600'>{username}</p>
    </>
  )
}
