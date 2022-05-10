import { useContext, useEffect, useRef, useState } from 'react';

import {Col} from 'react-bootstrap';

import TopBar from '../conversation/TopBar';
import ChatInput from '../conversation/ChatInput';
import OwnerMessageBox from '../conversation/OwnerMessageBox';
import ReceivedMessageBox from '../conversation/ReceivedMesageBox';

import { ChatContext } from '../../store/Chat-context';
import { UserContext } from '../../store/User-context';
import { SocketContext } from '../../store/socket-context';


import axios from '../../axios';

import classes from './conversation.module.css';

import { v4 as uuidv4 } from 'uuid';

import VideoPlayer from '../conversation/VideoPlayer';


const Conversation = () => {

    const chatCtx = useContext(ChatContext);
    const userCtx = useContext(UserContext);
    const socketCtx = useContext(SocketContext);

    const config = {headers: { Authorization: `Bearer ${userCtx.user?.token}` }};

    const [user,setUser] = useState();
    const [messages,setMessages] = useState([]);

    const scrollRef = useRef();

    useEffect(()=>{

            const getMessages = async (conversationId) => {
            try {
                const response = await axios.get('api/message/' + conversationId,config);
                setMessages(response.data);
            } catch (error) {
                console.log(error.response);
            }
        }

        if(chatCtx?.currentChat){
            const user = chatCtx.currentChat.members.find(u => userCtx.user.userId !== u._id);
            setUser(user);
            getMessages(chatCtx.currentChat._id);
        }
    },[chatCtx.currentChat])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView();
    },[messages])

    useEffect(()=>{
        socketCtx.onRecieveMessage();

    },[socketCtx.socket]);

    useEffect(()=>{
        if(socketCtx.newMessage){
            if(socketCtx.newMessage?.conversationId == chatCtx.currentChat?._id){
                setMessages([...messages,socketCtx.newMessage]);
            }else{
                // send notif
                chatCtx.setNotifications([...chatCtx.notifications,socketCtx.newMessage]);
            } 
        }
    },[socketCtx.newMessage])


    const handleMessageSend = async (messageContent) =>{

        const message = {
            _id:uuidv4(),
            senderId:userCtx.user.userId,
            content:messageContent,
            conversationId:chatCtx.currentChat._id
        }

        socketCtx.sendMessage(userCtx.user.userId,user._id,message);
        
        try {
            const response = await axios.post('api/message',message,config);
            setMessages([...messages,message])
        } catch (error) {
            console.log(error.response);
        }
    }

    return(
        <Col style={{margin:0}} xs={12} className={`${classes['conversation-container']} p-0 m-0`}>
            <VideoPlayer user={user}></VideoPlayer>
            { chatCtx.currentChat ?  
            <div className={`${classes.wrapper} `}>
                <TopBar user={user}/>
                <div  className={classes.test}>
                    {messages?.map(function(message){
                        if(message.senderId === userCtx.user.userId){

                            return  <OwnerMessageBox  key={message._id} message={message}></OwnerMessageBox>
                        }else{
                            return  <ReceivedMessageBox  key={message._id} message={message}></ReceivedMessageBox>                        
                        }
                       
                    })}

                    <div style={{clear:"both"}} ref={scrollRef}></div>
                    {/* {isTyping && <h1>currently typing</h1> } */}
                </div>
                
                <ChatInput onMessageSend={handleMessageSend}/>
            </div> : 
            <div className={classes['no-chat']}>
                <h2 className={classes["nochat-title"]}>Select a chat to start a conversation</h2>
            </div>
            }
            
        </Col>
    )
};

export default Conversation;