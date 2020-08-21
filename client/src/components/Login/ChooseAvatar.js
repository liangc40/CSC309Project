import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Pagination from 'react-bootstrap/Pagination'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Icon, Step } from 'semantic-ui-react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const pageNumber = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
export default function ChooseAvatarModal(props){
  return(
    <Modal
      show={props.chooseAvatarPopUp}
      onHide={props.handleChooseAvatarClosePopUp}
      size="md"
      aria-labelledby="message-panel-modal"
      centered  
    >
      <Modal.Header>
        <Modal.Title>
          Choose your avatar
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="chooseAvatar-row">
            <Col><img className="chooseAvatar-pic" width={64} height={64} src={"./images/avatars/" + (1+props.paginationNum*10) + ".jpg"} onClick={()=>props.handleClickAvatar(1+props.paginationNum*10)}/></Col>
            <Col><img className="chooseAvatar-pic" width={64} height={64} src={"./images/avatars/" + (2+props.paginationNum*10) + ".jpg"} onClick={()=>props.handleClickAvatar(2+props.paginationNum*10)}/></Col>
            <Col><img className="chooseAvatar-pic" width={64} height={64} src={"./images/avatars/" + (3+props.paginationNum*10) + ".jpg"} onClick={()=>props.handleClickAvatar(3+props.paginationNum*10)}/></Col>
          </Row>
          <Row className="chooseAvatar-row">
            <Col><img className="chooseAvatar-pic" width={64} height={64} src={"./images/avatars/" + (4+props.paginationNum*10) + ".jpg"} onClick={()=>props.handleClickAvatar(4+props.paginationNum*10)}/></Col>
            <Col><img className="chooseAvatar-pic" width={64} height={64} src={"./images/avatars/" + (5+props.paginationNum*10) + ".jpg"} onClick={()=>props.handleClickAvatar(5+props.paginationNum*10)}/></Col>
            <Col><img className="chooseAvatar-pic" width={64} height={64} src={"./images/avatars/" + (6+props.paginationNum*10) + ".jpg"} onClick={()=>props.handleClickAvatar(6+props.paginationNum*10)}/></Col>
          </Row>
          <Row className="chooseAvatar-row">
            <Col><img className="chooseAvatar-pic" width={64} height={64} src={"./images/avatars/" + (7+props.paginationNum*10) + ".jpg"} onClick={()=>props.handleClickAvatar(7+props.paginationNum*10)}/></Col>
            <Col><img className="chooseAvatar-pic" width={64} height={64} src={"./images/avatars/" + (8+props.paginationNum*10) + ".jpg"} onClick={()=>props.handleClickAvatar(8+props.paginationNum*10)}/></Col>
            <Col><img className="chooseAvatar-pic" width={64} height={64} src={"./images/avatars/" + (9+props.paginationNum*10) + ".jpg"} onClick={()=>props.handleClickAvatar(9+props.paginationNum*10)}/></Col>
          </Row>
        </Container>
        <Pagination className="chooseAvatar-pagination">
          {pageNumber.map(number=>(
            <Pagination.Item key={number} onClick={()=>props.changePagination(number)}>{number}</Pagination.Item>
            )
          )}
          
        </Pagination>
        <Button className="chooseAvatar-submit" onClick={()=>props.handleAvatarSumbit()}>Submit</Button>
      </Modal.Body>
    </Modal>

  )
}

