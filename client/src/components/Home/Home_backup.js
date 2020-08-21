import React from 'react'
import MatchPosting from './MatchPosting'
import BigProfileCard from './BigProfileCard'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import { NavLink } from 'react-router-dom'

const hardCodeSamples = {
  Yifei: { name: 'Yifei', interests: 'Girls', age: 18, school: 'McGill' },
  Tang: { name: 'Tang', interests: 'Gals', age: 12, school: 'UUUT' },
  YF: { name: 'YF', interests: 'REACT', age: 21, school: 'TofU' },
  TYF: { name: 'TYF', interests: 'Non Males', age: 22, school: 'UofU' },
  'McGill Boy': {
    name: 'McGill Boy',
    interests: 'JS',
    age: 21,
    school: 'TofT'
  },
  YFT: { name: 'YFT', interests: 'HTML', age: 32, school: 'UofT' },
  yft: { name: 'yft', interests: 'HTML', age: 32, school: 'UofT' },
  fyt: { name: 'fyt', interests: 'HTML', age: 32, school: 'UofT' },
  qwe: { name: 'qwe', interests: 'HTML', age: 32, school: 'UofT' },
  asd: { name: 'asd', interests: 'HTML', age: 32, school: 'UofT' },
  zxc: { name: 'zxxc', interests: 'HTML', age: 32, school: 'UofT' }
}

const popover = (
  <Popover id='popover-basic'>
    <Popover.Title as='h3'>Popover right</Popover.Title>
    <Popover.Content>
      And here's some <strong>amazing</strong> content. It's very engaging.
      right?
    </Popover.Content>
  </Popover>
)

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMessage: false,
      messageText: '',

      showPopUp: false,
      showUser: {},

      userMatches: hardCodeSamples
    }

    this.handleClosePopUp = this.handleClosePopUp.bind(this)
    this.handleShowPopUp = this.handleShowPopUp.bind(this)
    this.handleFriendRequest = this.handleFriendRequest.bind(this)
  }

  handleFriendRequest(name) {
    this.handleClosePopUp()
    this.props.handleNewMessage(
      `Friend request sent. Make sure to study together when you are friend with ${name}`
    )
  }

  handleClosePopUp() {
    this.setState(() => ({ showPopUp: false, showUser: {} }))
  }

  handleShowPopUp(name) {
    this.setState(() => ({
      showPopUp: true,
      showUser: this.state.userMatches[name]
    }))
  }

  render() {
    return (
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
                  <h1 className='Home-JumbotronH1'>Hello, Arthur!</h1>
                  <p className='Home-JumbotronP'>
                    Stay With Me is a social platform.
                  </p>
                  <br />
                  <OverlayTrigger
                    trigger='click'
                    placement='right'
                    overlay={popover}
                  >
                    <Button
                      variant='primary'
                      className='Home-JumbotronButton'
                      as={NavLink}
                      to='question'
                    >
                      Learn more
                    </Button>
                  </OverlayTrigger>
                </Jumbotron>
              </Col>
              <Col sm></Col>
            </Row>
          </div>

          <Row className='home-row'>
            <Col sm></Col>

            <Col sm={10} className='Home-Row-middle'>
              <MatchPosting
                userInfo={Object.keys(this.state.userMatches).map(
                  (key, _) => this.state.userMatches[key]
                )}
                handleShowPopUp={this.handleShowPopUp}
              />
            </Col>
            <Col sm></Col>
          </Row>
        </Tab.Container>

        <BigProfileCard
          showPopUp={this.state.showPopUp}
          handleClosePopUp={this.handleClosePopUp}
          showUser={this.state.showUser}
        />
      </div>
    )
  }
}
