import React, { useEffect, useState } from 'react'
import TransformIcon from '@mui/icons-material/Transform';
import { incomesService } from '../services';
import DeleteIcon from '@mui/icons-material/Delete';
import { CircularProgress } from '@mui/material';

export default function RecentIncomes() {

    const [incomes, setIncomes] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function getIncomes() {
            const res = await incomesService.incomes();
            return setIncomes(res);
        }
        getIncomes();
    }, [])


    async function deleteIncome() {
        return await incomesService.deleteIncome(incomesService.iIncomeId)
    }

    const handleDelete = (e) => {
        incomesService.iIncomeId = e
        setIsLoading(true)
        deleteIncome()
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }


    return (
        <div className='w-full h-2/4 flex justify-center items-center flex-col'>
            <>
                {isLoading ?
                    <div className='w-4/5 h-4/5 bg-neutral-800 rounded-lg flex justify-center items-center'>

                        < CircularProgress />

                    </div>
                    :
                    <div className=' w-4/5 h-4/5 bg-neutral-800 rounded-lg '>
                        <h1 className='text-xl text-center text-neutral-600'><TransformIcon /> Recent Incomes</h1>
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
                                    <td className='text-neutral-600'>€ {e.ammount}</td>
                                    <button key={e.id} value={e.id} onClick={(e) => handleDelete(e.currentTarget.value)}>
                                        <DeleteIcon className='text-neutral-600 cursor-pointer  hover:text-red-500' />
                                    </button>

                                </tr>

                            ))}



                        </table>
                    </div>
                }

            </>
        </div>
    )
}

