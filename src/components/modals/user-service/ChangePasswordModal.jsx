import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const ChangePasswordModal = ({ user, style, isChangePasswordModal, setIsChangePasswordModal }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newRepassword, setNewRepassword] = useState("");

    const onSubmit = () => {
        console.log(oldPassword, newPassword, newRepassword);
        if (newPassword === newRepassword) {
            axios.put('/user/update/password', { userId: user.userId, oldPassword: oldPassword, newPassword: newPassword }).then((res) => {
                toast.success(res.data.message)
                setIsChangePasswordModal(false);
            }).catch((error) => {
                toast.warn(error.response.data.message)
            })
        } else {
            toast.warn("Password not matched")
        }
    }
    return (
        <Modal
            open={isChangePasswordModal}
            onClose={() => setIsChangePasswordModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
                <Box>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <Typography variant='h5'>Change Password</Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "2rem"

                    }}>
                        <Box>
                            <Box sx={{
                                // marginTop: "1rem",
                                marginBottom: "1rem"
                            }}>
                                <TextField sx={{
                                    width: "400px"
                                }}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    id="oldPassword"
                                    label="Enter old password"
                                    variant="outlined"
                                />
                            </Box>
                            <Box sx={{
                                marginTop: "1rem",
                                marginBottom: "1rem"
                            }}>
                                <TextField sx={{
                                    width: "400px"
                                }}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    id="newPassword"
                                    label="Enter new password"
                                    variant="outlined"
                                />
                            </Box>
                            <Box sx={{
                                marginTop: "1rem",
                                marginBottom: "1rem"
                            }}>
                                <TextField sx={{
                                    width: "400px"
                                }}
                                    onChange={(e) => setNewRepassword(e.target.value)}
                                    id="newRepassword"
                                    label="Enter new password again"
                                    variant="outlined"
                                />
                            </Box>
                            <Box sx={{
                                marginTop: "1rem",

                            }}>
                                <Button sx={{
                                    width: "400px"
                                }} variant="contained" onClick={onSubmit}>Change Password</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>

            </Box>

        </Modal>
    )
}

export default ChangePasswordModal