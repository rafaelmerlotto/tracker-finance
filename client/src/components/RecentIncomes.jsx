import React, { useEffect, useState } from 'react'
import TransformIcon from '@mui/icons-material/Transform';
import { authService, incomesService } from '../services';
import { useCurrency } from '../context/currencyContext';



export default function RecentIncomes() {

    const currency = useCurrency();
    const [incomes, setIncomes] = useState([]);
    const [isCurrency, setIscurrency] = useState()
    

    useEffect(() => {
        async function getIncomes() {
            const res = await incomesService.incomes();
            return setIncomes(res);
        }
        getIncomes();
       
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
    }, [isCurrency])



    return (
        <div className='w-full h-2/4 flex justify-center items-center flex-col'>
            <div className=' w-4/5 h-4/5 bg-neutral-800 rounded-lg '>
                <h1 className='text-xl text-center text-neutral-600'><TransformIcon /> Recent incomes</h1>
                <table className='w-full m-3 text-lg'>
                    <tr>
                        <th className='text-start'>Name</th>
                        <th className='text-start'>Date</th>
                        <th className='text-start'>Ammount</th>
                    </tr>
                    {incomes.map((e) => (

                        <tr >

                            <td className='text-neutral-600'>{e.name}</td>
                            <td className='text-neutral-600'>{new Date(e.createdAt).toLocaleDateString("pt-BR")}&nbsp;
                                {new Date(e.createdAt).toLocaleTimeString("pt-BR", {
                                    hour12: false,
                                    hour: "numeric",
                                    minute: "numeric",

                                })}</td>
                                <td className='text-neutral-600'>{isCurrency.format(e.ammount)} </td>
                        </tr>
                    ))}
                </table>
              
            </div>
        </div>
    )
}

