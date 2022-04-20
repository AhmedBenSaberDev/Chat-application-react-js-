import { Link } from "react-router-dom";

import { Form , Button, Row, Col} from "react-bootstrap";

import { BsFacebook} from 'react-icons/bs'
import {AiFillGoogleCircle} from 'react-icons/ai'

import {motion} from 'framer-motion';

import classes from  './auth.module.css';

import NonAuthWrapper from "../../UI/NonAuthWrapper";

const SignIn = () => {
    return(
        <motion.div initial={{opacity:0,x:30}} animate={{opacity:1, x:0 }} exit={{opacity:0,x:-30 , transition:{duration: 0.5}}}>
            <NonAuthWrapper >

                <div className="header text-center">
                    <h1 className={classes.title}>Register Account</h1>
                    <span className={classes['header-span']}>Get your free Doot account now.</span>
                </div>

                <Form className="mt-4">

                    <Form.Group>
                        <Form.Label className={`${classes.labels} mt-3 mb-2`}>Email</Form.Label>
                        <Form.Control className={classes['form-input']} type="email" placeholder="Enter Email" required></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className={`${classes.labels} mt-3 mb-2`}>Username</Form.Label>
                        <Form.Control className={classes['form-input']} type="text" placeholder="Enter Username" required></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className={`${classes.labels} mt-3 mb-2`}>Password</Form.Label>
                        <Form.Control className={classes['form-input']} type="password" placeholder="Enter Password" required></Form.Control>
                    </Form.Group>

                    <Button type="submit" className={`${classes['submit-btn']} p-2 mt-4 w-100`}>Register</Button>

                </Form>

                <Row>
                    <Col  className={`${classes['signin-other-title-wrapper']} text-center mt-4`}>

                        <h5 className="mt-3">Sign up using</h5>

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
                        <span className={classes['have-account']}>Already have an account ?  <Link className={classes.link} to="/login">Login</Link></span>
                        
                    </Col>
                </Row>
            </NonAuthWrapper>
        </motion.div>
    )
}

export default SignIn;