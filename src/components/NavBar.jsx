import { Avatar, Box, Typography } from '@mui/material';
import React from 'react'
import { Link } from "react-router-dom";
const NavBar = ({ user }) => {
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        }}>
            {/* Logo */}
            <Box>
                <Link to="/">
                    <img src='./logo.png' alt='' width={200} />
                </Link>
            </Box>
            {/* Links */}
            <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: "2rem"
            }}>
                <Box>
                    <Link to="/bus" style={{
                        textDecoration: "none",
                        color: "#2596be"
                    }}>
                        <Typography variant='subtitle2' sx={{
                            fontSize: "1.3rem"
                        }}>Bus</Typography>
                    </Link>
                </Box>
                <Box>
                    <Link to="/railway" style={{
                        textDecoration: "none",
                        color: "#2596be"
                    }}>
                        <Typography variant='subtitle2' sx={{
                            fontSize: "1.3rem"
                        }}>Railway</Typography>
                    </Link>
                </Box>
                <Box>
                    <Link to="/hotel" style={{
                        textDecoration: "none",
                        color: "#2596be"
                    }}>
                        <Typography variant='subtitle2' sx={{
                            fontSize: "1.3rem"
                        }}>Hotel</Typography>
                    </Link>
                </Box>
                <Box>
                    <Link to="/order" style={{
                        textDecoration: "none",
                        color: "#2596be"
                    }}>
                        <Typography variant='subtitle2' sx={{
                            fontSize: "1.3rem"
                        }}>Order</Typography>
                    </Link>
                </Box>
                {user &&
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "1rem"
                    }}>
                        <Link to="/profile">
                            <Avatar alt="Avatar" src={user.avatar} />
                        </Link>
                        <Typography sx={{
                            color: "#2596be"
                        }}>{user.email}</Typography>
                    </Box>
                }

            </Box>
        </Box>
    )
}

export default NavBar