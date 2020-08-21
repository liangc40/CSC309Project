import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Tab from 'react-bootstrap/Tab'
import { NavLink } from 'react-router-dom'
import MyAccount from '../Modal/MyAccount'

import authContext from '../../context/auth/authContext'
import chatContext from '../../context/chat/chatContext'

export default function Header(props) {
  const {
    user,
    isAuthenticated,
    logout,
    showAccount,
    loading,
    respondFriendReq,
  } = useContext(authContext)

  const { register_msg } = useContext(chatContext)
  const showHeader = user && !user.isAdmin && isAuthenticated

  return showHeader && !loading ? (
    <div>
      <Tab.Container>
        <Navbar
          collapseOnSelect
          expand='lg'
          bg='dark'
          variant='dark'
          className='Header-NavBar'
        >
          <Navbar.Brand>
            <img className='Header-logo' src='./images/favicon.png' />
          </Navbar.Brand>
          <Navbar.Brand className='Header-Nav-Brand'>
            Study With Me!
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link as={NavLink} to='/home'>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to='/posts'>
                Posts
              </Nav.Link>
              <Nav.Link as={NavLink} to='/message'>
                Message
              </Nav.Link>
            </Nav>
            <Nav>
              <OverlayTrigger
                trigger='click'
                key={'bottom'}
                placement={'bottom'}
                overlay={
                  <Popover id='friendRequstCenter'>
                    <Popover.Title as='h3'>{'Friend Request'}</Popover.Title>
                    {user.friendRequest.map((req) =>
                      req.status === 'pending' ? (
                        <Popover.Content key={req._id}>
                          {`${req.sender.firstname} ${req.sender.lastname} is your pending friend `}
                          <Button
                            variant='success'
                            onClick={() => {
                              respondFriendReq(req._id, 'accept')
                              register_msg(req.sender._id)
                            }}
                          >
                            Accept
                          </Button>
                          <Button
                            variant='secondary'
                            onClick={() => {
                              respondFriendReq(req._id, 'decline')
                            }}
                          >
                            Decline
                          </Button>{' '}
                        </Popover.Content>
                      ) : (
                        <Popover.Content key={req._id}>
                          {`${req.status} ${req.sender.firstname} ${req.sender.lastname}'s friend request. `}
                        </Popover.Content>
                      )
                    )}
                  </Popover>
                }
              >
                <Button className='Header-notif-button' variant='warning'>
                  <i className='far fa-bell'></i>{' '}
                  <Badge pill variant='light'>
                    {user.friendRequest
                      ? user.friendRequest.filter(
                          (req) => req.status === 'pending'
                        ).length
                      : 0}
                  </Badge>
                </Button>
              </OverlayTrigger>{' '}
            </Nav>
            <Nav>
              <DropdownButton
                title={' Settings '}
                variant={'outline-light'}
                id={`dropdown-variants-${'primary'}`}
                key={'primary'}
                className='Setting-DropdownButton'
              >
                <Dropdown.Item onClick={showAccount}>MyAccount</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </DropdownButton>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Tab.Container>
      <MyAccount />
    </div>
  ) : (
    <div></div>
  )
}
