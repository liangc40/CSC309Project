import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


function AddPost(user, text){
  let postDate = new Date();
  let newPost = {
    name: user.name,
    date: postDate.toLocaleDateString(),
    text: text,
    picture: [],
    thumbs: 0,
    commentNum:0,
    comment: []
  }
  user.posts.push(newPost)
}
export default function NewPostHandlerModal(props){
    return (
        <Modal
        show={props.newPostDisplay}
        onHide={props.handleNewPostClose}
        size="md"
        aria-labelledby="message-panel-modal"
        centered      
        >
          <Modal.Header>
            <Modal.Title>
              Add Your New Post
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="NewPostHandlerModal-Body">
            <Form>
              <Form.Control size="lg" type="text" placeholder="Add new post..." id="newPost"/>
              <br />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>(props.handleAddNewPost(props.user, document.getElementById("newPost").value))}>
              Submit new Post
            </Button>
            <Button onClick={props.handleNewPostClose} variant="Danger" size="ls">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    )
}