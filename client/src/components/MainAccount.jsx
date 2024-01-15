
import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet'
import React, { useEffect, useState } from 'react'
import { authService} from '../services';
import { CircularProgress } from '@mui/material';


export default function MainAccount() {

  const [ammount, setAmmount] = useState();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    async function sumIcomesExpenses() {
      const res = await authService.userAmmount()
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 800)
      return setAmmount(res)
    }
    sumIcomesExpenses()
  }, [])



  return (
    <div className='w-full h-1/4 flex items-center justify-center'>
      <div className=' w-4/5 h-3/4 bg-neutral-800  rounded-lg' >
        <h1 className='text-xl text-center text-neutral-600'><AccountBalanceWallet /> Main account</h1>
        <div className='h-2/3 flex justify-center items-center'>
          <h1 className='text-5xl text-center text-neutral-600' >€ {loading ? <CircularProgress /> : ammount}</h1>
        </div>

      </div>
    </div>
  )


}

