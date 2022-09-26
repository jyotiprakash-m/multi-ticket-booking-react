import { Box } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom"
import BusService from "./components/BusService";
import Home from "./components/Home";
import HotelService from "./components/HotelService";
import NavBar from "./components/NavBar";
import OrderService from "./components/OrderService";
import Profile from "./components/Profile";
import RailwayService from "./components/RailwayService";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { ToastContainer } from 'react-toastify';
function App() {
  const [user, setUser] = useState(null);

  // Get the user from the local storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUser(user);
    }
  }, [])

  return (
    <Box sx={{
      margin: 0,
      padding: 0
    }}>
      {/* Navigation bar */}
      <NavBar user={user} />
      <ToastContainer />

      {/* Different pages */}
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="hotel" element={<HotelService user={user} />} />
        <Route path="bus" element={<BusService user={user} />} />
        <Route path="railway" element={<RailwayService user={user} />} />
        <Route path="order" element={<OrderService user={user} />} />
        <Route path="profile" element={<Profile user={user} setUser={setUser} />} />
        <Route path="login" element={<Login user={user} setUser={setUser} />} />
        <Route path="signup" element={<Signup user={user} />} />
      </Routes>
    </Box>
  );
}

export default App;
