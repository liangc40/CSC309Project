import React, { useContext, useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Image } from 'semantic-ui-react'

import ChatContent from './ChatContent'
import Spinner from '../layout/Spinner'

import authContext from '../../context/auth/authContext'
import chatContext from '../../context/chat/chatContext'

const HomeMessage = (props) => {
  const { chats, load_chats, loading } = useContext(chatContext)
  const { user } = useContext(authContext)
  useEffect(() => {
    load_chats()
  }, [])
  if (loading) return <Spinner />

  return (
    <Tab.Container
      id='list-group-tabs-example'
      defaultActiveKey={'#' + chats[0]._id}
    >
      <Row className='ChatPerson-Row'>
        <Col sm={4}>
          <ListGroup className='ChatPerson-ListGroup'>
            {true && console.log(chats)}
            {chats.map((chat) => {
              const target =
                chat.user1._id === user._id ? chat.user2 : chat.user1
              return (
                <ListGroup.Item action key={chat._id} eventKey={'#' + chat._id}>
                  <Image
                    avatar
                    src={target.avatar}
                    className='ChatPerson-Avatar'
                  />
                  {target.firstname}
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        </Col>
        <Col sm={8}>
          <Tab.Content>
            {chats.map((chat) => {
              const target =
                chat.user1._id === user._id ? chat.user2 : chat.user1
              return (
                <Tab.Pane key={chat._id} eventKey={'#' + chat._id}>
                  <ChatContent
                    key={chat._id + 'cc'}
                    username={user.username}
                    chat={chat}
                    userID={user._id}
                  />
                </Tab.Pane>
              )
            })}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  )
}

export default HomeMessage
