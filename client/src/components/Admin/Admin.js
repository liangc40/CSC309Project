import React, { useContext } from 'react'
import AdminTab from './AdminTab'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import authContext from '../../context/auth/authContext'

export default function Admin() {
  const { logout } = useContext(authContext)
  return (
    <div>
      <Navbar bg='dark' variant='dark' className='Admin-NavBar'>
        <Navbar.Brand className='Admin-NavBar-Brand'>
          Study With Me - Admin Console
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />

        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'></Nav>
          <Nav>
            <Nav.Link onClick={logout}>Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid>
        <Row className='Admin-Row'>
          <Col sm className='Admin-Left'></Col>
          <Col sm={10} className='Admin-Mid'>
            <AdminTab />
          </Col>
          <Col sm className='Admin-Right'></Col>
        </Row>
      </Container>
    </div>
  )
}
