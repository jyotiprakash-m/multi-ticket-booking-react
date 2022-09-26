import { Box, Button, Grid, Stack, TextField, Tooltip, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Zoom from '@mui/material/Zoom';
import ChangePasswordModal from './modals/user-service/ChangePasswordModal';
import LoginActivitiesModal from './modals/user-service/LoginActivitiesModal';
import LogoutModal from './modals/user-service/LogoutModal';
import ChangeAvatarModal from './modals/user-service/ChangeAvatarModal';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'center'
};
const Profile = ({ user, setUser }) => {
    const [userData, setUserData] = useState(null);

    // Modals states
    const [isChangePasswordModal, setIsChangePasswordModal] = useState(false);
    const [isLoginActivitiesModal, setIsLoginActivitiesModal] = useState(false);
    const [isLogoutModal, setIsLogoutModal] = useState(false);
    const [isChangeAvatar, setIsChangeAvatar] = useState(false);

    // Update profile state
    const [isUpdate, setIsUpdate] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    const [district, setDistrict] = useState("")

    useEffect(() => {
        user && user.userId && axios.get(`/user/get/${user.userId}`).then((res) => {
            setUserData(res.data);
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setCountry(res.data.country);
            setState(res.data.state);
            setDistrict(res.data.district)
        }).catch(error => {
            toast.error(error.response.data.message);
        })

    }, [user])

    const cancelUpdate = () => {
        if (isUpdate) {
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
            setCountry(userData.country);
            setState(userData.state);
            setDistrict(userData.district)
        }
        setIsUpdate(!isUpdate);
    }

    const onSubmit = () => {
        console.log(firstName, lastName, country, state, district);
        axios.put('/user/update', {
            userId: user.userId,
            firstName,
            lastName,
            country,
            state,
            district
        }).then((res) => {
            toast.success(res.data.message)
            setIsUpdate(false)
        }).then(() => {
            axios.get(`/user/get/${user.userId}`).then((res) => {
                setUserData(res.data);
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setCountry(res.data.country);
                setState(res.data.state);
                setDistrict(res.data.district)
            }).catch(error => {
                toast.error(error.response.data.message);
            })
        }).catch((error) => {
            toast.warn(error.response.data.message);
        })

    }

    if (!user) {
        return <Navigate replace to="/login" />;
    } else {
        return (
            <Box sx={{
                marginTop: "1rem",
                paddingRight: "2rem"
            }}>
                {
                    !userData ?
                        <Box sx={{
                            height: "100vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <CircularProgress />
                        </Box>
                        :
                        <Grid container spacing={2}>
                            <Grid item xs={5}>
                                <Box onClick={() => setIsChangeAvatar(true)} sx={{
                                    display: "flex",
                                    justifyContent: "center"
                                }}>
                                    <Tooltip title="Change Image" placement="top" TransitionComponent={Zoom}>
                                        <Box sx={{
                                            width: "300px",
                                            height: "300px",
                                            // backgroundColor: "red",
                                            backgroundImage: `url(${userData && userData.avatar})`,
                                            borderRadius: "50%",
                                            backgroundSize: "cover",
                                            border: "2px solid #2596be",
                                            '&:hover': {
                                                backgroundColor: 'primary.main',
                                                opacity: [0.9, 0.8, 0.7],
                                                cursor: "pointer"
                                            },

                                        }}
                                        >
                                        </Box>
                                    </Tooltip>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "2rem"
                                }}>
                                    <Stack direction="column" spacing={2}>
                                        <Button sx={{ width: "300px" }} variant="contained" onClick={() => setIsChangePasswordModal(true)}>Change Password</Button>
                                        <Button sx={{ width: "300px" }} variant="contained" onClick={() => setIsLoginActivitiesModal(true)}>Login activities</Button>
                                        <Button sx={{ width: "300px" }} variant="contained" color='secondary' onClick={cancelUpdate}>{isUpdate ? "Cancle Update" : "Update Profile"}</Button>
                                        <Button sx={{ width: "300px" }} variant="contained" color='warning' onClick={() => setIsLogoutModal(true)}>Logout</Button>
                                    </Stack>
                                </Box>
                            </Grid>
                            <Grid item xs={7}>
                                <Box>
                                    <Typography variant='h5'>User Information</Typography>
                                    {
                                        userData &&

                                        <Box >
                                            <Box sx={{
                                                marginTop: "2rem",
                                                marginBottom: "1rem"
                                            }}>
                                                <TextField sx={{
                                                    width: "100%"
                                                }}
                                                    // onChange={(e) => setOldPassword(e.target.value)}
                                                    id="email"
                                                    size='small'
                                                    label="Email Address"
                                                    value={userData.email}
                                                    variant="outlined"
                                                    disabled
                                                />
                                            </Box>
                                            <Box sx={{
                                                marginTop: "1rem",
                                                marginBottom: "1rem"
                                            }}>
                                                <TextField sx={{
                                                    width: "100%"
                                                }}
                                                    // onChange={(e) => setOldPassword(e.target.value)}
                                                    id="mobileNumber"
                                                    size='small'
                                                    label="Mobile Number"
                                                    value={userData.mobileNumber}
                                                    variant="outlined"
                                                    disabled
                                                />
                                            </Box>
                                            <Box sx={{
                                                marginTop: "1rem",
                                                marginBottom: "1rem"
                                            }}>
                                                <TextField sx={{
                                                    width: "100%"
                                                }}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    id="firstName"
                                                    size='small'
                                                    label="First Name"
                                                    value={firstName}
                                                    variant="outlined"
                                                    disabled={!isUpdate}
                                                />
                                            </Box>
                                            <Box sx={{
                                                marginTop: "1rem",
                                                marginBottom: "1rem"
                                            }}>
                                                <TextField sx={{
                                                    width: "100%"
                                                }}
                                                    id="lastName"
                                                    size='small'
                                                    label="Last Name"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    variant="outlined"
                                                    disabled={!isUpdate}
                                                />
                                            </Box>
                                            <Box sx={{
                                                marginTop: "1rem",
                                                marginBottom: "1rem"
                                            }}>
                                                <TextField sx={{
                                                    width: "100%"
                                                }}
                                                    onChange={(e) => setCountry(e.target.value)}
                                                    id="country"
                                                    size='small'
                                                    label="Country"
                                                    value={country}
                                                    variant="outlined"
                                                    disabled={!isUpdate}
                                                />
                                            </Box>
                                            <Box sx={{
                                                marginTop: "1rem",
                                                marginBottom: "1rem"
                                            }}>
                                                <TextField sx={{
                                                    width: "100%"
                                                }}
                                                    onChange={(e) => setState(e.target.value)}
                                                    id="state"
                                                    size='small'
                                                    label="State"
                                                    value={state}
                                                    variant="outlined"
                                                    disabled={!isUpdate}
                                                />
                                            </Box>
                                            <Box sx={{
                                                marginTop: "1rem",
                                                marginBottom: "1rem"
                                            }}>
                                                <TextField sx={{
                                                    width: "100%"
                                                }}
                                                    onChange={(e) => setDistrict(e.target.value)}
                                                    id="district"
                                                    size='small'
                                                    label="District"
                                                    value={district}
                                                    variant="outlined"
                                                    disabled={!isUpdate}
                                                />
                                            </Box>
                                            {isUpdate &&
                                                <Box sx={{
                                                    display: "flex",
                                                    justifyContent: "center"
                                                }}>
                                                    <Button variant="contained" color='secondary' onClick={onSubmit}>Update</Button>
                                                </Box>
                                            }
                                        </Box>

                                    }
                                </Box>
                            </Grid>
                        </Grid>
                }

                {/* All modals placed here */}
                <ChangePasswordModal user={user} setUserData={setUserData} style={style} isChangePasswordModal={isChangePasswordModal} setIsChangePasswordModal={setIsChangePasswordModal} />
                {userData && <LoginActivitiesModal loginHistories={userData?.loginHistories} style={style} isLoginActivitiesModal={isLoginActivitiesModal} setIsLoginActivitiesModal={setIsLoginActivitiesModal} />}
                <LogoutModal user={user} setUser={setUser} setUserData={setUserData} isLogoutModal={isLogoutModal} setIsLogoutModal={setIsLogoutModal} />
                <ChangeAvatarModal user={user} setUser={setUser} setUserData={setUserData} style={style} isChangeAvatar={isChangeAvatar} setIsChangeAvatar={setIsChangeAvatar} />
            </Box>
        );
    }
}

export default Profile