import React, { useEffect, useState } from 'react'
import SavingsIcon from '@mui/icons-material/Savings';
import lodash from 'lodash'
import { useCurrency } from '../context/currencyContext';
import { authService, savingsService } from '../services';
import { CircularProgress } from '@mui/material';


export default function Savings() {


  const currency = useCurrency();
  const [loading, setLoading] = useState(false);
  const [isCurrency, setIscurrency] = useState()
  const [ammount, setAmmount] = useState(0);



  useEffect(() => {
    async function savings() {
      const res = await savingsService.getSavings()
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      const sum = lodash.sum(res)
      savingsService.savingActual = sum;
      setAmmount(sum)
    }
    savings();


    if (authService.currencyActual === "USD") {
      return setIscurrency(currency.currencyUSD.format(ammount))
    }
    if (authService.currencyActual === "EUR") {
      return setIscurrency(currency.currencyEUR.format(ammount))
    }
    if (authService.currencyActual === "BRL") {
      return setIscurrency(currency.currencyBRL.format(ammount))
    }
    if (authService.currencyActual === "INR") {
      return setIscurrency(currency.currencyINR.format(ammount))
  }
  if (authService.currencyActual === "GBP") {
    return setIscurrency(currency.currencyGBP.format(ammount))
}
  }, [ammount])



  return (
    <div className='w-full h-1/4 flex items-center justify-center'>
      <div className=' w-4/5 h-3/4 bg-neutral-800 rounded-lg' >
        <h1 className='text-xl text-center text-neutral-600'><SavingsIcon /> Savings</h1>
        <div className='h-2/3 flex justify-center items-center'>
          <h1 className='text-4xl text-center text-blue-600'>{loading ? <CircularProgress /> : isCurrency} </h1>
        </div>
      </div>
    </div>
  )
}
