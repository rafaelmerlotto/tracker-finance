import CurrencyExchange from '@mui/icons-material/CurrencyExchange'
import React from 'react'

export default function Income() {
  return (
    <div className='w-full h-1/4 flex items-center justify-center'>
    <div className=' w-4/5 h-3/4 bg-neutral-800  rounded-lg' >
    <h1 className='text-xl text-center text-neutral-600'> <CurrencyExchange/> Income</h1>
    <div className='h-2/3 flex justify-center items-center'>
          <h1 className='text-5xl text-center text-green-600'>€ 1940,04</h1>  
        </div>
    </div>
</div>
  )
}
