
import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet'
import React, { useEffect, useState } from 'react'
import { authService } from '../services';
import { CircularProgress } from '@mui/material';
import { useCurrency } from '../context/currencyContext';


export default function MainAccount() {


  const currency = useCurrency()
  const [ammount, setAmmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCurrency, setIscurrency] = useState()

  console.log(authService.currencyActual)

  useEffect(() => {
    async function sumIncomesExpenses() {
      const res = await authService.userAmmount()
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 800)
      return setAmmount(res)
    }
   sumIncomesExpenses()

    if (authService.currencyActual === "USD") {
      return setIscurrency(currency.currencyUSD.format(ammount))
    }
    if (authService.currencyActual === "EUR") {
      return setIscurrency(currency.currencyEUR.format(ammount))
    }
    if (authService.currencyActual === "BRL") {
      return setIscurrency(currency.currencyBRL.format(ammount))
    }

 
  }, [ammount])






  return (
    <div className='w-full h-1/4 flex items-center justify-center'>
      <div className=' w-4/5 h-3/4 bg-neutral-800  rounded-lg' >
        <h1 className='text-xl text-center text-neutral-600'><AccountBalanceWallet /> Main account</h1>
        <div className='h-2/3 flex justify-center items-center'>
          <h1 className='text-5xl text-center text-neutral-600' >{loading ? <CircularProgress /> : isCurrency}</h1>
        </div>
      </div>
    </div>
  )
}

