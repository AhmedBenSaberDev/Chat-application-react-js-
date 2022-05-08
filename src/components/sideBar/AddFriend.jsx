import { useContext, useState } from 'react';

import { BsSearch } from 'react-icons/bs';

import { motion } from 'framer-motion';

import axios from '../../axios.js';

import { UserContext } from '../../store/User-context';

import ChatRoomItem from './ChatRoomItem';

import { toast } from 'react-toastify';

import smallSpinner from '../../assets/small-spinner.svg';

import classes from './addFriend.module.css';

const AddFriend = () => {

  const userCtx = useContext(UserContext);

  const [searchResult,setSearchResult] = useState(null);
  const [loading,setIsLoading] = useState(false);

  const handleInput = async (e) => {
    e.preventDefault();
    setSearchResult(null)

    if(e.target.value.length == 0){
      setSearchResult(null);
    }

    if(e.target.value.length > 0 ){
      setIsLoading(true);
      try {
        const response = await axios.get('api/user/search_user/' + e.target.value,{headers: { Authorization: `Bearer ${userCtx.user.token}` }});
        setSearchResult(response.data);
  
      } catch (error) {
        toast.error("An error occured , Please try again later", {
          position: toast.POSITION.BOTTOM_RIGHT
      });
      }

      setIsLoading(false);
    }
  }

  const handleUserSentRequest = (userId)=> {
    const newSearchResult = searchResult.filter(user => !user._id === userId);
    setSearchResult(newSearchResult);
  }

  return(
    <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ type: "spring", stiffness: 100 }}
    className="p-2"
  >
    <h4 className="text-center mt-2 mb-2">Add Friend</h4>
    <div className={classes["search-wrapper"]}>

     <input
        placeholder="Search . . ."
        className={`${classes["search-field"]} mb-4 mt-4`}
        onChange={handleInput}
        spellCheck={false}
      ></input>

      <BsSearch className={classes.icon}></BsSearch>
      
    </div>

    { loading && <div className='d-flex justify-content-center'><img src={smallSpinner} width="80px"></img></div>}

    {searchResult?.length > 0 ? searchResult.map(function(user){

      if(!user.friendRequests.includes(userCtx.user.userId)){
        return <div><ChatRoomItem onRequestSend={handleUserSentRequest} key={user._id} user={user} friendRequest={true} /> <hr style={{width:"100%",margin:"5px auto",color:'var(--primary-green)'}}></hr> </div>
      }
    } ) : ''}
  </motion.div>

  
  )
};

export default AddFriend;
