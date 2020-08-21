import React from 'react'
import SmallProfileCard from './SmallProfileCard'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import CardDeck from 'react-bootstrap/CardDeck'

export default class MatchPosting extends React.Component {
  constructor(props) {
    let showState = {}
    props.userInfo.map((user, i) => {
      showState[i] = true
    })
    super(props)
    this.state = {
      show: showState
    }
  }

  handleDismiss(index) {
    let newShow = this.state.show
    newShow[index] = false
    this.setState(() => ({
      show: newShow
    }))
  }

  render() {
    return (
      <Tab.Container id='match-posting'>
        <Row className='matchposting-title'>
          <Col>
            <h1>Recommendation</h1>
          </Col>
        </Row>
        <Row className='matchposting-cardRow'>
          <CardDeck className='matchposting-carddeck'>
            {this.props.userInfo.map(
              (user, i) =>
                this.state.show[i] && (
                  <SmallProfileCard
                    key={user.username}
                    name={user.username}
                    avatar={user.avatar}
                    interests={user.major ? user.major : ''}
                    handleShowPopUp={this.props.handleShowPopUp}
                    handleDismiss={() => this.handleDismiss(i)}
                  />
                )
            )}
          </CardDeck>
        </Row>
      </Tab.Container>
    )
  }
}
