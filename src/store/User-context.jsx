import { createContext , useEffect } from "react";

import { EncryptStorage } from 'encrypt-storage';

const UserContext = createContext();

const encryptStorage = new EncryptStorage('secret-key');

const UserContextProvider = (props) => {

    useEffect(() => {
        const userInfo = encryptStorage.getItem('userInfo');
        console.log(userInfo);
    },[]);


    return (
        <UserContext.Provider>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext , UserContextProvider};