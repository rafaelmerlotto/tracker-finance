import React from 'react'
import Sidebar from './Sidebar'
import AllMoviments from './AllMoviments';



export default function Moviments() {
    return (
        <div className='flex'>
            <Sidebar />
            <AllMoviments />
        </div>

    )
}
