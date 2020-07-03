import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'

export default function CardEvento ({ name, description, image, fecha, url, lugar }) {
  return (
    <Col className="d-flex align-content-end justify-content-center" xs={12} sm={6} md={4} lg={4}>
      <Card className="card-event mt-3" style={{ width: '18rem' }}>
        <Card.Img variant="top" style={{ height: '200px' }} src={image} />
        <Card.Body>
          <Card.Title className="font-weight-bold card-event-title">{fecha}</Card.Title>
          <h6 className="mb-0">{name}</h6>
          <small>{lugar}</small>
          <div className="mw-100 text-right">
            <a className="botton-event" href={url} target="_blank" rel="noopener noreferrer"><i className="fas fa-plus"></i></a>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

CardEvento.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  fecha: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  lugar: PropTypes.string.isRequired
}
