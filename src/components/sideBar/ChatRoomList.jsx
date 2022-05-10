import { useContext, useEffect, useState } from 'react';

import {BsSearch , BsFillPlusSquareFill} from 'react-icons/bs';

import { Modal,Button } from 'react-bootstrap';

import ChatRoomItem from "./ChatRoomItem";
import FriendsModalList from "../../UI/FriendsModalList";

import {motion} from 'framer-motion';

import axios from "../../axios";

import { UserContext } from '../../store/User-context';
import { ChatContext } from '../../store/Chat-context';


import classes from './chatRoomtList.module.css';



const ChatRoomList = () => {

  const userCtx = useContext(UserContext);
  const chatCtx = useContext(ChatContext)

  const [modalShow, setModalShow] = useState(false);
  const [conversations,setConversations] = useState([]);

  const config = {headers: { Authorization: `Bearer ${userCtx.user?.token}` }};

  const [friendsList,setFriendList] = useState();

  useEffect(()=>{
    const fetchFriendList = async () => {
      try {
        const response = await axios.post('api/user/user-info',{userId:userCtx.user.userId},config);
        setFriendList(response.data.friends);
        
      } catch (error) {
        console.log(error.response);    
      }
    }
    fetchFriendList();
  },[]);

  useEffect(() => {
    setConversations(chatCtx.conversations);
  },[chatCtx.conversations])


  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1 , x:0 }} transition={{ type: "spring", stiffness: 100 }} className="p-2">

      <FriendsModalList friendsList={friendsList} show={modalShow} onHide={() => setModalShow(false)}></FriendsModalList>
      
      <div className='d-flex justify-content-around align-items-center'>
        <h4 className="mt-2 mb-2">Chats</h4>
        <BsFillPlusSquareFill className={classes['show-modal-btn']} onClick={() => setModalShow(true)}></BsFillPlusSquareFill>
      </div>
      
      <div className={classes['search-wrapper']}>
        <input placeholder="Search . . ." className={`${classes['search-field']} mb-4 mt-4`}></input>
        <BsSearch className={classes.icon}></BsSearch>
      </div>

      <div>
        <p className='mt-2' style={{fontSize:'14px',fontWeight:'600'}}>Convesations</p>
      </div>
      
       { conversations ? conversations.map(c =>  <div key={c._id} onClick={()=>{chatCtx.joinChat(c)}}><ChatRoomItem notifications={chatCtx.notifications.filter(n => n.conversationId == c._id)} active={chatCtx.currentChat?._id == c._id ? true : false}  conversation={c} key={c._id} user={c.members}/></div>) : "No friends yet"}
           
    </motion.div>
  );
};

export default ChatRoomList;
