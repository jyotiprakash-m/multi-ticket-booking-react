import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import platform from "platform";
import axios from 'axios';

const Login = ({ user, setUser }) => {
    const navigate = useNavigate();
    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = () => {
        axios.get('https://geolocation-db.com/json/').then((res) => {
            let payload = {
                mobileNumber,
                password,
                systemInfo: JSON.stringify({
                    device: platform,
                    address: res.data
                })
            }
            // Login the user
            axios.post('/user/login', payload).then((res) => {
                toast.success(res.data.message);
            }).then(() => {
                // Get the data using mobile number
                axios.get(`/user/getByMobileNumber/${mobileNumber}`).then((res) => {
                    let user = {
                        userId: res.data.userId,
                        email: res.data.email,
                        avatar: res.data.avatar
                    }
                    // Store as local storage
                    localStorage.setItem('user', JSON.stringify(user));
                    // Update user state
                    setUser(user)
                }).then(() => {
                    navigate("/");
                }).catch(error => {
                    toast.warn(error.response.data.message)
                })

            }).catch((error) => {
                toast.warn(error.response.data.message)
            });

        }).catch((error) => {
            console.log(error)
        })

    }

    if (user) {
        return <Navigate replace to="/" />;
    } else {
        return (
            <Box sx={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center"
            }}>
                <Box sx={{
                    marginTop: "5rem",
                }}>
                    <Typography variant='h4'>Login</Typography>
                    <Box sx={{
                        marginTop: "2rem"
                    }}>
                        <Box sx={{
                            marginBottom: "1rem"
                        }}>
                            <TextField sx={{
                                width: "350px"
                            }}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                id="mobileNumber"
                                label="Enter mobile number"
                                variant="outlined" />
                        </Box>
                        <Box sx={{
                            marginTop: "1rem",
                            marginBottom: "1rem"
                        }}>
                            <TextField sx={{
                                width: "350px"
                            }}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                label="Enter password"
                                variant="outlined"
                            />
                        </Box>
                        <Box sx={{
                            marginTop: "1rem",
                            marginBottom: "1rem"
                        }}>
                            <Button sx={{
                                width: "350px"
                            }} variant="contained" onClick={onSubmit}>Login</Button>
                        </Box>
                    </Box>
                    <Typography>You have not account ? <Link to="/signup">Signup</Link></Typography>
                </Box>
            </Box>
        )
    }
}

export default Login