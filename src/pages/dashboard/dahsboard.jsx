import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../store/User-context";

import Conversation from "../../components/dashboard/Conversation";
import NavBar from "../../components/dashboard/NavBar";
import SideBar from "../../components/dashboard/sideBar";

import { EncryptStorage } from 'encrypt-storage';

import { Row } from "react-bootstrap";

const Dashboard = () => {

    const encryptStorage = new EncryptStorage('secret-key');

    const navigate = useNavigate();
    const userCtx = useContext(UserContext);

    const [sideBarSelectedTab , setSideBarSelectedTab] = useState();
    
    useEffect(() => {
        const userInfo = encryptStorage.getItem('userInfo');
        if(!userInfo){
            navigate('/login');
        };
    });

    const handleSelectedTab = (tab) => {
        setSideBarSelectedTab(tab);
    }

    return (
        <Row>
            <NavBar setSelectedTab={handleSelectedTab}></NavBar>
            <SideBar selectedTab={sideBarSelectedTab}></SideBar>
            <Conversation></Conversation>
        </Row>
    )
}

export default Dashboard;