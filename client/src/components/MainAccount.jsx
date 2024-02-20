import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet'
import React, { useEffect, useState } from 'react'
import { authService } from '../services';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';


export default function MainAccount() {

  const [ammount, setAmmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const count = useSelector((state) => state.count.value)


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
  }, [ammount])



  return (
    <div className='w-full h-1/4 flex items-center justify-center max-md:w-1/2 max-md:h-1/2'>
      <div className=' w-4/5 h-3/4 bg-neutral-800  rounded-lg max-md:w-full max-md:h-[90%] max-md:m-2' >
        <h1 className='text-xl text-center text-neutral-600 max-md:text-sm'><AccountBalanceWallet className=''/> Main account</h1>
        <div className='h-2/3 flex justify-center items-center'>
          <h1 className='text-4xl text-center text-neutral-600 max-md:text-xl' >{loading ? <CircularProgress size={20} /> : count.format(ammount)}</h1>
        </div>
      </div>
    </div>
  )
}

