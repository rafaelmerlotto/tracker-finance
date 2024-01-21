import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useCurrency } from '../context/currencyContext';
import { authService } from '../services';




export default function Settings() {


    const currency = useCurrency()
    const [isCurrency, setIsCurrency] = useState("");



    const onClick = (e) => {
        if (e === "USD") {
            authService.currencyActual = e
           return  
        }
        if (e === "EUR") {
            authService.currencyActual = e
           return 
        }
        if (e === "BRL") { 
            authService.currencyActual = e
           return  
        }
    }

    


    return (
        <>
            <div className='flex  bg-neutral-900'>
                <Sidebar />
                <div className='w-4/5 h-screen flex items-center justify-center'>
                    <div className='w-3/4 h-3/4 flex  justify-center bg-neutral-800 rounded-lg'>
                        <h1 className='text-5xl pb-10 text-neutral-700'>Settings</h1>
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">Currency</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={authService.currencyActual}
                                name="radio-buttons-group"
                            >
                                <FormControlLabel  defaultValue={currency.currencyUSD} className='text-neutral-700' onClick={(e) => onClick(e.target.value)} value="USD" control={<Radio />} label="Dollar $" />
                                <FormControlLabel defaultValue={currency.currencyEUR} className='text-neutral-700' onClick={(e) => onClick(e.target.value)} value="EUR" control={<Radio />} label="Euro €" />
                                <FormControlLabel defaultValue={currency.currencyBRL} className='text-neutral-700' onClick={(e) => onClick(e.target.value)} value="BRL" control={<Radio />} label="Real R$" />
                            </RadioGroup>
                        </FormControl>

                    </div>
                </div>
            </div>
        </>

    )
}
