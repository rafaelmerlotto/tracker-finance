import React, { useEffect, useState } from 'react'
import lodash from 'lodash'
import CurrencyExchange from '@mui/icons-material/CurrencyExchange'
import { authService, incomesService } from '../services'
import { CircularProgress } from '@mui/material';
import { useCurrency } from '../context/currencyContext';



export default function Income() {



  const currency = useCurrency()
  const [loading, setLoading] = useState(false);
  const [isCurrency, setIscurrency] = useState();
  const [ammount, setAmmount] = useState(0);




  useEffect(() => {

    async function incomes() {

      const res = await incomesService.getIncomes()
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      const sum = lodash.sum(res)
      incomesService.incomeActual = sum;
      setAmmount(sum)
    }
    incomes();


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
      <div className=' w-4/5 h-3/4 bg-neutral-800  rounded-lg' >
        <h1 className='text-xl text-center text-neutral-600'> <CurrencyExchange /> Incomes</h1>
        <div className='h-2/3 flex justify-center items-center'>
          <h1 className='text-4xl text-center text-green-600'>{loading ? <CircularProgress /> : isCurrency} </h1>
        </div>
      </div>
    </div>
  )
}
