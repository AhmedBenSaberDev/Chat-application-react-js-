import { useContext } from "react";

import { Image , Button } from "react-bootstrap";

import { UserContext } from "../../store/User-context";

import axios from '../../axios';

import { toast } from "react-toastify";

import classes from './chatRoomItem.module.css'

const ChatRoomItem = (props) => {

    const userCtx = useContext(UserContext);

    const config = {headers: { Authorization: `Bearer ${userCtx.user?.token}` }};

    const onAddClickHandler = async () => {
        try {
            await axios.post('user/add_user',{requestToId:props.user._id},config);
            props.onRequestSend(props.user._id)
            toast.success("Request sent successfully", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        } catch (error) {
            toast.error("An error occured , Please try again later", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    const onAcceptFriendClickHandler = async () => {
        try {
            const response = await axios.post('user/accept_friend_request',{senderId:props.user._id},config);
            props.onRequestSend(props.user._id)
            toast.success("Friend added successfully", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        } catch (error) {
            toast.error("An error occured , Please try again later", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    const onDeclineFriendClickHandler = async () => {
        try {
            const response = await axios.post('user/decline_friend_request',{senderId:props.user._id},config);
            props.onRequestSend(props.user._id)

        } catch (error) {
            toast.error("An error occured , Please try again later", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }


    return(
        <div className={`${classes.wrapper} px-2 py-1 d-flex justify-content-between align-items-center`}>
            <div>
                <Image roundedCircle style={{width:"30px",height:"30px",objectFit:"cover"}} src={props.user.image}></Image>
                <span style={{marginLeft:'10px'}}>{props.user.userName}</span>
            </div>
            {!props.friendRequest && !props.friendNotification && <span className={classes['msg-badge']}>5</span> }
            {props.friendRequest && <Button onClick={onAddClickHandler} className={classes['add-btn']}>Add</Button>}
            {props.friendNotification &&  <div> <Button onClick={onAcceptFriendClickHandler} className={classes['add-btn']}>Add</Button> <Button onClick={onDeclineFriendClickHandler} className={`${classes['decline-btn']} btn-danger`}>Decline</Button></div>}
        </div>
    )
};

export default ChatRoomItem;