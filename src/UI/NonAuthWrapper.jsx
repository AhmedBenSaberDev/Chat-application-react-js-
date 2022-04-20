import {Container, Row ,Col} from "react-bootstrap";

import classes from "./NonAuthWrapper.module.css";

const NonAuthWrapper = props => {
    return(
        <Container fluid className={`${classes.container} pt-5 pb-5 d-flex justify-content-center align-items-center`} >
            <Row className={`${classes.wrapper} p-5 d-flex justify-content-center`}>
                <Col className="d-flex-column justify-content-center">
                    {props.children}
                </Col>
            </Row>
        </Container>
    )
}

export default NonAuthWrapper;