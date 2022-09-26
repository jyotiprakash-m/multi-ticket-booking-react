import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'

const LogoutModal = ({ user, setUser, isLogoutModal, setIsLogoutModal }) => {

    const handleOnAgree = () => {
        axios.post(`/user/logout?userId=${user.userId}`).then((res) => {
            setUser(null)
            localStorage.removeItem('user');
            toast.success(res.data.message);
        }).catch((error) => {
            toast.warn(error.response.data.message)
        })
    }
    return (
        <Dialog
            open={isLogoutModal}
            onClose={() => setIsLogoutModal(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Are you sure want to logout?"}
            </DialogTitle>

            <DialogActions>
                <Button onClick={() => setIsLogoutModal(false)}>Disagree</Button>
                <Button color='error' onClick={handleOnAgree} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default LogoutModal