import React, { useContext, useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { NavLink } from 'react-router-dom'

import authContext from '../../context/auth/authContext'
import alertContext from '../../context/alert/alertContext'

const SignUp = props => {
  const { register } = useContext(authContext)

  const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    school: ''
  }

  const [user, setUser] = useState(initialState)

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })
  const handleSignUp = e => {
    e.preventDefault()
  }

  return (
    <div className='login'>
      <div className='left-half'>
        <Carousel className='SignIn-Carousel'>
          <Carousel.Item className='SignIn-CarouselItem'>
            <Carousel.Caption className='SignIn-Caption'>
              <h1>Study With Me!</h1>
              <p>Find your best matched study buddy now!</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='SignIn-Image'
              src='./images/login_left.jpg'
              alt='Third slide'
            />
          </Carousel.Item>
        </Carousel>
      </div>

      <div className='right-half'>
        <form className='form' onSubmit={onSubmit}>
          <h3 className='header'>Welcome!</h3>
          <br />
          <input
            type='text'
            className='field-control'
            placeholder='Enter username'
            name='username'
            value={user.username}
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
            value={user.password}
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
      </div>
    </div>
  )
}
