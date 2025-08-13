import React from 'react'
import { TextField, Button, Grid, Typography } from '@mui/material';
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const loginUser = async (e) => {
        e.preventDefault()
        alert("login")
        let response = await axios.post(`http://localhost:1337/login`, { email: email, password: password }).catch(err => {
            console.log("error")
        })

        console.log("res", response)

        if (response?.data?.data?.token) {
            localStorage.setItem('token', response?.data?.token)
            navigate('/home')
            
        }

        alert(response?.data?.message || "Something went wrong")
        return
    }

    // useEffect(()=> {
    //         navigate('/home')

    // })
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}>

            <Grid
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 2,
                    // backgroundColor: "red",
                    height: "50%",
                    width: "50%",
                    padding: "10px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.5)"
                }}>
                <Typography textAlign={"center"}>Login</Typography>
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    size='small'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    size='small'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant='outlined' onClick={loginUser}>Login</Button>
            </Grid>
        </div>
    )
}

export default Login