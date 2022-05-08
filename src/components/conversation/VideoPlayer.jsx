import { useContext , useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";

import { IoMdCall  } from 'react-icons/io';
import { MdCallEnd } from 'react-icons/md';

import { Modal , Button , Image } from "react-bootstrap";

import { SocketContext } from "../../store/socket-context";

import classes from './videoPlayer.module.css'

const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #333",
    background: "#333",
    overflow:"hidden"
  };

const VideoPlayer = () => {

  const { myVideo,answerCall , call , callAccepted ,callEnded ,leaveCall} = useContext(SocketContext);
  
  return (
    <>
    { 
    <Rnd
      style={style}
      default={{
        x: 0,
        y: 0,
        width: 320,
        height: 200,
      }}
    >
      
      <div className={classes["video-container"]}>
        <div className={classes.header}>
            <div ref={myVideo}></div>
            {/* <video muted ref={myVideo} playsInline autoPlay width={"99%"}/> */}
            <Image style={{objectFit:"cover"}} roundedCircle width={"150px"} height={"150px"} src="https://images.unsplash.com/photo-1593726891090-b4c6bc09c819?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"></Image>
        </div>
        
        <div className={classes['options']}>
            {!callEnded && 
            <>
            <Button onClick={answerCall} className={`${classes['answer-btn']} rounded-circle btn-success`}>
                <IoMdCall style={{fontSize:"30px"}}></IoMdCall>
            </Button>

            <Button onClick={leaveCall} className={`${classes['cancel-btn']} rounded-circle btn-danger`}>
                <MdCallEnd style={{fontSize:"30px"}}></MdCallEnd>
            </Button>
            </>
            }
            { callAccepted && !callEnded &&

            <Button onClick={leaveCall} className={`${classes['cancel-btn']} rounded-circle btn-danger`}>
                <MdCallEnd style={{fontSize:"30px"}}></MdCallEnd>
            </Button>
            }
        </div>
      </div>
    </Rnd>}
    </>
  );
};

export default VideoPlayer;
