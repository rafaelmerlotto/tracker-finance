import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { authService, savingsService } from '../services';
import { Box, Button, TextField, CircularProgress } from '@mui/material'
import Sidebar from './Sidebar';
import MainAccount from './MainAccount';
import Expenses from './Expenses';
import Income from './Income';
import Savings from './Savings';
import { useCurrency } from '../context/currencyContext';
import SavingsIcon from '@mui/icons-material/Savings';
import DeleteIcon from '@mui/icons-material/Delete';


export default function ManagerSavings() {


    const currency = useCurrency()
    const { register, handleSubmit } = useForm();
    const [allSavings, setAllSavings] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSavingsLoading, setIsSavingsLoading] = useState(false)
    const [isCurrency, setIscurrency] = useState()


    const onSubmit = async (data) => {
        setIsLoading(true)
        setIsSavingsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setIsSavingsLoading(false)
        }, 1000)
        return await savingsService.createSavings(data)
    }


    async function getAllSavings() {
        const res = await savingsService.allSavings();
        return setAllSavings(res)
    }


    useEffect(() => {
        getAllSavings()

        if (authService.currencyActual === "USD") {
            return setIscurrency(currency.currencyUSD)
        }
        if (authService.currencyActual === "EUR") {
            return setIscurrency(currency.currencyEUR)
        }
        if (authService.currencyActual === "BRL") {
            return setIscurrency(currency.currencyBRL)
        }
        if (authService.currencyActual === "INR") {
            return setIscurrency(currency.currencyINR)
        }
        if (authService.currencyActual === "GBP") {
            return setIscurrency(currency.currencyGBP)
        }
    })

    async function deleteSaving() {
        return await savingsService.deleteSaving(savingsService.iSavingId);
    }

    const handleDelete = (e) => {
        savingsService.iSavingId = e;
        setIsLoading(true);
        setIsSavingsLoading(true)
        deleteSaving();
        setTimeout(() => {
            setIsLoading(false)
            setIsSavingsLoading(false)
            getAllSavings();
        }, 1000)
    }

    return (
        <div className='flex' >
            <Sidebar />

            <div className='w-4/5 h-screen flex items-center justify-center max-md:flex-col-reverse max-md:w-full max-md:h-screen'>
                <div className='w-3/4 h-screen flex items-center justify-center gap-5 bg-neutral-900 max-md:w-full max-md:flex-col-reverse'>
                    {isSavingsLoading ?
                        <div className='bg-neutral-800 w-2/4 ml-5 h-4/5  gap-2.5 rounded-lg max-md:h-1/2 max-md:w-[95%] max-md:p-2 max-md:m-0 max-md:mb-2 '>
                            <div className='w-full h-full flex items-center justify-center'>
                                <CircularProgress />
                            </div>
                        </div>
                        :
                        <React.Fragment>
                            <div class="bg-neutral-800 w-2/4 ml-5 h-4/5  gap-2.5 rounded-lg max-md:h-full max-md:w-[95%] max-md:p-2 max-md:m-0 max-md:mb-2  ">
                                <h1 className='text-xl text-center text-neutral-600 max-md:text-base'> <SavingsIcon /> List of savings</h1>
                                <table className='w-full m-3  text-lg'>
                                    <tr>
                                        <th className='text-start max-md:text-sm'>Date</th>
                                        <th className='text-start max-md:text-sm'>Ammount</th>
                                        <th className='text-start'><DeleteIcon className='text-red-500 ' /> </th>
                                    </tr>
                                    {allSavings.map((e) => (
                                        <React.Fragment>
                                            <tr>
                                                <td className='text-neutral-600 max-md:text-sm'>{new Date(e.createdAt).toLocaleDateString("pt-BR")}&nbsp;
                                                    {new Date(e.createdAt).toLocaleTimeString("pt-BR", {
                                                        hour12: false,
                                                        hour: "numeric",
                                                        minute: "numeric"
                                                    })}</td>
                                                <td className='text-neutral-600 max-md:text-sm'>{isCurrency.format(e.ammount)}</td>
                                                <button type='submit' key={e.id} value={e.id} onClick={(e) => handleDelete(e.currentTarget.value)} >
                                                    <DeleteIcon className='text-neutral-600 cursor-pointer hover:text-red-500' /></button>
                                            </tr>
                                        </React.Fragment>

                                    ))}
                                </table >
                            </div>
                        </React.Fragment>
                    }
                    <form onSubmit={handleSubmit(onSubmit)} class="bg-neutral-800 w-2/4 h-4/5 flex flex-col items-center justify-center gap-2.5 rounded-lg max-md:h-full max-md:w-[95%] max-md:p-2 max-md:mt-2">
                        <h1 className='text-5xl pb-10 text-neutral-700 max-md:text-2xl max-md:p-0'>Saving</h1>
                        <Box sx={{ display: 'flex', justifyContent:"center", alignItems: 'flex-end' }}>
                            <TextField className=' bg-neutral-700 rounded-lg text-neutral-200 max-md:w-[50%] ' id="filled-number" label="Ammount" type='number'  {...register("ammount", {required:true})} />
                        </Box>
                        <Button className='w-1/4 bg-neutral-700 max-md:w-2/4' variant="contained" type='submit' style={{ marginTop: 35 }} >+ Add</Button>
                    </form>
                </div>
                {isLoading ?
                    <div className='h-screen w-1/4 flex items-center justify-center  bg-neutral-900 max-md:w-full max-md:h-1/4 max-md:flex max-md:flex-wrap max-md:items-center'>
                        <div className='w-full h-1/4 flex items-center justify-center'>
                            <CircularProgress />
                        </div>
                    </div>
                    :
                    <div className='w-1/4 h-screen flex-col bg-neutral-900 max-md:w-full max-md:h-1/4 max-md:flex max-md:flex-wrap max-md:items-center '>
                        <MainAccount />
                        <Income />
                        <Expenses />
                        <Savings />
                    </div>
                }
            </div>

        </div>
    )
}
