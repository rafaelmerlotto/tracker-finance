

import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet'
import CurrencyExchange from '@mui/icons-material/CurrencyExchange'
import React from 'react'

export default function MainAccount() {
  return (
    <div className='w-full h-1/4 flex items-center justify-center'>
        <div className=' w-4/5 h-3/4 bg-neutral-800  rounded-lg' >
        <h1 className='text-xl text-center text-neutral-600'><AccountBalanceWallet/> Main account</h1>
        <div className='h-2/3 flex justify-center items-center'>
          <h1 className='text-5xl text-center text-neutral-600'>€ 3.000,32</h1>  
        </div>
        
        </div>
    </div>
  )
}
