import CurrencyExchange from '@mui/icons-material/CurrencyExchange'
import React, { useEffect, useState } from 'react'
import { incomesService } from '../services'
import lodash from 'lodash'



export default function Income({props}) {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function incomes() {
      const res = await incomesService.getIncomes()
      setIncome(res)
    }
    incomes();
  }, [])

  // const newAmmount = [];
  // newAmmount.push(ammount)

  //   console.log(newAmmount)
  const sum = lodash.sum(income)
 incomesService.incomeActual= sum
  console.log(sum)

  return (
    <div className='w-full h-1/4 flex items-center justify-center'>
      <div className=' w-4/5 h-3/4 bg-neutral-800  rounded-lg' >
        <h1 className='text-xl text-center text-neutral-600'> <CurrencyExchange /> Income</h1>
        <div className='h-2/3 flex justify-center items-center'>
          <h1 className='text-5xl text-center text-green-600'>€ {sum}</h1>
        </div>
      </div>
    </div>
  )
}
