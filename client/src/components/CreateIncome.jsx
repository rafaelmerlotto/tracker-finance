import React from 'react'
import { Box, Button, TextField, Select, MenuItem } from '@mui/material'
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

    const { register, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        console.log(data)
        return await incomesService.createIncomes(data)
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
                <MenuItem value={"salary"}> <AttachMoneyIcon/> Salary</MenuItem>
                <MenuItem value={"gift"}><CardGiftcardIcon/> Gift</MenuItem>
                <MenuItem value={"interest"}><CreditScoreIcon/> Interest</MenuItem>
                <MenuItem value={"other"}><HelpOutlineIcon/> Other</MenuItem>
               
                
            </Select>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <TextField id="input-with-sx" label="ammount" type='number' variant="standard" {...register("ammount")} />
            </Box>

            <Button variant="contained" type='submit' style={{ marginTop: 35 }} >+ Add</Button>
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
