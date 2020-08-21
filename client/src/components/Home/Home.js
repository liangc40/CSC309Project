import React, { useContext, useEffect, useState } from 'react'
import MatchPosting from './MatchPosting'
import BigProfileCard from './BigProfileCard'
import SearchBar from './SearchBar'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import { NavLink } from 'react-router-dom'

import HomeContext from '../../context/home/HomeContext'
import authContext from '../../context/auth/authContext'

const popover = (
  <Popover id='popover-basic'>
    <Popover.Title as='h3'>Popover right</Popover.Title>
    <Popover.Content>
      And here's some <strong>amazing</strong> content. It's very engaging.
      right?
    </Popover.Content>
  </Popover>
)

const Home = () => {
  const {
    handleShowPopUp,
    handleClosePopUp,
    setUserMatches,
    showPopUp,
    showUser,
    userMatches,
    value,
    handleChange,
    handleSubmit,
    handleSearchSubmit
  } = useContext(HomeContext)
  const { loading, user } = useContext(authContext)

  useEffect(() => {
    setUserMatches(user)
  }, [])
  if (loading) {
    return <div></div>
  }

  return (
    <HomeContext.Provider>
      <div>
        <Tab.Container id='home-container'>
          {/* Add Jumbotron */}
          <div className='Home-Jumbotron-div'>
            <Row className='Home-JumbotronRow'>
              <Col sm></Col>
              <Col sm={10}>
                <Jumbotron className='Home-Jumbotron'>
                  <img
                    src='./images/study.png'
                    className='Home-JumbotronImage'
                  />
                  <h1 className='Home-JumbotronH1'>Hello, {user.firstname}!</h1>
                  <p className='Home-JumbotronP'>
                    Stay With Me is a social platform.
                  </p>
                  <br />
                </Jumbotron>
              </Col>
              <Col sm></Col>
            </Row>
          </div>

          <Row className='home-row'>
            <Col sm></Col>

            

            <Col sm={10} className='Home-Row-middle'>
              <SearchBar
              searchBar={value}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleSearchSubmit={handleSearchSubmit}
              />
              {userMatches.length > 0 && (
                <MatchPosting
                  userInfo={userMatches}
                  handleShowPopUp={handleShowPopUp}
                />
              )}
            </Col>
            <Col sm></Col>
          </Row>
        </Tab.Container>

        <BigProfileCard
          showPopUp={showPopUp}
          handleClosePopUp={handleClosePopUp}
          showUser={showUser}
        />
      </div>
    </HomeContext.Provider>
  )
}

export default Home
