import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../store/User-context";

const Dashboard = () => {

    const navigate = useNavigate();
    const userCtx = useContext(UserContext);
    
    useEffect(() => {
        if(!userCtx.user){
            navigate('/login');
        }
    },[]);

    return (
        <h1>Dahsboard</h1>
    )
}

export default Dashboard;