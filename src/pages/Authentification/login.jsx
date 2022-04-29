import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Form , Button, Row, Col} from "react-bootstrap";

import { BsFacebook} from 'react-icons/bs'
import {AiFillGoogleCircle} from 'react-icons/ai'

import {motion} from 'framer-motion';

import { useFormik } from "formik";
import * as Yup  from "yup";

import { EncryptStorage } from 'encrypt-storage';

import classes from  './auth.module.css';

import NonAuthWrapper from "../../UI/NonAuthWrapper";
import Spinner from "../../UI/Spinner";

import axios from '../../axios';


const Login = () => {
    
    const [loading,setLoading] = useState(false);
    const [credentialIsInValid,setCredentialIsInValid] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        setLoading(true);
        setCredentialIsInValid(false);

        try {   
            const response = await axios.post('user/login',data);
            const encryptStorage = new EncryptStorage('secret-key');
            encryptStorage.setItem('userInfo',response.data);
            navigate('/dashboard');
        } catch (error) {
            if(error.response.status == 401 ){
                setCredentialIsInValid(true);
            }
            console.log(error);
        }

        setLoading(false);
    }

    const formik = useFormik({
        validateOnChange:false,
        validateOnBlur:true,
        initialValues: {
          email:"",
          password: "",
        },
        validationSchema:Yup.object().shape({
            email:Yup.string().email().required("Email is required"),
        }),
        onSubmit:(values) => {
            
            handleSubmit(values);
        }
    });


    return(
        <motion.div initial={{opacity:0,x:30}} animate={{opacity:1, x:0 }} exit={{opacity:0,x:-30 , transition:{duration: 0.5}}}>
            <NonAuthWrapper>
                
                {loading && <Spinner></Spinner>}

                <div className="header text-center">
                    <h1 className={classes.title}>Login</h1>
                    <span className={classes['header-span']}>Sign in to continue to Doot.</span>
                </div>

                <Form onSubmit={formik.handleSubmit} className="mt-4">

                    <Form.Group>
                        <Form.Label className={`${classes.labels} mt-3 mb-2`}>Email</Form.Label>
                        <Form.Control style={formik.errors['userName'] ? {borderColor:"#dc3545"} : {}} name="email"  onChange={formik.handleChange} value={formik.values.email} className={classes['form-input']} type="email" placeholder="Enter email" required></Form.Control>
                    </Form.Group>
                    {credentialIsInValid && <span className={`${classes['error-message']} text-danger`}>Invalid email or password</span>}

                    <Form.Group>
                        <Form.Label className={`${classes.labels} mt-3 mb-2`}>Password</Form.Label>
                        <Form.Control style={formik.errors['password'] ? {borderColor:"#dc3545"} : {}} name="password"  onChange={formik.handleChange} value={formik.values.password} className={classes['form-input']} type="password" placeholder="Enter Password" required></Form.Control>
                    </Form.Group>

                    <Button type="submit" className={`${classes['submit-btn']} p-2 mt-4 w-100`}>Log In</Button>
                </Form>

                <Row>
                    <Col  className={`${classes['signin-other-title-wrapper']} text-center mt-4`}>
                        <h5 className="mt-3">Sign in with</h5>
                        <Row>
                            <Col className="d-flex justify-content-center align-items-center mt-2">
                                <BsFacebook  className={classes['fb-icon']}></BsFacebook>
                                <AiFillGoogleCircle className={classes['google-icon']}></AiFillGoogleCircle>
                            </Col>
                        </Row>
                    </Col>
                    
                </Row>
                <Row className="text-center mt-5">
                    <Col>
                        <span className={classes['have-account']}>Don't have an account ? <Link className={classes.link} to="/register">Register</Link></span>
                        
                    </Col>
                </Row>
            </NonAuthWrapper>
        </motion.div>    
        )
}

export default Login;