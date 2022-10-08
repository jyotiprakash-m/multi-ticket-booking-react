import React, { useState, useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Add } from '@mui/icons-material';

const Stoppage = () => {
    const [stoppages, setStoppages] = useState(null);
    useEffect(() => {
        axios.get("/bus/stoppage/get").then((res) => {
            setStoppages(res.data);
        }).catch((error) => {
            toast.warn(error.response.data.message)
        })

    }, [])
    console.log(stoppages)

    const onCreate = () => {

    }

    return (
        <Box>
            {/* Add stoppage */}
            <Box sx={{
                display: "flex",
                justifyContent: "right"
            }}>
                <Button variant="contained" onClick={onCreate} endIcon={<Add />}>Create</Button>

            </Box>
        </Box>
    )
}

export default Stoppage