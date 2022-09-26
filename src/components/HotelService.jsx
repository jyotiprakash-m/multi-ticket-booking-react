import React from 'react'
import { Navigate } from 'react-router-dom';

const HotelService = ({ user }) => {
    if (!user) {
        return <Navigate replace to="/login" />;
    } else {
        return (
            <div>
                <p>Hotel</p>
            </div>
        );
    }
}

export default HotelService