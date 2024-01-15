import CurrencyExchange from '@mui/icons-material/CurrencyExchange'
import React, { useEffect, useState } from 'react'
import lodash from 'lodash'
import { incomesService } from '../services'
import { CircularProgress } from '@mui/material';



export default function Income() {
  const [income, setIncome] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    async function incomes() {
      const res = await incomesService.getIncomes()
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      setIncome(res)
    }
    incomes();
  }, [])

  const sum = lodash.sum(income)
 const actual = incomesService.incomeActual= sum;
 

  return (
    <div className='w-full h-1/4 flex items-center justify-center'>
      <div className=' w-4/5 h-3/4 bg-neutral-800  rounded-lg' >
        <h1 className='text-xl text-center text-neutral-600'> <CurrencyExchange /> Income</h1>
        <div className='h-2/3 flex justify-center items-center'>
        <div className='text-5xl w-3/4  flex justify-center text-green-600  gap-3'> 
          <p className='w-1/4 text-end'>€</p> 
          <p className='w-2/4 text-center'>{loading ? <CircularProgress /> :actual} </p>
          </div>  
        </div>
      </div>
    </div>
  )
}
