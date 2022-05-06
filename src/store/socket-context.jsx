import { createContext ,useEffect , useState} from "react";


import { io } from "socket.io-client";

const END_POINT = 'http://localhost:5000';

const SocketContext = createContext();

const SocketContextProvider = (props) => {

    const [socket,setSocket] = useState();
    const [newMessage,setNewMessage] = useState();

    useEffect(()=>{
        const sock = io.connect(END_POINT)
        setSocket(sock);
    },[]);


    const onRecieveMessage = () => {
        socket?.on('message recieved',(data)=>{
           setNewMessage(data.message);
        });
    }

    const setup = (userId) => {
        socket?.emit("setup",userId)
    }

    const joinChat = (roomId) => {
        socket?.emit('join chat',roomId);
    }

    const sendMessage = (senderId,receiverId,message) => {
        socket?.emit('new message',{senderId,receiverId,message});
    }


    return(
        <SocketContext.Provider value={
            {
                setup,
                joinChat,
                sendMessage,
                onRecieveMessage,
                newMessage,
                socket,       
            }
        }>
            {props.children}
        </SocketContext.Provider>
    )
}

export {SocketContext,SocketContextProvider};