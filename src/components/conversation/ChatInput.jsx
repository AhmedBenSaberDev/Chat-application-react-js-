import { Button, Col, Row } from 'react-bootstrap';

import { BsThreeDots , BsEmojiSmile , BsCursorFill } from 'react-icons/bs'
import {IoMdSend} from 'react-icons/io';
import classes from './chatInput.module.css';

const ChatInput = () => {
  return (
    <div className={classes.wrapper}>
        <Row className='d-flex align-items-center'>
            <Col xs={1} className='d-flex justify-content-between'>
                <BsThreeDots className={classes.icons}></BsThreeDots>
                <BsEmojiSmile className={classes.icons}></BsEmojiSmile>
            </Col>
            <Col xs={10}>
            <input placeholder='Type your message . . . ' className={classes['text-input']}></input>
            </Col>
            <Col xs={1}>
                <Button className={classes['send-btn']}>
                    <IoMdSend style={{transform:"translateY(-10%)",fontSize:"20px"}}></IoMdSend>
                </Button>
            </Col>
        </Row>
    </div>
  );
};

export default ChatInput;
