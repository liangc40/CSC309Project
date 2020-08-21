import React, { useContext } from 'react'
import adminContext from '../../context/admin/adminContext'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const EditPanel = () => {
  const { showEditStatus, setEdit, currEditUser, updateUser } = useContext(
    adminContext
  )
  const schools = ['UofT', 'McGill', 'University of Waterloo']
  const genders = ['Male', 'Female', 'Other']
  const majors = ['Computer Science', 'Art History', 'Math']

  const handleSubmit = e => {
    e.preventDefault()
    const form = e.currentTarget
    updateUser({
      id: form.elements.id.value,
      username: form.elements.username.value,
      firstname: form.elements.firstname.value,
      lastname: form.elements.lastname.value,
      email: form.elements.email.value,
      school: form.elements.school.value,
      major: form.elements.major.value,
      gender: form.elements.gender.value,
      avatar: form.elements.avatar.value
    })
    setEdit()
  }
  return (
    <Modal
      show={showEditStatus}
      onHide={() => {
        setEdit()
      }}
      size='lg'
      aria-labelledby='message-panel-modal'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='message-panel-modal'>Edit User Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} id='EditForm'>
          <Form.Group as={Row} controlId='id'>
            <Form.Label column sm={2}>
              ID
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                plaintext
                readOnly
                required
                defaultValue={currEditUser._id}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='username'>
            <Form.Label column sm={2}>
              Username
            </Form.Label>
            <Col sm={10}>
              <InputGroup>
                <Form.Control
                  placeholder='username'
                  defaultValue={currEditUser.username}
                />
              </InputGroup>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='firstname'>
            <Form.Label column sm={2}>
              First Name
            </Form.Label>
            <Col sm={10}>
              <InputGroup>
                <Form.Control
                  placeholder='First Name'
                  defaultValue={currEditUser.firstname}
                />
              </InputGroup>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='lastname'>
            <Form.Label column sm={2}>
              Last Name
            </Form.Label>
            <Col sm={10}>
              <InputGroup>
                <Form.Control
                  placeholder='Last Name'
                  defaultValue={currEditUser.lastname}
                />
              </InputGroup>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='email'>
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type='email'
                placeholder='Email'
                defaultValue={currEditUser.email}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='avatar'>
            <Form.Label column sm={2}>
              avatar
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                placeholder='Avatar'
                defaultValue={currEditUser.avatar}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='school'>
            <Form.Label column sm={2}>
              School
            </Form.Label>
            <Col sm={10}>
              <Form.Control as='select'>
                <option>{currEditUser.school}</option>
                {schools.map(
                  school =>
                    school !== currEditUser.school && (
                      <option key={currEditUser.id + school}>{school}</option>
                    )
                )}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='major'>
            <Form.Label column sm={2}>
              Major
            </Form.Label>
            <Col sm={10}>
              <Form.Control as='select'>
                <option>{currEditUser.major}</option>
                {majors.map(
                  major =>
                    major !== currEditUser.major && (
                      <option key={currEditUser.id + major}>{major}</option>
                    )
                )}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='gender'>
            <Form.Label column sm={2}>
              Gender
            </Form.Label>
            <Col sm={10}>
              <Form.Control as='select'>
                <option>{currEditUser.gender}</option>
                {genders.map(gender => {
                  return (
                    gender !== currEditUser.gender && (
                      <option key={currEditUser.id + gender}>{gender}</option>
                    )
                  )
                })}
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setEdit()
          }}
          variant='secondary'
          size='lg'
        >
          Close
        </Button>
        <Button variant='primary' type='submit' size='lg' form='EditForm'>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditPanel
