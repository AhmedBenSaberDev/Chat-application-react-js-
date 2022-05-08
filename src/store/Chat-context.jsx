import { createContext, useContext, useState, useEffect } from "react";

import { UserContext } from "./User-context";
import { SocketContext } from "./socket-context";

import { EncryptStorage } from "encrypt-storage";

import axios from "../axios";

const encryptStorage = new EncryptStorage("secret-key");

const ChatContext = createContext();

const ChatContextProvider = (props) => {
  const userCtx = useContext(UserContext);
  const socketCtx = useContext(SocketContext);

  const [conversations, setConversations] = useState();
  const [currentChat, setCurrentChat] = useState(null);
  const [notifications,setNotifications] = useState([]);

  useEffect(() => {
    const userInfo = encryptStorage.getItem("userInfo");
    const fetchConversations = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const response = await axios.get("api/conversation", config);
        setConversations(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchConversations();
  }, [userCtx.user]);

  const joinChat = (c) => {
    setCurrentChat(c);
    if (c !== currentChat) {
      socketCtx.joinChat(c._id);
      const conversationNotificaitons = notifications.filter(n => n.conversationId != c._id);
      setNotifications(conversationNotificaitons);
    }
    
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        currentChat,
        setCurrentChat,
        joinChat,
        setNotifications,
        notifications
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export { ChatContextProvider, ChatContext };
