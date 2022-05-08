import { createContext ,useEffect , useRef, useState} from "react";


import { io } from "socket.io-client";

import Peer from 'simple-peer';

const END_POINT = 'http://localhost:5000';

const SocketContext = createContext();


const SocketContextProvider = (props) => {

    const [socket,setSocket] = useState();
    const [newMessage,setNewMessage] = useState();

    // 
    const [stream,setStream] = useState(null);
    const [call,setCall] = useState({});
    const [callAccepted,setCallAccepted] = useState(false);
    const [callEnded,setCallEnded] = useState(false);
    const [name,setName] = useState();

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(()=>{
        const sock = io.connect(END_POINT)
        setSocket(sock);

        navigator.mediaDevices.getUserMedia({video:true , audio:true})
            .then((currentStream) => {
                setStream(currentStream);
                myVideo.current.srcObject = currentStream;
            })
        sock.on("calluser",({ from , name:callerName , signal }) => {
            setCall({isReceivedCall:true , from , name:callerName , signal})
            console.log("receiving");
        }) 

        sock.on('test',()=>{
            console.log("test recieved");
        })
    },[]);

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({initiator:false , trickle:false , stream});

        peer.on('signal',(data) => {
            socket.on('answercall',{signal:data , to:call.from })
        })

        peer.on('stream',(currentStream) => {
            userVideo.current.srcObject = currentStream;
        })

        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    const callUser = (id,myId) => {
        const peer = new Peer({initiator:true , trickle:false , stream});

        peer.on('signal',(data) => {
            socket.emit('calluser',{userToCall : id , signalData:data , from : myId , name })
        })

        peer.on('stream',(currentStream) => {
            userVideo.current.srcObject = currentStream;
        })

        socket.on('callaccepted',(signal) => {
            setCallAccepted(true);
            peer.signal(signal)
        })

        connectionRef.current = peer;
    }

    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();
    }


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
                // 
                call,
                callAccepted,
                myVideo,
                userVideo,
                stream,
                name,
                setName,
                callEnded,
                callUser,
                leaveCall,
                answerCall, 
            }
        }>
            {props.children}
        </SocketContext.Provider>
    )
}

export {SocketContext,SocketContextProvider};