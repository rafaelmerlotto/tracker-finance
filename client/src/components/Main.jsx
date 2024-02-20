import React from 'react'
import MainAccount from './MainAccount'
import Expenses from './Expenses'
import Income from './Income'
import Savings from './Savings'
import RecentIncomes from './RecentIncomes'
import RecentExpenses from './RecentExpenses'


export default function Main() {

    
    return (
        <div className='w-4/5 h-screen flex  bg-neutral-900 max-md:flex-col-reverse max-md:w-full max-md:h-screen' >
            <div className='w-3/4 h-screen max-md:w-full max'>
                <RecentIncomes />
                <RecentExpenses />
            </div>
            <div className='w-1/4 h-screen flex-col max-md:w-full max-md:h-1/4 max-md:flex max-md:flex-wrap max-md:items-center '>
                <MainAccount />
                <Income />
                <Expenses />    
                <Savings />
            </div>
        </div>
    )
}

