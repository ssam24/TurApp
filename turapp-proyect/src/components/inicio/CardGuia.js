import React, { Component } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default class CardGuia extends Component {
  render () {
    return (
      <Col xs={12} sm={12} md={12} lg={12} className='my-2'>
        <Card className='cardGuia-inicio'>
          <Card.Img className='image border-img-inicio' variant="top" src={this.props.photo} />
          <Card.Body className='pt-2 px-2 pb-0'>
            <Row className="mx-1">
              <Col className="col-10 m-0 p-0">
                <Card.Title className="mb-0">{this.props.name}</Card.Title>
                <Card.Text>{this.props.place}</Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    )
  }
}

CardGuia.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired

}
