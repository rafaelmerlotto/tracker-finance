import { Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import TransformIcon from '@mui/icons-material/Transform';

export default function RecentMoviments() {

    const arr = ["store", "10/09/2023 - 07:34", "Expense", "20,57"]
    return (
        <div className='w-full h-2/4 flex justify-center items-center flex-col'>
            <div className=' w-4/5 h-4/5 bg-neutral-800 rounded-lg '>
                <h1 className='text-xl text-center text-neutral-600'><TransformIcon/> Recent moviments</h1>
                <table className='w-full '>
                    <tr>
                        <th className='text-start'>Name</th>
                        <th className='text-start'>Date</th>
                        <th className='text-start'>Status</th>
                        <th className='text-start'>Ammount</th>
                    </tr>
                    <tr>
                        {arr.map((e) => (
                            <td className='text-neutral-600'>{e}</td>
                        ))}
                    </tr>
                    

                </table>
            </div>
        </div>
    )
}
