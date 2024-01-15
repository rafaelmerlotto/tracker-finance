import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'
import { CircularProgress } from '@mui/material';

export default function Overview() {
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 1000)
  })


  return (
    <div className='flex'>
      <Sidebar />
      {loading ?
        <Main /> :
        <div className='h-screen w-3/4 flex items-center justify-center bg-neutral-900'>
          <CircularProgress />
        </div>
      }
    </div>
  )
}
