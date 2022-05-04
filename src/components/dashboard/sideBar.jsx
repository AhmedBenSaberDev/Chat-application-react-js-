import { useState } from 'react';
import {Col} from 'react-bootstrap';

import ChatRoomList from '../sideBar/ChatRoomList';
import AddFriend from '../sideBar/AddFriend';
import Profile from '../sideBar/Profile';
import Notifications from '../sideBar/Notifications';

import classes from './sideBar.module.css';

const SideBar = props => {

    let selectedTab = props.selectedTab;

    return(
        <Col xs={3} className={`${classes.wrapper}`}>
           {selectedTab === 'chat' && <ChatRoomList></ChatRoomList>}
           {selectedTab === 'add-friend' && <AddFriend></AddFriend>}
           {selectedTab === 'profile' && <Profile></Profile>}
           {selectedTab === 'notifications' && <Notifications></Notifications>}
        </Col>
    )
};

export default SideBar;