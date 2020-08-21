import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { NavLink } from 'react-router-dom'

import authContext from '../../context/auth/authContext'
import alertContext from '../../context/alert/alertContext'

import MoreInfoModal from './MoreInfo'
import ChooseAvatarModal from './ChooseAvatar'

const SignUp = (props) => {
  const { register, isAuthenticated, error, isAdmin, clearErrors } = useContext(
    authContext
  )
  const { setAlert } = useContext(alertContext)

  const initialState = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password2: '',
    school: '',
    gender: '',
    major: '',
  }
  const [user, setUser] = useState(initialState)

  const PopState = {
    moreInfoPopUp: false,
    chooseAvatarPopUp: false,
  }

  const [popState, setPopState] = useState(PopState)

  const paginationNumState = {
    paginationNum: 1,
  }
  const [pageState, setPaginationNumState] = useState(paginationNumState)

  const AvatarState = {
    avatarNum: 0,
  }
  const [avatarState, setAvatarState] = useState(AvatarState)

  const DataState = {
    data: {},
  }
  const [dataState, setDataState] = useState(DataState)

  const onChange = (e) =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })

  useEffect(() => {
    if (isAuthenticated && !isAdmin) {
      props.history.push('/home')
    }
    if (isAuthenticated && isAdmin) {
      props.history.push('/admin')
    }

    if (error != null) {
      setAlert(error, 'danger')
      clearErrors()
    }
  }, [error, isAuthenticated, props.history, isAdmin])

  const onSubmit = (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    const password2 = e.target.password2.value
    const firstname = e.target.firstname.value
    const lastname = e.target.lastname.value
    const email = e.target.email.value
    const school = e.target.school.value
    const gender = e.target.gender.value
    const major = e.target.major.value
    if (username === '' || password === '') {
      setAlert('Please fill in all fields', 'danger')
    } else if (password !== password2) {
      setAlert('Passwrod does not match.', 'danger')
    } else {
      setDataState({
        data: {
          username,
          password,
          password2,
          firstname,
          lastname,
          email,
          school,
          gender,
          major,
        },
      })
    }
    setPopState({
      chooseAvatarPopUp: true,
    })
  }

  const handleMoreInfoClosePopUp = () => {
    setPopState({
      moreInfoPopUp: false,
      chooseAvatarPopUp: true,
    })
  }
  const handleChooseAvatarClosePopUp = () => {
    setPopState({
      chooseAvatarPopUp: false,
    })
  }
  const changePagination = (num) => {
    setPaginationNumState({
      paginationNum: num,
    })
  }

  const handleClickAvatar = (index) => {
    setAvatarState({
      avatarNum: index,
    })
  }
  const handleAvatarSumbit = () => {
    if (avatarState.avatarNum == 0) {
      setDataState({
        data: (dataState.data['avatar'] = '/images/client_b.jpg'),
      })
    } else {
      setDataState({
        data: (dataState.data['avatar'] =
          '/images/avatars/' + avatarState.avatarNum + '.jpg'),
      })
    }
    register(dataState.data)
  }
  return (
    <Container className="Signup-container" fluid>
      <Row>
        <Col></Col>
        <Col>
            <Row className="SignUp-row1">
              <Image className="Signup-container-image" src="./images/favicon.png" rounded/>
              <h1 className="Signup-container-h1">Study With Me!</h1>
            </Row>
         
          <Row className="Signup-row2">
            <form className='form' onSubmit={onSubmit}>
            <h3 className='header'>Sign Up</h3>

            <input
            type='text'
            className='field-control'
            placeholder='Customize Your Username'
            name='username'
            value={user.username}
            onChange={onChange}
            // required
            />
            <br />
            <br />

            <input
            type='text'
            className='field-control'
            placeholder='Last Name'
            name='lastname'
            value={user.lastname}
            onChange={onChange}
            required
          />
          <br />
          <br />
          <input
            type='text'
            className='field-control'
            placeholder='First Name'
            name='firstname'
            value={user.firstname}
            onChange={onChange}
            required
          />
          <br />
          <br />
          <select
            className='field-control'
            name='gender'
            onChange={onChange}
          >
            <option value="N/A">--- Please Choose a Gender ---</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <br />
          <br />
          <input
            type='email'
            className='field-control'
            placeholder='Email Address'
            name='email'
            value={user.email}
            onChange={onChange}
            required
          />
          <br />
          <br />
          <input
            type='text'
            className='field-control'
            placeholder='School or Institude Name'
            name='school'
            value={user.school}
            onChange={onChange}
            required
          />
          <br />
          <br />

          <select
            className='field-control'
            name='major'
            onChange={onChange}
          >
            <option value="N/A">--- Please Choose a Major ---</option>
            <option value="CSC">Computer Science</option>
            <option value="MAT">Maths</option>
            <option value="PHY">Physics</option>
          </select>
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
          <input
            type='password'
            className='field-control'
            placeholder='Repeat password'
            name='password2'
            value={user.password2}
            onChange={onChange}
            required
          />
          <br />
          <br />
          <br />

          <button type='submit' className='button'>
            Sign Up
          </button>
          <br />
          <br />
          <NavLink to='/signin' className='signup'>
            Already have an account? Sign in Now!
          </NavLink>
        </form>

          </Row>
        </Col>
        <Col></Col>
      </Row>
      <MoreInfoModal
        moreInfoPopUp={popState.moreInfoPopUp}
        handleMoreInfoClosePopUp={handleMoreInfoClosePopUp}
      />
      <ChooseAvatarModal
        chooseAvatarPopUp={popState.chooseAvatarPopUp}
        handleChooseAvatarClosePopUp={handleChooseAvatarClosePopUp}
        paginationNum={pageState.paginationNum}
        changePagination={changePagination}
        handleClickAvatar={handleClickAvatar}
        handleAvatarSumbit={handleAvatarSumbit}
      />
    </Container>

  )
}

export default SignUp
