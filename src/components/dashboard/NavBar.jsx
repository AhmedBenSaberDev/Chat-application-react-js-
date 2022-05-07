import { useContext, useState } from "react";

import { Col, Tooltip, OverlayTrigger , Popover , Button , Image } from "react-bootstrap";
import { FaUserPlus } from 'react-icons/fa';
import { IoMdNotifications , IoMdSettings } from 'react-icons/io';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi'

import {BsFillChatSquareTextFill,BsPersonCircle,BsChatLeftFill,BsLock} from "react-icons/bs";

import { useNavigate } from "react-router-dom";

import { UserContext } from '../../store/User-context';

import classes from "./navBar.module.css";


const NavBar = (props) => {

  const userCtx = useContext(UserContext);

  const navigate = useNavigate();

  const [sideBarSelectedTab,setSideBarSelectedTab] = useState("chat");

  useState(() => {
    props.setSelectedTab(sideBarSelectedTab);
  },[]);

  const handleSelectedTab1 = () => {
    setSideBarSelectedTab('profile');
    props.setSelectedTab('profile');
  }

  const handleSelectedTab2 = () => {
    setSideBarSelectedTab('add-friend');
    props.setSelectedTab('add-friend');
  }

  const handleSelectedTab3 = () => {
    setSideBarSelectedTab('chat');
    props.setSelectedTab('chat');
  }

  const handleSelectedTab4 = () => {
    setSideBarSelectedTab('notifications');
    props.setSelectedTab('notifications');
  }

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate('/login')
  }

  return (
    <Col xs={3} className={`${classes.wrapper} d-flex flex-column justify-content-between align-items-center`}>
      <div>
      <BsFillChatSquareTextFill className={`${classes.icons} ${classes.active} p-0 mt-5`}></BsFillChatSquareTextFill>

        <OverlayTrigger  placement="right" overlay={<Tooltip className={classes.tooltip}>Profile</Tooltip>}>
            <div onClick={handleSelectedTab1}  className={`${classes['icon-wrapper']} mt-5`}>
              <BsPersonCircle  className={`${classes.icons} ${sideBarSelectedTab === "profile" ? classes.active : ""}`}></BsPersonCircle>
            </div>
        </OverlayTrigger>

        <OverlayTrigger  placement="right" overlay={<Tooltip className={classes.tooltip}>Add friend</Tooltip>}>
            <div  onClick={handleSelectedTab2} className={`${classes['icon-wrapper']} mt-5`}>
              <FaUserPlus style={{transform:"translateX(3px)"}} className={`${classes.icons} ${sideBarSelectedTab === "add-friend" ? classes.active : ""}`}></FaUserPlus>
            </div>
        </OverlayTrigger>

      <OverlayTrigger className="mt-4" placement="right" overlay={<Tooltip className={classes.tooltip}>Chats</Tooltip>}>
        <div onClick={handleSelectedTab3} className={`${classes['icon-wrapper']} mt-5`}>
          <BsChatLeftFill className={`${classes.icons} ${sideBarSelectedTab === "chat" ? classes.active : ""}`}></BsChatLeftFill>
        </div>
      </OverlayTrigger>

      <OverlayTrigger className="mt-4" placement="right" overlay={<Tooltip className={classes.tooltip}>Chats</Tooltip>}>
        <div onClick={handleSelectedTab4} className={`${classes['icon-wrapper']} mt-5`}>
          <IoMdNotifications className={`${classes.icons} ${sideBarSelectedTab === "notifications" ? classes.active : ""}`}></IoMdNotifications>
        </div>
      </OverlayTrigger>
      </div>

      <OverlayTrigger trigger="click"
      overlay={
        <Popover className={`${classes.popover}`} id={`popover-positioned-top`}>
          <Popover.Body style={{padding:0}}>
          <div  className={classes['popover-item']}>
            <span>Profile</span>
            <BiUserCircle  className={classes['popover-icons']}></BiUserCircle>
          </div>
          <div  className={classes['popover-item']}>
            <span>Settings</span>
            <IoMdSettings className={classes['popover-icons']}></IoMdSettings>
          </div>
          <div className={classes['popover-item']}>
            <span>Change Password</span>
            <BsLock className={classes['popover-icons']}></BsLock>
          </div>
          <hr style={{width:"100%",margin:"3px 0",height:"1px",color:'var(--primary-green)'}}></hr>
            <div onClick={handleLogout} className={classes['popover-item']}>
              <span>Log out</span> 
              <AiOutlineLogout className={classes['popover-icons']} ></AiOutlineLogout>
            </div>
          </Popover.Body>
        </Popover>
      }
    >
      <div style={{cursor:"pointer"}} className={`${classes['icon-wrapper']} mb-4 d-flex flex-column justify-content-center align-items-center`}>
      <Image roundedCircle style={{width:"30px",height:"30px",objectFit:"cover"}} src={userCtx.user?.image ? "http://localhost:5000/" + userCtx.user?.image :  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}></Image>
        <Button className={`${classes['parameters-btn']} my-3`}><IoMdSettings className={`${classes.icons}`}></IoMdSettings></Button>
      </div>
    </OverlayTrigger>

    </Col>
  );
};

export default NavBar;
