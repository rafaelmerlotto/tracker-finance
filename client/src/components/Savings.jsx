import React, { useEffect, useState } from 'react'
import SavingsIcon from '@mui/icons-material/Savings';
import lodash from 'lodash'
import { useCurrency } from '../context/currencyContext';
import { savingsService } from '../services';
import { CircularProgress } from '@mui/material';


export default function Savings() {

  const [savings, setSavings] = useState([]);
  const [loading, setLoading] = useState(false);
  const currency = useCurrency();

  useEffect(() => {
    async function savings() {
      const res = await savingsService.getSavings()
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      setSavings(res)
    }
    savings();
  }, [])


  const sum = lodash.sum(savings)
  const actual = savingsService.savingActual = sum;

  return (
    <div className='w-full h-1/4 flex items-center justify-center'>
      <div className=' w-4/5 h-3/4 bg-neutral-800 rounded-lg' >
        <h1 className='text-xl text-center text-neutral-600'><SavingsIcon /> Savings</h1>
        <div className='h-2/3 flex justify-center items-center'>
          <h1 className='text-5xl text-center text-blue-600'>{loading ? <CircularProgress /> : currency.currencyUSD.format(actual)} </h1>
        </div>
      </div>
    </div>
  )
}
