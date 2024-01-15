import React, { useEffect, useState } from 'react'
import TransformIcon from '@mui/icons-material/Transform';
import { expensesService } from '../services';
import DeleteIcon from '@mui/icons-material/Delete';
import { CircularProgress } from '@mui/material';
import Main from './Main';


export default function RecentExpenses() {

    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    async function getExpenses() {
        const res = await expensesService.expenses();
        return setExpenses(res);
    }

    useEffect(() => {
        getExpenses();
    }, [])

    async function deleteExpense() {
        return await expensesService.deleteExpense(expensesService.iExpenseId);
    }


    const handleDelete = (e) => {
        expensesService.iExpenseId = e;
        setIsLoading(true);
        deleteExpense();
      
        setTimeout(  ()  => {
            setIsLoading(false);
            getExpenses();
        
        }, 500)
    }



    return (
        <div className='w-full h-2/4 flex justify-center items-center flex-col'>
            <React.Fragment>
              
                {isLoading ?
                    <div className='w-4/5 h-4/5 bg-neutral-800 rounded-lg flex justify-center items-center'>
                        < CircularProgress />
                    </div>
                    :
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

                                        <td className='text-neutral-600'>€ {e.ammount}</td>
                                        <button type='submit' key={e.id} value={e.id} onClick={(e) => handleDelete(e.currentTarget.value)} >
                                            <DeleteIcon className='text-neutral-600 cursor-pointer hover:text-red-500' /></button>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </table >
                    </div >
                   
                }
            </React.Fragment>
           
        </div >
    )
}
