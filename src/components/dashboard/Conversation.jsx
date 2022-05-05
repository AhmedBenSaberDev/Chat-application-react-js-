import { useContext, useEffect, useRef, useState } from 'react';

import {Col} from 'react-bootstrap';

import TopBar from '../conversation/TopBar';
import ChatInput from '../conversation/ChatInput';
import OwnerMessageBox from '../conversation/OwnerMessageBox';
import ReceivedMessageBox from '../conversation/ReceivedMesageBox';

import { ChatContext } from '../../store/Chat-context';
import { UserContext } from '../../store/User-context';

import axios from '../../axios';

import classes from './conversation.module.css';


const Conversation = () => {

    const chatCtx = useContext(ChatContext);
    const userCtx = useContext(UserContext);

    const config = {headers: { Authorization: `Bearer ${userCtx.user?.token}` }};

    const [user,setUser] = useState();
    const [messages,setMessages] = useState();
    const [newMessage,setNewMessage] = useState("");

    const scrollRef = useRef();

    useEffect(()=>{

        const getMessages = async (conversationId) => {
            try {
                const response = await axios.get('message/' + conversationId,config);
                setMessages(response.data);
            } catch (error) {
                console.log(error.response);
            }
        }

        if(chatCtx?.currentChat){
            const user = chatCtx.currentChat.members.find(u => userCtx.user.userId !== u._id);
            setUser(user);
            getMessages();
        }
    },[chatCtx.currentChat])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior: 'smooth'});
    },[messages])

    const handleMessageSend = async (messageContent) =>{

        const message = {
            senderId:userCtx.user.userId,
            content:messageContent,
            conversationId:chatCtx.currentChat._id
        }

        try {
            const response = await axios.post('message',message,config);
            console.log(response.data);
            setMessages([...messages,message])
        } catch (error) {
            console.log(error.response);
        }
    }

    return(
        <Col style={{margin:0}} xs={12} className={`${classes['conversation-container']} p-0 m-0`}>

            { chatCtx.currentChat ?  
            <div className={`${classes.wrapper} `}>
                <TopBar user={user}/>
                <div  className={classes.test}>
                    {messages?.map(function(message){
                        if(message.senderId === userCtx.user.userId){
                            return  <OwnerMessageBox message={message}></OwnerMessageBox>
                        }else{
                            return  <ReceivedMessageBox  message={message}></ReceivedMessageBox>                        
                        }
                       
                    })}
                    <div style={{clear:"both"}} ref={scrollRef}></div>
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