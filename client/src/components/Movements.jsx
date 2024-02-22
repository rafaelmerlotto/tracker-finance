import React from 'react'
import Sidebar from './Sidebar'
import AllMovements from './AllMovements';



export default function Movements() {
    return (
        <div className='flex'>
            <Sidebar />
            <AllMovements />
        </div>

    )
}
