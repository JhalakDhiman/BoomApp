import React, { useContext } from 'react'
import {AuthContext} from '../../context/AuthContext'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const {token} = useContext(AuthContext);

    if(token){
        return children
    }
    else{
        return <Navigate to='/login'/>
    }
}

export default PrivateRoute
