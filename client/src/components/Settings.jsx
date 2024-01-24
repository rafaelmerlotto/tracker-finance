import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useCurrency } from '../context/currencyContext';
import { authService } from '../services';
import { Avatar, Button, Modal } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/auth';




export default function Settings() {


    const currency = useCurrency()
    const navigate = useNavigate()
    const { logout } = useAuth()
    const [modal, setModal] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");


    useEffect(() => {
        async function profileUser(){
            const res = await authService.profile();
            setFullName(res.username)
            setEmail(res.email)
            return;
        }
        profileUser()
    })

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const onClick = (e) => {

        if (e === "USD") {
            authService.currencyActual = e
            return localStorage.setItem("currency", authService.currencyActual)
        }
        if (e === "EUR") {
            authService.currencyActual = e
            return localStorage.setItem("currency", authService.currencyActual)
        }
        if (e === "BRL") {
            authService.currencyActual = e
            return localStorage.setItem("currency", authService.currencyActual)
        }
        if (e === "INR") {
            authService.currencyActual = e
            return localStorage.setItem("currency", authService.currencyActual)
        }
        if (e === "GBP") {
            authService.currencyActual = e
            return localStorage.setItem("currency", authService.currencyActual)
        }
    }


    async function deleteAccountUser(){
        const user = await authService.deleteAccount()
        return user
    }

    const handleDelete = async (event) => {
        event.preventDefault()
        deleteAccountUser();
        logout()
        return navigate("/")
    }

    return (
        <>
            <div className='flex  bg-neutral-900'>
                <Sidebar />
                <div className='w-4/5 h-screen flex items-center justify-center'>
                    <div className='w-3/4 h-3/4 flex  justify-center flex-col items-center bg-neutral-800 rounded-lg'>
                        <h1 className='h-auto text-5xl pb-10 text-neutral-700'>Settings</h1>
                        <div className='h-2/3 w-full flex'>
                            <div className='w-1/2 flex justify-center'>
                                <FormControl>
                                    <FormLabel sx={{ fontSize: 20, color: "#404040", fontWeight: "bold" }} id="demo-radio-buttons-group-label">Select currency</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue={authService.currencyActual}
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel defaultValue={currency.currencyUSD} className='text-neutral-700' onClick={(e) => onClick(e.target.value)} value="USD" control={<Radio />} label="Dollar $" />
                                        <FormControlLabel defaultValue={currency.currencyEUR} className='text-neutral-700' onClick={(e) => onClick(e.target.value)} value="EUR" control={<Radio />} label="Euro €" />
                                        <FormControlLabel defaultValue={currency.currencyGBP} className='text-neutral-700' onClick={(e) => onClick(e.target.value)} value="GBP" control={<Radio />} label="Pound £" />
                                        <FormControlLabel defaultValue={currency.currencyBRL} className='text-neutral-700' onClick={(e) => onClick(e.target.value)} value="BRL" control={<Radio />} label="Brazilian real R$" />
                                        <FormControlLabel defaultValue={currency.currencyINR} className='text-neutral-700' onClick={(e) => onClick(e.target.value)} value="INR" control={<Radio />} label="Indian rupee ₹" />

                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className='w-1/2 h-full flex flex-col  items-center'>
                                <h1 className='text-[20px] mb-5 text-neutral-700 font-bold'>Profile</h1>
                                <div className='w-full h-full flex flex-col items-center gap-4'>
                                    <Avatar style={{ width: 50, height: 50 }} src="/broken-image.jpg" />
                                   <div className='w-1/2 flex justify-center'>
                                    <p className='w-1/3 text-end marker:text-1xl text-neutral-700' >Name:</p>&ensp;
                                    <p className=' w-2/3 text-1xl text-neutral-700' >{fullName}</p>
                                    </div> 
                                    <div className='w-1/2 flex justify-center'>
                                    <p className='w-1/3 text-end text-1xl text-neutral-700' >Email:</p>&ensp;
                                    <p className=' w-2/3 text-1xl text-neutral-700' >{email}</p>
                                    </div> 
                                    
                                    <Button component="label" color='error' style={{ margin: "50px 10px", color: "#171717" }}
                                        onClick={toggleModal} size='small' variant="contained" startIcon={<DeleteForeverIcon />}> Delete account </Button>

                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2 className='text-3xl mb-5 text-neutral-700 font-bold'>Are you sure?</h2>
                        <p className=' text-xl text-neutral-700'>Deleting your account will remove all of information from our database. This cannot be undone.</p>
                       <div className='flex justify-center items-center mt-3 gap-5'>
                          <Button variant="contained"  className="close-modal" onClick={toggleModal}>Cancel</Button>
                        <Button color='error' variant="contained" className="close-modal" onClick={handleDelete}>Delete</Button>
                       </div>
     
                    </div>
                </div>
            )}

        </>

    )
}
