import { createContext ,useCallback,useEffect , useRef, useState} from "react";


import { io } from "socket.io-client";

import Peer from 'simple-peer';

import {Howl, Howler} from 'howler';
import callSound from '../assets/ringtone/ring.wav';

// const END_POINT = 'https://gecko-chat.herokuapp.com';
const END_POINT = 'http://localhost:5000';

const SocketContext = createContext();

const CALL_SOUND = new Howl({
    src: [callSound]
  });


const SocketContextProvider = (props) => {

    const [socket,setSocket] = useState();
    const [newMessage,setNewMessage] = useState();
    const [newFriendRequests,setNewFriendRequests] = useState([]);

    // 
    const [stream,setStream] = useState(null);
    const [call,setCall] = useState(null);
    const [callAccepted,setCallAccepted] = useState(false);
    const [callEnded,setCallEnded] = useState(false);
    const [name,setName] = useState();

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    const playSound = useCallback(()=>{
        CALL_SOUND.play();
    })

    useEffect(()=>{
        const sock = io.connect(END_POINT)
        setSocket(sock);

        navigator.mediaDevices.getUserMedia({video:true , audio:true})
            .then((currentStream) => {
                setStream(currentStream);
                myVideo.current.srcObject = currentStream;
            })

        sock.on('friend request notification',(user) => {
            console.log(user);
            setNewFriendRequests((prev) => [...prev , user]);
        });

        sock.on("calluser",({ from  , signal }) => {
            setCall({isReceivedCall:true , from , signal})
            playSound();
        });

        sock.on('callended',() => {
            setCall(null);
    
            connectionRef.current?.destroy();
    
            CALL_SOUND.stop();
            console.log("ended");
        })  

    },[]);

    const answerCall = useCallback(
        () => {
            setCallAccepted(true);
            CALL_SOUND.stop();
    
            const peer = new Peer({initiator:false , trickle:false , stream});
    
            peer.on('signal',(data) => {
                socket.emit('answercall',{signal:data , to:call.from.userId })
            })
    
            peer.on('stream',(currentStream) => {
                userVideo.current.srcObject = currentStream;
            })
    
            peer.signal(call.signal);
    
            connectionRef.current = peer;
        }
    )
        

    const callUser = (id,me) => {

        playSound();

        const peer = new Peer({initiator:true , trickle:false , stream});

        peer.on('signal',(data) => {
            socket.emit('calluser',{userToCall : id , signalData:data , from : me})
        })

        peer.on('stream',(currentStream) => {
            userVideo.current.srcObject = currentStream;
        })

        socket.on('callaccepted',(signal) => {
            setCallAccepted(true);
            peer.signal(signal)
        })

        setCall({isReceivedCall:false,from:me})

        connectionRef.current = peer;
    }

    const leaveCall = useCallback(

        (callerId,recieverId=call.from?.me.userId) => {
            socket?.emit('leavecall',{callerId,recieverId});
        
            setCall(null);
            setCallAccepted(false);
    
            connectionRef.current?.destroy();
    
            CALL_SOUND.stop();
            
    },[socket,call] 
      );


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

    const sendAddFriendNotification = (reciever,sender) => {
        console.log(sender);
        
        socket?.emit('friend request notification',{reciever,sender});
    } 

    return(
        <SocketContext.Provider value={
            {
                setup,
                joinChat,
                sendMessage,
                onRecieveMessage,
                newMessage,
                sendAddFriendNotification,
                newFriendRequests,
                setNewFriendRequests,
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