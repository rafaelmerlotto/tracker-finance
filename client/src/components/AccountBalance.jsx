import React from 'react'
import MainAccount from './MainAccount'
import Expenses from './Expenses'
import Income from './Income'
import Savings from './Savings'


export default function AccountBalance() {
  return (
    
     <div className='w-1/3 h-screen flex-col '>
      <MainAccount />
      <Expenses />
      <Income />
      <Savings />
 </div>
  )
}
