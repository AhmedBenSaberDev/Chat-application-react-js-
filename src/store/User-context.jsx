import { createContext , useEffect, useState } from "react";

import { useNavigate , useLocation } from "react-router-dom";

import { EncryptStorage } from 'encrypt-storage';

const UserContext = createContext({
    user:null,
});

const encryptStorage = new EncryptStorage('secret-key');

const UserContextProvider = (props) => {

    const [user,setUser] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const userInfo = encryptStorage.getItem('userInfo');
        setUser(userInfo);
        if(userInfo){
            navigate('/dashboard');
        };
    },[location]);


    return (
        <UserContext.Provider value={{
            user,
            }}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext , UserContextProvider};