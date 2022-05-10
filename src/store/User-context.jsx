import { createContext , useContext, useEffect, useState } from "react";

import { SocketContext } from "./socket-context";

import { useNavigate , useLocation } from "react-router-dom";

import { EncryptStorage } from 'encrypt-storage';

import env from "react-dotenv";

const UserContext = createContext({
    user:null,
});

const encryptStorage = new EncryptStorage('secret-key');

const UserContextProvider = (props) => {

    const [user,setUser] = useState(null);
    const {setNewFriendRequests} = useContext(SocketContext)

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const userInfo = encryptStorage.getItem('userInfo');
        // userCtx.user?.image ? env.END_POINT + userCtx.user?.image :  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        setUser(userInfo);

        setNewFriendRequests(userInfo?.friendRequests);

        if(userInfo){
            navigate('/dashboard');
        };
    },[location]);

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
            getUserImage
            }}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext , UserContextProvider};