import React , { useEffect } from 'react'
import { Box, Button, TextField } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import LoginIcon from '@mui/icons-material/Login';
import { useForm } from 'react-hook-form';
import { useAuth } from '../auth/auth';
import { useNavigate } from 'react-router-dom';


export default function Login() {

  let navigate = useNavigate()
  const {token, login} = useAuth()
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
        <Button variant="contained" type='submit' style={{ marginTop: 35 }} endIcon={<LoginIcon />}>Login</Button>
      </form>
    </div>
  )
}
