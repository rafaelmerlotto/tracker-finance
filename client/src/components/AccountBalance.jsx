import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet'
import React from 'react'

export default function AccountBalance() {
  return (
    <div className='w-full h-2/4 flex justify-center items-center flex-col'>
      <div className=' w-4/5 h-4/5 bg-neutral-800 rounded-lg '>
        <h1 className='text-xl text-center text-neutral-600'><AccountBalanceWallet/> Account Balance</h1>
      
      </div>
    </div>
  )
}
