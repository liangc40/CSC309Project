import React, { useContext, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/Image'

import alertContext from '../../context/alert/alertContext'
import authContext from '../../context/auth/authContext'

export default function MatchPopUp(props) {
  const { user, sendFriendReq, error, clearErrors } = useContext(authContext)
  const { setAlert } = useContext(alertContext)
  const handleFriendRequest = (showUser) => {
    sendFriendReq(showUser._id)
    if (error !== null) {
      setAlert(
        `Friend request sent. Make sure to study together when you are friend with ${showUser.firstname}`,
        'success'
      )
    }
    props.handleClosePopUp()
  }
  useEffect(() => {
    if (error != null) {
      setAlert(error, 'danger')
      clearErrors()
    }
  })
  return (
    <Modal
      show={!!props.showPopUp}
      onHide={props.handleClosePopUp}
      size='md'
      aria-labelledby='User Info Pop-up'
      centered
    >
      <Modal.Header closeButton className='BigProfileCard-Header'>
        <Modal.Title className='BigProfileCard-Title'>
          {props.showUser.username}'s profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='BigProfileCard-Body'>
        <Tab.Container>
          <Row className='BigProfilecard-picRow'>
            <Image
              className='BigProfilecard-image'
              src={props.showUser.avatar}
              rounded
            />
          </Row>
          <Row className='BigProfilecard-listRow'>
            <Col>
              <ListGroup className='BigProfilecard-listgroup' variant='flush'>
                <ListGroup.Item>
                  <strong>Gender:</strong> {props.showUser.gender}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>School:</strong> {props.showUser.school}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Interests:</strong> {props.showUser.major}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Tab.Container>
      </Modal.Body>
      <Modal.Footer className='BigProfileCard-Footer'>
        {user.friends.includes(props.showUser._id) ? (
          <div></div>
        ) : (
          <Button
            className='BigProfileCard-RequestButton'
            onClick={() => {
              handleFriendRequest(props.showUser)
            }}
            variant='info'
            size='lg'
            block
          >
            Send Friend Request
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}