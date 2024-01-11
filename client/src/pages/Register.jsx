import React from 'react'
import { Box, Button, TextField } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonIcon from '@mui/icons-material/Person';
import { useForm } from 'react-hook-form';
import { redirect, useNavigate } from 'react-router-dom';
import { authService } from '../services';

export default function Register() {

    let navigate = useNavigate()

    const { register, handleSubmit } = useForm()
  
    const onSubmit = async (data) => {
      const res = await authService.registerUser(data)
     if(res){
        return navigate("/")
     }
     return redirect("/register")
    }

  return (
    <div class=" w-full h-screen flex items-center justify-center">
    <form onSubmit={handleSubmit(onSubmit)} class="bg-neutral-700 w-2/3 h-2/3 flex flex-col items-center justify-center gap-2.5">
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
  )
}
