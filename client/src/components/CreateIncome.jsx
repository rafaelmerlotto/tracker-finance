import React, { useState } from 'react'
import { Box, Button, TextField, Select, MenuItem, CircularProgress } from '@mui/material'
import Sidebar from './Sidebar';
import { useForm } from 'react-hook-form'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import { incomesService } from '../services';
import MainAccount from './MainAccount';
import Expenses from './Expenses';
import Income from './Income';
import Savings from './Savings';



export default function CreateIncome() {

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
        return await incomesService.createIncomes(data)
    }


    return (
        <div className='flex' >
            <Sidebar />
            <div className='w-4/5 h-screen flex items-center justify-center max-md:flex-col-reverse max-md:w-full max-md:h-screen'>
                <div className='w-3/4 h-screen flex items-center justify-center bg-neutral-900 max-md:w-full'>
                    <form onSubmit={handleSubmit(onSubmit)} class="bg-neutral-800 w-4/5 h-4/5 flex flex-col items-center justify-center gap-2.5 rounded-lg max-md:w-[95%]">
                        <h1 className='text-5xl pb-10 text-neutral-700 max-md:text-2xl max-md:p-0'>Income</h1>
                        <Select
                            labelId="demo-simple-select-label"
                            className='w-2/4 text-center bg-neutral-700 rounded-lg max-md:h-[30px]'
                            id="demo-simple-select"
                            {...register("name", { required: true })}
                            label="Select"
                        >
                            <MenuItem value={"Salary"}> <AttachMoneyIcon /> Salary</MenuItem>
                            <MenuItem value={"Gift"}><CardGiftcardIcon /> Gift</MenuItem>
                            <MenuItem value={"Interest"}><CreditScoreIcon /> Interest</MenuItem>
                            <MenuItem value={"other"}><HelpOutlineIcon /> Other</MenuItem>
                        </Select>

                        <Box sx={{ display: 'flex',justifyContent:"center", alignItems: 'flex-end' }}>
                            <TextField className=' bg-neutral-700 rounded-lg text-neutral-200 max-md:w-[50%]' id="filled-number" label="Ammount" type='number'  {...register("ammount")} />

                        </Box>
                        <Button className='w-1/4 bg-neutral-700 max-md:w-2/4' variant="contained" type='submit' style={{ marginTop: 35 }} >+ Add</Button>
                    </form>
                </div>
                {loading ?
                    <div className='h-screen w-1/4 flex items-center justify-center  bg-neutral-900 max-md:w-full max-md:h-1/4  max-md:items-center'>
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
