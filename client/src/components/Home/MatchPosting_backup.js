import React from 'react'
import SmallProfileCard from './SmallProfileCard'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import CardDeck from 'react-bootstrap/CardDeck'

export default class MatchPosting extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      show: props.userInfo.map((_) => (true))
    }
  }

  handleDismiss(index) {
    this.setState((oldState) => ({show: oldState.show.map(
      (show, i) => (i == index ? false : show))}))
  }

  render() {
    return (
      <Tab.Container id="match-posting">
        <Row className="matchposting-title">
          <Col >
            <h1>Recommendation</h1>
          </Col>
        </Row>
        <Row className="matchposting-cardRow">
          <CardDeck className="matchposting-carddeck">
            {
              this.props.userInfo.map((user, i) => 
              (
                this.state.show[i] && 
                <SmallProfileCard 
                  key={user.name} 
                  name={user.name} 
                  interests={user.interests}
                  handleShowPopUp={this.props.handleShowPopUp}
                  handleDismiss={() => (this.handleDismiss(i))}
                /> 
                ))
            }
            </CardDeck>
        </Row>
      </Tab.Container>
    )
  }
}