import { motion } from "framer-motion";
import { useContext, useEffect , useState } from "react";

import { UserContext } from "../../store/User-context";

import axios from '../../axios.js';
import ChatRoomItem from "./ChatRoomItem";

const Notifications = () => {

    const userCtx = useContext(UserContext);

    const [friendRequests,setFriendRequests] = useState();

    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${userCtx.user.token}` }
        }
        const getFriendRequests = async () => {
            try {
                const response = await axios.post("api/user/user-info",{userId:userCtx.user.userId},config);
                setFriendRequests(response.data.friendRequests);
            } catch (error) {
                console.log(error.response);
            }
        }

        getFriendRequests();
    },[]);


    const handleUserSentRequest = (userId)=> {
        const newFriendRequests = friendRequests.filter(user => !user._id === userId);
        setFriendRequests(newFriendRequests);
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

        {friendRequests ? friendRequests.map(user => <div><ChatRoomItem onRequestSend={handleUserSentRequest} friendNotification={true} key={user._id} user={user}  /> <hr style={{width:"100%",margin:"5px auto",color:'var(--primary-green)'}}></hr> </div> ) : '' }
    </motion.div>
    )
}

export default Notifications;