import React, { Component } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import PropTypes from 'prop-types'
import ModalGuia from './ModalGuia'
export default class CardGuia extends Component {
  render () {
    return (
      <Col xs={12} sm={6} md={4} lg={4} className='my-2'>
        <Card className='cardGuia'>
          <Card.Img className='image' variant="top" src={this.props.src} />
          <Card.Body className='pt-2 px-0 pb-0'>
            <Row className="mx-1">
              <Col className="col-10 m-0 p-0">
                <Card.Title className="mb-0 tittleNameG">{this.props.name}</Card.Title>
                <Card.Text>{this.props.place}</Card.Text>
              </Col>
              <Col className="col-2 m-0 p-0 d-flex justify-content-center">
                <ModalGuia name={this.props.name} place={this.props.place} src={this.props.src} description={this.props.description} email={this.props.email}/>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    )
  }
}

CardGuia.propTypes = {
  name: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}
