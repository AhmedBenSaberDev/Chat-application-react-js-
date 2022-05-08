import { useContext, useEffect, useState } from "react";

import { Image , Button } from "react-bootstrap";

import {BsFillPlusSquareFill} from 'react-icons/bs';

import { UserContext } from "../../store/User-context";
import { ChatContext } from '../../store/Chat-context';

import axios from '../../axios';

import { toast } from "react-toastify";

import classes from './chatRoomItem.module.css'

const ChatRoomItem = (props) => {

    const userCtx = useContext(UserContext);
    const chatCtx = useContext(ChatContext);

    const [userChatContact,setuserChatContact] = useState();
    const [image,setImage] = useState();

    const config = {headers: { Authorization: `Bearer ${userCtx.user?.token}` }};

    useEffect(()=>{

        if(props?.conversation){
            const user = props.conversation.members.find(u => userCtx.user.userId !== u._id);
            setuserChatContact(user);
        }
    },[props.conversation])

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
            console.log(response);
        } catch (error) {
            toast.error("An error occured , Please try again later", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    }

    const AddConversationHandler = async () => {

        try {
          const response = await axios.post("/conversation",{receiverId:props.user._id},config)
          console.log(response);
          props.onCloseModalHandler();
        } catch (error) {
            toast.error("An error occured , Please try again later", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        } 
    }

    useEffect(() => {
        let imageEndPoint = "http://localhost:5000/"
        let userImage ;

        if(userChatContact?.image){
            userImage = imageEndPoint + userChatContact?.image; 
            setImage(userImage)
            return
        }
        if(props.user?.image)
        {
            userImage = imageEndPoint + props.user.image;
            console.log("userImage");
            setImage(userImage)
            return
        }else{
            userImage = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            setImage(userImage)
        }
        
    },[userChatContact])

    return(
        <div style={props.active ? {backgroundColor:"rgba(78,172,109,0.3)",color:'#FFFFFFCC'} : {}} className={`${classes.wrapper} px-2 py-2 d-flex justify-content-between align-items-basline my-1`}>
            <div>
                <Image roundedCircle style={{width:"30px",height:"30px",objectFit:"cover"}} src={image}></Image>
                <span style={{marginLeft:'10px'}}>{userChatContact ? userChatContact.userName : props.user.userName}</span>
            </div>
            {props.notifications?.length > 0 && <span className={classes['msg-badge']}> { props.notifications.length}</span> }
            {props.friendRequest && <Button onClick={onAddClickHandler} className={classes['add-btn']}>Add</Button>}
            {props.friendNotification &&  <div> <Button onClick={onAcceptFriendClickHandler} className={classes['add-btn']}>Add</Button> <Button onClick={onDeclineFriendClickHandler} className={`${classes['decline-btn']} btn-danger`}>Decline</Button></div>}
            {props.addConversation && <BsFillPlusSquareFill onClick={AddConversationHandler} className={classes['add-conversation-btn']} ></BsFillPlusSquareFill>}
        </div>
    )
};

export default ChatRoomItem;