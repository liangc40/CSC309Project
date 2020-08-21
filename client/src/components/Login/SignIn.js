import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { NavLink } from 'react-router-dom'

import authContext from '../../context/auth/authContext'
import alertContext from '../../context/alert/alertContext'

const SignIn = (props) => {
  const {
    login,
    isAuthenticated,
    error,
    clearErrors,
    loadUser,
    user,
  } = useContext(authContext)

  const { setAlert } = useContext(alertContext)

  const initialState = {
    username: 'user',
    password: 'user',
  }
  const [username, setUsername] = useState(initialState)

  const onChange = (e) =>
    setUsername({
      ...username,
      [e.target.name]: e.target.value,
    })

  useEffect(() => {
    loadUser()
    if (user) {
      if (isAuthenticated && !user.isAdmin) {
        props.history.push('/home')
      }
      if (isAuthenticated && user.isAdmin) {
        props.history.push('/admin')
      }
    }

    if (error != null) {
      setAlert(error, 'danger')
      clearErrors()
    }
  }, [error, isAuthenticated, props.history, user])

  const onSubmit = (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    if (username === '' || password === '') {
      setAlert('Please fill in all fields', 'danger')
    } else {
      login({
        username,
        password,
      })
    }
  }

  return (
    <Container className="Signin-container" fluid>
      <Row>
        <Col ></Col>
        <Col >
          <Row className="Signin-row1">
            <Image className="Signin-container-image" src="./images/favicon.png" rounded/>
            <br/>
            <h1 className="Signin-container-h1">Study With Me!</h1>
          </Row>
          <Row className="Signin-row2">
            <form className='form' onSubmit={onSubmit}>
            <h3 className='header'>Sign In</h3>
            
            <input
              type='text'
              className='field-control'
              placeholder='Enter username'
              name='username'
              value={username.username}
              onChange={onChange}
              required
            />
            <br />
            <br />
            <input
              type='password'
              className='field-control'
              placeholder='Enter password'
              name='password'
              value={username.password}
              onChange={onChange}
              required
            />
            <br />
            <br />
            <br />

            <button type='submit' className='button'>
              Login
            </button>
            <br />
            <br />
            <NavLink to='/signup' className='signup'>
              Don't have an account? Sign up Now!
            </NavLink>
           </form>

          </Row>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  )
}

export default SignIn
