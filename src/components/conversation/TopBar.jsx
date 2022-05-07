import { useEffect , useState} from "react";
import { Col, Image } from "react-bootstrap";

import { BsSearch , BsFillTelephoneFill , BsCameraVideoFill , BsInfoCircleFill } from 'react-icons/bs';

import classes from './topBar.module.css';

const TopBar = (props) => {


    return(
        <Col className={`${classes.wrapper} d-flex justify-content-between align-items-center`}>
            
            {props.user && <div className="d-flex justify-content-between align-items-center">
                <Image roundedCircle style={{width:"40px",height:"40px",objectFit:"cover"}}  src={props.user.image ? "http://localhost:5000/" +  props.user.image : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" }></Image>
                <div className={`${classes['user-info']} d-flex flex-column justify-content-between align-items-start`}>
                    <span className={classes.username}>{props.user.userName }</span>
                    <span className={classes.status}>Online</span>
                </div>
            </div>}

            <div>
                <BsSearch className={classes.icons}></BsSearch>
                <BsFillTelephoneFill className={classes.icons}></BsFillTelephoneFill>
                <BsCameraVideoFill className={classes.icons}></BsCameraVideoFill>
                <BsInfoCircleFill className={classes.icons}></BsInfoCircleFill>
            </div>
        </Col>
    )
};

export default TopBar;