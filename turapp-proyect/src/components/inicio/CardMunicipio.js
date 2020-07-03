import React, { Component } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default class CardMunicipios extends Component {
  render () {
    return (
      <Col xs={12} sm={12} md={12} lg={12} className='my-2'>
        <Card className='cardGuia-inicio-muni'>
          <Card.Img className='image-card-muni-inicio ' variant="top" src={this.props.images} />
          <Card.Body className='pt-2 px-2 pb-0'>
            <Row className="mx-1">
              <Col className="col-10 m-0 p-0">
                <Card.Title className="mb-0">{this.props.name}</Card.Title>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    )
  }
}

CardMunicipios.propTypes = {
  images: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}
