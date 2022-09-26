import React from 'react'
import { Navigate } from 'react-router-dom';

const OrderService = ({ user }) => {
    if (!user) {
        return <Navigate replace to="/login" />;
    } else {
        return (
            <div>
                <p>Order</p>
            </div>
        );
    }
}

export default OrderService