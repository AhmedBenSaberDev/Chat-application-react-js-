import { useRef } from 'react';
import {Modal , Button } from 'react-bootstrap';

import ChatRoomItem from '../components/sideBar/ChatRoomItem';

import './FriendsModalList.css';


function FriendsModalList(props) {

  const closeBtnRef = useRef();

  const onCloseModalHandler = () => {
    closeBtnRef.current.click();
  }

    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Contacts
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            { props.friendsList ? props.friendsList.map(user =>  <div key={user._id} ><ChatRoomItem onCloseModalHandler={onCloseModalHandler} addConversation={true}  key={user._id} user={user}/> <hr style={{width:"100%",margin:"5px auto",color:'var(--primary-green)'}}></hr> </div>) : "No Contacts yet"}
        </Modal.Body>
        <Modal.Footer>
          <Button ref={closeBtnRef} className="modal-close-btn" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default FriendsModalList;