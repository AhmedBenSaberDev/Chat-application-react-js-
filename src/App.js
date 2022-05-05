import React from "react";
import { Route,Routes,useLocation , Navigate } from "react-router-dom";

import Login from "./pages/Authentification/login";
import SignUp from './pages/Authentification/Singup';
import Dashboard from "./pages/dashboard/dahsboard";

import { UserContextProvider } from './store/User-context';
import { ChatContextProvider } from './store/Chat-context';

import { AnimatePresence } from "framer-motion";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Variables/variables.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

function App() {

  const location = useLocation();
  
  return (
    
    <UserContextProvider>
      <ChatContextProvider>
      <ToastContainer></ToastContainer>
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            <Route path="/login" element={<Login/>} ></Route>
            <Route path="/register" element={<SignUp/>}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path="/*" element={<Navigate to="/login" />} />
          </Routes>
        </AnimatePresence>
      </ChatContextProvider>
    </UserContextProvider>
  )
}

export default App;
