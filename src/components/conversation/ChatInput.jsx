import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

import { BsThreeDots , BsEmojiSmile , BsCursorFill } from 'react-icons/bs'
import {IoMdSend} from 'react-icons/io';

import Picker , { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';

import classes from './chatInput.module.css';

const ChatInput = (props) => {

    const [message,setMessage] = useState();
    const [pikerIsVisible,setPikerIsVisible] = useState(null);

    const onShowPikerHandler = () => {
        setPikerIsVisible(!pikerIsVisible);
    }

    const onEmojiClick = (event, emojiObject) => {
        setMessage((prev) => prev + emojiObject.emoji)
      };

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimedMessage = message.trim();
        if(trimedMessage.length > 0){
            props.onMessageSend(trimedMessage);
            setMessage("");
        }else{
            return
        }
    } 

  return (
    <div className={classes.wrapper}>
        <div className={classes['piker-container']}>
            { pikerIsVisible  && <Picker searchPlaceholder onEmojiClick={onEmojiClick} />}
        </div>
        <Row className='d-flex align-items-center'>
        
            <Col xs={1} className='d-flex justify-content-between'>
                <BsThreeDots className={classes.icons}></BsThreeDots>
                <BsEmojiSmile onClick={onShowPikerHandler} className={classes.icons}></BsEmojiSmile>
            </Col>
            <Col xs={10}>
                <Form onSubmit={handleSubmit}>
                    <input value={message} onChange={handleChange} placeholder='Type your message . . . ' className={classes['text-input']}></input>
                </Form>
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
