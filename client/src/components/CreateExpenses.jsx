import React, { useState } from 'react'
import { expensesService } from '../services'
import { Box, Button, TextField, Select, MenuItem, CircularProgress } from '@mui/material'
import { useForm } from 'react-hook-form'
import Sidebar from './Sidebar';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SnowshoeingIcon from '@mui/icons-material/Snowshoeing';
import SchoolIcon from '@mui/icons-material/School';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import TrainIcon from '@mui/icons-material/Train';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MainAccount from './MainAccount';
import Expenses from './Expenses';
import Income from './Income';
import Savings from './Savings';
import AccountBalance from './AccountBalance';

export default function CreateExpenses() {

    const [loading, setLoading] = useState(false);
 const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
        return await expensesService.createExpenses(data)
    }


    return (
        <div className='flex' >
            <Sidebar />

            <>
                <div className='w-2/4 h-screen flex items-center justify-center bg-neutral-900'>
                   
                    <form onSubmit={handleSubmit(onSubmit)} class="bg-neutral-800 w-4/5 h-4/5 flex flex-col items-center justify-center gap-2.5 rounded-lg">
                       <h1 className='text-5xl pb-10 text-neutral-700'>Expense</h1>
                        <Select
                        className='w-2/4 text-center bg-neutral-700 rounded-lg'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            {...register("name")}
                            label="Select"
                        >
                            <MenuItem  value={"Family"}> <FamilyRestroomIcon /> Family</MenuItem>
                            <MenuItem value={"Health"}><FavoriteIcon /> Health</MenuItem>
                            <MenuItem value={"Leisure"}><CreditCardIcon /> Leisure</MenuItem>
                            <MenuItem value={"Shopping"}><ShoppingCartIcon /> Shopping</MenuItem>
                            <MenuItem value={"Sport"}><SnowshoeingIcon /> Sport</MenuItem>
                            <MenuItem value={"Education"}><SchoolIcon /> Education</MenuItem>
                            <MenuItem value={"Food"}><FastfoodIcon /> Food</MenuItem>
                            <MenuItem value={"Transport"}><TrainIcon /> Transport</MenuItem>
                            <MenuItem value={"Other"}><HelpOutlineIcon /> Other</MenuItem>

                        </Select>

                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <TextField className=' bg-neutral-700 rounded-lg text-neutral-200'  id="filled-number" label="Ammount" type='number' {...register("ammount")} />
                        </Box>

                        <Button className='w-1/4 bg-neutral-700' variant="contained" type='submit' style={{ marginTop: 35 }}  >+ Add</Button>
                    </form>
                </div>

                {loading ? 
                <div className='h-screen w-1/4 flex items-center justify-center  bg-neutral-900'>
                    <div className='w-full h-1/4 flex items-center justify-center'>
                        <CircularProgress /> 
                    </div>       
                </div>
                    :
                    <div className='w-1/4 h-screen flex-col bg-neutral-900'>
                       <AccountBalance/>
                    </div>

                }




            </>



        </div>

    )
}
