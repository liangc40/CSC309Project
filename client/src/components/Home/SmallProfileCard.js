import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

export default function SmallProfileCard(props) {
  return (
    <div className='SmallProfileCard'>
      <Card style={{ width: '22rem' }} className='SmallProfileCard-Card'>
        <Card.Img
          className='SmallProfileCard-Image'
          variant='top'
          src={props.avatar ? props.avatar : '/images/client_b.png'}
        />
        <Card.Body>
          <Card.Title className='SmallProfileCard-Title'>
            {props.name}
          </Card.Title>
          <Card.Text className='SmallProfileCard-TextInterests'>
            Interests: {props.interests}
          </Card.Text>

          <Container className='SmallProfileCard-ButtonContainer'>
            <Row className='SmallProfileCard-ButtonRow'>

              <Button
                className='SmallProfileCard-ProfileButton'
                variant='primary'
                onClick={() => {
                  props.handleShowPopUp(props.name)
                }}
              >
                Profile
              </Button>

              <Button
                className='SmallProfileCard-DismissButton'
                variant='secondary'
                onClick={props.handleDismiss}
              >
                Dismiss
              </Button>

            </Row>
          </Container>
        </Card.Body>
      </Card>
    </div>
  )
}

