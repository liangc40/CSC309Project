import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav' 
import AdminUsers from './AdminUsers'
import AdminData from './AdminData'

export default function AdminTab(props)  {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
      <Col sm={3}>
        <Nav variant="pills" className="flex-column">
          <Nav.Item>
            <Nav.Link eventKey="first">Users</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="second">Data</Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
      <Col sm={9}>
        <Tab.Content>
          <Tab.Pane eventKey="first">
            <AdminUsers />
          </Tab.Pane>
          <Tab.Pane eventKey="second">
            <AdminData />
          </Tab.Pane>
        </Tab.Content>
      </Col>
      </Row>
    </Tab.Container>
  )
};