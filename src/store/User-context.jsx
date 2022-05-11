import { createContext , useContext, useEffect, useState } from "react";

import { SocketContext } from "./socket-context";

import { useNavigate , useLocation } from "react-router-dom";

import { EncryptStorage } from 'encrypt-storage';

import env from "react-dotenv";

import axios from '../axios';

const UserContext = createContext({
    user:null,
});


const encryptStorage = new EncryptStorage('secret-key');

const UserContextProvider = (props) => {

    const {newFriendRequests} = useContext(SocketContext)

    const [user,setUser] = useState(null);
    const [friendRequests,setFriendRequests] = useState([])

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const getUser = async () => {
            const userInfo = encryptStorage.getItem('userInfo');
            // userCtx.user?.image ? env.END_POINT + userCtx.user?.image :  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            setUser(userInfo);

            if(userInfo){
                const config = {headers: { Authorization: `Bearer ${userInfo.token}` }};
                try {
                    const response = await axios.get('/api/user/user_info',config);
                    setFriendRequests(response.data.friendRequests)
                } catch (error) {
                    
                }
                navigate('/dashboard');
            };
        }
        getUser()
    },[]);

    useEffect(() => {
        setFriendRequests(newFriendRequests);
    },[newFriendRequests]);


    const getUserImage = () => {
        let imgUrl;
        if(user?.image){
            imgUrl = env.END_POINT + user.image
        }else{
            imgUrl = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        }

        return imgUrl
    }

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            getUserImage,
            friendRequests,
            setFriendRequests
            }}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext , UserContextProvider};