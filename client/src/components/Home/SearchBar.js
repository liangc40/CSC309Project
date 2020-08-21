import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function SearchBar(props) {
  return (
    <Container>
      <Row>
        <Col sm></Col>
        <Col sm={10}>
          <form  onSubmit={props.handleSubmit}>
            <input id="searchBar" className="search__input" type="value" placeholder="Search Any Interests or Name Here, and Hit Enter ~" value={props.value} onChange={props.handleChange} onSubmit={props.handleSubmit}/>
          </form>
        </Col>
        <Col sm></Col>
      </Row>
    </Container>
  )
}

