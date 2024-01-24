import React, { useEffect, useState } from 'react'
import MainAccount from './MainAccount'
import Expenses from './Expenses'
import Income from './Income'
import Savings from './Savings'
import RecentIncomes from './RecentIncomes'
import RecentExpenses from './RecentExpenses'
import { authService, incomesService } from '../services'
import { useCurrency } from '../context/currencyContext'



export default function Main() {

    
   
    useEffect(() => {
        if(authService.currencyActual === undefined){
            localStorage.setItem("currency", "USD")
        }    
        if (localStorage.getItem("currency") === "USD") {
            authService.currencyActual = "USD"
            return localStorage.setItem("currency", authService.currencyActual)
        }
        if (localStorage.getItem("currency") === "EUR") {
            authService.currencyActual = "EUR"
            return localStorage.setItem("currency", authService.currencyActual)
        }
        if (localStorage.getItem("currency") === "BRL") {
            authService.currencyActual = "BRL"
            return localStorage.setItem("currency", authService.currencyActual)
        }
        if (localStorage.getItem("currency") === "INR") {
            authService.currencyActual = "INR"
            return localStorage.setItem("currency", authService.currencyActual)
        }
        if (localStorage.getItem("currency") === "GBP") {
            authService.currencyActual = "GBP"
            return localStorage.setItem("currency", authService.currencyActual)
        }
    },[])


    return (
        <div className='w-4/5 h-screen flex  bg-neutral-900' >
            <div className='w-3/4 h-screen'>
                <RecentIncomes />
                <RecentExpenses />
            </div>
            <div className='w-1/4 h-screen flex-col '>
                <MainAccount />
                <Income />
                <Expenses />    
                <Savings />
            </div>
        </div>
    )
}

