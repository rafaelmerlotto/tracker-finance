import React from 'react'
import AccountBalance from './AccountBalance'
import RecentMoviments from './RecentMoviments'
import MainAccount from './MainAccount'
import Expenses from './Expenses'
import Income from './Income'
import Savings from './Savings'
import Nav from './Nav'

export default function Main() {
    return (
        <>
            <div className='w-3/4 h-screen flex  bg-neutral-900' >
                <div className='w-2/3 h-screen'>
                    <AccountBalance />
                    <RecentMoviments />
                </div>
                <div className='w-1/3 h-screen flex-col '>
                    <MainAccount />
                    <Expenses />
                    <Income />
                    <Savings />
                </div>
            </div>
        </>

    )
}

