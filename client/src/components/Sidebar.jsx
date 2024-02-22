import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SettingsIcon from '@mui/icons-material/Settings';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Nav from './Nav';
import Savings from '@mui/icons-material/Savings';
import Transform from '@mui/icons-material/Transform';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
import logo from "../assets/images/logo-tracker-finance.png"



export default function Sidebar() {

    let navigate = useNavigate()
    const [toggleSidebar, setToggleSidebar] = useState()
    const sidebar = document.getElementById("sidebar")
    useEffect(() => {
        setToggleSidebar(sidebar)
    }, [toggleSidebar])

   

    const onClick = () => {
        sidebar.style.visibility = "visible"  
    }
    const onClick2 = () => {
        sidebar.style.visibility = "hidden"
    }


 
    return (
        <>
            <button onClick={onClick} className=' max-md:top-0 max-md:text-neutral-200 max-md:z-50 max-md:absolute' id='btn-visible'>
                <p className='max-md:w-[17px] max-md:h-[3px] max-md:bg-neutral-400 max-md:m-1 max-md:rounded-lg'></p>
                <p className='max-md:w-[17px] max-md:h-[3px] max-md:bg-neutral-400 max-md:m-1 max-md:rounded-lg'></p>
                <p className='max-md:w-[17px] max-md:h-[3px] max-md:bg-neutral-400 max-md:m-1 max-md:rounded-lg'></p>
                </button>
       
            <div className='w-1/5 h-screen flex flex-col bg-neutral-800  max-md:w-3/4 max-md:h-screen max-md:z-10  max-md:absolute' id='sidebar' >
                 <button onClick={onClick2} className='sidebar max-md:top-0 max-md:text-neutral-400 md:hidden max-md:right-0 max-md:z-50 max-md:absolute max-md:text-xl max-md:mr-1 ' id='btn-visible'>X</button>
                <div className='w-full h-1/6 flex mb-3  justify-center items-center ' >

                    <Nav />
                </div>
                <div className='w-full h-4/6 mt-8 flex justify-center flex-col max-md:h-full' >
                    <Button component="label" className='max-md:h-[25px]' style={{ margin: 10 }} size='medium' variant="contained" onClick={() => { return navigate("/overview"); }} startIcon={<AccountBalanceWalletIcon />}> Overview </Button>
                    <Button component="label" className='max-md:h-[25px]' style={{ margin: 10 }} size='medium' variant="contained" onClick={() => { return navigate("/createIncome"); }} startIcon={<CurrencyExchangeIcon />}> Incomes </Button>
                    <Button component="label" className='max-md:h-[25px]' style={{ margin: 10 }} size='medium' variant="contained" onClick={() => { return navigate("/createExpense"); }} startIcon={<MoneyOffIcon />}> Expenses </Button>
                    <Button component="label" className='max-md:h-[25px]' style={{ margin: 10 }} size='medium' variant="contained" onClick={() => { return navigate("/managerSavings"); }} startIcon={<Savings />}> Savings </Button>
                    <Button component="label" className='max-md:h-[25px]' style={{ margin: 10 }} size='medium' variant="contained" onClick={() => { return navigate("/movements"); }} startIcon={<Transform />}> Moviments </Button>
                    <Button component="label" className='max-md:h-[25px]' style={{ margin: 10 }} size='medium' variant="contained" onClick={() => { return navigate("/settings"); }} startIcon={<SettingsIcon />}> Settings </Button>
                    <Logout />
                    <div className='w-full h-1/6 flex justify-center  '>
                        <img src={logo} alt="" className='max-md:w-[100px] max-md:h-[80px]' width={120} height={"auto"} />
                    </div>
                </div>
            </div>
        </>
    )
}
