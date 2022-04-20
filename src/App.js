import React from "react";
import { Route,Routes,useLocation } from "react-router-dom";

import Login from "./pages/Authentification/login";
import SignIn from './pages/Authentification/SingIn';

import { AnimatePresence } from "framer-motion";

import './Variables/variables.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

function App() {

  const location = useLocation();
  
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login/>} ></Route>
        <Route path="/register" element={<SignIn/>}></Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App;
