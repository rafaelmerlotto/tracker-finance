import MoneyOff from '@mui/icons-material/MoneyOff'
import React, { useState, useEffect } from 'react'
import lodash from 'lodash'
import { expensesService } from '../services';
import { CircularProgress } from '@mui/material';
import { useCurrency } from '../context/currencyContext';

export default function Expenses() {

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const currency = useCurrency();


  useEffect(() => {
    async function expenses() {
      const res = await expensesService.getExpenses()
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      setExpenses(res)
    }
    expenses();

  }, [])


  const sum = lodash.sum(expenses)
  const actual = expensesService.expenseActual = sum;



  return (
    <div className='w-full h-1/4 flex items-center justify-center'>
      <div className=' w-4/5 h-3/4 bg-neutral-800  rounded-lg' >
        <h1 className='text-xl text-center text-neutral-600'> <MoneyOff /> Expenses</h1>
        <div className='h-2/3 flex justify-center items-center'>     
            <h1 className='text-5xl text-center text-red-600'>{loading ? <CircularProgress /> : currency.currencyUSD.format(actual)} </h1>
        </div>
      </div>
    </div>
  )
}
