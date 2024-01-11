import { Button } from '@mui/material'
import React from 'react'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SettingsIcon from '@mui/icons-material/Settings';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LogoutIcon from '@mui/icons-material/Logout';
import Nav from './Nav';
import Budget from './Budget';
import Savings from '@mui/icons-material/Savings';
import Transform from '@mui/icons-material/Transform';
import { useNavigate } from 'react-router-dom';


export default function Sidebar() {

    let navigate = useNavigate()
    const toExpenses = () => {
        return navigate("/createExpenses");
    }


    return (
        <div className='w-1/4 h-screen bg-neutral-800'>
             <Nav /> 
            <div className='w-full h-auto mt-8 flex justify-center flex-col' >
                <Button component="label" style={{ margin: 10 }} size='\' variant="contained" onClick={() => { return navigate("/overview");}}  startIcon={<AccountBalanceWalletIcon />}> Overview </Button>
                <Button component="label" style={{ margin: 10 }} size='large' variant="contained" onClick={() => { return navigate("/createIncome");}}  startIcon={<CurrencyExchangeIcon />}> Budgets </Button>
                <Button component="label" style={{ margin: 10 }} size='large' variant="contained" onClick={() => { return navigate("/createExpenses");}} startIcon={<MoneyOffIcon />}> Expenses </Button>
                <Button component="label" style={{ margin: 10 }} size='large' variant="contained" startIcon={<Savings />}> Savings </Button>
                <Button component="label" style={{ margin: 10 }} size='large' variant="contained" startIcon={<Transform />}> Moviments </Button>
                <Button component="label" style={{ margin: 10 }} size='large' variant="contained" startIcon={<SettingsIcon />}> Settings </Button>
                <Button component="label" color='error' style={{ margin: "80px 10px" }} size='large' variant="contained" startIcon={<LogoutIcon />}> Log out </Button>
            </div>
           

        </div>
    )
}
