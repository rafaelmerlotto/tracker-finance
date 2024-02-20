import React, { useEffect, useState } from 'react'
import TransformIcon from '@mui/icons-material/Transform';
import { incomesService } from '../services';
import { useSelector } from 'react-redux';



export default function RecentIncomes() {

    const [incomes, setIncomes] = useState([]);
    const count = useSelector((state) => state.count.value)
    

    useEffect(() => {
        async function getIncomes() {
            const res = await incomesService.incomes();
            return setIncomes(res);
        }
        getIncomes();  
    }, [])



    return (
        <div className='w-full h-2/4 flex justify-center items-center flex-col max-md:p-2  max-md:h-1/2'>
            <div className=' w-4/5 h-4/5 bg-neutral-800 rounded-lg max-md:w-[95%] max-md:h-full'>
                <h1 className='text-xl text-center text-neutral-600 max-md:text-base'><TransformIcon /> Recent incomes</h1>
                <table className='w-full m-3 text-lg'>
                    <tr>
                        <th className='text-start max-md:text-sm'>Name</th>
                        <th className='text-start max-md:text-sm'>Date</th>
                        <th className='text-start max-md:text-sm'>Ammount</th>
                    </tr>
                    {incomes.map((e) => (

                        <tr >

                            <td className='text-neutral-600 max-md:text-sm'>{e.name}</td>
                            <td className='text-neutral-600 max-md:text-sm'>{new Date(e.createdAt).toLocaleDateString("pt-BR")}&nbsp;
                                {new Date(e.createdAt).toLocaleTimeString("pt-BR", {
                                    hour12: false,
                                    hour: "numeric",
                                    minute: "numeric",

                                })}</td>
                                <td className='text-neutral-600 max-md:text-sm'>{count.format(e.ammount)} </td>
                        </tr>
                    ))}
                </table>
              
            </div>
        </div>
    )
}

