import {BsSearch} from 'react-icons/bs';

import ChatRoomItem from "./ChatRoomItem";

import {motion} from 'framer-motion';

import classes from './chatRoomtList.module.css';

const ChatRoomList = () => {

    const DUMYLIST= [{
        name:"ahmed",
        image:""
    },
    {
        name:"samir",
        image:""
    }];

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1 , x:0 }} transition={{ type: "spring", stiffness: 100 }}
      className="p-2">
      <h4 className="text-center mt-2 mb-2">Chats</h4>
      <div className={classes['search-wrapper']}>
        <input placeholder="Search . . ." className={`${classes['search-field']} mb-4 mt-4`}></input>
        <BsSearch className={classes.icon}></BsSearch>
      </div>

       { DUMYLIST.map(user =>  <ChatRoomItem key={user.name} user={user}/>)}
           
    </motion.div>
  );
};

export default ChatRoomList;
