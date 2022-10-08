import { Settings } from '@mui/icons-material';
import { Box, Fab, Typography } from '@mui/material';
import React from 'react'
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BusService = ({ user }) => {
    if (!user) {
        toast.warn("Please login first");
        return <Navigate replace to="/login" />;
    } else {
        return (
            <Box>
                <Link to="/bus-service-settings">
                    <Fab sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                    }} aria-label="Setting" color="primary">
                        <Settings />
                    </Fab>
                </Link>
                <Typography>bus </Typography>
            </Box>
        );
    }
}

export default BusService