import {Col} from 'react-bootstrap';

import TopBar from '../conversation/TopBar';
import ChatInput from '../conversation/ChatInput';
import OwnerMessageBox from '../conversation/OwnerMessageBox';
import ReceivedMessageBox from '../conversation/ReceivedMesageBox';

import classes from './conversation.module.css';

const Conversation = () => {
    return(
        <Col xs={8} className={`${classes['conversation-container']} p-0 m-0`}>
            <div className={`${classes.wrapper} `}>
                <TopBar/>
                <div className={classes.test}>
                    <OwnerMessageBox></OwnerMessageBox>
                    <OwnerMessageBox></OwnerMessageBox>
                    <ReceivedMessageBox></ReceivedMessageBox>
                </div>
            </div>
            <ChatInput/>
        </Col>
    )
};

export default Conversation;