import React from 'react'
import { useAuth } from '../auth/auth'
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    
    let navigate = useNavigate()
    const { logout } = useAuth()

    const handleClick = (e) => {
        e.preventDefault();
        logout()
        return navigate("/")
    }

    return (
        <>
            <Button component="label" className='max-md:h-[25px] ' color='error' style={{ margin: "65px 10px" }}
                size='medium' onClick={handleClick} variant="contained" startIcon={<LogoutIcon />}> Log out </Button>
        </>
    )
}
