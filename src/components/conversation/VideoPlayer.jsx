import { useContext , useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";

import { IoMdCall  } from 'react-icons/io';
import { MdCallEnd } from 'react-icons/md';

import { Modal , Button , Image } from "react-bootstrap";

import { SocketContext } from "../../store/socket-context";
import { UserContext } from "../../store/User-context";

import env from "react-dotenv";

import classes from './videoPlayer.module.css'

const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #333",
    background: "#333",
    overflow:"hidden"
  };

const VideoPlayer = (props) => {



  const userCtx = useContext(UserContext);

  const { myVideo , answerCall , call , callAccepted  , leaveCall , userVideo} = useContext(SocketContext);
  
  return (
    <div className={classes.wrapper}>
      {<video muted ref={myVideo} playsInline autoPlay style={{heignt:"200px",width:"200px",zIndex:"300"}}/>}
    { call && 
    <Rnd
    style={style}
    default={{
      x: 0,
      y: 0,
      width: 320,
      height: 200,
    }}>
      
    <div className={classes["video-container"]}>
      <div className={classes.header}>
          {callAccepted && <video muted ref={userVideo} playsInline autoPlay width={"100%"}/>}
          {!callAccepted &&  <Image style={{objectFit:"cover"}} roundedCircle width={"150px"} height={"150px"} src={!call.isReceivedCall ?  userCtx.getUserImage() : env.END_POINT + call.from.image}></Image>}
      </div>
      
      <div className={classes['options']}>
          { call && !callAccepted && 
          <>
          {call.isReceivedCall ? <>
          <Button onClick={answerCall} className={`${classes['answer-btn']} rounded-circle btn-success`}>
              <IoMdCall style={{fontSize:"30px"}}></IoMdCall>
          </Button>

          <Button onClick={()=>{leaveCall(userCtx.user.userId,call.from?.userId)}} className={`${classes['cancel-btn']} rounded-circle btn-danger`}>
              <MdCallEnd style={{fontSize:"30px"}}></MdCallEnd>
          </Button></> : 

          <Button onClick={()=>{leaveCall(userCtx.user.userId,props.user._id)}} className={`${classes['cancel-btn']} rounded-circle btn-danger`}>
              <MdCallEnd style={{fontSize:"30px"}}></MdCallEnd>
          </Button>}
          
          </>
          }
          { callAccepted && call &&

          <Button onClick={()=>{leaveCall(userCtx.user.userId,call.from?.userId  )}} className={`${classes['cancel-btn']} rounded-circle btn-danger`}>
              <MdCallEnd style={{fontSize:"30px"}}></MdCallEnd>
          </Button>
          }


      </div>
    </div>
  </Rnd>
    }
    </div>
  );
};

export default VideoPlayer;
