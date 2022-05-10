import { motion } from "framer-motion";
import { useContext, useEffect , useState } from "react";

import { UserContext } from "../../store/User-context";
import { SocketContext } from "../../store/socket-context";

import axios from '../../axios.js';
import ChatRoomItem from "./ChatRoomItem";

const Notifications = () => {

    const userCtx = useContext(UserContext);
    const {newFriendRequests,setNewFriendRequests} = useContext(SocketContext);

    // const [friendRequests,setFriendRequests] = useState([]);

    // useEffect(() => {
    //     setFriendRequests((prev) => [...prev,newFriendRequests]);
    // },[newFriendRequests])

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${userCtx.user.token}` }
        }
        const getFriendRequests = async () => {
            try {
                const response = await axios.post("api/user/user-info",{userId:userCtx.user.userId},config);
                setNewFriendRequests(response.data.friendRequests);
            } catch (error) {
                console.log(error.response);
            }
        }

        getFriendRequests();
    },[]);


    const handleUserSentRequest = (userId)=> {
        const newRequests = newFriendRequests.filter(user => !user._id === userId);
        setNewFriendRequests(newRequests);
      }

    return(
        <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ type: "spring", stiffness: 100 }}
    className="p-2"
    >
    <h4 className="text-center mt-2 mb-2">Friend Requests</h4>
    <hr style={{width:"70%",margin:"20px auto",color:'var(--primary-green)'}}></hr>

        {newFriendRequests ? newFriendRequests.map(user => <div key={user._id}><ChatRoomItem onRequestSend={handleUserSentRequest} friendNotification={true} key={user._id} user={user}  /> <hr style={{width:"100%",margin:"5px auto",color:'var(--primary-green)'}}></hr> </div> ) : '' }
    </motion.div>
    )
}

export default Notifications;