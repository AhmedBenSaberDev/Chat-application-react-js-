import { useContext, useEffect, useState } from "react";
import { useNavigate , useLocation} from "react-router-dom";

import { SocketContext } from "../../store/socket-context";

import Conversation from "../../components/dashboard/Conversation";
import NavBar from "../../components/dashboard/NavBar";
import SideBar from "../../components/dashboard/sideBar";

import { EncryptStorage } from 'encrypt-storage';

import { Col, Row } from "react-bootstrap";

import env from "react-dotenv";

const Dashboard = () => {

    const encryptStorage = new EncryptStorage('secret-key');

    const navigate = useNavigate();
    const socketCtx = useContext(SocketContext);

    const [sideBarSelectedTab , setSideBarSelectedTab] = useState();
    
    useEffect(() => {
        const userInfo = encryptStorage.getItem('userInfo');
        if(!userInfo){
            navigate('/login');
            return
        };

        socketCtx.setup(userInfo.userId);
        
    },[socketCtx.socket]);

    const handleSelectedTab = (tab) => {
        setSideBarSelectedTab(tab);
    }

    return (
        <Row>
            <Col xs={3}>
                <Row >
                    <NavBar setSelectedTab={handleSelectedTab}></NavBar>
                    <SideBar selectedTab={sideBarSelectedTab}></SideBar>
                </Row>
            </Col>
            <Col xs={9}>
                <Row  >
                    <Conversation></Conversation>
                </Row>
            </Col>
        </Row>
    )
}

export default Dashboard;