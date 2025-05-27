import React, { useContext } from 'react';
import Authcontext from '../Context/Authcontext';
import { Navigate } from 'react-router-dom';

const Privateroute = ({children}) => {
    const {user,loading}=useContext(Authcontext)
      if (loading) {
        return <p>Loading...</p>;
    }
        if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default Privateroute;