import { Col, Image } from "react-bootstrap";

import { BsSearch , BsFillTelephoneFill , BsCameraVideo, BsCameraVideoFill , BsInfoCircleFill } from 'react-icons/bs';

import classes from './topBar.module.css';

const TopBar = () => {
    return(
        <Col className={`${classes.wrapper} d-flex justify-content-between align-items-center`}>
            
            <div className="d-flex justify-content-between align-items-center">
                <Image roundedCircle style={{width:"40px",height:"40px",objectFit:"cover"}}  src="https://images.pexels.com/photos/2703907/pexels-photo-2703907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></Image>
                <div className={`${classes['user-info']} d-flex flex-column justify-content-between align-items-start`}>
                    <span className={classes.username}>Ahmed Ben Saber</span>
                    <span className={classes.status}>Online</span>
                </div>
            </div>

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