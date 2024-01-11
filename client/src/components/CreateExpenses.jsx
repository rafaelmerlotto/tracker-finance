import React, { useState } from 'react'
import { expensesService } from '../services'
import { Box, Button, TextField, Select, MenuItem } from '@mui/material'
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
import { useLocation, useNavigate, useSubmit } from 'react-router-dom';

export default function CreateExpenses() {


    const { register, handleSubmit } = useForm();
    let navigate = useNavigate()

    const onSubmit = async (data) => {
        const res = await expensesService.createExpenses(data)
        navigate("/refresh");
        navigate(-1);
        return res
    }



    return (
        <div className='flex' >
            <Sidebar />
            <div className='w-2/4 h-screen flex items-center justify-center bg-neutral-900'>
                <form onSubmit={handleSubmit(onSubmit)} class="bg-neutral-800 w-4/5 h-4/5 flex flex-col items-center justify-center gap-2.5">
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        {...register("name")}
                        label="Select"
                    >
                        <MenuItem value={"family"}> <FamilyRestroomIcon /> Family</MenuItem>
                        <MenuItem value={"health"}><FavoriteIcon /> Health</MenuItem>
                        <MenuItem value={"leisure"}><CreditCardIcon /> Leisure</MenuItem>
                        <MenuItem value={"shopping"}><ShoppingCartIcon /> Shopping</MenuItem>
                        <MenuItem value={"sport"}><SnowshoeingIcon /> Sport</MenuItem>
                        <MenuItem value={"education"}><SchoolIcon /> Education</MenuItem>
                        <MenuItem value={"food"}><FastfoodIcon /> Food</MenuItem>
                        <MenuItem value={"transport"}><TrainIcon /> Transport</MenuItem>
                        <MenuItem value={"other"}><HelpOutlineIcon /> Other</MenuItem>

                    </Select>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField id="input-with-sx" label="ammount" type='number' variant="standard" {...register("ammount")} />
                    </Box>

                    <Button variant="contained" type='submit' style={{ marginTop: 35 }}  >+ Add</Button>
                </form>
            </div>
            <div className='w-1/4 h-screen flex-col bg-neutral-900'>
                <MainAccount />
                <Expenses />
                <Income />
                <Savings />
            </div>
        </div>

    )
}
