import React from 'react'
import { Navigate } from 'react-router-dom';

const RailwayService = ({ user }) => {
    if (!user) {
        return <Navigate replace to="/login" />;
    } else {
        return (
            <div>
                <p>Railway</p>
            </div>
        );
    }
}

export default RailwayService