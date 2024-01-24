import { Button } from '@mui/material'
import React from 'react'
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
import { authService } from '../services';



export default function Sidebar() {

    let navigate = useNavigate()

    return (
        <div className='w-1/5 h-screen flex flex-col bg-neutral-800' >
          <div className='w-full h-1/6 flex mb-3  justify-center items-center ' >
                <Nav />
          </div>
        
            <div className='w-full h-4/6 mt-8 flex justify-center flex-col' >
                <Button component="label" style={{ margin: 10 }} size='medium' variant="contained" onClick={() => { return navigate("/overview"); }} startIcon={<AccountBalanceWalletIcon />}> Overview </Button>
                <Button component="label" style={{ margin: 10 }} size='medium' variant="contained" onClick={() => { return navigate("/createIncome"); }} startIcon={<CurrencyExchangeIcon />}> Incomes </Button>
                <Button component="label" style={{ margin: 10 }} size='medium' variant="contained" onClick={() => { return navigate("/createExpense"); }} startIcon={<MoneyOffIcon />}> Expenses </Button>
                <Button component="label" style={{ margin: 10 }} size='medium' variant="contained" onClick={() => { return navigate("/managerSavings"); }} startIcon={<Savings />}> Savings </Button>
                <Button component="label" style={{ margin: 10 }} size='medium' variant="contained" onClick={() => { return navigate("/moviments"); }} startIcon={<Transform />}> Moviments </Button>
                <Button component="label" style={{ margin: 10 }} size='medium' variant="contained" onClick={() => { return navigate("/settings"); }} startIcon={<SettingsIcon />}> Settings </Button>
                <Logout />
                <div className='w-full h-1/6 flex justify-center '>
                    <img src={logo} alt="" width={120} height={"auto"}/>
                </div>
            </div>
        </div>
    )
}
