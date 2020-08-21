import React from 'react'
import SearchBar from './SearchBar'
import TutorInfoGenerator from './TutorInfoGenerator'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Jumbotron from 'react-bootstrap/Jumbotron'

var hardCodeSamples = {
  Yifei: {
    name: 'Yifei',
    interests: 'Girls, chocolate',
    age: 28,
    school: 'McGill, MIT',
    major: 'CS, Econ',
    courses: 'CSC309, CSC373',
    total_hours: '120',
    rating: '🌟🌟🌟🌟🌟',
    bio: 'genius in CS from McGill'
  },
  Tang: {
    name: 'Tang',
    interests: 'Gals',
    age: 18,
    school: 'UofT',
    major: 'Philosophy',
    courses: 'PHY247, PHY245',
    total_hours: '50',
    rating: '🌟🌟🌟🌟',
    bio: 'A True Philosopher. '
  },
  Alice: {
    name: 'Alice',
    interests: 'girls',
    age: 19,
    school: 'UofT',
    major: 'Biochemisty',
    courses: 'BCH210',
    total_hours: '100',
    rating: '🌟🌟',
    bio: 'Patient, Patient, Patient'
  },
  Alex: {
    name: 'Alex',
    interests: 'girls',
    age: 22,
    school: 'CMU',
    major: 'Electrical Engineering',
    courses: 'ECE100',
    total_hours: '120',
    rating: '🌟🌟🌟🌟🌟',
    bio: ' Probabily the best tutor in ECE'
  },
  Pedro: {
    name: 'Pedro',
    interests: 'girls',
    age: 21,
    school: 'UofT',
    major: 'Spanish and Portuguese Studies',
    courses: 'SPA100',
    total_hours: '110',
    rating: '🌟',
    bio: 'Hablante nativo de Argentina'
  },
  James: {
    name: 'James',
    interests: 'girls',
    age: 22,
    school: 'UofT',
    major: 'Finance',
    courses: 'ECO206, ECO208',
    total_hours: '100',
    rating: '🌟🌟🌟🌟🌟',
    bio: 'MMF at UofT'
  },
  Sabrina: {
    name: 'Sabrina',
    interests: 'girls',
    age: 20,
    school: 'UofT',
    major: 'CS',
    courses: 'CSC207, CSC209, CSC311',
    toal_hours: '20',
    rating: '🌟🌟🌟',
    bio: 'A CS specialist with AI and CV focuses'
  }
}

export default class Tutor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMessage: false,
      showPopUp: false,
      showUser: {},
      tutorMatches: hardCodeSamples,
      value: ''
    }
    this.deleteElement = this.deleteElement.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  deleteElement(key) {
    var temp = this.state.tutorMatches
    delete temp[key]
    this.setState({ tutorMatches: temp })
  }

  handleChange(event) {
    // this.state.searchValue = event.target.searchValue
    // this.setState(this.state)
    this.setState({ value: event.target.value.toUpperCase() })
  }

  nameSelection(value, name) {
    if (value.includes(name) || name.includes(value)) {
      return true
    }
  }

  containElement(value, elements) {
    var tokens = elements.split(/\s+/)
    for (var i = 0; i < tokens.length; i++) {
      var ele = tokens[i]
      if (
        value.includes(ele.toUpperCase()) ||
        ele.toUpperCase().includes(value)
      ) {
        return true
      }
    }
    return false
  }

  selectTutor(value) {
    // console.log(this.state.tutorMatches)
    for (var key in this.state.tutorMatches) {
      var flag = false
      if (this.state.tutorMatches.hasOwnProperty(key)) {
        // console.log("Key is " + key + ", value is " + this.state.tutorMatches[key]);
        for (var innerKey in this.state.tutorMatches[key]) {
          if (
            ['interests', 'school', 'major', 'courses', 'name'].includes(
              innerKey
            )
          ) {
            if (
              this.containElement(value, this.state.tutorMatches[key][innerKey])
            ) {
              flag = true
            }
          }
        }
      }
      // console.log(flag)
      if (flag == false) {
        this.deleteElement(key)
      }
    }
  }

  handleSubmit(event) {
    // selectTutor(this.state.value)
    event.preventDefault()
    this.selectTutor(this.state.value)
  }

  render() {
    // console.log("RENDER", this.state.tutorMatches)
    return (
      <div>
        <Tab.Container id='home-container'>
          <Row></Row>
          {/* Add Jumbotron */}
          <div className='Tutor-Jumbotron-div'>
            <Row className='Tutor-JumbotronRow'>
              <Col sm></Col>
              <Col sm={10}>
                <Jumbotron className='Tutor-Jumbotron'>
                  <img src='./images/read_book.jpeg' className='Tutor-Image' />
                  <h1 className='Tutor-JumbotronH1'>
                    Find your tutor, Arthur!
                  </h1>
                  <p className='intro'>
                    You can always find your perfect tutor here!
                  </p>
                  <hr className='my-4'></hr>
                </Jumbotron>
              </Col>
              <Col sm></Col>
            </Row>
          </div>
          <SearchBar
            searchBar={this.state.value}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
          <TutorInfoGenerator
            tutorInfo={Object.keys(this.state.tutorMatches).map(
              (key, _) => this.state.tutorMatches[key]
            )}
            deleteElement={this.deleteElement}
          />
        </Tab.Container>
      </div>
    )
  }
}
