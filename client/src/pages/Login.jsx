import React, { useEffect } from 'react'
import { Box, Button, TextField } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import LoginIcon from '@mui/icons-material/Login';
import { useForm } from 'react-hook-form';
import { useAuth } from '../auth/auth';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/images/logo-tracker-finance.png"
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';


export default function Login() {

  let navigate = useNavigate()
  const { token, login } = useAuth()
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    const res = await login(data)
    return res
  }

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      return navigate("/overview")
    }
  }, [token])

  return (
    <div className='bg-neutral-800 h-full w-full flex justify-center items-center'>
      <div className='w-2/4 h-screen flex flex-col items-center justify-center'>
        <img src={logo} alt="" />
          <div className='mt-7 flex gap-2'>
        <XIcon className='w-full'  fontSize='large' sx={{color:"#404040"}}/>
        <InstagramIcon className='w-full' fontSize='large' sx={{color:"#404040"}}/>
        <FacebookIcon className='w-full' fontSize='large' sx={{color:"#404040"}}/>
      </div>
      </div>
      <div class=" w-2/4 h-screen flex flex-col items-center justify-center bg-neutral-700">
      <h1 className='text-[50px] text-center text-neutral-900 '>Welcome back </h1>
        <form onSubmit={handleSubmit(onSubmit)} class=" w-2/3 h-2/3 flex flex-col items-center justify-center gap-2.5">
          <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
            <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="Email" type='email' variant="standard"  {...register("email")} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx" label="Password" type='password' variant="standard" {...register("password")} />
          </Box>
          <Button variant="contained" type='submit' style={{ marginTop: 35 }} endIcon={<LoginIcon />}>Login</Button>
          <Link className='mt-4 text-lg text-neutral-900' to={"/"} >Forgot password?</Link>
          <p className=' mt-12 text-lg text-neutral-900'>Not registred? <Link to={"/register"} className='text-1xl  font-bold'>Do it here</Link> </p>  
        </form>
       
     
      </div>

      </div>

  )
}
