import { Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TransformIcon from '@mui/icons-material/Transform';
import { expensesService, incomesService } from '../services';

export default function RecentExpenses() {

    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        async function getExpenses() {
            const res = await expensesService.expenses();
            return setExpenses(res);
        }
        getExpenses();
    }, [])
 

    const arr = ["store", "10/09/2023 - 07:34", "Expense", "20,57"]
    return (
        <div className='w-full h-2/4 flex justify-center items-center flex-col'>
            <div className=' w-4/5 h-4/5 bg-neutral-800 rounded-lg '>
                <h1 className='text-xl text-center text-neutral-600'><TransformIcon /> Recent expenses</h1>
                <table className='w-full '>
                    <tr>
                        <th className='text-start'>Name</th>
                        <th className='text-start'>Date</th>
                        <th className='text-start'>Status</th>
                        <th className='text-start'>Ammount</th>
                    </tr>
                    
                        {expenses.map((e) => (
                            <tr>
                            <td className='text-neutral-600'>{e.name}</td>
                            <td className='text-neutral-600'>{new Date(e.createdAt).toLocaleDateString("pt-BR")}&nbsp; 
                            {new Date(e.createdAt).toLocaleTimeString("pt-BR", {
                                hour12: false,
                                hour: "numeric",
                                minute: "numeric",
                              
                                })}</td>
                            <td className='text-neutral-600'>{e.status}</td>
                            <td className='text-neutral-600'>{e.ammount}</td>
                            </tr>
                            
                        ))}
                  


                </table>
            </div>
        </div>
    )
}
