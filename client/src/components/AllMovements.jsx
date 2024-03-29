import React, { useEffect, useState } from 'react'
import { expensesService, incomesService } from '../services'
import { CircularProgress } from '@mui/material'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import DeleteIcon from '@mui/icons-material/Delete';
import MainAccount from './MainAccount';
import Expenses from './Expenses';
import Income from './Income';
import Savings from './Savings';
import { useSelector } from 'react-redux';



export default function AllMovements() {

    const [allExpenses, setAllExpenses] = useState([])
    const [allIncomes, setAllIncomes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isExpensesLoading, setIsExpensesLoading] = useState(false)
    const [isIncomesLoading, setIsIncomesLoading] = useState(false)
    const count = useSelector((state) => state.count.value)


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
    }, [])

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
      
            <div className='w-4/5 h-screen flex-row flex max-md:flex-col-reverse max-md:w-full max-md:h-screen'>
                <div className='w-3/4 h-full flex justify-center items-center gap-5 bg-neutral-900 max-md:w-full max-md:flex-col max-md:h-[75%]'>
                    {isIncomesLoading ?
                          <div className='w-2/4 ml-5 h-[95%] bg-neutral-800 rounded-lg flex items-center justify-center overflow-y-auto overflow-x-hidden max-md:h-full max-md:w-[95%] max-md:p-2 max-md:m-0 max-md:mb-2'>
                          < CircularProgress />
                      </div>
                        :
                        <div className=' w-2/4 ml-5 h-[95%] bg-neutral-800 rounded-lg overflow-y-auto overflow-x-hidden max-md:h-full max-md:w-[95%] max-md:p-2 max-md:m-0 max-md:mt-2'>
                            <h1 className='text-xl text-center text-neutral-600 max-md:text-base'><CurrencyExchangeIcon /> List of Incomes</h1>
                            <table className='w-full m-3  text-lg '>
                                <tr>
                                    <th className='text-start max-md:text-sm'>Name</th>
                                    <th className='text-start max-md:text-sm'>Date</th>
                                    <th className='text-start max-md:text-sm'>Ammount</th>
                                    <th className='text-start max-md:text-sm'><DeleteIcon className='text-red-500' /> </th>
                                </tr>
                                {allIncomes.map((e) => (
                                    <React.Fragment>
                                        <tr >
                                            <td className='text-neutral-600 max-md:text-sm'>{e.name}</td>
                                            <td className='text-neutral-600 max-md:text-sm'>{new Date(e.createdAt).toLocaleDateString("pt-BR")}&nbsp;
                                                {new Date(e.createdAt).toLocaleTimeString("pt-BR", {
                                                    hour12: false,
                                                    hour: "numeric",
                                                    minute: "numeric"
                                                })}</td>
                                            <td className='text-neutral-600 max-md:text-sm'>{count.format(e.ammount)}</td>
                                            <button type='submit' key={e.id} value={e.id} onClick={(e) => handleDeleteIncome(e.currentTarget.value)} >
                                                <DeleteIcon className='text-neutral-600 cursor-pointer hover:text-red-500' /></button>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </table >
                        </div >
                    }
                    {isExpensesLoading ?
                        <div className='w-2/4 h-[95%] bg-neutral-800 rounded-lg flex items-center justify-center overflow-y-auto overflow-x-hidden max-md:h-full max-md:w-[95%] max-md:p-2 max-md:m-0 max-md:mb-2'>
                            < CircularProgress />
                        </div>
                        :
                        <div className=' w-2/4 ml-2 h-[95%] bg-neutral-800 rounded-lg overflow-y-auto overflow-x-hidden max-md:h-full max-md:w-[95%] max-md:p-2 max-md:m-0 max-md:mb-2'>
                            <h1 className='text-xl text-center text-neutral-600'><MoneyOffIcon /> List of expenses</h1>
                            <table className='w-full m-3  text-lg '>
                                <tr>
                                    <th className='text-start max-md:text-sm'>Name</th>
                                    <th className='text-start max-md:text-sm'>Date</th>
                                    <th className='text-start max-md:text-sm'>Ammount</th>
                                    <th className='text-start max-md:text-sm'><DeleteIcon className='text-red-500' /> </th>
                                </tr>
                                {allExpenses.map((e) => (
                                    <React.Fragment>
                                        <tr className=' '>
                                            <td className='text-neutral-600 max-md:text-sm'>{e.name}</td>
                                            <td className='text-neutral-600 max-md:text-sm'>{new Date(e.createdAt).toLocaleDateString("pt-BR")}&nbsp;
                                                {new Date(e.createdAt).toLocaleTimeString("pt-BR", {
                                                    hour12: false,
                                                    hour: "numeric",
                                                    minute: "numeric"
                                                })}</td>
                                            <td className='text-neutral-600 max-md:text-sm'>{count.format(e.ammount)}</td>
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
                         <div className='h-screen w-1/4 flex items-center justify-center  bg-neutral-900 max-md:w-full max-md:h-1/4 max-md:flex max-md:flex-wrap max-md:items-center'>
                         <div className='w-full h-1/4 flex items-center justify-center'>
                             <CircularProgress />
                         </div>
                     </div>
                        :
                        <div className='w-1/4 h-full flex flex-col justify-center items-center bg-neutral-900  max-md:w-full max-md:h-[25%] max-md:flex max-md:flex-wrap max-md:items-center'>
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
