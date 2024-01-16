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
        <Main />    
    </div>
  )
}
