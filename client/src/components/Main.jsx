import React, { useEffect, useState } from 'react'
import AccountBalance from './AccountBalance'
import RecentMoviments from './RecentIncomes'
import MainAccount from './MainAccount'
import Expenses from './Expenses'
import Income from './Income'
import Savings from './Savings'
import Nav from './Nav'
import RecentIncomes from './RecentIncomes'
import RecentExpenses from './RecentExpenses'
import { incomesService } from '../services'

export default function Main() {

    return (
        <>
            <div className='w-3/4 h-screen flex  bg-neutral-900' >
                <div className='w-2/3 h-screen'>
                    <RecentIncomes />
                    <RecentExpenses />
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

