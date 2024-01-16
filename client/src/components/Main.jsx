import React, { useEffect, useState } from 'react'
import MainAccount from './MainAccount'
import Expenses from './Expenses'
import Income from './Income'
import Savings from './Savings'
import RecentIncomes from './RecentIncomes'
import RecentExpenses from './RecentExpenses'


export default function Main() {


    return (

            <div className='w-4/5 h-screen flex  bg-neutral-900' >
                <div className='w-3/4 h-screen'>
                    <RecentIncomes />
                    <RecentExpenses />
                </div>
                <div className='w-1/4 h-screen flex-col '>
                    <MainAccount />
                    <Expenses />
                    <Income />
                    <Savings />
                </div>
            </div>
      

    )
}

 