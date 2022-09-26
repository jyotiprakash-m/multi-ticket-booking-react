import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Signup = ({ user }) => {
    const navigate = useNavigate();
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");

    const onSubmit = () => {
        if (password === repassword) {
            axios.post('/user/save', { email, password, mobileNumber })
                .then((res) => {
                    toast.success(res.data.message);
                }).then(() => {
                    // Navigate to login page
                    navigate("/login");

                })
                .catch((error) => {
                    let response = error.response.data;
                    if (response.message) {
                        toast.warn(response.message);
                    } else {
                        Object.values(response).forEach(val => {
                            toast.warn(val);
                        });
                    }

                });
        } else {
            toast.warn("Password not match");
        }
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
                    marginTop: "3rem",
                }}>
                    <Typography variant='h4'>Signup</Typography>
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
                                label="Enter mobileNumber number"
                                variant="outlined" />
                        </Box>
                        <Box sx={{
                            marginBottom: "1rem"
                        }}>
                            <TextField sx={{
                                width: "350px"
                            }}
                                onChange={(e) => setEmail(e.target.value)}
                                id="email"
                                label="Enter Email address"
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
                            <TextField sx={{
                                width: "350px"
                            }}
                                onChange={(e) => setRepassword(e.target.value)}
                                id="repassword"
                                label="Enter password again"
                                variant="outlined"
                            />
                        </Box>
                        <Box sx={{
                            marginTop: "1rem",
                            marginBottom: "1rem"
                        }}>
                            <Button sx={{
                                width: "350px"
                            }} variant="contained" onClick={onSubmit}>Signup</Button>
                        </Box>
                    </Box>
                    <Typography>Already have an account ? <Link to="/login">Login</Link></Typography>
                </Box>
            </Box>
        )
    }
}

export default Signup