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

            <div className='w-4/5 h-screen flex items-center justify-center'>
                <div className='w-3/4 h-screen flex items-center justify-center gap-5 bg-neutral-900'>
                    {isSavingsLoading ?
                        <div className='bg-neutral-800 w-2/4 ml-5 h-4/5  gap-2.5 rounded-lg'>
                            <div className='w-full h-full flex items-center justify-center'>
                                <CircularProgress />
                            </div>
                        </div>
                        :
                        <React.Fragment>
                            <div class="bg-neutral-800 w-2/4 ml-5 h-4/5  gap-2.5 rounded-lg">
                                <h1 className='text-xl text-center text-neutral-600'> <SavingsIcon /> List of savings</h1>
                                <table className='w-full m-3  text-lg'>
                                    <tr>
                                        <th className='text-start'>Date</th>
                                        <th className='text-start'>Ammount</th>
                                        <th className='text-start'><DeleteIcon className='text-red-500' /> </th>
                                    </tr>
                                    {allSavings.map((e) => (
                                        <React.Fragment>
                                            <tr>
                                                <td className='text-neutral-600'>{new Date(e.createdAt).toLocaleDateString("pt-BR")}&nbsp;
                                                    {new Date(e.createdAt).toLocaleTimeString("pt-BR", {
                                                        hour12: false,
                                                        hour: "numeric",
                                                        minute: "numeric"
                                                    })}</td>
                                                <td className='text-neutral-600'>{isCurrency.format(e.ammount)}</td>
                                                <button type='submit' key={e.id} value={e.id} onClick={(e) => handleDelete(e.currentTarget.value)} >
                                                    <DeleteIcon className='text-neutral-600 cursor-pointer hover:text-red-500' /></button>
                                            </tr>
                                        </React.Fragment>

                                    ))}
                                </table >
                            </div>
                        </React.Fragment>
                    }
                    <form onSubmit={handleSubmit(onSubmit)} class="bg-neutral-800 w-2/4 h-4/5 flex flex-col items-center justify-center gap-2.5 rounded-lg">
                        <h1 className='text-5xl pb-10 text-neutral-700'>Saving</h1>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <TextField className=' bg-neutral-700 rounded-lg text-neutral-200' id="filled-number" label="Ammount" type='number'  {...register("ammount")} />
                        </Box>
                        <Button className='w-1/4 bg-neutral-700' variant="contained" type='submit' style={{ marginTop: 35 }} >+ Add</Button>
                    </form>
                </div>
                {isLoading ?
                    <div className='h-screen w-1/4 flex items-center justify-center  bg-neutral-900'>
                        <div className='w-full h-1/4 flex items-center justify-center'>
                            <CircularProgress />
                        </div>
                    </div>
                    :
                    <div className='w-1/4 h-screen flex-col bg-neutral-900'>
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
