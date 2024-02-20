import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { authService } from '../services';
import { Avatar, Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/auth';
import { useDispatch, useSelector } from 'react-redux';
import { BRL, EUR, GBP, INR, USD, euro, real } from "../feature/currencySlice"




export default function Settings() {


    const navigate = useNavigate()
    const { logout } = useAuth()
    const [modal, setModal] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch()


    useEffect(() => {
        async function profileUser() {
            const res = await authService.profile();
            setFullName(res.username)
            setEmail(res.email)
            return;
        }
        profileUser()
    }, [])

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const onChange = (e) => {

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


    async function deleteAccountUser() {
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
            <div className='flex  bg-neutral-900 '>
                <Sidebar />
                <div className='w-4/5 h-screen flex items-center justify-center max-md:w-full max-md:h-full '>
                    <div className='w-3/4 h-3/4 flex  justify-center flex-col items-center bg-neutral-800 max-md:bg-neutral-900 rounded-lg max-md:w-full max-md:h-screen max-md:rounded-none max-md:justify-normal'>
                        <h1 className='h-auto text-5xl pb-10 text-neutral-700 max-md:text-[25px] max-md:p-3  '>Settings</h1>

                        <div className='h-2/3 w-full flex max-md:flex-col max-md:items-center '>
                            <div className='w-1/2 h-full flex flex-col  items-center max-md:w-[95%] max-md:h-full max-md:bg-neutral-800 max-md:p-3 max-md:rounded-lg'>
                                <h1 className='text-[20px] mb-5 text-neutral-700 font-bold max-md:mb-3'>Profile</h1>
                                <div className='w-full h-full flex flex-col items-center gap-2'>
                                    <Avatar style={{ width: 50, height: 50 }} src="/broken-image.jpg" />
                                    <div className='w-1/2 flex flex-col justify-center max-md:w-full'>
                                        <p className=' text-center marker:text-1xl text-neutral-700 max-md:text-start  max-md:pl-5 ' > <span className='font-bold'> Name:</span> {fullName}</p><br />
                                        <p className=' text-center text-1xl text-neutral-700 max-md:text-start max-md:pl-5 ' ><span className='font-bold'> Email:</span> {email}</p>
                                    </div>
                                    <Button className='  max-md:w-full] max-md:h-[20px] ' component="label" color='error' style={{ margin: "30px 10px", color: "#171717" }}
                                        onClick={toggleModal} size='small' variant="contained" startIcon={<DeleteForeverIcon />}> Delete account </Button>

                                </div>
                            </div>

                            <div className='w-1/2 flex justify-center max-md:text max-md:mt-1 max-md:w-[95%] max-md:h-full max-md:bg-neutral-800 max-md:p-3 max-md:rounded-lg'>
                                <FormControl>
                                    <FormLabel className='text-[15px]' sx={{ fontSize: 20, color: "#404040", fontWeight: "bold" }} id="demo-radio-buttons-group-label">Select currency</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue={authService.currencyActual}
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel className='text-neutral-700' onClick={() => dispatch(USD())} value={"USD"} onChange={(e) => onChange(e.currentTarget.value)} control={<Radio />} label="Dollar $" />
                                        <FormControlLabel className='text-neutral-700' onClick={() => dispatch(EUR())} value={"EUR"} onChange={(e) => onChange(e.currentTarget.value)} control={<Radio />} label="Euro €" />
                                        <FormControlLabel className='text-neutral-700' onClick={() => dispatch(GBP())} value={"GBP"} onChange={(e) => onChange(e.currentTarget.value)} control={<Radio />} label="Pound £" />
                                        <FormControlLabel className='text-neutral-700' onClick={() => dispatch(BRL())} value={"BRL"} onChange={(e) => onChange(e.currentTarget.value)} control={<Radio />} label="Brazilian real R$" />
                                        <FormControlLabel className='text-neutral-700' onClick={() => dispatch(INR())} value={"INR"} onChange={(e) => onChange(e.currentTarget.value)} control={<Radio />} label="Indian rupee ₹" />
                                    </RadioGroup>
                                </FormControl>
                            </div>


                        </div>


                    </div>
                </div>
            </div>
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2 className='text-3xl mb-5 text-neutral-700 font-bold max-md:text-2xl'>Are you sure?</h2>
                        <p className=' text-xl text-neutral-700 max-md:text-sm'>Deleting your account will remove all of information from our database. This cannot be undone.</p>
                        <div className='flex justify-center items-center mt-3 gap-5'>
                            <Button variant="contained" className="close-modal" onClick={toggleModal}>Cancel</Button>
                            <Button color='error' variant="contained" className="close-modal" onClick={handleDelete}>Delete</Button>
                        </div>

                    </div>
                </div>
            )}

        </>

    )
}
