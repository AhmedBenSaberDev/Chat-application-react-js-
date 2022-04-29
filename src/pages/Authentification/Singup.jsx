import { useEffect, useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Form , Button, Row, Col , Image} from "react-bootstrap";

import { BsFacebook} from 'react-icons/bs'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { FcPlus } from 'react-icons/fc'

import { motion } from 'framer-motion';

import { GoogleLogin } from 'react-google-login';

import { useFormik } from "formik";
import * as Yup  from "yup";

import axios from '../../axios';

import { EncryptStorage } from 'encrypt-storage';

import classes from  './auth.module.css';

import NonAuthWrapper from "../../UI/NonAuthWrapper";
import Spinner from "../../UI/Spinner";

import { toast } from 'react-toastify';


const SignUp = () => {

    const defaultImageUrl = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
    const [image,setImage] = useState();
    const [imagePreview,setImagePreview] = useState();
    const [emailExistsErrors,setEmailExistsErrors] = useState(false);
    const [loading,setLoading] = useState(false);

    const navigate = useNavigate();

    const fileInputRef = useRef();

    useEffect(() => {
        if(image){
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            }
            reader.readAsDataURL(image);
        }
    },[image])

    const imageClickHandler =  () => {
        fileInputRef.current.click();
    }

    const imageInputChangeHandler = (event) => {
        const file = event.target.files[0];

        if(file && file.type.substr(0,5) === "image"){
            setImage(file)
        }else{
            setImage(null);
        }
    }

    const handleSubmit = async (data) => {
        setLoading(true);
        setEmailExistsErrors(false);

        try {   
            await axios.post('user/signup',data);
            navigate('/login');
            toast.success("Account created successfuly !", {
                position: toast.POSITION.BOTTOM_LEFT
              });
        } catch (error) {
            if(error.response.status == 400){
                setEmailExistsErrors(true);
            };
            toast.error("An error occured, please try again later !", {
                position: toast.POSITION.BOTTOM_LEFT
            });
        }

        setLoading(false);
    }

    const formik = useFormik({
        validateOnChange:false,
        initialValues: {
          userName:"",
          email: "",
          password: "",
          passwordConfirm:""
        },
        validationSchema:Yup.object().shape({
            userName:Yup.string().min(3,"Username must contain at least 3 characters").required("Username is required"),
            email:Yup.string().email("Invalid email").required('Email is required'),
            password:Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Must Contain (Uppercase, Lowercase, Number, special case Character)").required('Password is required'),
            passwordConfirm: Yup.string().test('passwords-match', 'Passwords must match', function(value){
                return this.parent.password === value
            }),
        }),
        onSubmit:(values) => {
        const {userName,email,password,passwordConfirm} = values

        const formData = new FormData();
        formData.append('userName',userName);
        formData.append('email',email);
        formData.append('password',password);
        formData.append('passwordConfirm',passwordConfirm);
        formData.append('image',image);

        handleSubmit(formData);
            
        }
    });

    const googleSuccess = async (res) => {
        try {
            const response = await axios.post('user/google_auth',{tokenId:res.tokenId});
            const encryptStorage = new EncryptStorage('secret-key');
            encryptStorage.setItem('userInfo',response.data);
            navigate('/dashboard');
        } catch (error) {
            toast.error("An error occured, please try again later !", {
                position: toast.POSITION.BOTTOM_LEFT
            });
        }
    }

    const googleFailure = (error) => {
        toast.error("An error occured, please try again later !", {
            position: toast.POSITION.BOTTOM_LEFT
        });
    }

    return(
        <motion.div initial={{opacity:0,x:30}} animate={{opacity:1, x:0 }} exit={{opacity:0,x:-30 , transition:{duration: 0.5}}}>
            <NonAuthWrapper>
                {loading && <Spinner></Spinner>}
                <div className="header text-center">
                    <h1 className={classes.title}>Register Account</h1>
                    <span className={classes['header-span']}>Get your free Doot account now.</span>
                </div>

                <Form onSubmit={formik.handleSubmit} className="mt-4">

                    <Form.Group className={classes['image-preview-group']} >
                        <FcPlus className={classes['image-icon']}></FcPlus>
                        <Image  className={classes['image-preview']} onClick={imageClickHandler} roundedCircle src={imagePreview ? imagePreview : defaultImageUrl}></Image>
                        <Form.Control accept="images/*" name="picture" ref={fileInputRef} style={{display:"none"}} className="mt-3" type="file" onChange={imageInputChangeHandler}></Form.Control>
                    </Form.Group>
                    <span className={`${classes['error-message']} text-danger`}> {formik.errors["picture"]}</span>

                    <Form.Group>
                        <Form.Label className={`${classes.labels} mt-3 mb-2`}>Email</Form.Label>
                        <Form.Control style={formik.errors['email'] ? {borderColor:"#dc3545"} : {}} name="email" onChange={formik.handleChange} value={formik.values.email} className={classes['form-input']} type="email" placeholder="Enter Email" required></Form.Control>
                    </Form.Group>
                    <span className={`${classes['error-message']} text-danger`}> {formik.errors["email"]}</span>
                    { emailExistsErrors && <span className={`${classes['error-message']} text-danger`}> This email already exists </span>  }
                    <Form.Group>
                        <Form.Label className={`${classes.labels} mt-3 mb-2`}>Username</Form.Label>
                        <Form.Control style={formik.errors['userName'] ? {borderColor:"#dc3545"} : {}} onChange={formik.handleChange} value={formik.values.userName} name="userName" className={classes['form-input']} type="text" placeholder="Enter Username" required></Form.Control>
                    </Form.Group>
                    <span className={`${classes['error-message']} text-danger`}> {formik.errors["userName"]}</span>

                    <Form.Group>
                        <Form.Label className={`${classes.labels} mt-3 mb-2`}>Password</Form.Label>
                        <Form.Control style={formik.errors['password'] ? {borderColor:"#dc3545"} : {}} onChange={formik.handleChange} value={formik.values.password} name="password" className={classes['form-input']} type="password" placeholder="Enter Password" required></Form.Control>
                    </Form.Group>
                    <span className={`${classes['error-message']} text-danger`}> {formik.errors["password"]}</span>

                    <Form.Group>
                        <Form.Label className={`${classes.labels} mt-3 mb-2`}>Password Confirm</Form.Label>
                        <Form.Control style={formik.errors['passwordConfirm'] ? {borderColor:"#dc3545"} : {}} onChange={formik.handleChange} value={formik.values.passwordConfirm} name="passwordConfirm" className={classes['form-input']} type="password" placeholder="Enter Password Confirmation" required></Form.Control>
                    </Form.Group>
                    <span className={`${classes['error-message']} text-danger`}> {formik.errors["passwordConfirm"]}</span>

                    <Button type="submit" className={`${classes['submit-btn']} p-2 mt-4 w-100`}>Register</Button>

                </Form>

                <Row>
                    <Col  className={`${classes['signin-other-title-wrapper']} text-center mt-4`}>

                        <h5 className="mt-3">Sign up using</h5>

                        <Row>
                        
                            <Col className="d-flex justify-content-center align-items-center mt-2">
                                <BsFacebook  className={classes['fb-icon']}></BsFacebook>
                                <GoogleLogin
                                    clientId="1077820606296-0i5ilte4umvnv8pc1nev0olj7j7367u1.apps.googleusercontent.com"
                                    render={(renderprops)=>(
                                        
                                        <Button disabled={renderprops.disabled} onClick={renderprops.onClick} variant='contained'> <AiFillGoogleCircle className={classes['google-icon']}></AiFillGoogleCircle></Button> 
                                    )}
                                    onSuccess={googleSuccess}
                                    onFailure={googleFailure}
                                    cookiePolicy="single_host_origin"
                                >
                                    
                                </GoogleLogin>
                            </Col>
                        </Row>

                    </Col>
                </Row>

                <Row className="text-center mt-5">
                    <Col>
                        <span className={classes['have-account']}>Already have an account ?  <Link className={classes.link} to="/login">Login</Link></span>
                    </Col>
                </Row>
            </NonAuthWrapper>
        </motion.div>
    )
}

export default SignUp;