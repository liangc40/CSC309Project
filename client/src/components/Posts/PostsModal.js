import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Media from 'react-bootstrap/Media'

export default function CommentDisplayModal(props) {
    let post = props.showPost;
    return (
      <Modal
        show={props.showPopUp}
        onHide={props.handleClosePopUp}
        size="md"
        aria-labelledby="message-panel-modal"
        centered
      >
        <Modal.Header>
          <Modal.Title id="message-panel-modal">
            Your Comments to {props.user.name}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
        {props.showPopUp &&
        <Media>
        </Media>
        }
        <Form>
          <Form.Control size="lg" type="text" placeholder="Add new comment..." id="addComment"/>
          <br />
        </Form>
        
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={()=>(props.addComment(props.user, post, document.getElementById("addComment").value, props.user))}>
            Submit
          </Button>
          <Button onClick={props.handleClosePopUp} variant="Secondary" size="ls">
            Close
          </Button>
        </Modal.Footer>
          
        </Modal>
        
    )
}