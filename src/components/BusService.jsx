import React from 'react'
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BusService = ({ user }) => {
    if (!user) {
        toast.warn("Please login first");
        return <Navigate replace to="/login" />;
    } else {
        return (
            <div>
                <p>Bus</p>
            </div>
        );
    }
}

export default BusService