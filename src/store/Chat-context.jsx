import { createContext, useContext, useState , useEffect } from "react";

import { UserContext } from "./User-context";

import { EncryptStorage } from 'encrypt-storage';

import axios from '../axios';

const encryptStorage = new EncryptStorage('secret-key');

const ChatContext = createContext();


const ChatContextProvider = (props) => {

    const userCtx = useContext(UserContext);

    const [conversations,setConversations] = useState();
    const [currentChat,setCurrentChat] = useState();

    useEffect(()=>{

        const userInfo = encryptStorage.getItem('userInfo');
       const fetchConversations = async () => {
        try {
            const config = {headers: { Authorization: `Bearer ${userInfo.token}` }};
            const response = await axios.get('conversation',config);
            setConversations(response.data);
        } catch (error) {
            console.log(error.response);
        }
       }
       fetchConversations();
    },[]);

    
    return(
        <ChatContext.Provider value={{
            conversations,
            currentChat,
            setCurrentChat
        }}>
            {props.children}
        </ChatContext.Provider>
    )
};

export {ChatContextProvider , ChatContext};