
import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'

export default function CardEvento ({ name, description, image, fecha, url, lugar }) {
  return (
    <Col className="d-flex align-content-end justify-content-center" xs={12} sm={12} md={12} lg={12}>
      <Card className="card-event-inicio mt-3" style={{ width: '18rem' }}>
        <Card.Img variant="top" style={{ height: '200px' }} src={image} />
        <Card.Body style={{ height: '190px' }} >
          <Card.Title className="font-weight-bold card-event-title">{fecha}</Card.Title>
          <h6 className="mb-0">{name}</h6>
          <small>{lugar}</small>
          <Card.Text className="mt-2">
          </Card.Text>
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
