import React, { useContext } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ChatPerson from './ChatPerson'
import Container from 'react-bootstrap/Container'
import authContext from '../../context/auth/authContext'
import NoFriend from '../layout/NoFriend'

export default function homeMessage(props) {
  const { user } = useContext(authContext)
  return user.friends.length === 0 ? (
    <NoFriend />
  ) : (
    <div className='homeMessage'>
      <Container className='MessagePage-Container'>
        <Row>
          <Col sm={0}></Col>
          <Col sm={10}>
            <ChatPerson />
          </Col>
          <Col sm={0}></Col>
        </Row>
      </Container>
    </div>
  )
}
