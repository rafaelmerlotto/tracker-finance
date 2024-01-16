import React, { useEffect, useState } from 'react'
import TransformIcon from '@mui/icons-material/Transform';
import { expensesService } from '../services';
import { useCurrency } from '../context/currencyContext';



export default function RecentExpenses() {

    const [expenses, setExpenses] = useState([]);
   const currency = useCurrency();

    async function getExpenses() {
        const res = await expensesService.expenses();
        return setExpenses(res);
    }

    useEffect(() => {
        getExpenses();
    }, [])

   



    return (
        <div className='w-full h-2/4 flex justify-center items-center flex-col'>
            <React.Fragment>
                    <div className=' w-4/5 h-4/5 bg-neutral-800  rounded-lg '>
                        <h1 className='text-xl text-center text-neutral-600'><TransformIcon /> Recent expenses</h1>
                        <table className='w-full m-3  text-lg'>
                            <tr>
                                <th className='text-start'>Name</th>
                                <th className='text-start'>Date</th>
                                <th className='text-start'>Ammount</th>
                            </tr>
                            {expenses.map((e) => (
                                <React.Fragment>
                                    <tr>
                                        <td className='text-neutral-600'>{e.name}</td>
                                        <td className='text-neutral-600'>{new Date(e.createdAt).toLocaleDateString("pt-BR")}&nbsp;
                                            {new Date(e.createdAt).toLocaleTimeString("pt-BR", {
                                                hour12: false,
                                                hour: "numeric",
                                                minute: "numeric"
                                            })}</td>

                                        <td className='text-neutral-600'>{currency.currency.format(e.ammount)}</td>                 
                                    </tr>
                                </React.Fragment>
                            ))}
                        </table >
                    </div >   
            </React.Fragment>         
        </div >
    )
}
