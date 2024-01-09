import React from 'react'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'

export default function Overview() {
  return (
    <div className='flex'>
        <Sidebar/>
        <Main/>
    </div>
  )
}
