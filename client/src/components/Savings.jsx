import React from 'react'
import SavingsIcon from '@mui/icons-material/Savings';


export default function Savings() {
  return (
    <div className='w-full h-1/4 flex items-center justify-center'>
    <div className=' w-4/5 h-3/4 bg-neutral-800 rounded-lg' >
    <h1 className='text-xl text-center text-neutral-600'><SavingsIcon/> Savings</h1>
    <div className='h-2/3 flex justify-center items-center'>
          <h1 className='text-5xl text-center text-blue-600'>€ 340,92</h1>  
        </div>
    </div>
</div>
  )
}
