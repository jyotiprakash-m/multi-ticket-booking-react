import React from 'react'
import { Navigate } from "react-router-dom";
const Home = ({ user }) => {
    if (!user) {
        return <Navigate replace to="/login" />;
    } else {
        return (
            <div>
                <p>Home</p>
            </div>
        );
    }
}

export default Home