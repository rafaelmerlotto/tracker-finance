import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'
import { incomesService } from '../services'

export default function Overview() {

 

  return (
    <div className='flex'>
        <Sidebar/>
        <Main/>
    </div>
  )
}
