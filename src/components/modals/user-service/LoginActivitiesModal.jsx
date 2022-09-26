import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Grid, Modal, Typography } from '@mui/material'

import React from 'react'

const LoginActivitiesModal = ({ style, isLoginActivitiesModal, setIsLoginActivitiesModal, loginHistories }) => {
    return (
        <Modal
            open={isLoginActivitiesModal}
            onClose={() => setIsLoginActivitiesModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} style={{
                width: "1000px",
                height: "80vh",
                overflowY: "scroll",
                overflowX: 'hidden'
            }} >
                <Box>
                    <Typography sx={{
                        textAlign: "center",
                        marginBottom: "2rem"
                    }} variant='h5'>LogIn Histories</Typography>
                    <Box sx={{
                        paddingBottom: "4rem"
                    }}>
                        {loginHistories.map(value => {
                            let data = JSON.parse(value.data);
                            return (
                                <Accordion key={value.id} sx={{
                                    width: "1000px"
                                }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>{new Date(value.date).toLocaleString()}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>

                                        <Grid container spacing={2}>
                                            <Grid item xs={5}>
                                                <Typography variant='h6' sx={{ textAlign: "center", fontWeight: 600, marginBottom: "1rem" }}>Ip Address information</Typography>
                                                <Typography><b>Ip Address: </b>{data.address.IPv4}</Typography>
                                                <Typography><b>City: </b>{data.address.city}</Typography>
                                                <Typography><b>Country Code: </b>{data.address.country_code}</Typography>
                                                <Typography><b>Latitude: </b>{data.address.latitude}</Typography>
                                                <Typography><b>Longitude: </b>{data.address.longitude}</Typography>
                                                <Typography><b>Postal: </b>{data.address.postal}</Typography>
                                                <Typography><b>State: </b>{data.address.state}</Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Divider orientation='vertical'>
                                                </Divider>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Typography variant='h6' sx={{ textAlign: "center", fontWeight: 600, marginBottom: "1rem" }}>Device information</Typography>
                                                <Typography><b>Description: </b>{data.device.description}</Typography>
                                                <Typography><b>Name: </b>{data.device.name}</Typography>
                                                <Typography><b>Version: </b>{data.device.version}</Typography>
                                                <Typography><b>OS Architecture: </b>{data.device.os.architecture}</Typography>
                                                <Typography><b>OS Family: </b>{data.device.os.family}</Typography>
                                                <Typography><b>OS Version: </b>{data.device.os.version}</Typography>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        }
                        )}

                    </Box>
                </Box>
            </Box>

        </Modal>
    )
}

export default LoginActivitiesModal