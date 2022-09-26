import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const ChangeAvatarModal = ({ user, setUser, setUserData, style, isChangeAvatar, setIsChangeAvatar }) => {
    const [avatar, setAvatar] = useState("");

    const isImgLink = (url) => {
        if (typeof url !== 'string') return false;
        return (url.match(/^http[^]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null);
    }
    const onCloseModal = () => {
        setIsChangeAvatar(false);
        setAvatar("")
    }
    const onSubmit = () => {
        axios.put(`/user/update/avatar?avatar=${avatar}&userId=${user.userId}`).then((res) => {
            toast.success(res.data.message)
        }).then(() => {
            const user = JSON.parse(localStorage.getItem('user'));
            user.avatar = avatar;
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            onCloseModal();
        }).then(() => {
            // update the profile
            axios.get(`/user/get/${user.userId}`).then((res) => {
                setUserData(res.data)
            })
        }).catch(error => {
            toast.warn(error.response.data.message)
        })
    }
    return (
        <Modal
            open={isChangeAvatar}
            onClose={onCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
                <Grid container spacing={2}>
                    <Grid item xs={6} >
                        {avatar && isImgLink(avatar) ? <img style={{ width: "100%" }} src={avatar} alt="" /> : <Typography variant='h6'>No image to display</Typography>}
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <TextField sx={{
                                width: "100%"
                            }}
                                onChange={(e) => setAvatar(e.target.value)}
                                value={avatar}
                                id="avatar"
                                label="Enter the url of avatar"
                                variant="outlined"
                            />
                        </Box>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "2rem"
                        }}>
                            <Button variant="contained" color='primary' onClick={onSubmit}>Update</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

export default ChangeAvatarModal