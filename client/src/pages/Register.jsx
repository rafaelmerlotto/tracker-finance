import React from 'react'
import { Box, Button, TextField } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonIcon from '@mui/icons-material/Person';
import { useForm } from 'react-hook-form';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { authService } from '../services';
import logo from "../assets/images/logo-tracker-finance.png"
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';



export default function Register() {

  let navigate = useNavigate()

  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    const res = await authService.registerUser(data)
    if (res) {
      return navigate("/")
    }
    return redirect("/register")
  }

  return (
    <div class="bg-neutral-800  w-full h-full flex items-center justify-center">
      <div className='w-2/4 h-screen flex flex-col items-center justify-center'>
        <img src={logo} alt="" />
        <div className='mt-7 flex gap-2'>
          <XIcon className='w-full' fontSize='large' sx={{ color: "#404040" }} />
          <InstagramIcon className='w-full' fontSize='large' sx={{ color: "#404040" }} />
          <FacebookIcon className='w-full' fontSize='large' sx={{ color: "#404040" }} />
        </div>
      </div>
      <div class=" w-2/4 h-screen flex flex-col items-center justify-center bg-neutral-700">
        <h1 className='text-[50px]  text-center text-neutral-900 '>Let's get started</h1>
       
        <form onSubmit={handleSubmit(onSubmit)} class="bg-neutral-700 w-2/3 h-auto flex flex-col items-center justify-center gap-2.5">
        <p className=' m-7 text-lg text-neutral-900'>Already have an account? <Link to={"/"} className='text-1xl  font-bold'>Log in</Link> </p>  
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="Email" type='email' variant="standard"  {...register("email")} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="Password" type='password' variant="standard" {...register("password")} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="Full name" type='text' variant="standard" {...register("fullName")} />
          </Box>

          <Button variant="contained" type='submit' style={{ marginTop: 35 }} endIcon={<HowToRegIcon />}>Register</Button>
        </form>
      </div>
    </div>
  )
}
