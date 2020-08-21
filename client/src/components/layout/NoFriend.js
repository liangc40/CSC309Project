import React from 'react'
import Row from 'react-bootstrap/Row'
import { NavLink } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

export default function NoFriend(props) {
  return (
    <Container className='nofriend-container'>
      <Row className='nofriend-row1'>
        <i className='far fa-address-book fa-9x'></i>
        <h2 className='nofriend-h2'>
          Oops! You do not have any friend. Please add one now!
        </h2>
      </Row>
      <Row className='nofriend-row2'>
        <Button
          className='nofriend-button'
          variant='warning'
          as={NavLink}
          to='/home'
        >
          Meet Your First Friend Now ~
        </Button>
        {''}
      </Row>
    </Container>
  )
}
