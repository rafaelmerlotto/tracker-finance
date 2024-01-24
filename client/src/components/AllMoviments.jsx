import React, { useEffect, useState } from 'react'
import { authService, expensesService, incomesService } from '../services'
import { CircularProgress } from '@mui/material'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import DeleteIcon from '@mui/icons-material/Delete';
import MainAccount from './MainAccount';
import Expenses from './Expenses';
import Income from './Income';
import Savings from './Savings';
import { useCurrency } from '../context/currencyContext';
import { authContext } from '../auth/auth';



export default function AllMoviments() {

    const currency = useCurrency()
    const [allExpenses, setAllExpenses] = useState([])
    const [allIncomes, setAllIncomes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isExpensesLoading, setIsExpensesLoading] = useState(false)
    const [isIncomesLoading, setIsIncomesLoading] = useState(false)
    const [isCurrency, setIscurrency] = useState()

    
    async function getAllExpenses() {
        const res = await expensesService.allExpenses();
        return setAllExpenses(res)
    }

    async function getAllIncomes() {
        const res = await incomesService.allIncomes();
        return setAllIncomes(res)
    }

    useEffect(() => {
        getAllExpenses()
        getAllIncomes()

        if (authService.currencyActual === "USD") {
            return setIscurrency(currency.currencyUSD)
        }
        if (authService.currencyActual === "EUR") {
            return setIscurrency(currency.currencyEUR)
        }
        if (authService.currencyActual === "BRL") {
            return setIscurrency(currency.currencyBRL)
        }
        if (authService.currencyActual === "INR") {
            return setIscurrency(currency.currencyINR)
        }
        if (authService.currencyActual === "GBP") {
            return setIscurrency(currency.currencyGBP)
        }
    }, [isCurrency])

    async function deleteExpense() {
        return await expensesService.deleteExpense(expensesService.iExpenseId);
    }

    async function deleteIncome() {
        return await incomesService.deleteIncome(incomesService.iIncomeId);
    }

    const handleDeleteExpense = (e) => {
        expensesService.iExpenseId = e;
        setIsLoading(true);
        setIsExpensesLoading(true);
        deleteExpense();
        setTimeout(() => {
            setIsExpensesLoading(false);
            setIsLoading(false)
            getAllExpenses();
        }, 1000)
    }

    const handleDeleteIncome = (e) => {
        incomesService.iIncomeId = e;
        setIsLoading(true);
        setIsIncomesLoading(true);
        deleteIncome();
        setTimeout(() => {
            setIsIncomesLoading(false);
            setIsLoading(false)
            getAllIncomes();
        }, 1000)
    }

  


    return (
        <div className='w-4/5 h-screen flex-row flex'>
            <div className='w-3/4 h-full flex justify-center items-center gap-5 bg-neutral-900'>
                {isIncomesLoading ?
                    <div className=' w-2/4 ml-5 h-[95%] flex items-center justify-center bg-neutral-800 rounded-lg overflow-y-auto overflow-x-hidden'>
                        < CircularProgress />
                    </div>
                    :
                    <div className=' w-2/4 ml-5 h-[95%] bg-neutral-800 rounded-lg overflow-y-auto overflow-x-hidden'>
                        <h1 className='text-xl text-center text-neutral-600 '><CurrencyExchangeIcon /> List of Incomes</h1>
                        <table className='w-full m-3  text-lg '>
                            <tr>
                                <th className='text-start'>Name</th>
                                <th className='text-start'>Date</th>
                                <th className='text-start'>Ammount</th>
                                <th className='text-start'><DeleteIcon className='text-red-500' /> </th>
                            </tr>
                            {allIncomes.map((e) => (
                                <React.Fragment>
                                    <tr >
                                        <td className='text-neutral-600 '>{e.name}</td>
                                        <td className='text-neutral-600'>{new Date(e.createdAt).toLocaleDateString("pt-BR")}&nbsp;
                                            {new Date(e.createdAt).toLocaleTimeString("pt-BR", {
                                                hour12: false,
                                                hour: "numeric",
                                                minute: "numeric"
                                            })}</td>
                                        <td className='text-neutral-600'>{isCurrency.format(e.ammount)}</td>
                                        <button type='submit' key={e.id} value={e.id} onClick={(e) => handleDeleteIncome(e.currentTarget.value)} >
                                            <DeleteIcon className='text-neutral-600 cursor-pointer hover:text-red-500' /></button>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </table >
                    </div >
                }
                {isExpensesLoading ?
                    <div className='w-2/4 h-[95%] bg-neutral-800 rounded-lg flex items-center justify-center overflow-y-auto overflow-x-hidden'>
                        < CircularProgress />
                    </div>
                    :
                    <div className=' w-2/4 ml-2 h-[95%] bg-neutral-800 rounded-lg overflow-y-auto overflow-x-hidden'>
                        <h1 className='text-xl text-center text-neutral-600'><MoneyOffIcon /> List of expenses</h1>
                        <table className='w-full m-3  text-lg '>
                            <tr>
                                <th className='text-start'>Name</th>
                                <th className='text-start'>Date</th>
                                <th className='text-start'>Ammount</th>
                                <th className='text-start'><DeleteIcon className='text-red-500' /> </th>
                            </tr>
                            {allExpenses.map((e) => (
                                <React.Fragment>
                                    <tr className=' '>
                                        <td className='text-neutral-600'>{e.name}</td>
                                        <td className='text-neutral-600'>{new Date(e.createdAt).toLocaleDateString("pt-BR")}&nbsp;
                                            {new Date(e.createdAt).toLocaleTimeString("pt-BR", {
                                                hour12: false,
                                                hour: "numeric",
                                                minute: "numeric"
                                            })}</td>
                                        <td className='text-neutral-600'>{isCurrency.format(e.ammount)}</td>
                                        <button type='submit' key={e.id} value={e.id} onClick={(e) => handleDeleteExpense(e.currentTarget.value)} >
                                            <DeleteIcon className='text-neutral-600 cursor-pointer hover:text-red-500' /></button>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </table >
                    </div >
                }
            </div>
            <React.Fragment>
                {isLoading ?
                    <div className='w-1/4 h-full bg-neutral-900 flex justify-center items-center'>
                        < CircularProgress />
                    </div>
                    :
                    <div className='w-1/4 h-full flex flex-col justify-center items-center bg-neutral-900'>
                        <MainAccount />
                        <Income />
                        <Expenses />
                        <Savings />
                    </div>
                }
            </React.Fragment>
        </div>
    )
}
